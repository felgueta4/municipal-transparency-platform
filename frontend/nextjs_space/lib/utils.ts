
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format Chilean pesos (CLP)
export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format Chilean pesos in compact format (MM suffix for values >= 1 million)
export function formatCompactCLP(amount: number): string {
  if (amount >= 1000000) {
    // For values >= 1,000,000: divide by 1,000,000 and show with MM suffix
    const millions = amount / 1000000
    
    // Format with up to 3 decimal places, removing trailing zeros
    const formatted = new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(millions)
    
    return `$${formatted} MM`
  } else {
    // For values < 1,000,000: use normal formatting with thousand separators
    const formatted = new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    
    return `$${formatted}`
  }
}

// Format numbers with thousand separators
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-CL').format(num)
}

// Format dates in Chilean format
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('es-CL').format(dateObj)
}

// Format dates for form inputs (YYYY-MM-DD)
export function formatDateForInput(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toISOString().split('T')[0]
}

// Validate Chilean RUT (optional utility)
export function validateRUT(rut: string): boolean {
  // Basic RUT validation - you can expand this
  const rutPattern = /^[0-9]+-[0-9kK]{1}$/
  return rutPattern.test(rut)
}

// Get status color for projects
export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'activo':
    case 'en_progreso':
    case 'en progreso':
      return 'text-green-600 bg-green-100'
    case 'completado':
    case 'finalizado':
      return 'text-blue-600 bg-blue-100'
    case 'pausado':
      return 'text-yellow-600 bg-yellow-100'
    case 'cancelado':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Truncate text
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Get category color
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'educacion': 'text-blue-600 bg-blue-100',
    'salud': 'text-red-600 bg-red-100',
    'infraestructura': 'text-green-600 bg-green-100',
    'seguridad': 'text-purple-600 bg-purple-100',
    'servicios': 'text-orange-600 bg-orange-100',
    'cultura': 'text-pink-600 bg-pink-100',
    'deportes': 'text-indigo-600 bg-indigo-100',
    'medio_ambiente': 'text-green-700 bg-green-100',
    'transporte': 'text-gray-600 bg-gray-100',
    'desarrollo_social': 'text-teal-600 bg-teal-100',
  }
  
  return colors[category?.toLowerCase()] || 'text-gray-600 bg-gray-100'
}

// Search function for filtering data
export function searchInObject(obj: any, searchTerm: string): boolean {
  const term = searchTerm.toLowerCase()
  
  const searchableValues = Object.values(obj).filter(value => 
    typeof value === 'string' || typeof value === 'number'
  )
  
  return searchableValues.some(value => 
    String(value).toLowerCase().includes(term)
  )
}
