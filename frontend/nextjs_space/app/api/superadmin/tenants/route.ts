
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/audit-logger'
import { isSuperAdmin } from '@/lib/rbac'
import { validateToken } from '@/lib/auth-middleware'
import { 
  generateSlugFromName, 
  isSlugAvailable, 
  getComunaCoordinates 
} from '@/lib/tenant-utils'
import bcrypt from 'bcryptjs'

/**
 * GET /api/superadmin/tenants
 * Lista todos los tenants (solo superadmin)
 */
export async function GET(request: NextRequest) {
  try {
    const authUser = await validateToken(request)
    
    if (!authUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    if (!isSuperAdmin(authUser.role)) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const tenants = await prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            budgets: true,
            expenditures: true,
            contracts: true,
          },
        },
      },
    })

    return NextResponse.json(tenants)
  } catch (error) {
    console.error('Error fetching tenants:', error)
    return NextResponse.json(
      { error: 'Error al obtener tenants' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/superadmin/tenants
 * Crea un nuevo tenant (solo superadmin)
 */
export async function POST(request: NextRequest) {
  try {
    const authUser = await validateToken(request)
    
    if (!authUser) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    if (!isSuperAdmin(authUser.role)) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const body = await request.json()
    const {
      name,
      slug: providedSlug,
      region,
      comuna,
      contactEmail,
      contactPhone,
      plan = 'base',
      demoDataEnabled = false,
      adminEmail,
      adminPassword = 'admin123', // Default password, debería cambiarse
    } = body

    // Validaciones
    if (!name || !region || !comuna || !contactEmail) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Generar slug si no se proporciona
    let slug = providedSlug
    if (!slug) {
      slug = generateSlugFromName(name)
    }

    // Validar disponibilidad del slug
    const available = await isSlugAvailable(slug)
    if (!available) {
      return NextResponse.json(
        { error: `El slug "${slug}" no está disponible` },
        { status: 400 }
      )
    }

    // Obtener coordenadas del mapa
    const mapCoords = getComunaCoordinates(comuna)

    // Crear tenant
    const tenant = await prisma.tenant.create({
      data: {
        slug,
        name,
        status: 'provisioning',
        plan,
        region,
        comuna,
        contactEmail,
        contactPhone,
        defaultMapComuna: comuna,
        mapCenterLat: mapCoords.lat,
        mapCenterLng: mapCoords.lng,
        mapZoom: mapCoords.zoom,
        demoDataEnabled,
        maxUsers: plan === 'base' ? 10 : plan === 'pro' ? 50 : 999,
        maxStorageGB: plan === 'base' ? 10 : plan === 'pro' ? 50 : 200,
      },
    })

    // Crear usuario administrador municipal inicial
    if (adminEmail) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      await prisma.user.create({
        data: {
          email: adminEmail,
          passwordHash: hashedPassword,
          role: 'municipal_admin',
          tenantId: tenant.id,
          firstName: 'Administrador',
          lastName: 'Municipal',
        },
      })
    }

    // Log audit
    await logAudit({
      tenantId: tenant.id,
      actor: authUser.email,
      actorRole: 'super_admin',
      action: AUDIT_ACTIONS.CREATE_TENANT,
      resource: 'tenant',
      resourceId: tenant.id,
      metadata: { slug, name, plan },
      ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json(tenant, { status: 201 })
  } catch (error) {
    console.error('Error creating tenant:', error)
    return NextResponse.json(
      { error: 'Error al crear tenant' },
      { status: 500 }
    )
  }
}
