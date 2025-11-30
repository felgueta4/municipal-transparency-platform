'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { versionApi } from '@/lib/api'
import { SoftwareVersion, SoftwareVersionStatus } from '@/lib/types'
import { Loader2 } from 'lucide-react'

interface CreateEditVersionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  version?: SoftwareVersion | null
  token: string | null
  onSuccess: () => void
}

export function CreateEditVersionModal({
  open,
  onOpenChange,
  version,
  token,
  onSuccess
}: CreateEditVersionModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    version: '',
    name: '',
    description: '',
    changelog: '',
    releaseDate: '',
    status: 'draft' as SoftwareVersionStatus
  })

  useEffect(() => {
    if (version) {
      setFormData({
        version: version.version,
        name: version.name,
        description: version.description ?? '',
        changelog: version.changelog ?? '',
        releaseDate: version.releaseDate.split('T')[0],
        status: version.status
      })
    } else {
      setFormData({
        version: '',
        name: '',
        description: '',
        changelog: '',
        releaseDate: new Date().toISOString().split('T')[0],
        status: 'draft'
      })
    }
  }, [version, open])

  const validateVersion = (v: string) => {
    const regex = /^\d+\.\d+\.\d+$/
    return regex.test(v)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateVersion(formData.version)) {
      toast({
        title: 'Error de validación',
        description: 'La versión debe seguir el formato X.Y.Z (ej: 1.0.0)',
        variant: 'destructive'
      })
      return
    }

    if (!formData.name.trim()) {
      toast({
        title: 'Error de validación',
        description: 'El nombre es obligatorio',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)

    try {
      const payload = {
        version: formData.version,
        name: formData.name,
        description: formData.description || undefined,
        changelog: formData.changelog || undefined,
        releaseDate: formData.releaseDate,
        status: formData.status
      }

      if (version) {
        await versionApi.updateVersion(version.id, payload, token)
        toast({
          title: 'Versión actualizada',
          description: `La versión ${formData.version} ha sido actualizada exitosamente`,
        })
      } else {
        await versionApi.createVersion(payload, token)
        toast({
          title: 'Versión creada',
          description: `La versión ${formData.version} ha sido creada exitosamente`,
        })
      }

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al guardar versión:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudo guardar la versión',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {version ? 'Editar Versión' : 'Nueva Versión'}
          </DialogTitle>
          <DialogDescription>
            {version 
              ? 'Actualiza los detalles de la versión del software'
              : 'Crea una nueva versión del software para asignar a municipalidades'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version">Versión *</Label>
              <Input
                id="version"
                placeholder="1.0.0"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                disabled={!!version}
                required
              />
              <p className="text-xs text-gray-500">Formato: X.Y.Z (ej: 1.0.0)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseDate">Fecha de Lanzamiento *</Label>
              <Input
                id="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              placeholder="ej: Actualización de Seguridad"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as SoftwareVersionStatus })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="stable">Estable</SelectItem>
                <SelectItem value="deprecated">Obsoleta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción breve de esta versión..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="changelog">Registro de Cambios</Label>
            <Textarea
              id="changelog"
              placeholder="- Nueva funcionalidad X\n- Corrección de bug Y\n- Mejora de rendimiento Z"
              value={formData.changelog}
              onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
              rows={6}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {version ? 'Actualizar' : 'Crear'} Versión
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}