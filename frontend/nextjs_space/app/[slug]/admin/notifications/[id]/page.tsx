'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'
import { notificationApi } from '@/lib/api'
import { Notification } from '@/lib/types'
import { ArrowLeft, Loader2, Check, Trash2, AlertCircle } from 'lucide-react'
import { NotificationBadge, getNotificationIcon, getNotificationColor } from '@/components/notification-badge'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

export default function NotificationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const notificationId = params?.id as string
  const { token } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token && notificationId) {
      fetchNotification()
    }
  }, [token, notificationId])

  const fetchNotification = async () => {
    setLoading(true)
    try {
      const data = await notificationApi.getById(notificationId, token)
      setNotification(data)
      
      // Auto-mark as read when viewing
      if (data && !data.isRead) {
        await notificationApi.markAsRead(notificationId, token)
      }
    } catch (error) {
      console.error('Error fetching notification:', error)
      setError('No se pudo cargar la notificación')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta notificación?')) return
    
    try {
      await notificationApi.delete(notificationId, token)
      toast({
        title: 'Éxito',
        description: 'Notificación eliminada',
      })
      router.push(`/${slug}/admin/notifications`)
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
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Cargando notificación...</span>
        </div>
      </AdminLayout>
    )
  }

  if (error || !notification) {
    return (
      <AdminLayout>
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Error al Cargar
              </h3>
              <p className="text-gray-500 mb-4">{error || 'Notificación no encontrada'}</p>
              <Link href={`/${slug}/admin/notifications`}>
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a Notificaciones
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    )
  }

  const Icon = getNotificationIcon(notification.type)
  const colorClass = getNotificationColor(notification.type)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <div>
          <Link href={`/${slug}/admin/notifications`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Notificaciones
            </Button>
          </Link>
        </div>

        {/* Notification Detail Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-gray-100 ${colorClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">{notification.title}</CardTitle>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <NotificationBadge type={notification.type} />
                    <span>·</span>
                    <span>
                      {format(new Date(notification.createdAt), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                    </span>
                    {notification.isRead && notification.readAt && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Leída
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Message */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Mensaje</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{notification.message}</p>
            </div>

            {/* Metadata */}
            {notification.metadata && Object.keys(notification.metadata).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Detalles Adicionales</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    {JSON.stringify(notification.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Municipality Info */}
            {notification.municipality && (
              <Alert>
                <AlertDescription>
                  <div className="font-medium mb-1">Municipalidad</div>
                  <div className="text-sm">
                    {notification.municipality.name} ({notification.municipality.slug})
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Creator Info */}
            {notification.creator && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Creado por</h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {notification.creator.fullName?.charAt(0) || notification.creator.email?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {notification.creator.fullName || notification.creator.email}
                    </div>
                    <div className="text-xs text-gray-500">{notification.creator.email}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}