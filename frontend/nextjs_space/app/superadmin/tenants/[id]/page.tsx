
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Building2, 
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Database,
  Settings
} from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface TenantDetails {
  id: string
  slug: string
  name: string
  status: string
  plan: string
  region: string
  comuna: string
  contactEmail: string
  contactPhone?: string
  defaultMapComuna: string
  demoDataEnabled: boolean
  maxUsers: number
  maxStorageGB: number
  createdAt: string
  suspendedAt?: string
  suspensionReason?: string
  _count: {
    users: number
    projects: number
    budgets: number
    expenditures: number
    contracts: number
    mapProjects: number
    chatbotInteractions: number
  }
}

export default function TenantDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [tenant, setTenant] = useState<TenantDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)
  const [showReactivateDialog, setShowReactivateDialog] = useState(false)
  const [showProvisionDialog, setShowProvisionDialog] = useState(false)
  const [suspensionReason, setSuspensionReason] = useState('')

  useEffect(() => {
    fetchTenant()
  }, [params.id])

  const fetchTenant = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('No autorizado. Por favor inicie sesión.')
        setLoading(false)
        return
      }

      const res = await fetch(`/api/superadmin/tenants/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Error al cargar tenant')
      }

      const data = await res.json()
      setTenant(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tenant')
    } finally {
      setLoading(false)
    }
  }

  const handleSuspend = async () => {
    setActionLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        toast.error('No autorizado. Por favor inicie sesión.')
        return
      }

      const res = await fetch(`/api/superadmin/tenants/${params.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'suspend',
          reason: suspensionReason || 'No especificado',
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Error al suspender tenant')
      }

      toast.success('Tenant suspendido', {
        description: `${tenant?.name} ha sido suspendido`,
      })
      
      fetchTenant()
      setShowSuspendDialog(false)
      setSuspensionReason('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al suspender tenant')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReactivate = async () => {
    setActionLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        toast.error('No autorizado. Por favor inicie sesión.')
        return
      }

      const res = await fetch(`/api/superadmin/tenants/${params.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'reactivate' }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Error al reactivar tenant')
      }

      toast.success('Tenant reactivado', {
        description: `${tenant?.name} ha sido reactivado`,
      })
      
      fetchTenant()
      setShowReactivateDialog(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al reactivar tenant')
    } finally {
      setActionLoading(false)
    }
  }

  const handleProvision = async () => {
    setActionLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        toast.error('No autorizado. Por favor inicie sesión.')
        return
      }

      const res = await fetch(`/api/superadmin/tenants/${params.id}/provision`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Error al provisionar datos')
      }

      toast.success('Datos provisionados', {
        description: 'Los datos de demostración han sido creados',
      })
      
      fetchTenant()
      setShowProvisionDialog(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al provisionar datos')
    } finally {
      setActionLoading(false)
    }
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

  if (error || !tenant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error || 'Tenant no encontrado'}</p>
            <Button onClick={() => router.push('/superadmin')}>
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/superadmin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                {tenant.name}
              </h1>
              <p className="text-gray-600 mt-1">
                <code>{tenant.slug}.transparenciaciudadana.com</code>
              </p>
            </div>
            <div className="flex gap-2">
              {tenant.status === 'active' ? (
                <Button
                  variant="destructive"
                  onClick={() => setShowSuspendDialog(true)}
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Suspender
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={() => setShowReactivateDialog(true)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Reactivar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Estado</Label>
                    <div className="mt-1">
                      {tenant.status === 'active' ? (
                        <Badge className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Suspendido
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Plan</Label>
                    <p className="mt-1 font-medium">{tenant.plan.toUpperCase()}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Región</Label>
                    <p className="mt-1">{tenant.region}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Comuna</Label>
                    <p className="mt-1">{tenant.comuna}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Email de Contacto</Label>
                    <p className="mt-1 text-sm">{tenant.contactEmail}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Teléfono</Label>
                    <p className="mt-1">{tenant.contactPhone || 'No especificado'}</p>
                  </div>
                </div>

                {tenant.status === 'suspended' && tenant.suspensionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-900 mb-1">
                      Razón de Suspensión:
                    </p>
                    <p className="text-sm text-red-700">{tenant.suspensionReason}</p>
                    <p className="text-xs text-red-600 mt-2">
                      Suspendido el: {new Date(tenant.suspendedAt!).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{tenant._count.users}</p>
                    <p className="text-sm text-gray-600">Usuarios</p>
                    <p className="text-xs text-gray-500">
                      Límite: {tenant.maxUsers}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{tenant._count.projects}</p>
                    <p className="text-sm text-gray-600">Proyectos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">{tenant._count.chatbotInteractions}</p>
                    <p className="text-sm text-gray-600">Interacciones Bot</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-semibold">{tenant._count.budgets}</p>
                    <p className="text-xs text-gray-600">Presupuestos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">{tenant._count.expenditures}</p>
                    <p className="text-xs text-gray-600">Gastos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">{tenant._count.contracts}</p>
                    <p className="text-xs text-gray-600">Contratos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración del Mapa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-500">Comuna por Defecto</Label>
                  <p className="mt-1 font-medium">{tenant.defaultMapComuna}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Proyectos en el Mapa</Label>
                  <p className="mt-1">{tenant._count.mapProjects} proyectos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acciones y Configuración */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => window.open(`https://${tenant.slug}.transparenciaciudadana.com`, '_blank')}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Ver Portal Público
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => window.open(`https://${tenant.slug}.transparenciaciudadana.com/admin`, '_blank')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Ver Portal Admin
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setShowProvisionDialog(true)}
                  disabled={tenant.demoDataEnabled}
                >
                  <Database className="h-4 w-4 mr-2" />
                  {tenant.demoDataEnabled ? 'Datos Demo Activos' : 'Provisionar Datos Demo'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Límites del Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Usuarios</span>
                    <span className="font-medium">
                      {tenant._count.users} / {tenant.maxUsers}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((tenant._count.users / tenant.maxUsers) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Almacenamiento</span>
                    <span className="font-medium">
                      0 GB / {tenant.maxStorageGB} GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '5%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID del Tenant</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {tenant.id.substring(0, 8)}...
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Creado</span>
                  <span>{new Date(tenant.createdAt).toLocaleDateString('es-CL')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Datos Demo</span>
                  <Badge variant={tenant.demoDataEnabled ? 'default' : 'secondary'}>
                    {tenant.demoDataEnabled ? 'Sí' : 'No'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Diálogos de Confirmación */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Suspender Tenant?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción suspenderá el acceso a <strong>{tenant.name}</strong>. 
              Los datos no se eliminarán y el tenant puede ser reactivado después.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Label htmlFor="reason">Razón de la suspensión (opcional)</Label>
            <Input
              id="reason"
              placeholder="Ej: Falta de pago, mantenimiento, etc."
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSuspend}
              disabled={actionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {actionLoading ? 'Suspendiendo...' : 'Suspender'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReactivateDialog} onOpenChange={setShowReactivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Reactivar Tenant?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción reactivará el acceso a <strong>{tenant.name}</strong>.
              El tenant volverá a estar disponible inmediatamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReactivate}
              disabled={actionLoading}
            >
              {actionLoading ? 'Reactivando...' : 'Reactivar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showProvisionDialog} onOpenChange={setShowProvisionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Provisionar Datos de Demostración?</AlertDialogTitle>
            <AlertDialogDescription>
              Se crearán datos de ejemplo (proyectos, presupuestos, gastos, contratos) 
              para <strong>{tenant.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProvision}
              disabled={actionLoading}
            >
              {actionLoading ? 'Provisionando...' : 'Provisionar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
