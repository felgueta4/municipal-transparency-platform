
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, Users, DollarSign, Calendar, Eye, EyeOff, Building } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { contractApi } from '@/lib/api'
import { formatCLP, formatDate, formatDateForInput } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Contract {
  id: string
  contractNumber: string
  supplier: string
  amount: number
  description: string
  startDate: string
  endDate?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { token } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    contractNumber: '',
    supplier: '',
    amount: 0,
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    isPublic: true
  })

  useEffect(() => {
    loadContracts()
  }, [token])

  const loadContracts = async () => {
    try {
      setIsLoading(true)
      const data = await contractApi.getAll(token)
      setContracts(data || [])
    } catch (error) {
      console.error('Error loading contracts:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los contratos",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      const submitData = {
        ...formData,
        endDate: formData.endDate || undefined
      }
      
      await contractApi.create(submitData, token)
      
      toast({
        title: "Éxito",
        description: "Contrato creado correctamente"
      })
      
      setIsCreateDialogOpen(false)
      setFormData({
        contractNumber: '',
        supplier: '',
        amount: 0,
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        isPublic: true
      })
      loadContracts()
    } catch (error) {
      console.error('Error creating contract:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el contrato",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || !selectedContract) return

    try {
      setIsSubmitting(true)
      const submitData = {
        ...formData,
        endDate: formData.endDate || undefined
      }
      
      await contractApi.update(selectedContract.id, submitData, token)
      
      toast({
        title: "Éxito",
        description: "Contrato actualizado correctamente"
      })
      
      setIsEditDialogOpen(false)
      setSelectedContract(null)
      loadContracts()
    } catch (error) {
      console.error('Error updating contract:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el contrato",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (contractId: string) => {
    try {
      await contractApi.delete(contractId, token)
      
      toast({
        title: "Éxito",
        description: "Contrato eliminado correctamente"
      })
      
      loadContracts()
    } catch (error) {
      console.error('Error deleting contract:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el contrato",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (contract: Contract) => {
    setSelectedContract(contract)
    setFormData({
      contractNumber: contract.contractNumber,
      supplier: contract.supplier,
      amount: contract.amount,
      description: contract.description,
      startDate: formatDateForInput(contract.startDate),
      endDate: contract.endDate ? formatDateForInput(contract.endDate) : '',
      isPublic: contract.isPublic
    })
    setIsEditDialogOpen(true)
  }

  const ContractForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void, submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contractNumber">Número de Contrato</Label>
          <Input
            id="contractNumber"
            value={formData.contractNumber}
            onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
            placeholder="CTR-2024-001"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="amount">Monto (CLP)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="supplier">Proveedor/Empresa</Label>
        <Input
          id="supplier"
          value={formData.supplier}
          onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
          placeholder="Nombre del proveedor o empresa"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción del contrato y servicios..."
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Fecha de Inicio</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="endDate">Fecha de Fin (Opcional)</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublic"
          checked={formData.isPublic}
          onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
        />
        <Label htmlFor="isPublic">Visible al público</Label>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : submitLabel}
        </Button>
      </div>
    </form>
  )

  const totalAmount = contracts.reduce((sum, contract) => sum + (contract?.amount || 0), 0)
  const publicContracts = contracts.filter(contract => contract?.isPublic)
  const activeContracts = contracts.filter(contract => {
    if (!contract.endDate) return true
    return new Date(contract.endDate) > new Date()
  })
  const uniqueSuppliers = new Set(contracts.map(contract => contract?.supplier)).size

  return (
    <AdminLayout title="Gestión de Contratos">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contratos</p>
                  <p className="text-2xl font-bold text-blue-600">{contracts.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contratos Activos</p>
                  <p className="text-2xl font-bold text-green-600">{activeContracts.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCLP(totalAmount)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proveedores</p>
                  <p className="text-2xl font-bold text-orange-600">{uniqueSuppliers}</p>
                </div>
                <Building className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lista de Contratos</h2>
            <p className="text-sm text-gray-600">Gestiona todos los contratos municipales</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Contrato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Contrato</DialogTitle>
                <DialogDescription>
                  Registra un nuevo contrato municipal
                </DialogDescription>
              </DialogHeader>
              <ContractForm onSubmit={handleCreate} submitLabel="Crear Contrato" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Contracts List */}
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
          ) : contracts.length > 0 ? (
            contracts.map((contract) => {
              const isActive = !contract.endDate || new Date(contract.endDate) > new Date()
              
              return (
                <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {contract.contractNumber}
                          </h3>
                          <Badge variant={contract.isPublic ? "default" : "secondary"} className="flex items-center gap-1">
                            {contract.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            {contract.isPublic ? 'Público' : 'Privado'}
                          </Badge>
                          <Badge variant={isActive ? "default" : "secondary"}>
                            {isActive ? 'Activo' : 'Finalizado'}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">Proveedor: </span>
                          <span className="text-sm font-medium text-gray-700">{contract.supplier}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{contract.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {formatCLP(contract.amount)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Inicio: {formatDate(contract.startDate)}
                          </span>
                          {contract.endDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Fin: {formatDate(contract.endDate)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(contract)}
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
                              <AlertDialogTitle>¿Eliminar contrato?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. El contrato será eliminado permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(contract.id)}
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
              )
            })
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay contratos registrados
                </h3>
                <p className="text-gray-600 mb-4">
                  Comienza registrando el primer contrato municipal
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Contrato
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
              <DialogTitle>Editar Contrato</DialogTitle>
              <DialogDescription>
                Actualiza la información del contrato
              </DialogDescription>
            </DialogHeader>
            <ContractForm onSubmit={handleEdit} submitLabel="Actualizar Contrato" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
