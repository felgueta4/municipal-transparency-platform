'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { notificationApi } from '@/lib/api'
import { Notification, NotificationType, NotificationResponse } from '@/lib/types'
import { 
  Bell, 
  Filter, 
  Loader2, 
  Trash2, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle
} from 'lucide-react'
import { NotificationBadge, getNotificationIcon, getNotificationColor } from '@/components/notification-badge'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

export default function NotificationsPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const { user, token } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [totalPages, setTotalPages] = useState(1)
  
  // Filters
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all')
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all')
  
  // Polling for new notifications
  const [lastFetch, setLastFetch] = useState<number>(Date.now())

  useEffect(() => {
    if (token) {
      fetchNotifications()
    }
  }, [token, page, typeFilter, readFilter])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        fetchNotifications(true) // Silent refresh
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [token, page, typeFilter, readFilter])

  const fetchNotifications = async (silent = false) => {
    if (!silent) setLoading(true)
    
    try {
      const filters: any = {
        page,
        limit,
      }
      
      if (typeFilter !== 'all') {
        filters.type = typeFilter
      }
      
      if (readFilter === 'read') {
        filters.isRead = true
      } else if (readFilter === 'unread') {
        filters.isRead = false
      }

      // Get municipality ID from user if admin_muni
      if (user?.role === 'admin_muni' && user?.municipalityId) {
        filters.municipalityId = user.municipalityId
      }

      const response: NotificationResponse = await notificationApi.getAll(filters, token)
      
      setNotifications(response.data || [])
      setTotal(response.total || 0)
      setTotalPages(response.totalPages || 1)
      setLastFetch(Date.now())
    } catch (error) {
      console.error('Error fetching notifications:', error)
      if (!silent) {
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las notificaciones',
          variant: 'destructive',
        })
      }
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    try {
      await notificationApi.markAsRead(id, token)
      toast({
        title: 'Éxito',
        description: 'Notificación marcada como leída',
      })
      fetchNotifications(true)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo marcar como leída',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    if (!confirm('¿Estás seguro de que deseas eliminar esta notificación?')) return
    
    try {
      await notificationApi.delete(id, token)
      toast({
        title: 'Éxito',
        description: 'Notificación eliminada',
      })
      fetchNotifications()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la notificación',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Notificaciones">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Cargando notificaciones...</span>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Notificaciones">
      <div className="space-y-6">
        {/* Header with Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Notificaciones
                </CardTitle>
                <CardDescription>
                  {total} notificación{total !== 1 ? 'es' : ''} en total
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="info">Información</SelectItem>
                    <SelectItem value="warning">Advertencia</SelectItem>
                    <SelectItem value="success">Éxito</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="update">Actualización</SelectItem>
                    <SelectItem value="version_release">Nueva Versión</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={readFilter} onValueChange={(v: any) => setReadFilter(v)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="unread">No leídas</SelectItem>
                    <SelectItem value="read">Leídas</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={() => fetchNotifications()} variant="outline" size="sm">
                  Actualizar
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No hay notificaciones
                  </h3>
                  <p className="text-gray-500">
                    No se encontraron notificaciones con los filtros seleccionados
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              const colorClass = getNotificationColor(notification.type)
              
              return (
                <Link key={notification.id} href={`/${slug}/admin/notifications/${notification.id}`}>
                  <Card 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${
                      !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-gray-100 ${colorClass}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {notification.title}
                              {!notification.isRead && (
                                <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                              )}
                            </h3>
                            <NotificationBadge type={notification.type} />
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              {format(new Date(notification.createdAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                              {notification.municipality && (
                                <span className="ml-2">· {notification.municipality.name}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => handleMarkAsRead(notification.id, e)}
                                  className="h-8"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Marcar leída
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => handleDelete(notification.id, e)}
                                className="h-8 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Página {page} de {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Last Update Info */}
        <div className="text-center text-xs text-gray-500">
          Última actualización: {format(lastFetch, 'HH:mm:ss')}
        </div>
      </div>
    </AdminLayout>
  )
}