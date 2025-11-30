
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, Settings, Link, Play, Pause, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { apiConnectorApi } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface ApiConnector {
  id: string
  name: string
  description: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers: Record<string, string>
  isActive: boolean
  lastSync?: string
  createdAt: string
  updatedAt: string
}

export default function AdminApiConnectorsPage() {
  const [connectors, setConnectors] = useState<ApiConnector[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedConnector, setSelectedConnector] = useState<ApiConnector | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testingConnector, setTestingConnector] = useState<string | null>(null)
  
  const { token } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endpoint: '',
    method: 'GET' as 'GET' | 'POST' | 'PUT' | 'DELETE',
    headers: '{}',
    isActive: true
  })

  const methods = ['GET', 'POST', 'PUT', 'DELETE']

  useEffect(() => {
    loadConnectors()
  }, [token])

  const loadConnectors = async () => {
    try {
      setIsLoading(true)
      const data = await apiConnectorApi.getAll(token)
      setConnectors(data || [])
    } catch (error) {
      console.error('Error loading connectors:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los conectores API",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateHeaders = (headersString: string): boolean => {
    try {
      JSON.parse(headersString)
      return true
    } catch {
      return false
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!validateHeaders(formData.headers)) {
      toast({
        title: "Error",
        description: "Los headers deben ser un JSON válido",
        variant: "destructive"
      })
      return
    }

    try {
      setIsSubmitting(true)
      const submitData = {
        ...formData,
        headers: JSON.parse(formData.headers)
      }
      
      await apiConnectorApi.create(submitData, token)
      
      toast({
        title: "Éxito",
        description: "Conector API creado correctamente"
      })
      
      setIsCreateDialogOpen(false)
      setFormData({
        name: '',
        description: '',
        endpoint: '',
        method: 'GET',
        headers: '{}',
        isActive: true
      })
      loadConnectors()
    } catch (error) {
      console.error('Error creating connector:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el conector API",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || !selectedConnector) return

    if (!validateHeaders(formData.headers)) {
      toast({
        title: "Error",
        description: "Los headers deben ser un JSON válido",
        variant: "destructive"
      })
      return
    }

    try {
      setIsSubmitting(true)
      const submitData = {
        ...formData,
        headers: JSON.parse(formData.headers)
      }
      
      await apiConnectorApi.update(selectedConnector.id, submitData, token)
      
      toast({
        title: "Éxito",
        description: "Conector API actualizado correctamente"
      })
      
      setIsEditDialogOpen(false)
      setSelectedConnector(null)
      loadConnectors()
    } catch (error) {
      console.error('Error updating connector:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el conector API",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (connectorId: string) => {
    try {
      await apiConnectorApi.delete(connectorId, token)
      
      toast({
        title: "Éxito",
        description: "Conector API eliminado correctamente"
      })
      
      loadConnectors()
    } catch (error) {
      console.error('Error deleting connector:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el conector API",
        variant: "destructive"
      })
    }
  }

  const handleTestConnection = async (connector: ApiConnector) => {
    try {
      setTestingConnector(connector.id)
      
      // Simulate API test
      const response = await fetch(connector.endpoint, {
        method: connector.method,
        headers: {
          'Content-Type': 'application/json',
          ...connector.headers
        }
      })
      
      if (response.ok) {
        toast({
          title: "Conexión exitosa",
          description: `El conector ${connector.name} responde correctamente`
        })
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error('Connection test failed:', error)
      toast({
        title: "Error de conexión",
        description: `No se pudo conectar a ${connector.name}`,
        variant: "destructive"
      })
    } finally {
      setTestingConnector(null)
    }
  }

  const openEditDialog = (connector: ApiConnector) => {
    setSelectedConnector(connector)
    setFormData({
      name: connector.name,
      description: connector.description,
      endpoint: connector.endpoint,
      method: connector.method,
      headers: JSON.stringify(connector.headers, null, 2),
      isActive: connector.isActive
    })
    setIsEditDialogOpen(true)
  }

  const ConnectorForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void, submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del Conector</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="API Externa - Datos Financieros"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción de la API y su propósito..."
          rows={2}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Label htmlFor="endpoint">URL del Endpoint</Label>
          <Input
            id="endpoint"
            value={formData.endpoint}
            onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
            placeholder="https://api.ejemplo.com/datos"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="method">Método HTTP</Label>
          <Select value={formData.method} onValueChange={(value: any) => setFormData({ ...formData, method: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Método" />
            </SelectTrigger>
            <SelectContent>
              {methods.map(method => (
                <SelectItem key={method} value={method}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="headers">Headers (JSON)</Label>
        <Textarea
          id="headers"
          value={formData.headers}
          onChange={(e) => setFormData({ ...formData, headers: e.target.value })}
          placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
          rows={4}
          className="font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Formato JSON válido para headers HTTP
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label htmlFor="isActive">Conector activo</Label>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : submitLabel}
        </Button>
      </div>
    </form>
  )

  const activeConnectors = connectors.filter(connector => connector?.isActive)

  return (
    <AdminLayout title="Conectores API">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Conectores</p>
                  <p className="text-2xl font-bold text-blue-600">{connectors.length}</p>
                </div>
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conectores Activos</p>
                  <p className="text-2xl font-bold text-green-600">{activeConnectors.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">APIs Externas</p>
                  <p className="text-2xl font-bold text-purple-600">{connectors.length}</p>
                </div>
                <Link className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lista de Conectores API</h2>
            <p className="text-sm text-gray-600">Gestiona las conexiones a APIs externas</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Conector
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Conector API</DialogTitle>
                <DialogDescription>
                  Configura una nueva conexión a una API externa
                </DialogDescription>
              </DialogHeader>
              <ConnectorForm onSubmit={handleCreate} submitLabel="Crear Conector" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Connectors List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : connectors.length > 0 ? (
            connectors.map((connector) => (
              <Card key={connector.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {connector.name}
                        </h3>
                        <Badge variant={connector.isActive ? "default" : "secondary"}>
                          {connector.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                        <Badge variant="outline">
                          {connector.method}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{connector.description}</p>
                      <p className="text-sm text-blue-600 mb-3 font-mono">
                        {connector.endpoint}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Creado: {formatDate(connector.createdAt)}</span>
                        {connector.lastSync && (
                          <span>Última sincronización: {formatDate(connector.lastSync)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestConnection(connector)}
                        disabled={testingConnector === connector.id}
                      >
                        {testingConnector === connector.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(connector)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar conector API?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El conector será eliminado permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(connector.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay conectores API configurados
                </h3>
                <p className="text-gray-600 mb-4">
                  Configura tu primera conexión a una API externa
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Conector
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Editar Conector API</DialogTitle>
              <DialogDescription>
                Actualiza la configuración del conector
              </DialogDescription>
            </DialogHeader>
            <ConnectorForm onSubmit={handleEdit} submitLabel="Actualizar Conector" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
