
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Calendar, DollarSign, Search } from 'lucide-react'
import { budgetApi } from '@/lib/api'
import { formatCLP, formatDate, getCategoryColor } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function PresupuestosPage() {
  const [budgets, setBudgets] = useState<any[]>([])
  const [filteredBudgets, setFilteredBudgets] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3']

  useEffect(() => {
    loadBudgets()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [budgets, searchTerm, yearFilter, categoryFilter])

  const loadBudgets = async () => {
    try {
      setIsLoading(true)
      const data = await budgetApi.getAll()
      setBudgets(data || [])
    } catch (error) {
      console.error('Error loading budgets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = budgets

    if (searchTerm) {
      filtered = filtered.filter(budget =>
        budget?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        budget?.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (yearFilter !== 'all') {
      filtered = filtered.filter(budget => budget?.year?.toString() === yearFilter)
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(budget => budget?.category === categoryFilter)
    }

    setFilteredBudgets(filtered)
  }

  const getYears = () => {
    const years = [...new Set(budgets.map(budget => budget?.year).filter(Boolean))]
    return years.sort((a, b) => b - a)
  }

  const getCategories = () => {
    const categories = [...new Set(budgets.map(budget => budget?.category).filter(Boolean))]
    return categories.sort()
  }

  const getYearlyData = () => {
    const yearlyData = budgets.reduce((acc: any, budget: any) => {
      const year = budget?.year || new Date().getFullYear()
      if (!acc[year]) {
        acc[year] = 0
      }
      acc[year] += budget?.totalAmount || 0
      return acc
    }, {})

    return Object.entries(yearlyData)
      .map(([year, amount]: [string, any]) => ({
        año: year,
        presupuesto: amount
      }))
      .sort((a, b) => parseInt(a.año) - parseInt(b.año))
  }

  const getCategoryData = () => {
    const categoryData = budgets.reduce((acc: any, budget: any) => {
      const category = budget?.category || 'Sin categoría'
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += budget?.totalAmount || 0
      return acc
    }, {})

    return Object.entries(categoryData).map(([category, amount]: [string, any]) => ({
      name: category,
      value: amount
    }))
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + (budget?.totalAmount || 0), 0)

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Presupuestos Municipales</h1>
        <p className="text-lg text-gray-600">
          Consulta los presupuestos públicos del municipio organizados por año y categoría
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                <p className="text-2xl font-bold text-blue-600">{formatCLP(totalBudget)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Presupuestos</p>
                <p className="text-2xl font-bold text-green-600">{budgets.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Años Disponibles</p>
                <p className="text-2xl font-bold text-purple-600">{getYears().length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Presupuesto por Año</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getYearlyData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

        <Card>
          <CardHeader>
            <CardTitle>Presupuesto por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getCategoryData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {getCategoryData().slice(0, 6).map((entry, index) => (
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

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los años</SelectItem>
                {getYears().map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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

            <div className="text-sm text-gray-600 flex items-center">
              Mostrando {filteredBudgets.length} de {budgets.length} presupuestos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget List */}
      <div className="space-y-4">
        {filteredBudgets.length > 0 ? (
          filteredBudgets.map((budget) => (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">Presupuesto {budget.year}</h3>
                      <Badge className={getCategoryColor(budget.category)}>
                        {budget.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{budget.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatCLP(budget.totalAmount)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Creado: {formatDate(budget.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCLP(budget.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Año {budget.year}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron presupuestos
              </h3>
              <p className="text-gray-600">
                {searchTerm || yearFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay presupuestos públicos disponibles en este momento'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
