
'use client'

import { useAuth } from '@/components/auth-provider'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Home, 
  TrendingUp, 
  FileText, 
  Briefcase, 
  Users, 
  Upload, 
  Settings, 
  LogOut,
  Menu,
  Sparkles,
  Globe,
  BarChart3,
  UserCog,
  MapPin,
  MessageSquare,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { notificationApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, logout, isLoading, token } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Extraer el slug del pathname (primer segmento de la URL)
  const slug = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) || []
    return segments[0] || 'demo' // Fallback a 'demo' si no hay slug
  }, [pathname])

  useEffect(() => {
    if (!isLoading && !token) {
      router.push(`/${slug}/admin/login`)
    }
  }, [isLoading, token, router, slug])

  // Fetch unread notifications count
  useEffect(() => {
    if (token && user?.municipalityId) {
      fetchUnreadCount()
      
      // Poll every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000)
      return () => clearInterval(interval)
    }
  }, [token, user?.municipalityId])

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationApi.getUnreadCount(user?.municipalityId, token)
      setUnreadCount(response?.count || 0)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  // Navegación con rutas dinámicas basadas en el slug
  const navigation = [
    { name: 'Dashboard', href: `/${slug}/admin/dashboard`, icon: Home, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Notificaciones', href: `/${slug}/admin/notifications`, icon: Bell, roles: ['admin', 'funcionario', 'visualizador'], badge: unreadCount > 0 ? unreadCount : undefined },
    { name: 'Análisis IA', href: `/${slug}/admin/analytics`, icon: Sparkles, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Reportes', href: `/${slug}/admin/reports`, icon: BarChart3, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Estadísticas del Bot', href: `/${slug}/admin/bot-stats`, icon: MessageSquare, roles: ['admin', 'funcionario'] },
    { name: 'Presupuestos', href: `/${slug}/admin/budgets`, icon: TrendingUp, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Gastos', href: `/${slug}/admin/expenditures`, icon: FileText, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Proyectos', href: `/${slug}/admin/projects`, icon: Briefcase, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Contratos', href: `/${slug}/admin/contracts`, icon: Users, roles: ['admin', 'funcionario', 'visualizador'] },
    { name: 'Mapas Comunales', href: `/${slug}/admin/mapas`, icon: MapPin, roles: ['admin', 'funcionario'] },
    { name: 'Integraciones', href: `/${slug}/admin/integrations`, icon: Globe, roles: ['admin', 'funcionario'] },
    { name: 'Cargar Archivos', href: `/${slug}/admin/file-upload`, icon: Upload, roles: ['admin', 'funcionario'] },
    { name: 'Conectores API', href: `/${slug}/admin/api-connectors`, icon: Settings, roles: ['admin', 'funcionario'] },
    { name: 'Usuarios', href: `/${slug}/admin/usuarios`, icon: UserCog, roles: ['admin'] },
  ]

  // Filtrar navegación según el rol del usuario
  const userRole = user?.role || '';
  const filteredNavigation = navigation.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="font-semibold">Admin Panel</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b">
              <Link href={`/${slug}/admin/dashboard`} className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-bold text-gray-900">Admin Panel</div>
                  <div className="text-sm text-gray-600">Transparencia Municipal</div>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {filteredNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* User section */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user?.fullName || user?.email}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link href={`/${slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Ver Portal Público
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="px-2"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
