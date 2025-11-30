
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logAudit, AUDIT_ACTIONS } from '@/lib/audit-logger'
import { isSuperAdmin } from '@/lib/rbac'
import jwt from 'jsonwebtoken'

/**
 * POST /api/superadmin/tenants/:id/provision
 * Provisiona datos de demostración para un tenant
 */
export async function POST(
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
    })

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no encontrado' }, { status: 404 })
    }

    // Generar datos de demostración
    const currentYear = new Date().getFullYear()
    
    // Presupuestos
    await prisma.budget.createMany({
      data: [
        {
          tenantId: params.id,
          fiscalYearId: currentYear.toString(),
          department: 'Educación',
          program: 'Educación Básica',
          category: 'Personal',
          subcategory: 'Docentes',
          amountPlanned: 150000000,
          currency: 'CLP',
          isPublic: true,
        },
        {
          tenantId: params.id,
          fiscalYearId: currentYear.toString(),
          department: 'Salud',
          program: 'Atención Primaria',
          category: 'Operaciones',
          subcategory: 'Medicamentos',
          amountPlanned: 80000000,
          currency: 'CLP',
          isPublic: true,
        },
        {
          tenantId: params.id,
          fiscalYearId: currentYear.toString(),
          department: 'Obras Públicas',
          program: 'Infraestructura',
          category: 'Inversión',
          subcategory: 'Construcción',
          amountPlanned: 200000000,
          currency: 'CLP',
          isPublic: true,
        },
      ],
    })

    // Gastos
    await prisma.expenditure.createMany({
      data: [
        {
          tenantId: params.id,
          fiscalYearId: currentYear.toString(),
          date: new Date('2024-01-15'),
          department: 'Educación',
          program: 'Educación Básica',
          category: 'Personal',
          subcategory: 'Docentes',
          concept: 'Salarios mensuales',
          amountActual: 12500000,
          currency: 'CLP',
          isPublic: true,
        },
        {
          tenantId: params.id,
          fiscalYearId: currentYear.toString(),
          date: new Date('2024-02-10'),
          department: 'Salud',
          program: 'Atención Primaria',
          category: 'Operaciones',
          subcategory: 'Medicamentos',
          concept: 'Compra medicamentos',
          amountActual: 6500000,
          currency: 'CLP',
          isPublic: true,
        },
      ],
    })

    // Proyectos
    await prisma.project.createMany({
      data: [
        {
          tenantId: params.id,
          title: 'Mejoramiento Plaza Central',
          description: 'Renovación completa de la Plaza Central con áreas verdes y juegos infantiles',
          status: 'En Progreso',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          department: 'Obras Públicas',
          category: 'Infraestructura',
          requestedBudget: 50000000,
          approvedBudget: 45000000,
          location: tenant.comuna,
          isPublic: true,
        },
        {
          tenantId: params.id,
          title: 'Centro de Salud Familiar',
          description: 'Construcción de nuevo CESFAM en sector norte',
          status: 'Planificado',
          startDate: new Date('2024-06-01'),
          department: 'Salud',
          category: 'Infraestructura',
          requestedBudget: 150000000,
          approvedBudget: 140000000,
          location: tenant.comuna,
          isPublic: true,
        },
      ],
    })

    // Contratos
    await prisma.contract.createMany({
      data: [
        {
          tenantId: params.id,
          supplierId: 'SUP-001',
          title: 'Mantenimiento Áreas Verdes',
          description: 'Servicio de mantención de áreas verdes municipales',
          amount: 15000000,
          currency: 'CLP',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          status: 'Vigente',
          contractNumber: 'CT-2024-001',
          isPublic: true,
        },
      ],
    })

    // Proyectos del mapa
    await prisma.municipalMapProject.createMany({
      data: [
        {
          tenantId: params.id,
          name: 'Plaza Central Renovada',
          description: 'Renovación de plaza con juegos y áreas verdes',
          category: 'Infraestructura',
          latitude: tenant.mapCenterLat || -33.4039,
          longitude: tenant.mapCenterLng || -70.7167,
          progress: 65,
          amount: 45000000,
          isActive: true,
          comuna: tenant.comuna,
        },
        {
          tenantId: params.id,
          name: 'Nuevo CESFAM Norte',
          description: 'Centro de Salud Familiar en construcción',
          category: 'Salud',
          latitude: (tenant.mapCenterLat || -33.4039) + 0.01,
          longitude: (tenant.mapCenterLng || -70.7167) + 0.01,
          progress: 30,
          amount: 140000000,
          isActive: true,
          comuna: tenant.comuna,
        },
      ],
    })

    // Actualizar estado del tenant
    await prisma.tenant.update({
      where: { id: params.id },
      data: {
        status: 'active',
        demoDataEnabled: true,
      },
    })

    // Log audit
    await logAudit({
      tenantId: params.id,
      actor: user.email,
      actorRole: 'super_admin',
      action: AUDIT_ACTIONS.PROVISION_TENANT,
      resource: 'tenant',
      resourceId: params.id,
      ipAddress: request.headers.get('x-forwarded-for') || request.ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({
      success: true,
      message: 'Tenant provisionado con datos de demostración',
    })
  } catch (error) {
    console.error('Error provisioning tenant:', error)
    return NextResponse.json(
      { error: 'Error al provisionar tenant' },
      { status: 500 }
    )
  }
}
