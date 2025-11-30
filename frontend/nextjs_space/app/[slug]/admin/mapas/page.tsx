
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'react-hot-toast'
import { MapPin, Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'

interface MapProject {
  id: string
  name: string
  description: string
  category: string
  latitude: number
  longitude: number
  progress: number
  amount: number
  comuna: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const categories = [
  'Infraestructura',
  'Cultura',
  'Seguridad',
  'Salud',
  'Educación',
  'Deporte',
]

const comunasChile = [
  'Renca',
  'Santiago',
  'Las Condes',
  'Providencia',
  'Maipú',
  'La Florida',
  'Puente Alto',
  'Ñuñoa',
  'Vitacura',
  'Lo Barnechea',
]

export default function AdminMapasPage() {
  const { data: session, status } = useSession() || {}
  const router = useRouter()
  const [projects, setProjects] = useState<MapProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<MapProject | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Infraestructura',
    latitude: '',
    longitude: '',
    progress: '0',
    amount: '',
    comuna: 'Renca',
    isActive: true,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/${slug}/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/map-projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Error al cargar proyectos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingProject
        ? `/api/map-projects/${editingProject.id}`
        : '/api/map-projects'
      
      const method = editingProject ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(
          editingProject ? 'Proyecto actualizado' : 'Proyecto creado'
        )
        setIsDialogOpen(false)
        resetForm()
        fetchProjects()
      } else {
        toast.error('Error al guardar proyecto')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Error al guardar proyecto')
    }
  }

  const handleEdit = (project: MapProject) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      description: project.description,
      category: project.category,
      latitude: project.latitude.toString(),
      longitude: project.longitude.toString(),
      progress: project.progress.toString(),
      amount: project.amount.toString(),
      comuna: project.comuna,
      isActive: project.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return

    try {
      const response = await fetch(`/api/map-projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Proyecto eliminado')
        fetchProjects()
      } else {
        toast.error('Error al eliminar proyecto')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Error al eliminar proyecto')
    }
  }

  const toggleActive = async (project: MapProject) => {
    try {
      const response = await fetch(`/api/map-projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          isActive: !project.isActive,
        }),
      })

      if (response.ok) {
        toast.success(
          project.isActive ? 'Proyecto ocultado' : 'Proyecto activado'
        )
        fetchProjects()
      }
    } catch (error) {
      console.error('Error toggling project:', error)
      toast.error('Error al cambiar visibilidad')
    }
  }

  const resetForm = () => {
    setEditingProject(null)
    setFormData({
      name: '',
      description: '',
      category: 'Infraestructura',
      latitude: '',
      longitude: '',
      progress: '0',
      amount: '',
      comuna: 'Renca',
      isActive: true,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            Gestión de Mapas Comunales
          </h1>
          <p className="text-gray-600 mt-2">
            Administra los proyectos georreferenciados del mapa comunal
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </DialogTitle>
              <DialogDescription>
                Ingresa los datos del proyecto georreferenciado
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Nombre del Proyecto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comuna">Comuna</Label>
                  <Select
                    value={formData.comuna}
                    onValueChange={(value) =>
                      setFormData({ ...formData, comuna: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {comunasChile.map((comuna) => (
                        <SelectItem key={comuna} value={comuna}>
                          {comuna}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="latitude">Latitud</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                    placeholder="-33.4028"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="longitude">Longitud</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                    placeholder="-70.7345"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="progress">Avance (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({ ...formData, progress: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Monto de Inversión (CLP)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                  <Label htmlFor="isActive">Visible en portal público</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    resetForm()
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProject ? 'Actualizar' : 'Crear'} Proyecto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos Registrados</CardTitle>
          <CardDescription>
            Lista de todos los proyectos georreferenciados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Comuna</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Avance</TableHead>
                <TableHead>Inversión</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No hay proyectos registrados
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.comuna}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(project.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={project.isActive ? 'default' : 'secondary'}>
                        {project.isActive ? 'Visible' : 'Oculto'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleActive(project)}
                        >
                          {project.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
