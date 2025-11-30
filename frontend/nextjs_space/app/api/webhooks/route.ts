
import { NextRequest, NextResponse } from 'next/server'

// Gestión de webhooks para notificaciones en tiempo real
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data, target } = body

    // Validar evento
    if (!event || !data) {
      return NextResponse.json(
        { error: 'Event and data are required' },
        { status: 400 }
      )
    }

    // Registrar el webhook
    console.log(`Webhook received: ${event}`, data)

    // Aquí se puede procesar diferentes tipos de eventos
    switch (event) {
      case 'budget.created':
      case 'budget.updated':
        await handleBudgetEvent(event, data)
        break
      case 'expenditure.created':
      case 'expenditure.updated':
        await handleExpenditureEvent(event, data)
        break
      case 'project.status_changed':
        await handleProjectEvent(event, data)
        break
      case 'contract.signed':
        await handleContractEvent(event, data)
        break
      default:
        console.log(`Unknown event type: ${event}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      event,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}

async function handleBudgetEvent(event: string, data: any) {
  console.log(`Processing budget event: ${event}`, data)
  // Aquí se puede enviar notificaciones, actualizar caches, etc.
}

async function handleExpenditureEvent(event: string, data: any) {
  console.log(`Processing expenditure event: ${event}`, data)
}

async function handleProjectEvent(event: string, data: any) {
  console.log(`Processing project event: ${event}`, data)
}

async function handleContractEvent(event: string, data: any) {
  console.log(`Processing contract event: ${event}`, data)
}

// GET para listar webhooks registrados
export async function GET(request: NextRequest) {
  return NextResponse.json({
    webhooks: [
      {
        id: 'budget-webhook',
        event: 'budget.*',
        url: '/api/webhooks',
        active: true
      },
      {
        id: 'expenditure-webhook',
        event: 'expenditure.*',
        url: '/api/webhooks',
        active: true
      },
      {
        id: 'project-webhook',
        event: 'project.status_changed',
        url: '/api/webhooks',
        active: true
      },
      {
        id: 'contract-webhook',
        event: 'contract.signed',
        url: '/api/webhooks',
        active: true
      }
    ]
  })
}
