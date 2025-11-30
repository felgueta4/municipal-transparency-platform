
'use client'

import { useParams } from 'next/navigation'

import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState, useEffect } from 'react'
import { 
  Globe, 
  RefreshCw, 
  Webhook, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Settings,
  Plus,
  Play,
  Pause,
  Trash2,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SyncStatus {
  id: string
  source: string
  type: string
  lastSync: string
  nextSync: string
  status: 'active' | 'paused' | 'error' | 'scheduled'
  recordsSynced: number
}

interface WebhookConfig {
  id: string
  event: string
  url: string
  active: boolean
}

export default function IntegrationsPage() {
  const { toast } = useToast()
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([])
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('sync')

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    setIsLoading(true)
    try {
      // Cargar estados de sincronización
      const syncRes = await fetch('/api/sync')
      const syncData = await syncRes.json()
      setSyncStatuses(syncData.syncStatus || [])

      // Cargar webhooks
      const webhookRes = await fetch('/api/webhooks')
      const webhookData = await webhookRes.json()
      setWebhooks(webhookData.webhooks || [])
    } catch (error) {
      console.error('Error loading integrations:', error)
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las integraciones',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSync = async (syncId: string) => {
    try {
      const sync = syncStatuses.find(s => s.id === syncId)
      if (!sync) return

      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: sync.source,
          type: sync.type
        })
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Sincronización exitosa',
          description: `Se sincronizaron ${data.result.recordsSynced} registros`,
        })
        loadIntegrations()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo completar la sincronización',
        variant: 'destructive'
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; text: string }> = {
      active: { variant: 'default', icon: CheckCircle2, text: 'Activo' },
      paused: { variant: 'secondary', icon: Pause, text: 'Pausado' },
      error: { variant: 'destructive', icon: XCircle, text: 'Error' },
      scheduled: { variant: 'outline', icon: Clock, text: 'Programado' }
    }

    const config = variants[status] || variants.scheduled
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Integraciones y Conectores</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona conexiones con sistemas externos y sincronización de datos
            </p>
          </div>
          <Button onClick={loadIntegrations} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="sync">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronización
            </TabsTrigger>
            <TabsTrigger value="webhooks">
              <Webhook className="h-4 w-4 mr-2" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="connectors">
              <Globe className="h-4 w-4 mr-2" />
              Conectores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estados de Sincronización</CardTitle>
                <CardDescription>
                  Monitorea y controla la sincronización automática de datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncStatuses.map((sync) => (
                    <div key={sync.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{sync.source}</h4>
                          {getStatusBadge(sync.status)}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Tipo: <span className="font-medium">{sync.type}</span></p>
                          <p>Última sincronización: {new Date(sync.lastSync).toLocaleString('es-CL')}</p>
                          <p>Próxima sincronización: {new Date(sync.nextSync).toLocaleString('es-CL')}</p>
                          <p>Registros sincronizados: <span className="font-medium">{sync.recordsSynced}</span></p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSync(sync.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Nueva Sincronización</CardTitle>
                <CardDescription>
                  Añade una nueva fuente de datos para sincronización automática
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sync-source">Fuente de Datos</Label>
                      <Input id="sync-source" placeholder="Ej: API Gobierno" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sync-type">Tipo de Datos</Label>
                      <Select>
                        <SelectTrigger id="sync-type">
                          <SelectValue placeholder="Selecciona..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budgets">Presupuestos</SelectItem>
                          <SelectItem value="expenditures">Gastos</SelectItem>
                          <SelectItem value="projects">Proyectos</SelectItem>
                          <SelectItem value="contracts">Contratos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sync-url">URL del Endpoint</Label>
                    <Input id="sync-url" placeholder="https://api.ejemplo.cl/datos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Frecuencia</Label>
                    <Select>
                      <SelectTrigger id="sync-frequency">
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diaria</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Sincronización
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks Configurados</CardTitle>
                <CardDescription>
                  Recibe notificaciones en tiempo real sobre eventos del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Webhook className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">{webhook.event}</h4>
                          <Badge variant={webhook.active ? 'default' : 'secondary'}>
                            {webhook.active ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{webhook.url}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {webhook.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crear Nuevo Webhook</CardTitle>
                <CardDescription>
                  Configura un webhook para recibir notificaciones de eventos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-event">Evento</Label>
                    <Select>
                      <SelectTrigger id="webhook-event">
                        <SelectValue placeholder="Selecciona un evento..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget.created">Presupuesto Creado</SelectItem>
                        <SelectItem value="budget.updated">Presupuesto Actualizado</SelectItem>
                        <SelectItem value="expenditure.created">Gasto Creado</SelectItem>
                        <SelectItem value="project.status_changed">Proyecto Cambió Estado</SelectItem>
                        <SelectItem value="contract.signed">Contrato Firmado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">URL de Destino</Label>
                    <Input id="webhook-url" placeholder="https://tu-servidor.com/webhook" />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connectors" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    API Gobierno de Chile
                  </CardTitle>
                  <CardDescription>
                    Integración con datos presupuestarios oficiales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estado</span>
                    <Badge variant="default">Conectado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Última sincronización</span>
                    <span className="text-sm text-muted-foreground">Hace 2 horas</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Sistema Contable Municipal
                  </CardTitle>
                  <CardDescription>
                    Sincronización con el sistema de contabilidad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estado</span>
                    <Badge variant="default">Conectado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Última sincronización</span>
                    <span className="text-sm text-muted-foreground">Hace 1 hora</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Portal de Proyectos
                  </CardTitle>
                  <CardDescription>
                    Integración con el sistema de gestión de proyectos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Estado</span>
                    <Badge variant="secondary">Desconectado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Última sincronización</span>
                    <span className="text-sm text-muted-foreground">Nunca</span>
                  </div>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Conectar
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Agregar Nuevo Conector</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conecta con APIs externas y sistemas municipales
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Conector
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-orange-800 space-y-2">
            <p>• Las sincronizaciones automáticas se ejecutan según la frecuencia configurada</p>
            <p>• Los webhooks requieren que el servidor de destino esté disponible</p>
            <p>• Verifica las credenciales de API antes de activar un conector</p>
            <p>• Los registros de sincronización se mantienen por 30 días</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
