
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { formatCLP, formatNumber, formatDate } from './utils'

export interface ReportData {
  title: string
  subtitle?: string
  data: any[]
  columns: { header: string; key: string; format?: 'currency' | 'number' | 'date' }[]
  summary?: { label: string; value: any; format?: 'currency' | 'number' }[]
}

export class ReportGenerator {
  // Generar PDF
  static generatePDF(reportData: ReportData): void {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    
    // Título
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(reportData.title, pageWidth / 2, 20, { align: 'center' })
    
    // Subtítulo
    if (reportData.subtitle) {
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text(reportData.subtitle, pageWidth / 2, 28, { align: 'center' })
    }
    
    // Fecha de generación
    doc.setFontSize(10)
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-CL')}`, 14, 35)
    
    // Preparar datos para la tabla
    const tableData = reportData.data.map(item => 
      reportData.columns.map(col => {
        const value = item[col.key]
        if (col.format === 'currency') return formatCLP(value)
        if (col.format === 'number') return formatNumber(value)
        if (col.format === 'date') return formatDate(value)
        return value?.toString() || '-'
      })
    )
    
    // Generar tabla
    autoTable(doc, {
      head: [reportData.columns.map(col => col.header)],
      body: tableData,
      startY: 40,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [59, 130, 246], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 40 }
    })
    
    // Resumen si existe
    if (reportData.summary && reportData.summary.length > 0) {
      const finalY = (doc as any).lastAutoTable.finalY || 40
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Resumen', 14, finalY + 10)
      
      let yPos = finalY + 18
      reportData.summary.forEach(item => {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        
        let valueStr = item.value?.toString() || '-'
        if (item.format === 'currency') valueStr = formatCLP(item.value)
        if (item.format === 'number') valueStr = formatNumber(item.value)
        
        doc.text(`${item.label}: ${valueStr}`, 14, yPos)
        yPos += 6
      })
    }
    
    // Guardar PDF
    const fileName = `${reportData.title.replace(/\s+/g, '_')}_${Date.now()}.pdf`
    doc.save(fileName)
  }
  
  // Generar Excel
  static generateExcel(reportData: ReportData): void {
    // Preparar datos con formato
    const excelData = reportData.data.map(item => {
      const row: any = {}
      reportData.columns.forEach(col => {
        const value = item[col.key]
        if (col.format === 'currency') {
          row[col.header] = value ? `$${formatNumber(value)}` : '-'
        } else if (col.format === 'number') {
          row[col.header] = formatNumber(value)
        } else if (col.format === 'date') {
          row[col.header] = formatDate(value)
        } else {
          row[col.header] = value?.toString() || '-'
        }
      })
      return row
    })
    
    // Crear workbook
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(excelData)
    
    // Añadir hoja de resumen si existe
    if (reportData.summary && reportData.summary.length > 0) {
      const summaryData = reportData.summary.map(item => {
        let valueStr = item.value?.toString() || '-'
        if (item.format === 'currency') valueStr = formatCLP(item.value)
        if (item.format === 'number') valueStr = formatNumber(item.value)
        
        return {
          'Concepto': item.label,
          'Valor': valueStr
        }
      })
      const wsSummary = XLSX.utils.json_to_sheet(summaryData)
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen')
    }
    
    // Añadir hoja principal
    XLSX.utils.book_append_sheet(wb, ws, 'Datos')
    
    // Generar y descargar archivo
    const fileName = `${reportData.title.replace(/\s+/g, '_')}_${Date.now()}.xlsx`
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, fileName)
  }
  
  // Generar CSV
  static generateCSV(reportData: ReportData): void {
    const headers = reportData.columns.map(col => col.header).join(',')
    const rows = reportData.data.map(item => 
      reportData.columns.map(col => {
        const value = item[col.key]
        if (col.format === 'currency') return formatCLP(value)
        if (col.format === 'number') return formatNumber(value)
        if (col.format === 'date') return formatDate(value)
        return `"${value?.toString().replace(/"/g, '""') || '-'}"`
      }).join(',')
    )
    
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const fileName = `${reportData.title.replace(/\s+/g, '_')}_${Date.now()}.csv`
    saveAs(blob, fileName)
  }
}
