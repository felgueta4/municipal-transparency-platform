
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Plus, 
  Users, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Package,
  BarChart3,
  Flag
} from 'lucide-react'

interface Tenant {
  id: string
  slug: string
  name: string
  status: string
  plan: string
  region: string
  comuna: string
  contactEmail: string
  demoDataEnabled: boolean
  createdAt: string
  _count: {
    users: number
    projects: number
    budgets: number
    expenditures: number
    contracts: number
  }
}

export default function SuperAdminDashboard() {
  const router = useRouter()
  const { user, token, isLoading: authLoading } = useAuth()
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!user || !token) {
      router.push('/superadmin/login?callbackUrl=/superadmin')
      return
    }

    // Check if user is super_admin
    if (user.role !== 'super_admin') {
      setError('Acceso denegado. Solo superadministradores pueden acceder a esta página.')
      setLoading(false)
      return
    }

    fetchTenants()
  }, [user, token, authLoading, router])

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/superadmin/tenants', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (res.status === 403) {
        setError('Acceso denegado. Solo superadministradores pueden acceder a esta página.')
        return
      }

      if (res.status === 401) {
        router.push('/superadmin/login?callbackUrl=/superadmin')
        return
      }

      if (!res.ok) {
        throw new Error('Error al cargar tenants')
      }

      const data = await res.json()
      setTenants(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tenants')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Activo', variant: 'default' as const, icon: CheckCircle },
      suspended: { label: 'Suspendido', variant: 'destructive' as const, icon: AlertCircle },
      provisioning: { label: 'Provisionando', variant: 'secondary' as const, icon: Clock },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getPlanBadge = (plan: string) => {
    const colors = {
      base: 'bg-gray-100 text-gray-800',
      pro: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800',
    }

    return (
      <Badge className={colors[plan as keyof typeof colors] || colors.base}>
        {plan.toUpperCase()}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
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
            <Button onClick={() => router.push('/superadmin/login')}>
              Volver al Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === 'active').length,
    suspended: tenants.filter(t => t.status === 'suspended').length,
    totalUsers: tenants.reduce((sum, t) => sum + t._count.users, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                Portal de Superadministración
              </h1>
              <p className="text-gray-600 mt-1">
                Gestión centralizada de tenants - Lumen Multi-Tenant
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/superadmin/analytics">
                <Button size="lg" variant="outline" className="gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </Button>
              </Link>
              <Link href="/superadmin/feature-flags">
                <Button size="lg" variant="outline" className="gap-2">
                  <Flag className="h-5 w-5" />
                  Feature Flags
                </Button>
              </Link>
              <Link href="/superadmin/versions">
                <Button size="lg" variant="outline" className="gap-2">
                  <Package className="h-5 w-5" />
                  Versiones
                </Button>
              </Link>
              <Link href="/superadmin/tenants/new">
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Crear Tenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Tenants</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Activos</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.active}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Suspendidos</CardDescription>
              <CardTitle className="text-3xl text-red-600">{stats.suspended}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Usuarios</CardDescription>
              <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tenants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Municipalidades</CardTitle>
            <CardDescription>
              Lista de todos los tenants registrados en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tenants.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No hay tenants registrados
                </h3>
                <p className="text-gray-500 mb-4">
                  Comienza creando tu primer tenant
                </p>
                <Link href="/superadmin/tenants/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Tenant
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Municipalidad
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subdominio
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuarios
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Datos
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{tenant.name}</div>
                            <div className="text-sm text-gray-500">
                              {tenant.comuna}, {tenant.region}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {tenant.slug}.transparenciaciudadana.com
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          {getStatusBadge(tenant.status)}
                        </td>
                        <td className="px-4 py-4">
                          {getPlanBadge(tenant.plan)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 text-gray-700">
                            <Users className="h-4 w-4" />
                            <span>{tenant._count.users}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-700">
                            <div>Proyectos: {tenant._count.projects}</div>
                            <div>Presupuestos: {tenant._count.budgets}</div>
                            {tenant.demoDataEnabled && (
                              <Badge variant="secondary" className="mt-1">Demo</Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <Link href={`/superadmin/tenants/${tenant.id}`}>
                              <Button size="sm" variant="outline">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </Link>
                            <a 
                              href={`https://${tenant.slug}.transparenciaciudadana.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline">
                                <Activity className="h-4 w-4" />
                              </Button>
                            </a>
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
