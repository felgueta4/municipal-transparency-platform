
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow'
  onClick?: () => void
}

const colorClasses = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  purple: 'text-purple-600 bg-purple-50',
  orange: 'text-orange-600 bg-orange-50',
  red: 'text-red-600 bg-red-50',
  yellow: 'text-yellow-600 bg-yellow-50'
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick
}: KPICardProps) {
  // Check if value indicates no data
  const isZeroOrEmpty = value === 0 || value === '0' || value === '$0' || value === 'CLP 0' || value === 'CLP $0'
  
  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-200",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", colorClasses[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">
            {value}
          </div>
          
          {isZeroOrEmpty && (
            <div className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block">
              📊 Aún no hay datos registrados
            </div>
          )}
          
          {trend && !isZeroOrEmpty && (
            <div className={cn(
              "text-xs font-medium flex items-center gap-1",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-gray-500">vs. mes anterior</span>
            </div>
          )}
          
          {subtitle && (
            <p className="text-xs text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
