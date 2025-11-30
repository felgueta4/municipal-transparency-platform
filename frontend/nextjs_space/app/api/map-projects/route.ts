
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getTenantForAPI } from '@/lib/get-tenant'

const prisma = new PrismaClient()

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const tenant = await getTenantForAPI(new Headers(request.headers))
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no identificado' }, { status: 400 })
    }

    const projects = await prisma.municipalMapProject.findMany({
      where: { 
        tenantId: tenant.id,
        isActive: true 
      },
      orderBy: { createdAt: 'desc' },
    })

    const geojson = {
      type: 'FeatureCollection',
      features: projects.map((project) => ({
        type: 'Feature',
        properties: {
          id: project.id,
          name: project.name,
          description: project.description,
          category: project.category,
          progress: project.progress,
          amount: project.amount,
          comuna: project.comuna,
        },
        geometry: {
          type: 'Point',
          coordinates: [project.longitude, project.latitude],
        },
      })),
    }

    return NextResponse.json(geojson)
  } catch (error) {
    console.error('Error fetching map projects:', error)
    return NextResponse.json({ error: 'Error al obtener proyectos del mapa' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await getTenantForAPI(new Headers(request.headers))
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no identificado' }, { status: 400 })
    }

    const body = await request.json()
    
    const project = await prisma.municipalMapProject.create({
      data: {
        tenantId: tenant.id,
        name: body.name,
        description: body.description,
        category: body.category,
        latitude: parseFloat(body.latitude),
        longitude: parseFloat(body.longitude),
        progress: parseInt(body.progress) || 0,
        amount: parseFloat(body.amount) || 0,
        comuna: body.comuna,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    })
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating map project:', error)
    return NextResponse.json({ error: 'Error al crear proyecto en mapa' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
