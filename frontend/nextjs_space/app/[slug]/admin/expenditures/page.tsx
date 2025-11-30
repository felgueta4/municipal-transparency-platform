
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
import { Plus, Pencil, Trash2, FileText, DollarSign, Calendar, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { expenditureApi, budgetApi } from '@/lib/api'
import { formatCLP, formatDate, formatDateForInput } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Expenditure {
  id: string
  description: string
  amount: number
  date: string
  category: string
  budgetId?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface Budget {
  id: string
  year: number
  category: string
  description: string
}

export default function AdminExpendituresPage() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedExpenditure, setSelectedExpenditure] = useState<Expenditure | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { token } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: '',
    budgetId: '',
    isPublic: true
  })

  const categories = [
    'educacion',
    'salud',
    'infraestructura',
    'seguridad',
    'servicios',
    'cultura',
    'deportes',
    'medio_ambiente',
    'transporte',
    'desarrollo_social'
  ]

  useEffect(() => {
    loadData()
  }, [token])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [expendituresData, budgetsData] = await Promise.all([
        expenditureApi.getAll(token),
        budgetApi.getAll(token)
      ])
      setExpenditures(expendituresData || [])
      setBudgets(budgetsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
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
        budgetId: formData.budgetId || undefined
      }
      
      await expenditureApi.create(submitData, token)
      
      toast({
        title: "Éxito",
        description: "Gasto creado correctamente"
      })
      
      setIsCreateDialogOpen(false)
      setFormData({
        description: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        category: '',
        budgetId: '',
        isPublic: true
      })
      loadData()
    } catch (error) {
      console.error('Error creating expenditure:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el gasto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || !selectedExpenditure) return

    try {
      setIsSubmitting(true)
      const submitData = {
        ...formData,
        budgetId: formData.budgetId || undefined
      }
      
      await expenditureApi.update(selectedExpenditure.id, submitData, token)
      
      toast({
        title: "Éxito",
        description: "Gasto actualizado correctamente"
      })
      
      setIsEditDialogOpen(false)
      setSelectedExpenditure(null)
      loadData()
    } catch (error) {
      console.error('Error updating expenditure:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el gasto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (expenditureId: string) => {
    try {
      await expenditureApi.delete(expenditureId, token)
      
      toast({
        title: "Éxito",
        description: "Gasto eliminado correctamente"
      })
      
      loadData()
    } catch (error) {
      console.error('Error deleting expenditure:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el gasto",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (expenditure: Expenditure) => {
    setSelectedExpenditure(expenditure)
    setFormData({
      description: expenditure.description,
      amount: expenditure.amount,
      date: formatDateForInput(expenditure.date),
      category: expenditure.category,
      budgetId: expenditure.budgetId || '',
      isPublic: expenditure.isPublic
    })
    setIsEditDialogOpen(true)
  }

  const getBudgetInfo = (budgetId?: string) => {
    if (!budgetId) return null
    return budgets.find(budget => budget.id === budgetId)
  }

  const ExpenditureForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void, submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción del gasto..."
          required
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Monto (CLP)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.replace('_', ' ').charAt(0).toUpperCase() + category.replace('_', ' ').slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="budgetId">Presupuesto (Opcional)</Label>
          <Select value={formData.budgetId} onValueChange={(value) => setFormData({ ...formData, budgetId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un presupuesto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Sin presupuesto asociado</SelectItem>
              {budgets.map(budget => (
                <SelectItem key={budget.id} value={budget.id}>
                  {budget.year} - {budget.category} - {budget.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

  const totalExpended = expenditures.reduce((sum, expenditure) => sum + (expenditure?.amount || 0), 0)
  const publicExpenditures = expenditures.filter(expenditure => expenditure?.isPublic)

  return (
    <AdminLayout title="Gestión de Gastos">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Gastos</p>
                  <p className="text-2xl font-bold text-blue-600">{expenditures.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monto Total</p>
                  <p className="text-2xl font-bold text-red-600">{formatCLP(totalExpended)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Públicos</p>
                  <p className="text-2xl font-bold text-green-600">{publicExpenditures.length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lista de Gastos</h2>
            <p className="text-sm text-gray-600">Gestiona todos los gastos municipales</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Gasto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Gasto</DialogTitle>
                <DialogDescription>
                  Registra un nuevo gasto municipal
                </DialogDescription>
              </DialogHeader>
              <ExpenditureForm onSubmit={handleCreate} submitLabel="Crear Gasto" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Expenditures List */}
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
          ) : expenditures.length > 0 ? (
            expenditures.map((expenditure) => {
              const budgetInfo = getBudgetInfo(expenditure.budgetId)
              
              return (
                <Card key={expenditure.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {expenditure.description}
                          </h3>
                          <Badge variant={expenditure.isPublic ? "default" : "secondary"} className="flex items-center gap-1">
                            {expenditure.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            {expenditure.isPublic ? 'Público' : 'Privado'}
                          </Badge>
                          <Badge variant="outline">
                            {expenditure.category.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        {budgetInfo && (
                          <p className="text-sm text-blue-600 mb-2">
                            Presupuesto: {budgetInfo.year} - {budgetInfo.category}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {formatCLP(expenditure.amount)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(expenditure.date)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(expenditure)}
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
                              <AlertDialogTitle>¿Eliminar gasto?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. El gasto será eliminado permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(expenditure.id)}
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
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay gastos registrados
                </h3>
                <p className="text-gray-600 mb-4">
                  Comienza registrando el primer gasto municipal
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Gasto
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Gasto</DialogTitle>
              <DialogDescription>
                Actualiza la información del gasto
              </DialogDescription>
            </DialogHeader>
            <ExpenditureForm onSubmit={handleEdit} submitLabel="Actualizar Gasto" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
