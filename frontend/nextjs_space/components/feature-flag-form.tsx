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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { featureFlagApi } from '@/lib/api'
import { FeatureFlag, CreateFeatureFlagDto, UpdateFeatureFlagDto } from '@/lib/types'
import { Loader2, Flag } from 'lucide-react'

interface FeatureFlagFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureFlag: FeatureFlag | null
  token: string | null
  onSuccess: () => void
}

export function FeatureFlagForm({
  open,
  onOpenChange,
  featureFlag,
  token,
  onSuccess,
}: FeatureFlagFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateFeatureFlagDto>({
    key: '',
    name: '',
    description: '',
    defaultEnabled: false,
  })

  const isEdit = !!featureFlag

  useEffect(() => {
    if (open && featureFlag) {
      // Load existing feature flag data for editing
      setFormData({
        key: featureFlag.key,
        name: featureFlag.name,
        description: featureFlag.description || '',
        defaultEnabled: featureFlag.defaultEnabled,
      })
    } else if (open && !featureFlag) {
      // Reset form for new feature flag
      setFormData({
        key: '',
        name: '',
        description: '',
        defaultEnabled: false,
      })
    }
  }, [open, featureFlag])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate key format (lowercase, underscores only)
    const keyRegex = /^[a-z_]+$/
    if (!isEdit && !keyRegex.test(formData.key)) {
      toast({
        title: 'Error de Validación',
        description: 'La clave debe contener solo letras minúsculas y guiones bajos',
        variant: 'destructive',
      })
      return
    }

    if (!formData.name.trim()) {
      toast({
        title: 'Error de Validación',
        description: 'El nombre es requerido',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      if (isEdit) {
        // Update existing feature flag
        const updateData: UpdateFeatureFlagDto = {
          name: formData.name,
          description: formData.description || undefined,
          defaultEnabled: formData.defaultEnabled,
        }
        await featureFlagApi.update(featureFlag.id, updateData, token)
        toast({
          title: 'Feature Flag Actualizada',
          description: `La feature flag "${formData.name}" ha sido actualizada`,
        })
      } else {
        // Create new feature flag
        await featureFlagApi.create(formData, token)
        toast({
          title: 'Feature Flag Creada',
          description: `La feature flag "${formData.name}" ha sido creada`,
        })
      }

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: isEdit ? 'Error al Actualizar' : 'Error al Crear',
        description: error instanceof Error ? error.message : 'Ocurrió un error',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-blue-600" />
            {isEdit ? 'Editar Feature Flag' : 'Nueva Feature Flag'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modifica los detalles de la feature flag'
              : 'Crea una nueva feature flag para controlar funcionalidades'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key">
              Clave <span className="text-red-500">*</span>
            </Label>
            <Input
              id="key"
              placeholder="ejemplo: enable_new_dashboard"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value.toLowerCase() })}
              disabled={isEdit} // Key cannot be changed after creation
              required
            />
            <p className="text-xs text-gray-500">
              Solo letras minúsculas y guiones bajos. {isEdit && 'No se puede modificar después de crear.'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Dashboard Mejorado"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500">Nombre descriptivo de la característica</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción opcional de la característica..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="defaultEnabled" className="text-base">
                Habilitado por Defecto
              </Label>
              <p className="text-sm text-gray-500">
                Valor predeterminado para nuevas municipalidades
              </p>
            </div>
            <Switch
              id="defaultEnabled"
              checked={formData.defaultEnabled}
              onCheckedChange={(checked) => setFormData({ ...formData, defaultEnabled: checked })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? 'Actualizando...' : 'Creando...'}
                </>
              ) : isEdit ? (
                'Actualizar'
              ) : (
                'Crear'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}