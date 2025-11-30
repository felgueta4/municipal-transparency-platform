'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { versionApi } from '@/lib/api'
import { SoftwareVersion, MunicipalityWithVersion, SoftwareVersionStatus } from '@/lib/types'
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Building2,
  RefreshCw,
  History,
  Filter,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react'
import { VersionBadge, VersionStatusIndicator } from '@/components/version-badge'
import { CreateEditVersionModal } from '@/components/create-edit-version-modal'
import { UpdateMunicipalityVersionModal } from '@/components/update-municipality-version-modal'
import { VersionHistoryModal } from '@/components/version-history-modal'
import { RollbackVersionModal } from '@/components/rollback-version-modal'
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

export default function VersionsPage() {
  const router = useRouter()
  const { user, token, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  // State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [versions, setVersions] = useState<SoftwareVersion[]>([])
  const [municipalities, setMunicipalities] = useState<MunicipalityWithVersion[]>([])
  const [latestVersion, setLatestVersion] = useState<SoftwareVersion | null>(null)

  // Filters
  const [versionFilter, setVersionFilter] = useState<SoftwareVersionStatus | 'all'>('all')
  const [municipalityFilter, setMunicipalityFilter] = useState<'all' | 'updated' | 'outdated'>('all')

  // Modals
  const [createEditModal, setCreateEditModal] = useState<{ open: boolean; version: SoftwareVersion | null }>({
    open: false,
    version: null,
  })
  const [updateModal, setUpdateModal] = useState<{ open: boolean; municipalities: MunicipalityWithVersion[] }>({
    open: false,
    municipalities: [],
  })
  const [historyModal, setHistoryModal] = useState<{ open: boolean; municipalityId: string; municipalityName: string }>({
    open: false,
    municipalityId: '',
    municipalityName: '',
  })
  const [rollbackModal, setRollbackModal] = useState<{ open: boolean; municipality: MunicipalityWithVersion | null }>({
    open: false,
    municipality: null,
  })
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; version: SoftwareVersion | null }>({
    open: false,
    version: null,
  })

  // Selected municipalities for bulk update
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<Set<string>>(new Set())

  // Auth check
  useEffect(() => {
    if (authLoading) return

    if (!user || !token) {
      router.push('/superadmin/login?callbackUrl=/superadmin/versions')
      return
    }

    if (user.role !== 'super_admin') {
      setError('Acceso denegado. Solo superadministradores pueden acceder a esta página.')
      setLoading(false)
      return
    }

    fetchData()
  }, [user, token, authLoading, router])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [versionsData, tenantsData, latestData] = await Promise.all([
        versionApi.getAllVersions(token),
        fetch('/api/superadmin/tenants', {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => res.json()),
        versionApi.getLatestVersion(token).catch(() => null),
      ])

      setVersions(versionsData ?? [])
      setMunicipalities(tenantsData ?? [])
      setLatestVersion(latestData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVersion = async () => {
    if (!deleteDialog.version) return

    try {
      await versionApi.deleteVersion(deleteDialog.version.id, token)
      toast({
        title: 'Versión eliminada',
        description: `La versión ${deleteDialog.version.version} ha sido eliminada`,
      })
      fetchData()
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudo eliminar la versión',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialog({ open: false, version: null })
    }
  }

  const toggleMunicipalitySelection = (municipalityId: string) => {
    const newSelection = new Set(selectedMunicipalities)
    if (newSelection.has(municipalityId)) {
      newSelection.delete(municipalityId)
    } else {
      newSelection.add(municipalityId)
    }
    setSelectedMunicipalities(newSelection)
  }

  const handleBulkUpdate = () => {
    const selected = municipalities.filter(m => selectedMunicipalities.has(m.id))
    setUpdateModal({ open: true, municipalities: selected })
  }

  // Filtered data
  const filteredVersions = versions.filter(v => 
    versionFilter === 'all' || v.status === versionFilter
  )

  const filteredMunicipalities = municipalities.filter(m => {
    if (municipalityFilter === 'all') return true
    if (municipalityFilter === 'updated') {
      return m.softwareVersion === latestVersion?.version
    }
    if (municipalityFilter === 'outdated') {
      return m.softwareVersion !== latestVersion?.version
    }
    return true
  })

  // Loading/Error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
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
                Gestión de Versiones
              </h1>
              <p className="text-gray-600 mt-1">
                Administra las versiones del software y asignaciones a municipalidades
              </p>
            </div>
            <Button onClick={() => router.push('/superadmin')} variant="outline">
              Volver al Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="versions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="versions">Versiones del Sistema</TabsTrigger>
            <TabsTrigger value="municipalities">Versiones por Municipio</TabsTrigger>
          </TabsList>

          {/* Tab 1: System Versions */}
          <TabsContent value="versions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Versiones del Software</CardTitle>
                    <CardDescription>
                      Gestiona las versiones disponibles del sistema
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={versionFilter} onValueChange={(v: any) => setVersionFilter(v)}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="stable">Estable</SelectItem>
                        <SelectItem value="deprecated">Obsoleta</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => setCreateEditModal({ open: true, version: null })}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Versión
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredVersions.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No hay versiones registradas
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Crea tu primera versión del software
                    </p>
                    <Button onClick={() => setCreateEditModal({ open: true, version: null })}>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Primera Versión
                    </Button>
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
                            Nombre
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Estado
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Lanzamiento
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Municipios
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVersions.map((version) => (
                          <tr key={version.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {version.version}
                              </code>
                            </td>
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{version.name}</div>
                                {version.description && (
                                  <div className="text-sm text-gray-500 mt-1">
                                    {version.description}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <VersionBadge status={version.status} />
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              {format(new Date(version.releaseDate), 'd MMM yyyy', { locale: es })}
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm text-gray-700">
                                {version._count?.municipalities ?? 0}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setCreateEditModal({ open: true, version })}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setDeleteDialog({ open: true, version })}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
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
          </TabsContent>

          {/* Tab 2: Municipality Versions */}
          <TabsContent value="municipalities" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Versiones por Municipalidad</CardTitle>
                    <CardDescription>
                      Administra las versiones asignadas a cada municipalidad
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={municipalityFilter} onValueChange={(v: any) => setMunicipalityFilter(v)}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="updated">Al día</SelectItem>
                        <SelectItem value="outdated">Desactualizadas</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedMunicipalities.size > 0 && (
                      <Button onClick={handleBulkUpdate}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualizar Seleccionadas ({selectedMunicipalities.size})
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredMunicipalities.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No hay municipalidades
                    </h3>
                    <p className="text-gray-500">
                      No se encontraron municipalidades con los filtros seleccionados
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left">
                            <Checkbox
                              checked={selectedMunicipalities.size === filteredMunicipalities.length}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedMunicipalities(new Set(filteredMunicipalities.map(m => m.id)))
                                } else {
                                  setSelectedMunicipalities(new Set())
                                }
                              }}
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Municipalidad
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Versión Actual
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Estado
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Última Actualización
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredMunicipalities.map((municipality) => (
                          <tr key={municipality.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <Checkbox
                                checked={selectedMunicipalities.has(municipality.id)}
                                onCheckedChange={() => toggleMunicipalitySelection(municipality.id)}
                              />
                            </td>
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{municipality.name}</div>
                                <div className="text-sm text-gray-500">
                                  {municipality.comuna}, {municipality.region}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {municipality.softwareVersion ?? 'Sin versión'}
                              </code>
                            </td>
                            <td className="px-4 py-4">
                              <VersionStatusIndicator
                                currentVersion={municipality.softwareVersion}
                                latestVersion={latestVersion?.version ?? null}
                              />
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700">
                              {format(new Date(municipality.updatedAt), 'd MMM yyyy', { locale: es })}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setUpdateModal({ open: true, municipalities: [municipality] })}
                                  title="Actualizar versión"
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setRollbackModal({ open: true, municipality })}
                                  className="text-orange-600 hover:text-orange-700"
                                  title="Revertir versión"
                                >
                                  <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setHistoryModal({
                                      open: true,
                                      municipalityId: municipality.id,
                                      municipalityName: municipality.name,
                                    })
                                  }
                                  title="Ver historial"
                                >
                                  <History className="h-4 w-4" />
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CreateEditVersionModal
        open={createEditModal.open}
        onOpenChange={(open) => setCreateEditModal({ open, version: null })}
        version={createEditModal.version}
        token={token}
        onSuccess={fetchData}
      />

      <UpdateMunicipalityVersionModal
        open={updateModal.open}
        onOpenChange={(open) => {
          setUpdateModal({ open, municipalities: [] })
          setSelectedMunicipalities(new Set())
        }}
        municipalities={updateModal.municipalities}
        token={token}
        onSuccess={fetchData}
      />

      <VersionHistoryModal
        open={historyModal.open}
        onOpenChange={(open) => setHistoryModal({ ...historyModal, open })}
        municipalityId={historyModal.municipalityId}
        municipalityName={historyModal.municipalityName}
        token={token}
      />

      <RollbackVersionModal
        open={rollbackModal.open}
        onOpenChange={(open) => setRollbackModal({ open, municipality: null })}
        municipality={rollbackModal.municipality}
        token={token}
        onSuccess={fetchData}
      />

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, version: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar versión?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de eliminar la versión <strong>{deleteDialog.version?.version}</strong>.
              Esta acción no se puede deshacer.
              {deleteDialog.version?._count?.municipalities ? (
                <>
                  <br />
                  <br />
                  <strong className="text-red-600">
                    Advertencia: Esta versión está asignada a {deleteDialog.version._count.municipalities} municipalidad(es).
                  </strong>
                </>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVersion} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
