
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
import { Plus, Pencil, Trash2, TrendingUp, DollarSign, Calendar, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { budgetApi } from '@/lib/api'
import { formatCLP, formatDate, formatDateForInput } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Budget {
  id: string
  year: number
  totalAmount: number
  category: string
  description: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminBudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { token } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    totalAmount: 0,
    category: '',
    description: '',
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
    loadBudgets()
  }, [token])

  const loadBudgets = async () => {
    try {
      setIsLoading(true)
      const data = await budgetApi.getAll(token)
      setBudgets(data || [])
    } catch (error) {
      console.error('Error loading budgets:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los presupuestos",
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
      await budgetApi.create(formData, token)
      
      toast({
        title: "Éxito",
        description: "Presupuesto creado correctamente"
      })
      
      setIsCreateDialogOpen(false)
      setFormData({
        year: new Date().getFullYear(),
        totalAmount: 0,
        category: '',
        description: '',
        isPublic: true
      })
      loadBudgets()
    } catch (error) {
      console.error('Error creating budget:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el presupuesto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || !selectedBudget) return

    try {
      setIsSubmitting(true)
      await budgetApi.update(selectedBudget.id, formData, token)
      
      toast({
        title: "Éxito",
        description: "Presupuesto actualizado correctamente"
      })
      
      setIsEditDialogOpen(false)
      setSelectedBudget(null)
      loadBudgets()
    } catch (error) {
      console.error('Error updating budget:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el presupuesto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (budgetId: string) => {
    try {
      await budgetApi.delete(budgetId, token)
      
      toast({
        title: "Éxito",
        description: "Presupuesto eliminado correctamente"
      })
      
      loadBudgets()
    } catch (error) {
      console.error('Error deleting budget:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el presupuesto",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (budget: Budget) => {
    setSelectedBudget(budget)
    setFormData({
      year: budget.year,
      totalAmount: budget.totalAmount,
      category: budget.category,
      description: budget.description,
      isPublic: budget.isPublic
    })
    setIsEditDialogOpen(true)
  }

  const BudgetForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void, submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Año</Label>
          <Input
            id="year"
            type="number"
            min="2020"
            max="2030"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="totalAmount">Monto Total (CLP)</Label>
          <Input
            id="totalAmount"
            type="number"
            min="0"
            value={formData.totalAmount}
            onChange={(e) => setFormData({ ...formData, totalAmount: parseFloat(e.target.value) })}
            required
          />
        </div>
      </div>
      
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
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción del presupuesto..."
          rows={3}
        />
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

  const totalBudget = budgets.reduce((sum, budget) => sum + (budget?.totalAmount || 0), 0)
  const publicBudgets = budgets.filter(budget => budget?.isPublic)

  return (
    <AdminLayout title="Gestión de Presupuestos">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Presupuestos</p>
                  <p className="text-2xl font-bold text-blue-600">{budgets.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                  <p className="text-2xl font-bold text-green-600">{formatCLP(totalBudget)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Públicos</p>
                  <p className="text-2xl font-bold text-purple-600">{publicBudgets.length}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lista de Presupuestos</h2>
            <p className="text-sm text-gray-600">Gestiona todos los presupuestos municipales</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Presupuesto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Presupuesto</DialogTitle>
                <DialogDescription>
                  Completa la información del presupuesto municipal
                </DialogDescription>
              </DialogHeader>
              <BudgetForm onSubmit={handleCreate} submitLabel="Crear Presupuesto" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Budgets List */}
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
          ) : budgets.length > 0 ? (
            budgets.map((budget) => (
              <Card key={budget.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          Presupuesto {budget.year}
                        </h3>
                        <Badge variant={budget.isPublic ? "default" : "secondary"} className="flex items-center gap-1">
                          {budget.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {budget.isPublic ? 'Público' : 'Privado'}
                        </Badge>
                        <Badge variant="outline">
                          {budget.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{budget.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {formatCLP(budget.totalAmount)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Creado: {formatDate(budget.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(budget)}
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
                            <AlertDialogTitle>¿Eliminar presupuesto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El presupuesto será eliminado permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(budget.id)}
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
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay presupuestos registrados
                </h3>
                <p className="text-gray-600 mb-4">
                  Comienza creando el primer presupuesto municipal
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Presupuesto
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
              <DialogTitle>Editar Presupuesto</DialogTitle>
              <DialogDescription>
                Actualiza la información del presupuesto
              </DialogDescription>
            </DialogHeader>
            <BudgetForm onSubmit={handleEdit} submitLabel="Actualizar Presupuesto" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
