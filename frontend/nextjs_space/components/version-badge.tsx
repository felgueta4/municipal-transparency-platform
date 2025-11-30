'use client'

import { Badge } from '@/components/ui/badge'
import { SoftwareVersionStatus } from '@/lib/types'
import { CheckCircle, AlertCircle, FileText } from 'lucide-react'

interface VersionBadgeProps {
  status: SoftwareVersionStatus
  className?: string
}

export function VersionBadge({ status, className }: VersionBadgeProps) {
  const config = {
    draft: {
      label: 'Borrador',
      variant: 'secondary' as const,
      icon: FileText,
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
    },
    stable: {
      label: 'Estable',
      variant: 'default' as const,
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800 hover:bg-green-100'
    },
    deprecated: {
      label: 'Obsoleta',
      variant: 'destructive' as const,
      icon: AlertCircle,
      className: 'bg-red-100 text-red-800 hover:bg-red-100'
    }
  }

  const statusConfig = config[status] || config.draft
  const Icon = statusConfig.icon

  return (
    <Badge 
      variant={statusConfig.variant} 
      className={`gap-1 ${statusConfig.className} ${className ?? ''}`}
    >
      <Icon className="h-3 w-3" />
      {statusConfig.label}
    </Badge>
  )
}

interface VersionStatusIndicatorProps {
  currentVersion: string | null
  latestVersion: string | null
  className?: string
}

export function VersionStatusIndicator({ 
  currentVersion, 
  latestVersion, 
  className 
}: VersionStatusIndicatorProps) {
  if (!currentVersion) {
    return (
      <Badge variant="secondary" className={`gap-1 ${className ?? ''}`}>
        <AlertCircle className="h-3 w-3" />
        Sin versión
      </Badge>
    )
  }

  const isOutdated = latestVersion && currentVersion !== latestVersion

  if (isOutdated) {
    return (
      <Badge variant="destructive" className={`gap-1 bg-orange-100 text-orange-800 hover:bg-orange-100 ${className ?? ''}`}>
        <AlertCircle className="h-3 w-3" />
        Desactualizado
      </Badge>
    )
  }

  return (
    <Badge variant="default" className={`gap-1 bg-green-100 text-green-800 hover:bg-green-100 ${className ?? ''}`}>
      <CheckCircle className="h-3 w-3" />
      Al día
    </Badge>
  )
}