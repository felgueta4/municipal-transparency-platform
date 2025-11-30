
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReportExportDialog } from '@/components/report-export-dialog'
import { AdvancedChart } from '@/components/advanced-chart'
import { useAuth } from '@/components/auth-provider'
import { budgetApi, expenditureApi, projectApi, contractApi } from '@/lib/api'
import { formatCLP, formatDate } from '@/lib/utils'
import { 
  FileText, 
  TrendingUp, 
  Briefcase, 
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react'
import { ReportData } from '@/lib/report-generator'

export default function ReportsPage() {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState('budgets')
  const [data, setData] = useState<any>({
    budgets: [],
    expenditures: [],
    projects: [],
    contracts: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [token])

  const loadAllData = async () => {
    try {
      setIsLoading(true)
      
      const [budgets, expenditures, projects, contracts] = await Promise.all([
        budgetApi.getAll(token),
        expenditureApi.getAll(token),
        projectApi.getAll(token),
        contractApi.getAll(token)
      ])

      setData({
        budgets: budgets || [],
        expenditures: expenditures || [],
        projects: projects || [],
        contracts: contracts || []
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Preparar datos para reportes
  const getBudgetReport = (): ReportData => {
    const totalAmount = data.budgets.reduce((sum: number, b: any) => sum + (b?.totalAmount || 0), 0)
    
    return {
      title: 'Reporte de Presupuestos',
      subtitle: `Generado el ${new Date().toLocaleDateString('es-CL')}`,
      data: data.budgets.map((b: any) => ({
        year: b?.year || '-',
        totalAmount: b?.totalAmount || 0,
        description: b?.description || '-',
        createdAt: b?.createdAt || '-'
      })),
      columns: [
        { header: 'Año', key: 'year' },
        { header: 'Monto Total', key: 'totalAmount', format: 'currency' as const },
        { header: 'Descripción', key: 'description' },
        { header: 'Fecha Creación', key: 'createdAt', format: 'date' as const }
      ],
      summary: [
        { label: 'Total Presupuestos', value: data.budgets.length, format: 'number' as const },
        { label: 'Monto Total', value: totalAmount, format: 'currency' as const }
      ]
    }
  }

  const getExpenditureReport = (): ReportData => {
    const totalAmount = data.expenditures.reduce((sum: number, e: any) => sum + (e?.amount || 0), 0)
    
    return {
      title: 'Reporte de Gastos',
      subtitle: `Generado el ${new Date().toLocaleDateString('es-CL')}`,
      data: data.expenditures.map((e: any) => ({
        description: e?.description || '-',
        amount: e?.amount || 0,
        category: e?.category || '-',
        date: e?.date || '-',
        provider: e?.provider || '-'
      })),
      columns: [
        { header: 'Descripción', key: 'description' },
        { header: 'Monto', key: 'amount', format: 'currency' as const },
        { header: 'Categoría', key: 'category' },
        { header: 'Fecha', key: 'date', format: 'date' as const },
        { header: 'Proveedor', key: 'provider' }
      ],
      summary: [
        { label: 'Total Gastos', value: data.expenditures.length, format: 'number' as const },
        { label: 'Monto Total', value: totalAmount, format: 'currency' as const }
      ]
    }
  }

  const getProjectReport = (): ReportData => {
    const totalBudget = data.projects.reduce((sum: number, p: any) => sum + (p?.budget || 0), 0)
    const activeProjects = data.projects.filter((p: any) => 
      p?.status?.toLowerCase() === 'activo' || 
      p?.status?.toLowerCase() === 'en_progreso'
    ).length
    
    return {
      title: 'Reporte de Proyectos',
      subtitle: `Generado el ${new Date().toLocaleDateString('es-CL')}`,
      data: data.projects.map((p: any) => ({
        name: p?.name || '-',
        description: p?.description || '-',
        budget: p?.budget || 0,
        status: p?.status || '-',
        startDate: p?.startDate || '-',
        endDate: p?.endDate || '-'
      })),
      columns: [
        { header: 'Nombre', key: 'name' },
        { header: 'Descripción', key: 'description' },
        { header: 'Presupuesto', key: 'budget', format: 'currency' as const },
        { header: 'Estado', key: 'status' },
        { header: 'Fecha Inicio', key: 'startDate', format: 'date' as const },
        { header: 'Fecha Fin', key: 'endDate', format: 'date' as const }
      ],
      summary: [
        { label: 'Total Proyectos', value: data.projects.length, format: 'number' as const },
        { label: 'Proyectos Activos', value: activeProjects, format: 'number' as const },
        { label: 'Presupuesto Total', value: totalBudget, format: 'currency' as const }
      ]
    }
  }

  const getContractReport = (): ReportData => {
    const totalAmount = data.contracts.reduce((sum: number, c: any) => sum + (c?.amount || 0), 0)
    
    return {
      title: 'Reporte de Contratos',
      subtitle: `Generado el ${new Date().toLocaleDateString('es-CL')}`,
      data: data.contracts.map((c: any) => ({
        title: c?.title || '-',
        contractor: c?.contractor || '-',
        amount: c?.amount || 0,
        status: c?.status || '-',
        startDate: c?.startDate || '-',
        endDate: c?.endDate || '-'
      })),
      columns: [
        { header: 'Título', key: 'title' },
        { header: 'Contratista', key: 'contractor' },
        { header: 'Monto', key: 'amount', format: 'currency' as const },
        { header: 'Estado', key: 'status' },
        { header: 'Fecha Inicio', key: 'startDate', format: 'date' as const },
        { header: 'Fecha Fin', key: 'endDate', format: 'date' as const }
      ],
      summary: [
        { label: 'Total Contratos', value: data.contracts.length, format: 'number' as const },
        { label: 'Monto Total', value: totalAmount, format: 'currency' as const }
      ]
    }
  }

  // Preparar datos para gráficos
  const getBudgetChartData = () => {
    const byYear: { [key: string]: number } = {}
    data.budgets.forEach((b: any) => {
      const year = b?.year || '2024'
      byYear[year] = (byYear[year] || 0) + (b?.totalAmount || 0)
    })
    return Object.entries(byYear).map(([year, amount]) => ({ name: year, value: amount }))
  }

  const getExpenditureChartData = () => {
    const byCategory: { [key: string]: number } = {}
    data.expenditures.forEach((e: any) => {
      const category = e?.category || 'Sin categoría'
      byCategory[category] = (byCategory[category] || 0) + (e?.amount || 0)
    })
    return Object.entries(byCategory)
      .map(([category, amount]) => ({ name: category, value: amount }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }

  if (isLoading) {
    return (
      <AdminLayout title="Reportes">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Reportes y Análisis">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
            <p className="text-gray-600 mt-1">
              Genera reportes detallados y exporta datos en múltiples formatos
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="budgets" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Presupuestos
            </TabsTrigger>
            <TabsTrigger value="expenditures" className="gap-2">
              <FileText className="h-4 w-4" />
              Gastos
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="contracts" className="gap-2">
              <Users className="h-4 w-4" />
              Contratos
            </TabsTrigger>
          </TabsList>

          {/* Budgets Tab */}
          <TabsContent value="budgets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reporte de Presupuestos</CardTitle>
                    <CardDescription>
                      Análisis detallado de presupuestos municipales
                    </CardDescription>
                  </div>
                  <ReportExportDialog reportData={getBudgetReport()} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard
                    title="Total Presupuestos"
                    value={data.budgets.length.toString()}
                    icon={FileText}
                    color="text-blue-600"
                  />
                  <StatCard
                    title="Monto Total"
                    value={formatCLP(data.budgets.reduce((s: number, b: any) => s + (b?.totalAmount || 0), 0))}
                    icon={DollarSign}
                    color="text-green-600"
                  />
                  <StatCard
                    title="Años Registrados"
                    value={new Set(data.budgets.map((b: any) => b?.year)).size.toString()}
                    icon={Calendar}
                    color="text-purple-600"
                  />
                </div>

                <AdvancedChart
                  title="Presupuestos por Año"
                  data={getBudgetChartData()}
                  type="bar"
                  dataKey="value"
                  xAxisKey="name"
                  height={300}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenditures Tab */}
          <TabsContent value="expenditures" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reporte de Gastos</CardTitle>
                    <CardDescription>
                      Análisis detallado de gastos municipales
                    </CardDescription>
                  </div>
                  <ReportExportDialog reportData={getExpenditureReport()} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard
                    title="Total Gastos"
                    value={data.expenditures.length.toString()}
                    icon={FileText}
                    color="text-blue-600"
                  />
                  <StatCard
                    title="Monto Total"
                    value={formatCLP(data.expenditures.reduce((s: number, e: any) => s + (e?.amount || 0), 0))}
                    icon={DollarSign}
                    color="text-green-600"
                  />
                  <StatCard
                    title="Categorías"
                    value={new Set(data.expenditures.map((e: any) => e?.category)).size.toString()}
                    icon={BarChart3}
                    color="text-purple-600"
                  />
                </div>

                <AdvancedChart
                  title="Gastos por Categoría (Top 8)"
                  data={getExpenditureChartData()}
                  type="pie"
                  dataKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reporte de Proyectos</CardTitle>
                    <CardDescription>
                      Análisis detallado de proyectos municipales
                    </CardDescription>
                  </div>
                  <ReportExportDialog reportData={getProjectReport()} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="Total Proyectos"
                    value={data.projects.length.toString()}
                    icon={Briefcase}
                    color="text-blue-600"
                  />
                  <StatCard
                    title="Proyectos Activos"
                    value={data.projects.filter((p: any) => 
                      p?.status?.toLowerCase() === 'activo' || 
                      p?.status?.toLowerCase() === 'en_progreso'
                    ).length.toString()}
                    icon={TrendingUp}
                    color="text-green-600"
                  />
                  <StatCard
                    title="Presupuesto Total"
                    value={formatCLP(data.projects.reduce((s: number, p: any) => s + (p?.budget || 0), 0))}
                    icon={DollarSign}
                    color="text-purple-600"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reporte de Contratos</CardTitle>
                    <CardDescription>
                      Análisis detallado de contratos municipales
                    </CardDescription>
                  </div>
                  <ReportExportDialog reportData={getContractReport()} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="Total Contratos"
                    value={data.contracts.length.toString()}
                    icon={Users}
                    color="text-blue-600"
                  />
                  <StatCard
                    title="Contratos Activos"
                    value={data.contracts.filter((c: any) => 
                      c?.status?.toLowerCase() === 'activo'
                    ).length.toString()}
                    icon={TrendingUp}
                    color="text-green-600"
                  />
                  <StatCard
                    title="Monto Total"
                    value={formatCLP(data.contracts.reduce((s: number, c: any) => s + (c?.amount || 0), 0))}
                    icon={DollarSign}
                    color="text-purple-600"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color 
}: { 
  title: string
  value: string
  icon: any
  color: string
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  )
}
