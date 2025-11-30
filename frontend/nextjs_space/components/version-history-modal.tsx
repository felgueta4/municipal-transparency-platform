'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { versionApi } from '@/lib/api'
import { VersionHistory } from '@/lib/types'
import { Loader2, ArrowRight, Clock, User, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface VersionHistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  municipalityId: string
  municipalityName: string
  token: string | null
}

export function VersionHistoryModal({
  open,
  onOpenChange,
  municipalityId,
  municipalityName,
  token
}: VersionHistoryModalProps) {
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<VersionHistory[]>([])

  useEffect(() => {
    if (open) {
      fetchHistory()
    }
  }, [open, municipalityId])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const data = await versionApi.getMunicipalityVersionHistory(municipalityId, token)
      setHistory(data ?? [])
    } catch (error) {
      console.error('Error fetching version history:', error)
      setHistory([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Historial de Versiones</DialogTitle>
          <DialogDescription>
            Registro de cambios de versión para {municipalityName}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Sin historial de versiones
              </h3>
              <p className="text-gray-500">
                No hay cambios de versión registrados para esta municipalidad
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={entry.id}
                  className="relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {/* Timeline connector */}
                  {index !== history.length - 1 && (
                    <div className="absolute left-8 top-full h-4 w-0.5 bg-gray-200" />
                  )}

                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      {/* Version change */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {entry.fromVersion ?? 'Sin versión'}
                        </code>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <code className="bg-blue-100 px-2 py-1 rounded text-sm font-semibold text-blue-700">
                          {entry.toVersion}
                        </code>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{entry.user?.fullName ?? entry.updatedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(entry.updatedAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      {entry.notes && (
                        <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                          <p className="text-gray-700">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}