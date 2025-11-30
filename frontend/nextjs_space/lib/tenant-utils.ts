
/**
 * Utilidades para trabajar con tenants
 */

import { prisma } from './db'

/**
 * Verifica si un tenant está activo
 */
export function isTenantActive(status: string): boolean {
  return status === 'active'
}

/**
 * Verifica si un tenant puede usar una feature según su plan
 */
export function canUseFeature(
  plan: string,
  feature: 'chatbot' | 'advanced_analytics' | 'custom_branding' | 'api_access'
): boolean {
  const planFeatures = {
    base: ['chatbot'],
    pro: ['chatbot', 'advanced_analytics', 'custom_branding'],
    enterprise: ['chatbot', 'advanced_analytics', 'custom_branding', 'api_access'],
  }

  return planFeatures[plan as keyof typeof planFeatures]?.includes(feature) || false
}

/**
 * Obtiene las coordenadas por defecto de una comuna chilena
 */
export function getComunaCoordinates(comuna: string): { lat: number; lng: number; zoom: number } {
  const comunaCoords: Record<string, { lat: number; lng: number; zoom: number }> = {
    Renca: { lat: -33.4039, lng: -70.7167, zoom: 13 },
    Santiago: { lat: -33.4489, lng: -70.6693, zoom: 12 },
    Providencia: { lat: -33.4333, lng: -70.6167, zoom: 13 },
    'Las Condes': { lat: -33.4167, lng: -70.5833, zoom: 13 },
    Ñuñoa: { lat: -33.4569, lng: -70.5967, zoom: 13 },
    Maipú: { lat: -33.5167, lng: -70.7667, zoom: 13 },
    'La Florida': { lat: -33.5167, lng: -70.5833, zoom: 13 },
    Puente_Alto: { lat: -33.6167, lng: -70.5833, zoom: 13 },
    'Puente Alto': { lat: -33.6167, lng: -70.5833, zoom: 13 },
    Valparaíso: { lat: -33.0472, lng: -71.6127, zoom: 12 },
    'Viña del Mar': { lat: -33.0246, lng: -71.5517, zoom: 12 },
    Concepción: { lat: -36.8201, lng: -73.0444, zoom: 12 },
    'La Serena': { lat: -29.9027, lng: -71.2519, zoom: 12 },
    Antofagasta: { lat: -23.6509, lng: -70.3975, zoom: 12 },
    Temuco: { lat: -38.7359, lng: -72.5904, zoom: 12 },
  }

  return comunaCoords[comuna] || { lat: -33.4489, lng: -70.6693, zoom: 12 } // Default: Santiago
}

/**
 * Genera un slug único a partir del nombre de la municipalidad
 */
export function generateSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales con guión
    .replace(/^-+|-+$/g, '') // Quitar guiones al inicio y final
}

/**
 * Valida si un slug es válido para subdominios
 */
export function isValidSlug(slug: string): boolean {
  // Debe tener entre 3 y 63 caracteres
  // Solo puede contener letras minúsculas, números y guiones
  // No puede empezar ni terminar con guión
  const slugRegex = /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/
  return slugRegex.test(slug)
}

/**
 * Slugs reservados que no se pueden usar para tenants
 */
export const RESERVED_SLUGS = [
  'admin',
  'api',
  'www',
  'app',
  'mail',
  'ftp',
  'smtp',
  'pop',
  'imap',
  'dev',
  'staging',
  'test',
  'demo',
  'static',
  'assets',
  'cdn',
  'media',
  'files',
  'uploads',
  'downloads',
  'docs',
  'help',
  'support',
  'status',
  'blog',
  'forum',
  'shop',
  'store',
  'payment',
  'checkout',
  'login',
  'signup',
  'register',
  'auth',
  'oauth',
  'sso',
  'superadmin',
  'root',
  'system',
  'config',
]

/**
 * Verifica si un slug está reservado
 */
export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.includes(slug.toLowerCase())
}

/**
 * Valida disponibilidad de un slug
 */
export async function isSlugAvailable(slug: string): Promise<boolean> {
  if (!isValidSlug(slug)) {
    return false
  }

  if (isReservedSlug(slug)) {
    return false
  }

  const existing = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true },
  })

  return !existing
}
