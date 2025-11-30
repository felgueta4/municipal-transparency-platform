
'use client'

// Updated: Show all data from admin portal
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { budgetApi, expenditureApi } from '@/lib/api'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function PublicCharts() {
  const [budgetData, setBudgetData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3']

  useEffect(() => {
    loadChartsData()
  }, [])

  const loadChartsData = async () => {
    try {
      setIsLoading(true)
      
      const [budgets, expenditures] = await Promise.all([
        budgetApi.getAll(),
        expenditureApi.getAll()
      ])

      // All data from admin portal is public - admin is the single source of truth
      const publicBudgets = budgets || []
      const publicExpenditures = expenditures || []

      // Process budget by year
      const budgetYearData = publicBudgets.reduce((acc: any, budget: any) => {
        const year = budget?.year || new Date().getFullYear()
        if (!acc[year]) {
          acc[year] = 0
        }
        acc[year] += budget?.totalAmount || 0
        return acc
      }, {})

      setBudgetData(
        Object.entries(budgetYearData).map(([year, amount]: [string, any]) => ({
          año: year,
          presupuesto: amount
        }))
      )

      // Process expenditures by category
      const categoryExpenseData = publicExpenditures.reduce((acc: any, expenditure: any) => {
        const category = expenditure?.category || 'Sin categoría'
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += expenditure?.amount || 0
        return acc
      }, {})

      setCategoryData(
        Object.entries(categoryExpenseData).map(([category, amount]: [string, any]) => ({
          name: category,
          value: amount
        }))
      )

    } catch (error) {
      console.error('Error loading public charts data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
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
          <CardTitle>Presupuesto Municipal por Año</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

      {/* Expenses by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={100}
                paddingAngle={2}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {categoryData.slice(0, 6).map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="truncate">{entry.name}</span>
                </div>
                <span className="font-medium">${(entry.value / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
