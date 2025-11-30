
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { budgetApi, expenditureApi, projectApi, contractApi } from '@/lib/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface AdminStatsChartsProps {
  token: string | null
}

export function AdminStatsCharts({ token }: AdminStatsChartsProps) {
  const [budgetByYear, setBudgetByYear] = useState<any[]>([])
  const [budgetByCategory, setBudgetByCategory] = useState<any[]>([])
  const [projectStatus, setProjectStatus] = useState<any[]>([])
  const [monthlyExpenses, setMonthlyExpenses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3', '#A19AD3', '#72BF78']

  useEffect(() => {
    loadChartsData()
  }, [token])

  const loadChartsData = async () => {
    try {
      setIsLoading(true)
      
      const [budgets, expenditures, projects] = await Promise.all([
        budgetApi.getAll(token),
        expenditureApi.getAll(token),
        projectApi.getAll(token)
      ])

      // Process budget by year
      const budgetYearData = budgets?.reduce((acc: any, budget: any) => {
        const year = budget?.year || new Date().getFullYear()
        if (!acc[year]) {
          acc[year] = 0
        }
        acc[year] += budget?.totalAmount || 0
        return acc
      }, {}) || {}

      setBudgetByYear(
        Object.entries(budgetYearData).map(([year, amount]: [string, any]) => ({
          año: year,
          presupuesto: amount
        }))
      )

      // Process budget by category
      const budgetCategoryData = budgets?.reduce((acc: any, budget: any) => {
        const category = budget?.category || 'Sin categoría'
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += budget?.totalAmount || 0
        return acc
      }, {}) || {}

      setBudgetByCategory(
        Object.entries(budgetCategoryData).map(([category, amount]: [string, any]) => ({
          name: category,
          value: amount
        }))
      )

      // Process project status
      const projectStatusData = projects?.reduce((acc: any, project: any) => {
        const status = project?.status || 'Sin estado'
        if (!acc[status]) {
          acc[status] = 0
        }
        acc[status] += 1
        return acc
      }, {}) || {}

      setProjectStatus(
        Object.entries(projectStatusData).map(([status, count]: [string, any]) => ({
          name: status,
          value: count
        }))
      )

      // Process monthly expenses (last 6 months)
      const monthlyExpensesData = expenditures?.reduce((acc: any, expenditure: any) => {
        const date = new Date(expenditure?.date || expenditure?.createdAt)
        const monthYear = date.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })
        if (!acc[monthYear]) {
          acc[monthYear] = 0
        }
        acc[monthYear] += expenditure?.amount || 0
        return acc
      }, {}) || {}

      setMonthlyExpenses(
        Object.entries(monthlyExpensesData)
          .slice(-6)
          .map(([month, amount]: [string, any]) => ({
            mes: month,
            gastos: amount
          }))
      )

    } catch (error) {
      console.error('Error loading charts data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget by Year */}
      <Card>
        <CardHeader>
          <CardTitle>Presupuesto por Año</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={budgetByYear} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="año" 
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                tickLine={false}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
              />
              <Bar dataKey="presupuesto" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Presupuesto por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
              >
                {budgetByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {budgetByCategory.slice(0, 6).map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Status */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Proyectos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={projectStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
              >
                {projectStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {projectStatus.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{entry.name}</span>
                </div>
                <span className="font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyExpenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="mes"
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                tickLine={false}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
              />
              <Line 
                type="monotone" 
                dataKey="gastos" 
                stroke={COLORS[1]} 
                strokeWidth={3}
                dot={{ fill: COLORS[1], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: COLORS[1], strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
