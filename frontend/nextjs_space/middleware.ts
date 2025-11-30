
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware para manejar rutas basadas en slug (tenant)
 * Estructura de URLs:
 * - /superadmin -> Portal de superadministrador
 * - /[slug] -> Portal ciudadano de la municipalidad
 * - /[slug]/admin -> Portal administrativo de la municipalidad
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Log para debug (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] pathname:', pathname)
  }

  // Si está en la raíz, redirigir a /superadmin
  // (o podrías crear una landing page en el futuro)
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/superadmin'
    return NextResponse.redirect(url, { status: 307 })
  }

  // Extraer el tenant slug del path
  const pathSegments = pathname.split('/').filter(Boolean)
  if (pathSegments.length > 0) {
    const potentialSlug = pathSegments[0]
    
    // Si es una ruta reservada, dejar pasar
    if (potentialSlug === 'superadmin' || potentialSlug === '_next' || potentialSlug === 'api') {
      return NextResponse.next()
    }
    
    // Si es un slug de tenant válido (cualquier string que no sea reservado)
    // el tenant se resolverá en las páginas individuales
    // Aquí solo dejamos pasar la request con el slug incluido
    const response = NextResponse.next()
    
    // Agregar el slug como header para fácil acceso en APIs
    response.headers.set('x-tenant-slug', potentialSlug)
    
    return response
  }

  // Continuar con la request normal
  return NextResponse.next()
}

/**
 * Configuración del matcher
 * Solo ejecutar el middleware en rutas públicas (no en API, _next, static)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - templates (archivos estáticos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|templates).*)',
  ],
}
