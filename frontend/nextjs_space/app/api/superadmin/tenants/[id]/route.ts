
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/audit-logger'
import { isSuperAdmin } from '@/lib/rbac'
import jwt from 'jsonwebtoken'

/**
 * GET /api/superadmin/tenants/:id
 * Obtiene detalles de un tenant específico
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar token JWT
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const secret = process.env.NEXTAUTH_SECRET || 'default-secret-key'
    
    let decoded: any
    try {
      decoded = jwt.verify(token, secret)
    } catch (err) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: { role: true, email: true },
    })

    if (!user || !isSuperAdmin(user.role)) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            budgets: true,
            expenditures: true,
            contracts: true,
            mapProjects: true,
            chatbotInteractions: true,
          },
        },
      },
    })

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no encontrado' }, { status: 404 })
    }

    return NextResponse.json(tenant)
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return NextResponse.json(
      { error: 'Error al obtener tenant' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/superadmin/tenants/:id
 * Actualiza un tenant (configuración, suspensión, reactivación)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar token JWT
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const secret = process.env.NEXTAUTH_SECRET || 'default-secret-key'
    
    let decoded: any
    try {
      decoded = jwt.verify(token, secret)
    } catch (err) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: { role: true, email: true },
    })

    if (!user || !isSuperAdmin(user.role)) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const body = await request.json()
    const { action, ...updateData } = body

    // Acciones especiales
    if (action === 'suspend') {
      const tenant = await prisma.tenant.update({
        where: { id: params.id },
        data: {
          status: 'suspended',
          suspendedAt: new Date(),
          suspensionReason: updateData.reason || 'No especificado',
        },
      })

      await logAudit({
        tenantId: params.id,
        actor: user.email,
        actorRole: 'super_admin',
        action: AUDIT_ACTIONS.SUSPEND_TENANT,
        resource: 'tenant',
        resourceId: params.id,
        metadata: { reason: updateData.reason },
        ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      })

      return NextResponse.json(tenant)
    }

    if (action === 'reactivate') {
      const tenant = await prisma.tenant.update({
        where: { id: params.id },
        data: {
          status: 'active',
          suspendedAt: null,
          suspensionReason: null,
        },
      })

      await logAudit({
        tenantId: params.id,
        actor: user.email,
        actorRole: 'super_admin',
        action: AUDIT_ACTIONS.REACTIVATE_TENANT,
        resource: 'tenant',
        resourceId: params.id,
        ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      })

      return NextResponse.json(tenant)
    }

    // Actualización normal
    const tenant = await prisma.tenant.update({
      where: { id: params.id },
      data: updateData,
    })

    await logAudit({
      tenantId: params.id,
      actor: user.email,
      actorRole: 'super_admin',
      action: AUDIT_ACTIONS.UPDATE_TENANT,
      resource: 'tenant',
      resourceId: params.id,
      metadata: updateData,
      ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json(tenant)
  } catch (error) {
    console.error('Error updating tenant:', error)
    return NextResponse.json(
      { error: 'Error al actualizar tenant' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/superadmin/tenants/:id
 * BLOQUEADO - No se puede borrar tenants desde la UI
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get('authorization')
  let userEmail = 'anonymous'
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.substring(7)
      const secret = process.env.NEXTAUTH_SECRET || 'default-secret-key'
      const decoded: any = jwt.verify(token, secret)
      userEmail = decoded.email
    } catch (err) {
      // Token inválido, usar anonymous
    }
  }
  
  await logAudit({
    tenantId: params.id,
    actor: userEmail,
    actorRole: 'unknown',
    action: 'ATTEMPTED_DELETE_TENANT',
    resource: 'tenant',
    resourceId: params.id,
    metadata: { blocked: true },
    ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
    userAgent: request.headers.get('user-agent') || undefined,
  })

  return NextResponse.json(
    { 
      error: 'Operación bloqueada: No se pueden eliminar tenants desde la UI',
      message: 'Por razones de seguridad, los tenants no pueden ser eliminados desde la interfaz. Contacte al administrador del sistema.'
    },
    { status: 403 }
  )
}
