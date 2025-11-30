
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react'
import { ReportGenerator, ReportData } from '@/lib/report-generator'
import { useToast } from '@/hooks/use-toast'

interface ReportExportDialogProps {
  reportData: ReportData
  triggerText?: string
}

export function ReportExportDialog({ reportData, triggerText = "Exportar Reporte" }: ReportExportDialogProps) {
  const [format, setFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf')
  const [isExporting, setIsExporting] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    try {
      setIsExporting(true)
      
      switch (format) {
        case 'pdf':
          ReportGenerator.generatePDF(reportData)
          break
        case 'excel':
          ReportGenerator.generateExcel(reportData)
          break
        case 'csv':
          ReportGenerator.generateCSV(reportData)
          break
      }

      toast({
        title: "Reporte generado",
        description: `El reporte se ha descargado en formato ${format.toUpperCase()}`,
      })
      
      setOpen(false)
    } catch (error) {
      console.error('Error exporting report:', error)
      toast({
        title: "Error",
        description: "No se pudo generar el reporte",
        variant: "destructive"
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exportar Reporte</DialogTitle>
          <DialogDescription>
            Selecciona el formato en el que deseas descargar el reporte
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="format">Formato de exportación</Label>
            <Select value={format} onValueChange={(value: any) => setFormat(value)}>
              <SelectTrigger id="format">
                <SelectValue placeholder="Selecciona un formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>PDF - Documento portable</span>
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Excel - Hoja de cálculo</span>
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <span>CSV - Valores separados por coma</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 text-sm">
            <p className="font-medium text-blue-900 mb-1">Información del reporte:</p>
            <ul className="text-blue-700 space-y-1">
              <li>• Título: {reportData.title}</li>
              <li>• Registros: {reportData.data.length}</li>
              <li>• Columnas: {reportData.columns.length}</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="gap-2"
          >
            {isExporting ? (
              <>Generando...</>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Descargar {format.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
