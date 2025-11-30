
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FileText, Calendar, DollarSign, Search, TrendingDown } from 'lucide-react'
import { expenditureApi, budgetApi } from '@/lib/api'
import { formatCLP, formatDate, getCategoryColor } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function GastosPage() {
  const [expenditures, setExpenditures] = useState<any[]>([])
  const [budgets, setBudgets] = useState<any[]>([])
  const [filteredExpenditures, setFilteredExpenditures] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [budgetFilter, setBudgetFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3']

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [expenditures, searchTerm, categoryFilter, budgetFilter])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [expendituresData, budgetsData] = await Promise.all([
        expenditureApi.getAll(),
        budgetApi.getAll()
      ])
      
      setExpenditures(expendituresData || [])
      setBudgets(budgetsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = expenditures

    if (searchTerm) {
      filtered = filtered.filter(expenditure =>
        expenditure?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expenditure?.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(expenditure => expenditure?.category === categoryFilter)
    }

    if (budgetFilter !== 'all') {
      filtered = filtered.filter(expenditure => expenditure?.budgetId === budgetFilter)
    }

    setFilteredExpenditures(filtered)
  }

  const getCategories = () => {
    const categories = [...new Set(expenditures.map(expenditure => expenditure?.category).filter(Boolean))]
    return categories.sort()
  }

  const getMonthlyData = () => {
    const monthlyData = expenditures.reduce((acc: any, expenditure: any) => {
      const date = new Date(expenditure?.date || expenditure?.createdAt)
      const monthYear = date.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })
      if (!acc[monthYear]) {
        acc[monthYear] = 0
      }
      acc[monthYear] += expenditure?.amount || 0
      return acc
    }, {})

    return Object.entries(monthlyData)
      .slice(-6)
      .map(([month, amount]: [string, any]) => ({
        mes: month,
        gastos: amount
      }))
  }

  const getCategoryData = () => {
    const categoryData = expenditures.reduce((acc: any, expenditure: any) => {
      const category = expenditure?.category || 'Sin categoría'
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += expenditure?.amount || 0
      return acc
    }, {})

    return Object.entries(categoryData)
      .map(([category, amount]: [string, any]) => ({
        categoria: category,
        gastos: amount
      }))
      .sort((a, b) => b.gastos - a.gastos)
  }

  const totalExpended = expenditures.reduce((sum, expenditure) => sum + (expenditure?.amount || 0), 0)

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Gastos Municipales</h1>
        <p className="text-lg text-gray-600">
          Consulta los gastos públicos del municipio organizados por categoría y fecha
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                <p className="text-2xl font-bold text-red-600">{formatCLP(totalExpended)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Número de Gastos</p>
                <p className="text-2xl font-bold text-green-600">{expenditures.length}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gasto Promedio</p>
                <p className="text-2xl font-bold text-blue-600">
                  {expenditures.length > 0 ? formatCLP(totalExpended / expenditures.length) : '$0'}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getMonthlyData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getCategoryData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="categoria" 
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  height={60}
                  angle={-45}
                />
                <YAxis 
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                />
                <Bar dataKey="gastos" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar en descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {getCategories().map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={budgetFilter} onValueChange={setBudgetFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por presupuesto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los presupuestos</SelectItem>
                {budgets.map(budget => (
                  <SelectItem key={budget.id} value={budget.id}>
                    Presupuesto {budget.year} - {budget.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              Mostrando {filteredExpenditures.length} de {expenditures.length} gastos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenditures List */}
      <div className="space-y-4">
        {filteredExpenditures.length > 0 ? (
          filteredExpenditures.map((expenditure) => {
            const linkedBudget = budgets.find(budget => budget.id === expenditure.budgetId)
            
            return (
              <Card key={expenditure.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{expenditure.description}</h3>
                        <Badge className={getCategoryColor(expenditure.category)}>
                          {expenditure.category}
                        </Badge>
                      </div>
                      
                      {linkedBudget && (
                        <p className="text-sm text-blue-600 mb-2">
                          Presupuesto: {linkedBudget.year} - {linkedBudget.category}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(expenditure.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          ID: {expenditure.id.substring(0, 8)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">
                        {formatCLP(expenditure.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(expenditure.date)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron gastos
              </h3>
              <p className="text-gray-600">
                {searchTerm || categoryFilter !== 'all' || budgetFilter !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay gastos públicos disponibles en este momento'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
