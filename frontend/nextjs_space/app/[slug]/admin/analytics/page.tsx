
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KPICard } from '@/components/kpi-card'
import { AdvancedChart } from '@/components/advanced-chart'
import { ComparisonChart } from '@/components/comparison-chart'
import { useAuth } from '@/components/auth-provider'
import { budgetApi, expenditureApi, projectApi } from '@/lib/api'
import { formatCLP, formatNumber } from '@/lib/utils'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Target,
  BarChart3,
  Calendar,
  ArrowUpRight
} from 'lucide-react'

export default function AnalyticsPage() {
  const { token } = useAuth()
  const [data, setData] = useState<any>({
    budgets: [],
    expenditures: [],
    projects: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [kpis, setKpis] = useState<any>({})

  useEffect(() => {
    loadAnalyticsData()
  }, [token])

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true)
      
      const [budgets, expenditures, projects] = await Promise.all([
        budgetApi.getAll(token),
        expenditureApi.getAll(token),
        projectApi.getAll(token)
      ])

      setData({ budgets: budgets || [], expenditures: expenditures || [], projects: projects || [] })

      // Calcular KPIs
      const totalBudget = budgets?.reduce((sum: number, b: any) => sum + (b?.totalAmount || 0), 0) || 0
      const totalExpenditure = expenditures?.reduce((sum: number, e: any) => sum + (e?.amount || 0), 0) || 0
      const executionRate = totalBudget > 0 ? (totalExpenditure / totalBudget) * 100 : 0
      const activeProjects = projects?.filter((p: any) => 
        p?.status?.toLowerCase() === 'activo' || 
        p?.status?.toLowerCase() === 'en_progreso'
      ).length || 0

      setKpis({
        totalBudget,
        totalExpenditure,
        executionRate,
        activeProjects,
        budgetRemaining: totalBudget - totalExpenditure
      })

    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Preparar datos para gráficos comparativos
  const getYearlyComparison = () => {
    const yearlyData: { [key: string]: { budget: number; expenditure: number } } = {}
    
    data.budgets.forEach((b: any) => {
      const year = b?.year || '2024'
      if (!yearlyData[year]) yearlyData[year] = { budget: 0, expenditure: 0 }
      yearlyData[year].budget += b?.totalAmount || 0
    })
    
    data.expenditures.forEach((e: any) => {
      const year = new Date(e?.date || Date.now()).getFullYear().toString()
      if (!yearlyData[year]) yearlyData[year] = { budget: 0, expenditure: 0 }
      yearlyData[year].expenditure += e?.amount || 0
    })
    
    return Object.entries(yearlyData)
      .map(([year, values]) => ({
        name: year,
        presupuesto: values.budget,
        gastado: values.expenditure,
        diferencia: values.budget - values.expenditure
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  // Datos de tendencia mensual
  const getMonthlyTrend = () => {
    const monthlyData: { [key: string]: number } = {}
    
    data.expenditures.forEach((e: any) => {
      const date = new Date(e?.date || Date.now())
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + (e?.amount || 0)
    })
    
    return Object.entries(monthlyData)
      .map(([month, amount]) => ({
        name: month,
        value: amount
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(-12) // Últimos 12 meses
  }

  // Distribución por categoría
  const getCategoryDistribution = () => {
    const categoryData: { [key: string]: number } = {}
    
    data.expenditures.forEach((e: any) => {
      const category = e?.category || 'Sin categoría'
      categoryData[category] = (categoryData[category] || 0) + (e?.amount || 0)
    })
    
    return Object.entries(categoryData)
      .map(([category, amount]) => ({
        name: category,
        value: amount
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
  }

  if (isLoading) {
    return (
      <AdminLayout title="Análisis y KPIs">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando análisis...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Análisis y KPIs">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Análisis y KPIs</h1>
          <p className="text-gray-600 mt-1">
            Indicadores clave de rendimiento y análisis comparativo
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Presupuesto Total"
            value={formatCLP(kpis.totalBudget || 0)}
            subtitle="Presupuesto asignado"
            icon={DollarSign}
            color="blue"
            trend={{
              value: 12.5,
              isPositive: true
            }}
          />
          
          <KPICard
            title="Ejecutado"
            value={formatCLP(kpis.totalExpenditure || 0)}
            subtitle="Total gastado"
            icon={TrendingUp}
            color="green"
            trend={{
              value: 8.3,
              isPositive: true
            }}
          />
          
          <KPICard
            title="Tasa de Ejecución"
            value={`${kpis.executionRate?.toFixed(1) || 0}%`}
            subtitle="Porcentaje ejecutado"
            icon={Target}
            color="purple"
            trend={{
              value: 5.2,
              isPositive: false
            }}
          />
          
          <KPICard
            title="Presupuesto Restante"
            value={formatCLP(kpis.budgetRemaining || 0)}
            subtitle="Disponible para gastar"
            icon={Activity}
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Comparación Anual</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="distribution">Distribución</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            <ComparisonChart
              title="Presupuesto vs Gastos por Año"
              description="Comparación del presupuesto asignado vs gastos ejecutados"
              data={getYearlyComparison()}
              bars={[
                { dataKey: 'presupuesto', name: 'Presupuesto', color: '#3b82f6' },
                { dataKey: 'gastado', name: 'Gastado', color: '#10b981' }
              ]}
              lines={[
                { dataKey: 'diferencia', name: 'Diferencia', color: '#f59e0b' }
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Eficiencia de Ejecución
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    {kpis.executionRate?.toFixed(1) || 0}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Porcentaje del presupuesto ejecutado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Proyectos Activos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    {kpis.activeProjects || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Proyectos en ejecución
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Ahorro/Déficit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${
                    kpis.budgetRemaining >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCLP(Math.abs(kpis.budgetRemaining || 0))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {kpis.budgetRemaining >= 0 ? 'Ahorro acumulado' : 'Déficit acumulado'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <AdvancedChart
              title="Tendencia Mensual de Gastos"
              data={getMonthlyTrend()}
              type="area"
              dataKey="value"
              xAxisKey="name"
              height={400}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proyección Anual</CardTitle>
                  <CardDescription>
                    Estimación basada en gastos actuales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Gasto Mensual Promedio</span>
                      <span className="font-semibold">
                        {formatCLP((kpis.totalExpenditure || 0) / 12)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Proyección Anual</span>
                      <span className="font-semibold text-blue-600">
                        {formatCLP((kpis.totalExpenditure || 0))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Velocidad de Ejecución</CardTitle>
                  <CardDescription>
                    Ritmo de gasto mensual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCLP((kpis.totalExpenditure || 0) / 12)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Por mes</p>
                    </div>
                    <ArrowUpRight className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdvancedChart
                title="Distribución por Categoría (Top 10)"
                data={getCategoryDistribution()}
                type="bar"
                dataKey="value"
                xAxisKey="name"
                height={400}
              />

              <AdvancedChart
                title="Proporción por Categoría"
                data={getCategoryDistribution().slice(0, 6)}
                type="pie"
                dataKey="value"
                height={400}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
