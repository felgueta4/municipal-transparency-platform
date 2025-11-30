'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { analyticsApi } from '@/lib/api'
import { VersionComparisonItem } from '@/lib/types'
import { ArrowLeft, Loader2, AlertCircle, Package } from 'lucide-react'
import Link from 'next/link'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts'

const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#80D8C3', '#A19AD3', '#72BF78', '#FFD966']

export default function VersionAnalyticsDetailPage() {
  const router = useRouter()
  const { user, token, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [comparison, setComparison] = useState<VersionComparisonItem[]>([])

  useEffect(() => {
    if (authLoading) return

    if (!user || !token) {
      router.push('/superadmin/login?callbackUrl=/superadmin/analytics/versions')
      return
    }

    if (user.role !== 'super_admin') {
      setError('Acceso denegado. Solo superadministradores pueden acceder a esta página.')
      setLoading(false)
      return
    }

    fetchVersionComparison()
  }, [user, token, authLoading, router])

  const fetchVersionComparison = async () => {
    setLoading(true)
    try {
      const data = await analyticsApi.getVersionComparison(token)
      setComparison(data || [])
    } catch (err) {
      console.error('Error fetching version comparison:', err)
      toast({
        title: 'Error',
        description: 'No se pudo cargar la comparación de versiones',
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
          <p className="text-gray-600">Cargando datos...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="h-8 w-8 text-blue-600" />
                Comparación de Versiones
              </h1>
              <p className="text-gray-600 mt-1">
                Análisis detallado de adopción por versión
              </p>
            </div>
            <Link href="/superadmin/analytics">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tasa de Adopción por Versión</CardTitle>
            <CardDescription>
              Porcentaje de municipalidades usando cada versión
            </CardDescription>
          </CardHeader>
          <CardContent>
            {comparison.length === 0 ? (
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                No hay datos disponibles
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparison} layout="vertical">
                  <XAxis type="number" tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis 
                    type="category" 
                    dataKey="version" 
                    tickLine={false} 
                    tick={{ fontSize: 10 }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ fontSize: 11 }}
                    formatter={(value: any, name: any) => [
                      name === 'adoptionRate' ? `${value.toFixed(1)}%` : value,
                      name === 'adoptionRate' ? 'Tasa de Adopción' : 'Municipalidades'
                    ]}
                  />
                  <Bar dataKey="adoptionRate" radius={[0, 8, 8, 0]}>
                    {comparison.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles de Versiones</CardTitle>
            <CardDescription>
              Información completa de adopción por versión
            </CardDescription>
          </CardHeader>
          <CardContent>
            {comparison.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No hay datos disponibles
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Versión
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Municipalidades
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Tasa de Adopción
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Barra de Progreso
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparison.map((item, index) => (
                      <tr key={item.version} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {item.version}
                          </code>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {item.municipalities}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {item.adoptionRate.toFixed(1)}%
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${item.adoptionRate}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
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