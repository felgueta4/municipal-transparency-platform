
/**
 * Tenant Resolver Middleware
 * Extrae el tenant del subdominio y lo adjunta al request
 */

import { NextRequest } from 'next/server'
import { prisma } from './db'

export interface TenantInfo {
  id: string
  slug: string
  name: string
  status: string
  plan: string
  region: string
  comuna: string
  contactEmail: string
  logoUrl?: string | null
  primaryColor?: string | null
  secondaryColor?: string | null
  defaultMapComuna: string
  demoDataEnabled: boolean
  maxUsers: number
  maxStorageGB: number
}

/**
 * Extrae el slug del tenant desde el hostname
 * Ejemplos:
 * - renca.transparenciaciudadana.com → "renca"
 * - admin.transparenciaciudadana.com → "admin" (superadmin)
 * - lumen.abacusai.app → null (desarrollo/preview, usa tenant demo)
 * - localhost:3001 → null (desarrollo)
 */
export function extractTenantSlug(hostname: string): string | null {
  // Desarrollo local
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return null // Retorna null para usar tenant demo
  }

  // Dominio de producción: transparenciaciudadana.com
  if (hostname.includes('transparenciaciudadana.com')) {
    const parts = hostname.split('.')
    
    // transparenciaciudadana.com o www.transparenciaciudadana.com
    // → No es responsabilidad de esta app (otro proyecto)
    if (parts.length === 2 || (parts.length === 3 && parts[0] === 'www')) {
      return null
    }
    
    // admin.transparenciaciudadana.com → superadmin
    if (parts.length === 3 && parts[0] === 'admin') {
      return 'admin'
    }
    
    // {slug}.transparenciaciudadana.com → tenant específico
    if (parts.length === 3) {
      return parts[0] // slug del tenant
    }
  }

  // Preview/desarrollo en abacusai.app - usar tenant demo
  if (hostname.includes('abacusai.app')) {
    return null // Retorna null para usar tenant demo
  }

  // Por defecto, no hay tenant
  return null
}

/**
 * Resuelve el tenant desde la base de datos
 */
export async function resolveTenant(slug: string): Promise<TenantInfo | null> {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        status: true,
        plan: true,
        region: true,
        comuna: true,
        contactEmail: true,
        logoUrl: true,
        primaryColor: true,
        secondaryColor: true,
        defaultMapComuna: true,
        demoDataEnabled: true,
        maxUsers: true,
        maxStorageGB: true,
      },
    })

    return tenant
  } catch (error) {
    console.error('Error resolving tenant:', error)
    return null
  }
}

/**
 * Middleware helper para Next.js
 */
export async function getTenantFromRequest(
  request: NextRequest
): Promise<TenantInfo | null> {
  const hostname = request.headers.get('host') || ''
  const slug = extractTenantSlug(hostname)

  if (!slug || slug === 'admin') {
    return null
  }

  return await resolveTenant(slug)
}

/**
 * Hook para obtener tenant en API routes
 */
export async function getTenantFromHeaders(
  headers: Headers
): Promise<TenantInfo | null> {
  const hostname = headers.get('host') || ''
  const slug = extractTenantSlug(hostname)

  if (!slug || slug === 'admin') {
    return null
  }

  return await resolveTenant(slug)
}
