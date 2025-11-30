'use client'

import { NotificationType } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Package 
} from 'lucide-react'

interface NotificationBadgeProps {
  type: NotificationType
  className?: string
}

export function NotificationBadge({ type, className }: NotificationBadgeProps) {
  const config = {
    info: {
      label: 'Información',
      variant: 'default' as const,
      icon: Info,
      className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    },
    warning: {
      label: 'Advertencia',
      variant: 'outline' as const,
      icon: AlertTriangle,
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300',
    },
    success: {
      label: 'Éxito',
      variant: 'outline' as const,
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-300',
    },
    error: {
      label: 'Error',
      variant: 'destructive' as const,
      icon: XCircle,
      className: 'bg-red-100 text-red-800 hover:bg-red-100',
    },
    update: {
      label: 'Actualización',
      variant: 'outline' as const,
      icon: RefreshCw,
      className: 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300',
    },
    version_release: {
      label: 'Nueva Versión',
      variant: 'outline' as const,
      icon: Package,
      className: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-indigo-300',
    },
  }

  const typeConfig = config[type] || config.info
  const Icon = typeConfig.icon

  return (
    <Badge variant={typeConfig.variant} className={`gap-1 ${typeConfig.className} ${className || ''}`}>
      <Icon className="h-3 w-3" />
      {typeConfig.label}
    </Badge>
  )
}

export function getNotificationIcon(type: NotificationType) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: XCircle,
    update: RefreshCw,
    version_release: Package,
  }
  return icons[type] || Info
}

export function getNotificationColor(type: NotificationType) {
  const colors = {
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    success: 'text-green-600',
    error: 'text-red-600',
    update: 'text-purple-600',
    version_release: 'text-indigo-600',
  }
  return colors[type] || 'text-gray-600'
}