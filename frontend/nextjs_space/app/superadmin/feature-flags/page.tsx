'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { featureFlagApi } from '@/lib/api'
import { FeatureFlag } from '@/lib/types'
import { 
  Flag, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react'
import { FeatureFlagForm } from '@/components/feature-flag-form'
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
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function FeatureFlagsPage() {
  const router = useRouter()
  const { user, token, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([])
  const [formModal, setFormModal] = useState<{ open: boolean; featureFlag: FeatureFlag | null }>({
    open: false,
    featureFlag: null,
  })
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; featureFlag: FeatureFlag | null }>({
    open: false,
    featureFlag: null,
  })

  useEffect(() => {
    if (authLoading) return

    if (!user || !token) {
      router.push('/superadmin/login?callbackUrl=/superadmin/feature-flags')
      return
    }

    if (user.role !== 'super_admin') {
      setError('Acceso denegado. Solo superadministradores pueden acceder a esta página.')
      setLoading(false)
      return
    }

    fetchFeatureFlags()
  }, [user, token, authLoading, router])

  const fetchFeatureFlags = async () => {
    setLoading(true)
    try {
      const data = await featureFlagApi.getAll(token)
      setFeatureFlags(data || [])
    } catch (err) {
      console.error('Error fetching feature flags:', err)
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las feature flags',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteDialog.featureFlag) return

    try {
      await featureFlagApi.delete(deleteDialog.featureFlag.id, token)
      toast({
        title: 'Feature Flag Eliminada',
        description: `La feature flag "${deleteDialog.featureFlag.name}" ha sido eliminada`,
      })
      fetchFeatureFlags()
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudo eliminar la feature flag',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialog({ open: false, featureFlag: null })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando feature flags...</p>
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
                <Flag className="h-8 w-8 text-blue-600" />
                Gestión de Feature Flags
              </h1>
              <p className="text-gray-600 mt-1">
                Controla la habilitación de funcionalidades por municipalidad
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/superadmin')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button onClick={() => setFormModal({ open: true, featureFlag: null })}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Feature Flag
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Feature Flags Disponibles</CardTitle>
            <CardDescription>
              {featureFlags.length} feature flag{featureFlags.length !== 1 ? 's' : ''} registrada{featureFlags.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {featureFlags.length === 0 ? (
              <div className="text-center py-12">
                <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No hay feature flags
                </h3>
                <p className="text-gray-500 mb-4">
                  Crea tu primera feature flag para controlar funcionalidades
                </p>
                <Button onClick={() => setFormModal({ open: true, featureFlag: null })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primera Feature Flag
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Clave
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Descripción
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Por Defecto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Creado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {featureFlags.map((flag) => (
                      <tr key={flag.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {flag.key}
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">{flag.name}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-600 max-w-md truncate">
                            {flag.description || '-'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {flag.defaultEnabled ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Habilitado
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                              <XCircle className="h-3 w-3 mr-1" />
                              Deshabilitado
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">
                          {format(new Date(flag.createdAt), "d MMM yyyy", { locale: es })}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setFormModal({ open: true, featureFlag: flag })}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDeleteDialog({ open: true, featureFlag: flag })}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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

      {/* Form Modal */}
      <FeatureFlagForm
        open={formModal.open}
        onOpenChange={(open) => setFormModal({ open, featureFlag: null })}
        featureFlag={formModal.featureFlag}
        token={token}
        onSuccess={fetchFeatureFlags}
      />

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, featureFlag: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Feature Flag?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de eliminar la feature flag <strong>"{deleteDialog.featureFlag?.name}"</strong>
              {' '}(clave: <code>{deleteDialog.featureFlag?.key}</code>).
              <br /><br />
              Esta acción no se puede deshacer y se eliminarán todas las configuraciones asociadas
              a esta feature flag en las municipalidades.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}