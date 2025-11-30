
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

    const projects = await prisma.project.findMany({
      where: { tenantId: tenant.id },
      orderBy: { createdAt: 'desc' }
    })
    
    // Map database fields to expected frontend format
    const mappedProjects = projects.map(project => ({
      ...project,
      name: project.title,
      budget: project.approvedBudget || project.requestedBudget || 0
    }))
    
    return NextResponse.json(mappedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 })
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
    
    const project = await prisma.project.create({
      data: {
        tenantId: tenant.id,
        title: body.title,
        description: body.description,
        status: body.status || 'planificado',
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        department: body.department || 'General',
        category: body.category,
        requestedBudget: body.requestedBudget ? parseFloat(body.requestedBudget) : null,
        approvedBudget: body.approvedBudget ? parseFloat(body.approvedBudget) : null,
        fundingSourceId: body.fundingSourceId || null,
        location: body.location || null
      }
    })
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export { GET, POST }
