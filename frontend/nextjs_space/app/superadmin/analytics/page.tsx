'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { analyticsApi } from '@/lib/api'
import { 
  DashboardSummary, 
  VersionAdoptionItem, 
  TimelineItem,
  MunicipalityStatusItem,
  UpdateFrequencyItem 
} from '@/lib/types'
import { 
  BarChart3, 
  TrendingUp, 
  Building2, 
  Package, 
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts'
import { format, subDays } from 'date-fns'
import { es } from 'date-fns/locale'

const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#80D8C3', '#A19AD3', '#72BF78', '#FFD966']

export default function AnalyticsDashboardPage() {
  const router = useRouter()
  const { user, token, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [adoption, setAdoption] = useState<VersionAdoptionItem[]>([])
  const [timeline, setTimeline] = useState<TimelineItem[]>([])
  const [municipalityStatus, setMunicipalityStatus] = useState<MunicipalityStatusItem[]>([])
  const [updateFrequency, setUpdateFrequency] = useState<UpdateFrequencyItem[]>([])

  useEffect(() => {
    if (authLoading) return

    if (!user || !token) {
      router.push('/superadmin/login?callbackUrl=/superadmin/analytics')
      return
    }

    if (user.role !== 'super_admin') {
      setError('Acceso denegado. Solo superadministradores pueden acceder a esta página.')
      setLoading(false)
      return
    }

    fetchAnalytics()
  }, [user, token, authLoading, router])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Fetch last 90 days of timeline data
      const startDate = format(subDays(new Date(), 90), 'yyyy-MM-dd')
      const endDate = format(new Date(), 'yyyy-MM-dd')

      const [summaryData, adoptionData, timelineData, statusData, frequencyData] = await Promise.all([
        analyticsApi.getDashboardSummary(token),
        analyticsApi.getVersionAdoption(token),
        analyticsApi.getVersionTimeline(startDate, endDate, token),
        analyticsApi.getMunicipalityStatus(token),
        analyticsApi.getUpdateFrequency(token),
      ])

      setSummary(summaryData)
      setAdoption(adoptionData || [])
      setTimeline(timelineData || [])
      setMunicipalityStatus(statusData || [])
      setUpdateFrequency(frequencyData || [])
    } catch (err) {
      console.error('Error fetching analytics:', err)
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos de analítica',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando analítica...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error de Acceso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error}</p>
            <Button onClick={() => router.push('/superadmin')}>Volver al Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Status breakdown for bar chart
  const statusData = [
    {
      name: 'Actualizadas',
      count: municipalityStatus.filter(m => m.status === 'updated').length,
      color: COLORS[0],
    },
    {
      name: 'Desactualizadas',
      count: municipalityStatus.filter(m => m.status === 'outdated').length,
      color: COLORS[1],
    },
    {
      name: 'Sin Versión',
      count: municipalityStatus.filter(m => m.status === 'unassigned').length,
      color: COLORS[2],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Analítica del Sistema
              </h1>
              <p className="text-gray-600 mt-1">
                Dashboard de estadísticas y métricas de adopción de versiones
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/superadmin/analytics/versions">
                <Button variant="outline">
                  Ver Detalles de Versiones
                </Button>
              </Link>
              <Button onClick={() => router.push('/superadmin')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Total Municipalidades
              </CardDescription>
              <CardTitle className="text-3xl">{summary?.totalMunicipalities ?? 0}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Versiones Disponibles
              </CardDescription>
              <CardTitle className="text-3xl">{summary?.totalVersions ?? 0}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Actualizadas
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">{summary?.updatedCount ?? 0}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                Desactualizadas
              </CardDescription>
              <CardTitle className="text-3xl text-orange-600">{summary?.outdatedCount ?? 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Version Adoption Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Adopción de Versiones</CardTitle>
              <CardDescription>Distribución de municipalidades por versión</CardDescription>
            </CardHeader>
            <CardContent>
              {adoption.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  No hay datos disponibles
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={adoption as any}
                      dataKey="count"
                      nameKey="version"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry: any) => `${entry.version} (${entry.percentage.toFixed(1)}%)`}
                    >
                      {adoption.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any, name: any, props: any) => [
                        `${value} (${props?.payload?.percentage?.toFixed(1) || 0}%)`,
                        'Municipalidades'
                      ]}
                      contentStyle={{ fontSize: 11 }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: 11 }} 
                      verticalAlign="top"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Status Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Municipalidades</CardTitle>
              <CardDescription>Clasificación por estado de versión</CardDescription>
            </CardHeader>
            <CardContent>
              {statusData.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  No hay datos disponibles
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <XAxis 
                      dataKey="name" 
                      tickLine={false} 
                      tick={{ fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tickLine={false} 
                      tick={{ fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={{ fontSize: 11 }}
                      formatter={(value: any) => [value, 'Municipalidades']}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6">
          {/* Timeline Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Línea de Tiempo de Actualizaciones
              </CardTitle>
              <CardDescription>Últimos 90 días de actividad</CardDescription>
            </CardHeader>
            <CardContent>
              {timeline.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center text-gray-500">
                  No hay datos disponibles
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timeline}>
                    <XAxis 
                      dataKey="date" 
                      tickLine={false} 
                      tick={{ fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(date) => format(new Date(date), 'dd MMM', { locale: es })}
                    />
                    <YAxis 
                      tickLine={false} 
                      tick={{ fontSize: 10 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={{ fontSize: 11 }}
                      labelFormatter={(date) => format(new Date(date), "d 'de' MMM", { locale: es })}
                      formatter={(value: any) => [value, 'Actualizaciones']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke={COLORS[0]} 
                      strokeWidth={2}
                      dot={{ fill: COLORS[0], r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Update Frequency Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frecuencia de Actualización</CardTitle>
            <CardDescription>
              Municipalidades con más actualizaciones registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {updateFrequency.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No hay datos de frecuencia disponibles
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Municipalidad
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Actualizaciones
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Promedio Días
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Última Actualización
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {updateFrequency.slice(0, 10).map((item) => (
                      <tr key={item.municipalityId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.municipalityName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.totalUpdates}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.averageDaysBetweenUpdates !== null 
                            ? `${item.averageDaysBetweenUpdates.toFixed(1)} días`
                            : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {item.lastUpdateDate 
                            ? format(new Date(item.lastUpdateDate), "d 'de' MMM yyyy", { locale: es })
                            : 'N/A'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}