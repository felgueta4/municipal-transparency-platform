
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
import { Plus, Pencil, Trash2, Briefcase, DollarSign, Calendar, Eye, EyeOff, Clock } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { projectApi } from '@/lib/api'
import { formatCLP, formatDate, formatDateForInput, getStatusColor } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface Project {
  id: string
  name: string
  description: string
  budget: number
  status: string
  startDate: string
  endDate?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { token } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: 0,
    status: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    isPublic: true
  })

  const statuses = [
    'planificacion',
    'activo',
    'en_progreso',
    'pausado',
    'completado',
    'finalizado',
    'cancelado'
  ]

  useEffect(() => {
    loadProjects()
  }, [token])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await projectApi.getAll(token)
      setProjects(data || [])
    } catch (error) {
      console.error('Error loading projects:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los proyectos",
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
      
      await projectApi.create(submitData, token)
      
      toast({
        title: "Éxito",
        description: "Proyecto creado correctamente"
      })
      
      setIsCreateDialogOpen(false)
      setFormData({
        name: '',
        description: '',
        budget: 0,
        status: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        isPublic: true
      })
      loadProjects()
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el proyecto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || !selectedProject) return

    try {
      setIsSubmitting(true)
      const submitData = {
        ...formData,
        endDate: formData.endDate || undefined
      }
      
      await projectApi.update(selectedProject.id, submitData, token)
      
      toast({
        title: "Éxito",
        description: "Proyecto actualizado correctamente"
      })
      
      setIsEditDialogOpen(false)
      setSelectedProject(null)
      loadProjects()
    } catch (error) {
      console.error('Error updating project:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el proyecto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (projectId: string) => {
    try {
      await projectApi.delete(projectId, token)
      
      toast({
        title: "Éxito",
        description: "Proyecto eliminado correctamente"
      })
      
      loadProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el proyecto",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (project: Project) => {
    setSelectedProject(project)
    setFormData({
      name: project.name,
      description: project.description,
      budget: project.budget,
      status: project.status,
      startDate: formatDateForInput(project.startDate),
      endDate: project.endDate ? formatDateForInput(project.endDate) : '',
      isPublic: project.isPublic
    })
    setIsEditDialogOpen(true)
  }

  const ProjectForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void, submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del Proyecto</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nombre del proyecto..."
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción del proyecto..."
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget">Presupuesto (CLP)</Label>
          <Input
            id="budget"
            type="number"
            min="0"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="status">Estado</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estado" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

  const totalBudget = projects.reduce((sum, project) => sum + (project?.budget || 0), 0)
  const publicProjects = projects.filter(project => project?.isPublic)
  const activeProjects = projects.filter(project => 
    project?.status?.toLowerCase() === 'activo' || 
    project?.status?.toLowerCase() === 'en_progreso'
  )

  return (
    <AdminLayout title="Gestión de Proyectos">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                  <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-green-600">{activeProjects.length}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCLP(totalBudget)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Públicos</p>
                  <p className="text-2xl font-bold text-orange-600">{publicProjects.length}</p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lista de Proyectos</h2>
            <p className="text-sm text-gray-600">Gestiona todos los proyectos municipales</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
                <DialogDescription>
                  Registra un nuevo proyecto municipal
                </DialogDescription>
              </DialogHeader>
              <ProjectForm onSubmit={handleCreate} submitLabel="Crear Proyecto" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects List */}
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
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {project.name}
                        </h3>
                        <Badge variant={project.isPublic ? "default" : "secondary"} className="flex items-center gap-1">
                          {project.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {project.isPublic ? 'Público' : 'Privado'}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {formatCLP(project.budget)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Inicio: {formatDate(project.startDate)}
                        </span>
                        {project.endDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Fin: {formatDate(project.endDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(project)}
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
                            <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. El proyecto será eliminado permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
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
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay proyectos registrados
                </h3>
                <p className="text-gray-600 mb-4">
                  Comienza creando el primer proyecto municipal
                </p>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Proyecto
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
              <DialogTitle>Editar Proyecto</DialogTitle>
              <DialogDescription>
                Actualiza la información del proyecto
              </DialogDescription>
            </DialogHeader>
            <ProjectForm onSubmit={handleEdit} submitLabel="Actualizar Proyecto" />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
