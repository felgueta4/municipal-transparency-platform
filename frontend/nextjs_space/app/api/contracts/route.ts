
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getTenantForAPI } from '@/lib/get-tenant'

const prisma = new PrismaClient()

export const dynamic = "force-dynamic"

async function GET(request: Request) {
  try {
    const tenant = await getTenantForAPI(new Headers(request.headers))
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no identificado' }, { status: 400 })
    }

    const contracts = await prisma.contract.findMany({
      where: { tenantId: tenant.id },
      orderBy: { startDate: 'desc' }
    })
    
    return NextResponse.json(contracts)
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json({ error: 'Error al obtener contratos' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

async function POST(request: Request) {
  try {
    const tenant = await getTenantForAPI(new Headers(request.headers))
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no identificado' }, { status: 400 })
    }

    const body = await request.json()
    
    const contract = await prisma.contract.create({
      data: {
        tenantId: tenant.id,
        supplierId: body.supplierId,
        title: body.title,
        description: body.description,
        amount: parseFloat(body.amount),
        currency: body.currency || 'CLP',
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        status: body.status || 'vigente',
        contractNumber: body.contractNumber || null
      }
    })
    
    return NextResponse.json(contract)
  } catch (error) {
    console.error('Error creating contract:', error)
    return NextResponse.json({ error: 'Error al crear contrato' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export { GET, POST }
