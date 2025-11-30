/**
 * Helper para obtener tenant en APIs usando el slug del path
 * El middleware agrega el slug como header x-tenant-slug
 */

import { prisma } from './db'

/**
 * Obtiene el tenant desde el slug pasado en el header
 * El middleware extrae el slug de la URL y lo pasa como header
 */
export async function getTenantForAPI(headers: Headers): Promise<{ id: string; slug: string } | null> {
  // Obtener el slug del header agregado por el middleware
  const slug = headers.get('x-tenant-slug')
  
  if (!slug) {
    console.error('[TENANT] No tenant slug found in headers')
    return null
  }
  
  // Buscar el tenant en la base de datos
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true, slug: true },
  })
  
  if (tenant) {
    console.log(`[TENANT] Using tenant: ${tenant.slug} (id: ${tenant.id})`)
    return tenant
  }
  
  console.error(`[TENANT] Tenant not found for slug: ${slug}`)
  return null
}

/**
 * Extrae el slug del tenant directamente desde un pathname
 * Útil para componentes del lado del cliente
 */
export function extractSlugFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0 || segments[0] === 'superadmin' || segments[0] === 'api') {
    return null
  }
  return segments[0]
}

/**
 * Obtiene el tenant desde un slug específico
 * Útil para páginas que reciben el slug como parámetro
 */
export async function getTenantBySlug(slug: string): Promise<{
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
} | null> {
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
    console.error('[TENANT] Error fetching tenant:', error)
    return null
  }
}
