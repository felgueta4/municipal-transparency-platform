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
import { SoftwareVersion, MunicipalityWithVersion } from '@/lib/types'
import { Loader2, AlertTriangle, ArrowRight } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface UpdateMunicipalityVersionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  municipalities: MunicipalityWithVersion[]
  token: string | null
  onSuccess: () => void
}

export function UpdateMunicipalityVersionModal({
  open,
  onOpenChange,
  municipalities,
  token,
  onSuccess
}: UpdateMunicipalityVersionModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [versions, setVersions] = useState<SoftwareVersion[]>([])
  const [selectedVersion, setSelectedVersion] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (open) {
      fetchVersions()
      setSelectedVersion('')
      setNotes('')
    }
  }, [open])

  const fetchVersions = async () => {
    try {
      const data = await versionApi.getAllVersions(token)
      // Only show stable versions for assignment
      const stableVersions = data?.filter((v: SoftwareVersion) => v.status === 'stable') ?? []
      setVersions(stableVersions)
    } catch (error) {
      console.error('Error fetching versions:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedVersion) {
      toast({
        title: 'Error de validación',
        description: 'Debe seleccionar una versión',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)

    try {
      const updatePromises = municipalities.map(municipality =>
        versionApi.updateMunicipalityVersion(
          municipality.id,
          {
            toVersion: selectedVersion,
            notes: notes || undefined
          },
          token
        )
      )

      await Promise.all(updatePromises)

      toast({
        title: 'Versiones actualizadas',
        description: `Se actualizaron ${municipalities.length} municipalidad(es) a la versión ${selectedVersion}`,
      })

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al actualizar versiones:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudieron actualizar las versiones',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const isDowngrade = (current: string | null, target: string) => {
    if (!current) return false
    const [cMaj, cMin, cPatch] = current.split('.').map(Number)
    const [tMaj, tMin, tPatch] = target.split('.').map(Number)
    return tMaj < cMaj || (tMaj === cMaj && tMin < cMin) || (tMaj === cMaj && tMin === cMin && tPatch < cPatch)
  }

  const hasDowngrade = selectedVersion && municipalities.some(m => 
    m.softwareVersion && isDowngrade(m.softwareVersion, selectedVersion)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Actualizar Versión {municipalities.length > 1 ? `(${municipalities.length} municipalidades)` : ''}
          </DialogTitle>
          <DialogDescription>
            Asigna una nueva versión de software a {municipalities.length === 1 
              ? municipalities[0]?.name 
              : `${municipalities.length} municipalidades seleccionadas`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current versions */}
          <div className="space-y-2">
            <Label>Versión Actual</Label>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {municipalities.map(municipality => (
                <div key={municipality.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{municipality.name}</span>
                  <code className="text-sm bg-white px-2 py-1 rounded border">
                    {municipality.softwareVersion ?? 'Sin versión'}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Version selector */}
          <div className="space-y-2">
            <Label htmlFor="version">Nueva Versión *</Label>
            <Select
              value={selectedVersion}
              onValueChange={setSelectedVersion}
            >
              <SelectTrigger id="version">
                <SelectValue placeholder="Selecciona una versión" />
              </SelectTrigger>
              <SelectContent>
                {versions.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">No hay versiones estables disponibles</div>
                ) : (
                  versions.map((version) => (
                    <SelectItem key={version.id} value={version.version}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{version.version}</span>
                        <span className="text-gray-500">- {version.name}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Downgrade warning */}
          {hasDowngrade && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Advertencia:</strong> Estás a punto de degradar a una versión anterior. 
                Esto puede causar incompatibilidades. Asegúrate de que esta acción sea intencional.
              </AlertDescription>
            </Alert>
          )}

          {/* Preview */}
          {selectedVersion && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <Label className="text-blue-900 mb-2 block">Vista Previa del Cambio</Label>
              <div className="space-y-2">
                {municipalities.map(municipality => (
                  <div key={municipality.id} className="flex items-center gap-2 text-sm">
                    <code className="bg-white px-2 py-1 rounded border border-gray-300">
                      {municipality.softwareVersion ?? 'Sin versión'}
                    </code>
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                    <code className="bg-white px-2 py-1 rounded border border-blue-300 font-semibold text-blue-700">
                      {selectedVersion}
                    </code>
                    <span className="text-gray-600 ml-2">{municipality.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Razón de la actualización, cambios importantes, etc..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
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
            <Button type="submit" disabled={loading || !selectedVersion}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Actualización
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}