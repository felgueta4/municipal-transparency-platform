
'use client'

// Updated: Show all data from admin portal
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, FileText, Briefcase, Users } from 'lucide-react'
import { budgetApi, expenditureApi, projectApi, contractApi } from '@/lib/api'
import { formatCompactCLP, formatNumber } from '@/lib/utils'

interface PublicStatsData {
  totalBudget: number
  totalExpenditures: number
  activeProjects: number
  totalContracts: number
}

export function PublicStats() {
  const [stats, setStats] = useState<PublicStatsData>({
    totalBudget: 0,
    totalExpenditures: 0,
    activeProjects: 0,
    totalContracts: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPublicStats()
  }, [])

  const loadPublicStats = async () => {
    try {
      setIsLoading(true)
      
      const [budgets, expenditures, projects, contracts] = await Promise.all([
        budgetApi.getAll(),
        expenditureApi.getAll(),
        projectApi.getAll(),
        contractApi.getAll()
      ])

      // All data from admin portal is public - admin is the single source of truth
      const publicBudgets = budgets || []
      const publicExpenditures = expenditures || []
      const publicProjects = projects || []
      const publicContracts = contracts || []

      const totalBudget = publicBudgets.reduce((sum: number, budget: any) => sum + (budget?.totalAmount || 0), 0)
      const totalExpenditures = publicExpenditures.reduce((sum: number, expenditure: any) => sum + (expenditure?.amount || 0), 0)
      const activeProjects = publicProjects.filter((project: any) => 
        project?.status?.toLowerCase() === 'activo' || 
        project?.status?.toLowerCase() === 'en_progreso' ||
        project?.status?.toLowerCase() === 'en progreso'
      ).length

      setStats({
        totalBudget,
        totalExpenditures,
        activeProjects,
        totalContracts: publicContracts.length
      })
    } catch (error) {
      console.error('Error loading public stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color,
    suffix = '',
    isAmount = false
  }: {
    title: string
    value: number
    icon: any
    color: string
    suffix?: string
    isAmount?: boolean
  }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 break-words">
              {isLoading ? '...' : (isAmount ? formatCompactCLP(value) : formatNumber(value))}
              {suffix}
            </p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Presupuesto Municipal"
        value={stats.totalBudget}
        icon={TrendingUp}
        color="bg-blue-600"
        isAmount={true}
      />
      
      <StatCard
        title="Gastos Ejecutados"
        value={stats.totalExpenditures}
        icon={FileText}
        color="bg-green-600"
        isAmount={true}
      />
      
      <StatCard
        title="Proyectos Activos"
        value={stats.activeProjects}
        icon={Briefcase}
        color="bg-purple-600"
      />
      
      <StatCard
        title="Contratos Vigentes"
        value={stats.totalContracts}
        icon={Users}
        color="bg-orange-600"
      />
    </div>
  )
}
