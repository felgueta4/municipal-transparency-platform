'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { featureFlagApi } from '@/lib/api'
import { MunicipalityFeatureResponse } from '@/lib/types'
import { 
  Flag, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Save,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Link from 'next/link'

interface FeatureState {
  key: string
  name: string
  description: string | null
  enabled: boolean
  source: 'override' | 'default'
  modified: boolean
}

export default function MunicipalityFeaturesPage() {
  const params = useParams()
  const router = useRouter()
  const municipalityId = params?.id as string
  const { user, token, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [municipalityName, setMunicipalityName] = useState('')
  const [features, setFeatures] = useState<FeatureState[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (authLoading) return

    if (!user || !token) {
      router.push('/superadmin/login')
      return
    }

    if (user.role !== 'super_admin' && user.role !== 'admin_muni') {
      setError('Acceso denegado.')
      setLoading(false)
      return
    }

    // If admin_muni, check if accessing own municipality
    if (user.role === 'admin_muni' && user.municipalityId !== municipalityId) {
      setError('No tienes permiso para acceder a las features de esta municipalidad.')
      setLoading(false)
      return
    }

    fetchMunicipalityFeatures()
  }, [user, token, authLoading, municipalityId, router])

  const fetchMunicipalityFeatures = async () => {
    setLoading(true)
    try {
      // Fetch municipality features
      const featuresData: MunicipalityFeatureResponse[] = await featureFlagApi.getMunicipalityFeatures(municipalityId, token)

      // Fetch municipality info from tenants API
      const municipalityResponse = await fetch(`/api/superadmin/tenants/${municipalityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (municipalityResponse.ok) {
        const municipalityData = await municipalityResponse.json()
        setMunicipalityName(municipalityData?.name || 'Municipalidad')
      }

      // Transform to FeatureState
      const featureStates: FeatureState[] = featuresData.map(f => ({
        key: f.featureFlagKey,
        name: f.featureFlagName,
        description: f.description,
        enabled: f.enabled,
        source: f.source,
        modified: false,
      }))

      setFeatures(featureStates)
      setHasChanges(false)
    } catch (err) {
      console.error('Error fetching municipality features:', err)
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las features de la municipalidad',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFeature = (key: string, enabled: boolean) => {
    setFeatures(prev => 
      prev.map(f => 
        f.key === key 
          ? { ...f, enabled, modified: true }
          : f
      )
    )
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Get modified features
      const modifiedFeatures = features.filter(f => f.modified)

      // Save each modified feature
      for (const feature of modifiedFeatures) {
        await featureFlagApi.updateMunicipalityFeatures(
          municipalityId,
          { featureFlagKey: feature.key, enabled: feature.enabled },
          token
        )
      }

      toast({
        title: 'Éxito',
        description: `${modifiedFeatures.length} feature${modifiedFeatures.length !== 1 ? 's' : ''} actualizada${modifiedFeatures.length !== 1 ? 's' : ''}`,
      })

      // Refresh data
      await fetchMunicipalityFeatures()
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudieron guardar los cambios',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEnableAll = () => {
    setFeatures(prev => prev.map(f => ({ ...f, enabled: true, modified: true })))
    setHasChanges(true)
  }

  const handleDisableAll = () => {
    setFeatures(prev => prev.map(f => ({ ...f, enabled: false, modified: true })))
    setHasChanges(true)
  }

  const handleResetDefaults = () => {
    setFeatures(prev => prev.map(f => ({ 
      ...f, 
      enabled: f.source === 'default' ? f.enabled : f.enabled, 
      modified: false 
    })))
    setHasChanges(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando features...</p>
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

  const enabledCount = features.filter(f => f.enabled).length
  const disabledCount = features.filter(f => !f.enabled).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Flag className="h-8 w-8 text-blue-600" />
                Feature Flags - {municipalityName}
              </h1>
              <p className="text-gray-600 mt-1">
                Configura las funcionalidades habilitadas para esta municipalidad
              </p>
            </div>
            <Link href="/superadmin">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Features</CardDescription>
              <CardTitle className="text-3xl">{features.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Habilitadas
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">{enabledCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-gray-600" />
                Deshabilitadas
              </CardDescription>
              <CardTitle className="text-3xl text-gray-600">{disabledCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Bulk Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Habilitar o deshabilitar múltiples features a la vez</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEnableAll}>
                  Habilitar Todas
                </Button>
                <Button variant="outline" size="sm" onClick={handleDisableAll}>
                  Deshabilitar Todas
                </Button>
                <Button variant="outline" size="sm" onClick={handleResetDefaults} disabled={!hasChanges}>
                  Cancelar Cambios
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave} 
                  disabled={!hasChanges || saving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Features List */}
        <Card>
          <CardHeader>
            <CardTitle>Features Disponibles</CardTitle>
            <CardDescription>
              {features.length} feature{features.length !== 1 ? 's' : ''} disponible{features.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {features.length === 0 ? (
              <div className="text-center py-12">
                <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No hay features disponibles
                </h3>
                <p className="text-gray-500">
                  Crea feature flags en la sección de administración
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {features.map((feature) => (
                  <div 
                    key={feature.key} 
                    className={`border rounded-lg p-4 ${
                      feature.modified ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor={feature.key} className="text-base font-medium cursor-pointer">
                            {feature.name}
                          </Label>
                          <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {feature.key}
                          </code>
                          {feature.source === 'default' ? (
                            <Badge variant="outline" className="text-xs">
                              Valor por Defecto
                            </Badge>
                          ) : (
                            <Badge className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-100">
                              Personalizado
                            </Badge>
                          )}
                          {feature.modified && (
                            <Badge className="text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              Modificado
                            </Badge>
                          )}
                        </div>
                        {feature.description && (
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        )}
                      </div>
                      <Switch
                        id={feature.key}
                        checked={feature.enabled}
                        onCheckedChange={(checked) => handleToggleFeature(feature.key, checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}