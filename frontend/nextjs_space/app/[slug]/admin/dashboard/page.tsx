
'use client'

import { useParams } from 'next/navigation'

import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  FileText, 
  Briefcase, 
  Users, 
  Activity,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { budgetApi, expenditureApi, projectApi, contractApi } from '@/lib/api'
import { formatCLP, formatNumber } from '@/lib/utils'
import { AdminStatsCharts } from '@/components/admin-stats-charts'

interface DashboardStats {
  totalBudgets: number
  totalExpenditures: number
  totalProjects: number
  totalContracts: number
  totalBudgetAmount: number
  totalExpenditureAmount: number
  activeProjects: number
  recentActivity: number
}

export default function AdminDashboard() {
  const params = useParams()
  const slug = params.slug as string
  const { token } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalBudgets: 0,
    totalExpenditures: 0,
    totalProjects: 0,
    totalContracts: 0,
    totalBudgetAmount: 0,
    totalExpenditureAmount: 0,
    activeProjects: 0,
    recentActivity: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [token])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      const [budgets, expenditures, projects, contracts] = await Promise.all([
        budgetApi.getAll(token),
        expenditureApi.getAll(token),
        projectApi.getAll(token),
        contractApi.getAll(token)
      ])

      const totalBudgetAmount = budgets?.reduce((sum: number, budget: any) => sum + (budget?.totalAmount || 0), 0) || 0
      const totalExpenditureAmount = expenditures?.reduce((sum: number, expenditure: any) => sum + (expenditure?.amount || 0), 0) || 0
      const activeProjects = projects?.filter((project: any) => 
        project?.status?.toLowerCase() === 'activo' || 
        project?.status?.toLowerCase() === 'en_progreso' ||
        project?.status?.toLowerCase() === 'en progreso'
      )?.length || 0

      setStats({
        totalBudgets: budgets?.length || 0,
        totalExpenditures: expenditures?.length || 0,
        totalProjects: projects?.length || 0,
        totalContracts: contracts?.length || 0,
        totalBudgetAmount,
        totalExpenditureAmount,
        activeProjects,
        recentActivity: (expenditures?.length || 0) + (projects?.length || 0) + (contracts?.length || 0)
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    href,
    subtitle,
    isAmount = false
  }: {
    title: string
    value: number
    icon: any
    color: string
    href: string
    subtitle?: string
    isAmount?: boolean
  }) => (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <Icon className={`h-4 w-4 ${color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {isLoading ? '...' : (isAmount ? formatCLP(value) : formatNumber(value))}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <AdminLayout title="Dashboard Administrativo">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Presupuestos Totales"
            value={stats.totalBudgets}
            icon={TrendingUp}
            color="text-blue-600"
            href={`/${slug}/admin/budgets`}
            subtitle="Presupuestos registrados"
          />
          
          <StatCard
            title="Gastos Registrados"
            value={stats.totalExpenditures}
            icon={FileText}
            color="text-green-600"
            href={`/${slug}/admin/expenditures`}
            subtitle="Gastos del sistema"
          />
          
          <StatCard
            title="Proyectos Activos"
            value={stats.activeProjects}
            icon={Briefcase}
            color="text-purple-600"
            href={`/${slug}/admin/projects`}
            subtitle={`de ${stats.totalProjects} proyectos totales`}
          />
          
          <StatCard
            title="Contratos Vigentes"
            value={stats.totalContracts}
            icon={Users}
            color="text-orange-600"
            href={`/${slug}/admin/contracts`}
            subtitle="Contratos en el sistema"
          />
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Resumen Financiero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Presupuestado</span>
                <span className="font-semibold text-green-600">
                  {isLoading ? '...' : formatCLP(stats.totalBudgetAmount)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Ejecutado</span>
                <span className="font-semibold text-blue-600">
                  {isLoading ? '...' : formatCLP(stats.totalExpenditureAmount)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Diferencia</span>
                <span className={`font-semibold ${
                  (stats.totalBudgetAmount - stats.totalExpenditureAmount) >= 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {isLoading ? '...' : formatCLP(stats.totalBudgetAmount - stats.totalExpenditureAmount)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {isLoading ? '...' : formatNumber(stats.recentActivity)}
              </div>
              <p className="text-gray-600">
                Registros totales en el sistema
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gastos</span>
                  <span className="text-gray-600">{stats.totalExpenditures}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Proyectos</span>
                  <span className="text-gray-600">{stats.totalProjects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Contratos</span>
                  <span className="text-gray-600">{stats.totalContracts}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Análisis de Datos</h2>
          </div>
          <AdminStatsCharts token={token} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href={`/${slug}/admin/budgets`}>
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex flex-col items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Crear Presupuesto</span>
                  <span className="text-xs text-gray-500">Agregar nuevo presupuesto</span>
                </div>
              </Button>
            </Link>

            <Link href={`/${slug}/admin/expenditures`}>
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex flex-col items-start gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Registrar Gasto</span>
                  <span className="text-xs text-gray-500">Nuevo gasto municipal</span>
                </div>
              </Button>
            </Link>

            <Link href={`/${slug}/admin/projects`}>
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex flex-col items-start gap-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Crear Proyecto</span>
                  <span className="text-xs text-gray-500">Nuevo proyecto municipal</span>
                </div>
              </Button>
            </Link>

            <Link href={`/${slug}/admin/file-upload`}>
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex flex-col items-start gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Cargar Datos</span>
                  <span className="text-xs text-gray-500">Importar archivos CSV/Excel</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Estado del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Base de Datos</span>
                <span className="text-sm font-medium text-green-600">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Backend</span>
                <span className="text-sm font-medium text-green-600">Operativo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Última Sincronización</span>
                <span className="text-sm font-medium text-gray-600">Hace 2 minutos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
