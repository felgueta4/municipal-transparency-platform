'use client'

import { useParams } from 'next/navigation'

import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Calendar,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { formatNumber } from '@/lib/utils'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

interface BotStats {
  summary: {
    totalInteractions: number
    interactionsWithData: number
    interactionsWithoutData: number
    percentageWithData: string
    percentageWithoutData: string
    avgResponseTime: number
  }
  byCategory: Array<{ category: string; count: number }>
  topQuestions: Array<{ 
    intent: string
    count: number
    category: string | null
    lastUsed: string 
  }>
  dailyStats: Array<{ date: string; count: number }>
}

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
]

export default function BotStatsPage() {
  const { token } = useAuth()
  const [stats, setStats] = useState<BotStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [appliedStartDate, setAppliedStartDate] = useState('')
  const [appliedEndDate, setAppliedEndDate] = useState('')

  useEffect(() => {
    loadStats()
  }, [appliedStartDate, appliedEndDate])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      
      const params = new URLSearchParams()
      if (appliedStartDate) params.append('startDate', appliedStartDate)
      if (appliedEndDate) params.append('endDate', appliedEndDate)
      
      const response = await fetch(`/api/chatbot/stats?${params.toString()}`)
      const data = await response.json()
      
      setStats(data)
    } catch (error) {
      console.error('Error loading bot stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyDateFilter = () => {
    setAppliedStartDate(startDate)
    setAppliedEndDate(endDate)
  }

  const clearDateFilter = () => {
    setStartDate('')
    setEndDate('')
    setAppliedStartDate('')
    setAppliedEndDate('')
  }

  const exportToCSV = () => {
    if (!stats) return
    
    // Preparar datos para CSV
    const csvRows = [
      ['Tipo', 'Pregunta/Categoría', 'Cantidad', 'Última Vez'],
      ...stats.topQuestions.map(q => [
        'Pregunta Frecuente',
        q.intent,
        q.count.toString(),
        new Date(q.lastUsed).toLocaleString('es-CL')
      ]),
      [],
      ['Categoría', 'Total Consultas'],
      ...stats.byCategory.map(c => [c.category, c.count.toString()])
    ]
    
    const csvContent = csvRows.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `estadisticas_bot_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color,
    subtitle,
    trend
  }: {
    title: string
    value: string | number
    icon: any
    color: string
    subtitle?: string
    trend?: 'up' | 'down'
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {isLoading ? '...' : value}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-600" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-600" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <AdminLayout title="Estadísticas del Bot Conversacional">
      <div className="space-y-6">
        {/* Filtros de Fecha */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Filtrar por Rango de Fechas
            </CardTitle>
            <CardDescription>
              Selecciona un rango de fechas para analizar las interacciones del chatbot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="startDate">Fecha Inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div className="flex-1">
                <Label htmlFor="endDate">Fecha Fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={applyDateFilter}>
                  Aplicar Filtro
                </Button>
                <Button variant="outline" onClick={clearDateFilter}>
                  Limpiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total de Interacciones"
            value={stats?.summary.totalInteractions || 0}
            icon={MessageSquare}
            color="text-blue-600"
            subtitle="Consultas totales recibidas"
          />
          
          <StatCard
            title="Con Respuesta"
            value={`${stats?.summary.percentageWithData || 0}%`}
            icon={CheckCircle}
            color="text-green-600"
            subtitle={`${stats?.summary.interactionsWithData || 0} consultas respondidas`}
            trend="up"
          />
          
          <StatCard
            title="Sin Datos Públicos"
            value={`${stats?.summary.percentageWithoutData || 0}%`}
            icon={XCircle}
            color="text-red-600"
            subtitle={`${stats?.summary.interactionsWithoutData || 0} sin respuesta`}
            trend="down"
          />
          
          <StatCard
            title="Tiempo Promedio"
            value={`${stats?.summary.avgResponseTime || 0}ms`}
            icon={Clock}
            color="text-purple-600"
            subtitle="Velocidad de respuesta"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Categorías */}
          <Card>
            <CardHeader>
              <CardTitle>Temas Más Consultados</CardTitle>
              <CardDescription>Distribución de consultas por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              {stats && stats.byCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.byCategory}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry: any) => `${entry.category}: ${entry.count}`}
                    >
                      {stats.byCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  {isLoading ? 'Cargando...' : 'No hay datos para mostrar'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de Tendencia Temporal */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Uso</CardTitle>
              <CardDescription>Interacciones diarias del chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              {stats && stats.dailyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Interacciones"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  {isLoading ? 'Cargando...' : 'No hay datos para mostrar'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top 10 Preguntas Frecuentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top 10 Preguntas Más Frecuentes</CardTitle>
              <CardDescription>
                Las consultas más repetidas por los usuarios
              </CardDescription>
            </div>
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </CardHeader>
          <CardContent>
            {stats && stats.topQuestions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">#</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Intent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Categoría</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Veces</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-700">Última Vez</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topQuestions.map((q, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-900">{q.intent}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {q.category || 'Sin categoría'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          {formatNumber(q.count)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600 text-sm">
                          {new Date(q.lastUsed).toLocaleDateString('es-CL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                {isLoading ? 'Cargando preguntas frecuentes...' : 'No hay preguntas frecuentes para mostrar'}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfico de Barras - Categorías */}
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Categoría</CardTitle>
            <CardDescription>Comparación detallada de temas consultados</CardDescription>
          </CardHeader>
          <CardContent>
            {stats && stats.byCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stats.byCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" name="Cantidad" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                {isLoading ? 'Cargando...' : 'No hay datos para mostrar'}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Información Adicional */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Información del Módulo</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2 text-sm">
            <p>
              • <strong>Recolección Automática:</strong> Las interacciones se registran en tiempo real desde el webchat público.
            </p>
            <p>
              • <strong>Categorización:</strong> El sistema clasifica automáticamente las consultas por tema (Proyectos, Presupuestos, Contratos, etc.).
            </p>
            <p>
              • <strong>Exportación:</strong> Los datos pueden exportarse en formato CSV para análisis externos o informes municipales.
            </p>
            <p>
              • <strong>Privacidad:</strong> Solo se almacenan las preguntas y respuestas, sin datos personales de los usuarios.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
