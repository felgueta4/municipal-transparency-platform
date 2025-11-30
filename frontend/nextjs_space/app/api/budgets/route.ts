
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

    const budgets = await prisma.budget.findMany({
      where: { tenantId: tenant.id },
      orderBy: { createdAt: 'desc' }
    })
    
    // Map database fields to expected frontend format
    const mappedBudgets = budgets.map(budget => ({
      ...budget,
      year: parseInt(budget.fiscalYearId),
      totalAmount: budget.amountPlanned,
      description: `${budget.program} - ${budget.category} (${budget.department})`
    }))
    
    return NextResponse.json(mappedBudgets)
  } catch (error) {
    console.error('Error fetching budgets:', error)
    return NextResponse.json({ error: 'Error al obtener presupuestos' }, { status: 500 })
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
    
    const budget = await prisma.budget.create({
      data: {
        tenantId: tenant.id,
        fiscalYearId: body.fiscalYearId || new Date().getFullYear().toString(),
        department: body.department || 'General',
        program: body.program || 'General',
        category: body.category,
        subcategory: body.subcategory || 'General',
        amountPlanned: parseFloat(body.amountPlanned),
        currency: body.currency || 'CLP',
        notes: body.notes || null
      }
    })
    
    return NextResponse.json(budget)
  } catch (error) {
    console.error('Error creating budget:', error)
    return NextResponse.json({ error: 'Error al crear presupuesto' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export { GET, POST }
