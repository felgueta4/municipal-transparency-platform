
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

    const expenditures = await prisma.expenditure.findMany({
      where: { tenantId: tenant.id },
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(expenditures)
  } catch (error) {
    console.error('Error fetching expenditures:', error)
    return NextResponse.json({ error: 'Error al obtener gastos' }, { status: 500 })
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
    
    const expenditure = await prisma.expenditure.create({
      data: {
        tenantId: tenant.id,
        fiscalYearId: body.fiscalYearId || new Date().getFullYear().toString(),
        date: new Date(body.date),
        department: body.department || 'General',
        program: body.program || 'General',
        category: body.category,
        subcategory: body.subcategory || 'General',
        concept: body.concept,
        amountActual: parseFloat(body.amountActual),
        currency: body.currency || 'CLP',
        supplierId: body.supplierId || null,
        procurementRef: body.procurementRef || null,
        location: body.location || null
      }
    })
    
    return NextResponse.json(expenditure)
  } catch (error) {
    console.error('Error creating expenditure:', error)
    return NextResponse.json({ error: 'Error al crear gasto' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export { GET, POST }
