
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getTenantForAPI } from '@/lib/get-tenant'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const tenant = await getTenantForAPI(request.headers)
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no identificado' }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Total de interacciones
    const totalInteractions = await prisma.chatbotInteraction.count({
      where: {
        tenantId: tenant.id,
        timestamp: { gte: startDate },
      },
    })

    // Interacciones por categoría
    const byCategory = await prisma.chatbotInteraction.groupBy({
      by: ['category'],
      where: {
        tenantId: tenant.id,
        timestamp: { gte: startDate },
      },
      _count: true,
    })

    // Top intents
    const topIntents = await prisma.chatbotInteraction.groupBy({
      by: ['intent'],
      where: {
        tenantId: tenant.id,
        timestamp: { gte: startDate },
        intent: { not: null },
      },
      _count: true,
      orderBy: {
        _count: {
          intent: 'desc',
        },
      },
      take: 10,
    })

    // Preguntas sin respuesta
    const noDataQueries = await prisma.chatbotInteraction.count({
      where: {
        tenantId: tenant.id,
        timestamp: { gte: startDate },
        hasData: false,
      },
    })

    // Tiempo promedio de respuesta
    const avgResponseTime = await prisma.chatbotInteraction.aggregate({
      where: {
        tenantId: tenant.id,
        timestamp: { gte: startDate },
        responseTime: { not: null },
      },
      _avg: {
        responseTime: true,
      },
    })

    // Tendencia diaria
    const dailyStats = await prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as count
      FROM chatbot_interactions
      WHERE tenant_id = ${tenant.id}
        AND timestamp >= ${startDate}
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `

    return NextResponse.json({
      totalInteractions,
      byCategory,
      topIntents,
      noDataQueries,
      noDataPercentage: totalInteractions > 0 
        ? ((noDataQueries / totalInteractions) * 100).toFixed(2) 
        : '0',
      avgResponseTime: avgResponseTime._avg.responseTime || 0,
      dailyStats,
    })
  } catch (error) {
    console.error('Error fetching chatbot stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}
