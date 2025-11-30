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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'
import { versionApi } from '@/lib/api'
import { MunicipalityWithVersion, RollbackValidation, PreviousVersionInfo } from '@/lib/types'
import { AlertTriangle, ArrowLeft, CheckCircle, Loader2, XCircle } from 'lucide-react'

interface RollbackVersionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  municipality: MunicipalityWithVersion | null
  token: string | null
  onSuccess: () => void
}

export function RollbackVersionModal({
  open,
  onOpenChange,
  municipality,
  token,
  onSuccess,
}: RollbackVersionModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(false)
  const [notes, setNotes] = useState('')
  const [validation, setValidation] = useState<RollbackValidation | null>(null)
  const [previousVersion, setPreviousVersion] = useState<PreviousVersionInfo | null>(null)
  const [confirming, setConfirming] = useState(false)

  // Load validation and previous version info when modal opens
  useEffect(() => {
    if (open && municipality) {
      loadValidation()
    } else {
      // Reset state when modal closes
      setValidation(null)
      setPreviousVersion(null)
      setConfirming(false)
      setNotes('')
    }
  }, [open, municipality])

  const loadValidation = async () => {
    if (!municipality || !token) return

    setValidating(true)
    try {
      const [validationData, prevVersionData] = await Promise.all([
        versionApi.validateRollback(municipality.id, token),
        versionApi.getPreviousVersion(municipality.id, token),
      ])

      setValidation(validationData)
      setPreviousVersion(prevVersionData)
    } catch (error) {
      console.error('Error loading rollback validation:', error)
      toast({
        title: 'Error',
        description: 'No se pudo cargar la información de rollback',
        variant: 'destructive',
      })
    } finally {
      setValidating(false)
    }
  }

  const handleRollback = async () => {
    if (!municipality || !token || !validation?.canRollback) return

    setLoading(true)
    try {
      await versionApi.rollbackVersion(municipality.id, { notes }, token)

      toast({
        title: 'Rollback Exitoso',
        description: `La municipalidad ${municipality.name} ha sido revertida a la versión ${previousVersion?.version}`,
      })

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Error al Realizar Rollback',
        description: error instanceof Error ? error.message : 'No se pudo revertir la versión',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-orange-600" />
            Revertir Versión - {municipality?.name}
          </DialogTitle>
          <DialogDescription>
            Revertir la municipalidad a una versión anterior del software
          </DialogDescription>
        </DialogHeader>

        {validating ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Validando rollback...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current and Previous Version Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-600 mb-1">Versión Actual</div>
                <div className="text-xl font-bold text-gray-900">
                  {municipality?.softwareVersion || 'Sin versión'}
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="text-sm text-blue-600 mb-1">Versión Anterior</div>
                <div className="text-xl font-bold text-blue-900">
                  {previousVersion?.version || 'N/A'}
                </div>
                {previousVersion?.name && (
                  <div className="text-sm text-blue-700 mt-1">{previousVersion.name}</div>
                )}
              </div>
            </div>

            {/* Validation Result */}
            {validation && (
              <Alert variant={validation.canRollback ? 'default' : 'destructive'}>
                {validation.canRollback ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  <div className="font-medium mb-1">
                    {validation.canRollback ? 'Rollback Disponible' : 'Rollback No Disponible'}
                  </div>
                  <div className="text-sm">{validation.message}</div>
                  {validation.risks && validation.risks.length > 0 && (
                    <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                      {validation.risks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Warning */}
            {validation?.canRollback && !confirming && (
              <Alert variant="default" className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <div className="font-medium mb-1">Advertencia Importante</div>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Esta acción revertirá la municipalidad a una versión anterior</li>
                    <li>Puede causar incompatibilidades con datos recientes</li>
                    <li>Se recomienda realizar un respaldo antes de proceder</li>
                    <li>Esta acción quedará registrada en el historial</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Confirmation Step */}
            {validation?.canRollback && confirming && (
              <div className="space-y-4">
                <Alert variant="default" className="bg-orange-50 border-orange-200">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <div className="font-medium mb-1">Confirmar Rollback</div>
                    <div className="text-sm">
                      Estás a punto de revertir <strong>{municipality?.name}</strong> de la versión{' '}
                      <strong>{municipality?.softwareVersion}</strong> a la versión{' '}
                      <strong>{previousVersion?.version}</strong>.
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Razón del rollback, observaciones, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {validation?.canRollback && !confirming ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => setConfirming(true)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Continuar con Rollback
              </Button>
            </>
          ) : validation?.canRollback && confirming ? (
            <>
              <Button variant="outline" onClick={() => setConfirming(false)}>
                Volver
              </Button>
              <Button
                onClick={handleRollback}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Revirtiendo...
                  </>
                ) : (
                  'Confirmar Rollback'
                )}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}