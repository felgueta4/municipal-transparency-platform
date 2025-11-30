
'use client'

import { useParams } from 'next/navigation'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Upload, File, CheckCircle, AlertCircle, X, FileText, Table, Database, Download } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { fileUploadApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface FileUploadResult {
  filename: string
  status: 'success' | 'error'
  message: string
  recordsProcessed?: number
}

export default function AdminFileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResults, setUploadResults] = useState<FileUploadResult[]>([])
  const [previewData, setPreviewData] = useState<any[]>([])
  const [showPreview, setShowPreview] = useState(false)
  
  const { token } = useAuth()
  const { toast } = useToast()

  const acceptedFileTypes = '.csv,.xlsx,.xls'
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileSelection = (file: File) => {
    // Validate file type
    const validExtensions = ['.csv', '.xlsx', '.xls']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Archivo no válido",
        description: "Solo se aceptan archivos CSV y Excel (.xlsx, .xls)",
        variant: "destructive"
      })
      return
    }

    // Validate file size
    if (file.size > maxFileSize) {
      toast({
        title: "Archivo muy grande",
        description: "El archivo debe ser menor a 10MB",
        variant: "destructive"
      })
      return
    }

    setSelectedFile(file)
    generatePreview(file)
  }

  const generatePreview = async (file: File) => {
    try {
      setShowPreview(true)
      
      if (file.name.endsWith('.csv')) {
        const text = await file.text()
        const lines = text.split('\n').filter(line => line.trim())
        const headers = lines[0]?.split(',') || []
        const previewRows = lines.slice(1, 6).map(line => {
          const values = line.split(',')
          const obj: any = {}
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim() || ''
          })
          return obj
        })
        setPreviewData(previewRows)
      } else {
        // For Excel files, show basic info
        setPreviewData([{
          'Nombre de archivo': file.name,
          'Tamaño': `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          'Tipo': file.type || 'Excel',
          'Última modificación': new Date(file.lastModified).toLocaleString('es-CL')
        }])
      }
    } catch (error) {
      console.error('Error generating preview:', error)
      setPreviewData([])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setIsUploading(true)
      setUploadProgress(0)
      
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fileUploadApi.upload(formData, token)
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const result = await response.json()
        
        const uploadResult: FileUploadResult = {
          filename: selectedFile.name,
          status: 'success',
          message: result.message || 'Archivo procesado correctamente',
          recordsProcessed: result.recordsProcessed || 0
        }
        
        setUploadResults(prev => [uploadResult, ...prev])
        
        toast({
          title: "Éxito",
          description: `Archivo ${selectedFile.name} procesado correctamente`
        })
        
        // Reset form
        setSelectedFile(null)
        setShowPreview(false)
        setPreviewData([])
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      
      const uploadResult: FileUploadResult = {
        filename: selectedFile?.name || 'Unknown',
        status: 'error',
        message: 'Error al procesar el archivo'
      }
      
      setUploadResults(prev => [uploadResult, ...prev])
      
      toast({
        title: "Error",
        description: "No se pudo procesar el archivo",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setShowPreview(false)
    setPreviewData([])
  }

  const getFileIcon = (filename: string) => {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'))
    switch (extension) {
      case '.csv':
        return <Table className="h-8 w-8 text-green-600" />
      case '.xlsx':
      case '.xls':
        return <FileText className="h-8 w-8 text-blue-600" />
      case '.json':
        return <Database className="h-8 w-8 text-purple-600" />
      default:
        return <File className="h-8 w-8 text-gray-600" />
    }
  }

  const downloadTemplate = (type: string) => {
    const templates: Record<string, string> = {
      presupuestos: '/templates/presupuestos_ejemplo.csv',
      gastos: '/templates/gastos_ejemplo.csv',
      proyectos: '/templates/proyectos_ejemplo.csv',
      contratos: '/templates/contratos_ejemplo.csv'
    }
    
    const link = document.createElement('a')
    link.href = templates[type]
    link.download = `${type}_ejemplo.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Descarga iniciada",
      description: `Archivo de ejemplo de ${type} descargado`
    })
  }

  return (
    <AdminLayout title="Carga de Archivos">
      <div className="space-y-6">
        {/* Instructions */}
        <Alert>
          <Upload className="h-4 w-4" />
          <AlertDescription>
            Sube archivos CSV o Excel para importar datos masivamente a la plataforma. 
            Los archivos deben contener las columnas correctas según el tipo de dato.
            Descarga los archivos de ejemplo a continuación para ver el formato requerido.
          </AlertDescription>
        </Alert>

        {/* Template Downloads */}
        <Card>
          <CardHeader>
            <CardTitle>Descargar Plantillas de Ejemplo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => downloadTemplate('presupuestos')}
              >
                <div className="flex items-center gap-3 w-full">
                  <Download className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium">Presupuestos</p>
                    <p className="text-xs text-gray-500">Plantilla con ejemplos de presupuestos</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => downloadTemplate('gastos')}
              >
                <div className="flex items-center gap-3 w-full">
                  <Download className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium">Gastos</p>
                    <p className="text-xs text-gray-500">Plantilla con ejemplos de gastos</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => downloadTemplate('proyectos')}
              >
                <div className="flex items-center gap-3 w-full">
                  <Download className="h-5 w-5 text-purple-600" />
                  <div className="text-left">
                    <p className="font-medium">Proyectos</p>
                    <p className="text-xs text-gray-500">Plantilla con ejemplos de proyectos</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => downloadTemplate('contratos')}
              >
                <div className="flex items-center gap-3 w-full">
                  <Download className="h-5 w-5 text-orange-600" />
                  <div className="text-left">
                    <p className="font-medium">Contratos</p>
                    <p className="text-xs text-gray-500">Plantilla con ejemplos de contratos</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Seleccionar Archivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    {getFileIcon(selectedFile.name)}
                  </div>
                  
                  <div>
                    <p className="text-lg font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 justify-center">
                    <Button onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? 'Procesando...' : 'Procesar Archivo'}
                    </Button>
                    <Button variant="outline" onClick={clearFile} disabled={isUploading}>
                      <X className="h-4 w-4 mr-2" />
                      Quitar
                    </Button>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-gray-600">
                        Procesando archivo... {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium">
                      Arrastra un archivo aquí o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Archivos soportados: CSV, Excel (.xlsx, .xls)
                    </p>
                    <p className="text-sm text-gray-500">
                      Tamaño máximo: 10MB
                    </p>
                    <p className="text-xs text-blue-600 mt-2 font-medium">
                      💡 Descarga las plantillas de ejemplo arriba para ver el formato correcto
                    </p>
                  </div>
                  
                  <div>
                    <Input
                      type="file"
                      accept={acceptedFileTypes}
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload">
                      <Button variant="outline" asChild>
                        <span>Seleccionar Archivo</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Preview */}
        {showPreview && previewData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa del Archivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(previewData[0] || {}).map((key) => (
                        <th key={key} className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {Object.values(row).map((value: any, cellIndex) => (
                          <td key={cellIndex} className="border border-gray-200 px-4 py-2 text-sm text-gray-900">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Mostrando las primeras {previewData.length} filas del archivo
              </p>
            </CardContent>
          </Card>
        )}

        {/* Upload Results History */}
        {uploadResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Historial de Cargas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {result.status === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      
                      <div>
                        <p className="font-medium">{result.filename}</p>
                        <p className="text-sm text-gray-600">{result.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {result.recordsProcessed !== undefined && (
                        <Badge variant="outline">
                          {result.recordsProcessed} registros
                        </Badge>
                      )}
                      <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                        {result.status === 'success' ? 'Exitoso' : 'Error'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Format Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Guía de Formatos y Columnas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Presupuestos
              </h4>
              <p className="text-sm text-gray-600 mb-2">Columnas requeridas (en español):</p>
              <code className="text-xs bg-white p-3 rounded block border border-blue-100">
                año, montoTotal, categoria, descripcion, esPublico
              </code>
              <p className="text-xs text-gray-500 mt-2">
                Ejemplo: 2024, 50000000, Educación, Presupuesto para infraestructura, true
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Gastos
              </h4>
              <p className="text-sm text-gray-600 mb-2">Columnas requeridas (en español):</p>
              <code className="text-xs bg-white p-3 rounded block border border-green-100">
                descripcion, monto, fecha, categoria, esPublico
              </code>
              <p className="text-xs text-gray-500 mt-2">
                Ejemplo: Construcción de plaza, 15000000, 2024-03-15, Obras Públicas, true
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Proyectos
              </h4>
              <p className="text-sm text-gray-600 mb-2">Columnas requeridas (en español):</p>
              <code className="text-xs bg-white p-3 rounded block border border-purple-100">
                nombre, descripcion, presupuesto, estado, fechaInicio, esPublico
              </code>
              <p className="text-xs text-gray-500 mt-2">
                Ejemplo: Parque Municipal, Construcción de parque, 45000000, en_progreso, 2024-01-15, true
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Contratos
              </h4>
              <p className="text-sm text-gray-600 mb-2">Columnas requeridas (en español):</p>
              <code className="text-xs bg-white p-3 rounded block border border-orange-100">
                numeroContrato, proveedor, monto, descripcion, fechaInicio, esPublico
              </code>
              <p className="text-xs text-gray-500 mt-2">
                Ejemplo: CT-2024-001, Constructora Aconcagua, 35000000, Construcción centro, 2024-01-15, true
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">📋 Notas Importantes</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Todas las columnas deben estar en español</li>
                <li>Las fechas deben estar en formato: AAAA-MM-DD (ejemplo: 2024-03-15)</li>
                <li>Los montos deben ser números sin puntos ni comas (ejemplo: 15000000)</li>
                <li>El campo esPublico debe ser: true o false</li>
                <li>Los archivos deben estar en formato CSV o Excel (.xlsx, .xls)</li>
                <li>Descarga las plantillas de ejemplo para ver el formato exacto</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
