
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getTenantForAPI } from '@/lib/get-tenant'

export async function POST(request: NextRequest) {
  try {
    const tenant = await getTenantForAPI(request.headers)
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant no identificado' }, { status: 400 })
    }

    const body = await request.json()
    const {
      userMessage,
      botResponse,
      intent,
      category,
      hasData,
      filters,
      sessionId,
      responseTime,
    } = body

    // Crear registro de interacción
    const interaction = await prisma.chatbotInteraction.create({
      data: {
        tenantId: tenant.id,
        userMessage,
        botResponse,
        intent,
        category,
        hasData: hasData !== undefined ? hasData : true,
        filters: filters || null,
        sessionId: sessionId || null,
        userAgent: request.headers.get('user-agent') || undefined,
        responseTime: responseTime || null,
        timestamp: new Date(),
      },
    })

    return NextResponse.json({ success: true, id: interaction.id })
  } catch (error) {
    console.error('Error logging chatbot interaction:', error)
    return NextResponse.json(
      { error: 'Error al registrar interacción' },
      { status: 500 }
    )
  }
}
