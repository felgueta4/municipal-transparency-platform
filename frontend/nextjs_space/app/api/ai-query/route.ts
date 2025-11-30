
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getTenantForAPI } from '@/lib/get-tenant'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const maxDuration = 60

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface QueryLog {
  timestamp: string
  query: string
  dataTypes: string[]
  filters: any
  resultCount: number
}

// Función para registrar consultas (logging interno)
function logQuery(log: QueryLog) {
  try {
    const logDir = path.join(process.cwd(), 'logs')
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
    
    const logFile = path.join(logDir, `chat-queries-${new Date().toISOString().split('T')[0]}.json`)
    const logEntry = JSON.stringify(log) + '\n'
    
    fs.appendFileSync(logFile, logEntry)
  } catch (error) {
    console.error('Error logging query:', error)
  }
}

// Función auxiliar para obtener datos PÚBLICOS de la base de datos
async function getDataFromDatabase(dataType: string, tenantId: string, filters?: any) {
  try {
    // CRÍTICO: Solo datos públicos (isPublic = true) y del tenant correcto
    const publicFilter = { isPublic: true, tenantId }
    const combinedFilters = { ...filters, ...publicFilter }

    switch (dataType) {
      case 'budgets':
        return await prisma.budget.findMany({
          where: combinedFilters,
          take: 100,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            department: true,
            category: true,
            subcategory: true,
            amountPlanned: true,
            fiscalYearId: true,
            notes: true,
            currency: true,
            createdAt: true,
            isPublic: true
          }
        })
      
      case 'expenditures':
        return await prisma.expenditure.findMany({
          where: combinedFilters,
          take: 100,
          orderBy: { date: 'desc' },
          select: {
            id: true,
            category: true,
            subcategory: true,
            concept: true,
            amountActual: true,
            date: true,
            department: true,
            currency: true,
            location: true,
            createdAt: true,
            isPublic: true
          }
        })
      
      case 'projects':
        return await prisma.project.findMany({
          where: combinedFilters,
          take: 100,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            requestedBudget: true,
            approvedBudget: true,
            startDate: true,
            endDate: true,
            category: true,
            department: true,
            location: true,
            createdAt: true,
            isPublic: true
          }
        })
      
      case 'contracts':
        return await prisma.contract.findMany({
          where: combinedFilters,
          take: 100,
          orderBy: { startDate: 'desc' },
          select: {
            id: true,
            title: true,
            description: true,
            supplierId: true,
            amount: true,
            currency: true,
            startDate: true,
            endDate: true,
            status: true,
            contractNumber: true,
            createdAt: true,
            isPublic: true
          }
        })
      
      default:
        return null
    }
  } catch (error) {
    console.error('Database query error:', error)
    return null
  }
}

// Función para obtener estadísticas generales (solo datos públicos)
async function getGeneralStats() {
  try {
    const publicFilter = { isPublic: true }
    
    const [
      totalBudget,
      totalExpenditures,
      projectsCount,
      contractsCount,
      activeProjects,
      activeContracts
    ] = await Promise.all([
      prisma.budget.aggregate({ 
        where: publicFilter,
        _sum: { amountPlanned: true } 
      }),
      prisma.expenditure.aggregate({ 
        where: publicFilter,
        _sum: { amountActual: true } 
      }),
      prisma.project.count({ where: publicFilter }),
      prisma.contract.count({ where: publicFilter }),
      prisma.project.count({ where: { ...publicFilter, status: 'En ejecución' } }),
      prisma.contract.count({ where: { ...publicFilter, status: 'Vigente' } })
    ])

    return {
      totalBudget: totalBudget._sum?.amountPlanned || 0,
      totalExpenditures: totalExpenditures._sum?.amountActual || 0,
      projectsCount,
      contractsCount,
      activeProjects,
      activeContracts
    }
  } catch (error) {
    console.error('Stats query error:', error)
    return null
  }
}

// Función para formatear montos en CLP
function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Función para formatear fechas en formato chileno (DD-MM-AAAA)
function formatDateCL(date: Date | string): string {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

// Función para registrar interacción en la base de datos
async function logInteraction(
  tenantId: string,
  userMessage: string,
  botResponse: string,
  intent: string | undefined,
  category: string | undefined,
  hasData: boolean,
  filters: any,
  responseTime: number
) {
  try {
    await prisma.chatbotInteraction.create({
      data: {
        tenantId,
        userMessage,
        botResponse,
        intent: intent || null,
        category: category || null,
        hasData,
        filters: filters || null,
        responseTime,
        timestamp: new Date()
      }
    })
  } catch (error) {
    console.error('Error logging interaction to database:', error)
  }
}

// Función para determinar la categoría basada en los tipos de datos consultados
function determineCategory(dataTypes: string[]): string | undefined {
  if (dataTypes.includes('projects')) return 'Proyectos'
  if (dataTypes.includes('budgets')) return 'Presupuestos'
  if (dataTypes.includes('expenditures')) return 'Gastos'
  if (dataTypes.includes('contracts')) return 'Contratos'
  if (dataTypes.includes('general_stats')) return 'Estadísticas'
  return undefined
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Obtener tenant
    const tenant = await getTenantForAPI(request.headers)
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant no identificado' },
        { status: 400 }
      )
    }

    const { query, conversationHistory } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Paso 1: Analizar la consulta para entender qué datos se necesitan
    const analysisPrompt = `Eres un asistente de análisis de datos municipales en Chile. 
Analiza la siguiente consulta del usuario y determina:
1. ¿Qué tipo de datos se necesitan? (presupuestos, gastos, proyectos, contratos, estadísticas generales)
2. ¿Hay filtros específicos? (año, departamento, categoría, comuna, ubicación, etc.)
3. ¿Qué información específica busca el usuario?

Consulta del usuario: "${query}"

Responde en formato JSON con esta estructura exacta:
{
  "dataTypes": ["budgets" | "expenditures" | "projects" | "contracts" | "general_stats"],
  "filters": {
    "year": "2024" o null,
    "department": "nombre del departamento" o null,
    "category": "nombre de categoría" o null,
    "municipality": "nombre del municipio o comuna" o null,
    "status": "estado del proyecto/contrato" o null
  },
  "intent": "breve descripción de lo que el usuario quiere saber"
}

Responde SOLO con el JSON, sin explicaciones adicionales.`

    const analysisResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [{ role: 'user', content: analysisPrompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3
      })
    })

    if (!analysisResponse.ok) {
      throw new Error('Failed to analyze query')
    }

    const analysisData = await analysisResponse.json()
    const analysis = JSON.parse(analysisData.choices[0].message.content)

    // Paso 2: Obtener datos PÚBLICOS de la base de datos
    let databaseData: any = {}
    let totalResults = 0
    
    if (analysis.dataTypes.includes('general_stats')) {
      databaseData.stats = await getGeneralStats()
    }

    for (const dataType of analysis.dataTypes) {
      if (dataType !== 'general_stats') {
        const filters: any = {}
        
        // Aplicar filtros si existen
        if (analysis.filters?.year) {
          filters.fiscalYearId = { contains: analysis.filters.year }
        }
        if (analysis.filters?.department) {
          filters.department = { contains: analysis.filters.department, mode: 'insensitive' }
        }
        if (analysis.filters?.category) {
          filters.category = { contains: analysis.filters.category, mode: 'insensitive' }
        }
        if (analysis.filters?.municipality) {
          filters.municipality = { contains: analysis.filters.municipality, mode: 'insensitive' }
        }
        if (analysis.filters?.status) {
          filters.status = { contains: analysis.filters.status, mode: 'insensitive' }
        }

        const data = await getDataFromDatabase(dataType, tenant.id, filters)
        databaseData[dataType] = data
        totalResults += data?.length || 0
      }
    }

    // Logging interno
    logQuery({
      timestamp: new Date().toISOString(),
      query,
      dataTypes: analysis.dataTypes,
      filters: analysis.filters,
      resultCount: totalResults
    })

    // Verificar si hay datos públicos suficientes
    const hasPublicData = totalResults > 0 || databaseData.stats

    if (!hasPublicData) {
      const noDataMessage = "No encuentro información pública para esa consulta. Puedes revisar los módulos en el sitio o realizar una solicitud formal de información."
      
      // Registrar la interacción sin datos
      const responseTime = Date.now() - startTime
      const category = determineCategory(analysis.dataTypes)
      logInteraction(
        tenant.id,
        query,
        noDataMessage,
        analysis.intent,
        category,
        false,
        analysis.filters,
        responseTime
      ).catch(err => console.error('Failed to log no-data interaction:', err))
      
      return NextResponse.json({
        message: noDataMessage,
        noData: true
      })
    }

    // Paso 3: Generar respuesta usando streaming con RAG
    const contextPrompt = `Eres un asistente virtual especializado en transparencia municipal en Chile llamado "Asistente Lumen".
Tu tarea es responder preguntas sobre datos municipales de manera clara, precisa y amigable, usando EXCLUSIVAMENTE los datos proporcionados.

DATOS PÚBLICOS DISPONIBLES (RAG - Retrieval Augmented Generation):
${JSON.stringify(databaseData, null, 2)}

CONSULTA DEL USUARIO: "${query}"

INSTRUCCIONES CRÍTICAS:
1. Responde en español de Chile de manera conversacional y amigable
2. USA SOLAMENTE los datos reales proporcionados arriba (RAG/grounding)
3. Si los datos están vacíos o no hay información relevante, indica: "No encuentro información pública para esa consulta específica. Puedes revisar los módulos en el sitio o realizar una solicitud formal de información."
4. Proporciona números específicos cuando estén disponibles
5. Formatea cantidades monetarias usando el formato chileno: CLP con separador de miles (ej: $1.500.000)
6. Formatea fechas en formato DD-MM-AAAA (ej: 15-10-2025)
7. Si es relevante, menciona tendencias o insights interesantes
8. Sé conciso pero informativo
9. Para proyectos, menciona: nombre, estado, avance%, monto, comuna
10. Para contratos, menciona: título, proveedor, monto, estado, fechas
11. Para presupuestos/gastos, menciona: departamento, categoría, montos, año
12. SIEMPRE cita la fuente: menciona la colección consultada (ej: "según los registros de proyectos públicos", "de acuerdo a los datos de contratos", etc.)
13. Si el usuario pregunta en otro idioma, responde en ese idioma
14. NO inventes datos ni hagas suposiciones
15. Incluye el ID del registro cuando sea relevante (ej: "Proyecto ID: renca-001")

RESPONDE AHORA (recuerda usar formato CLP y DD-MM-AAAA):`

    const messages: Message[] = [
      { role: 'system', content: contextPrompt },
      { role: 'user', content: query }
    ]

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('El servicio de datos está temporalmente no disponible. Intenta nuevamente o revisa los módulos del sitio.')
    }

    // Streaming de la respuesta con captura para logging
    let fullBotResponse = ''
    const category = determineCategory(analysis.dataTypes)
    const intent = analysis.intent
    
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()
        
        try {
          while (true) {
            const { done, value } = await reader!.read()
            if (done) break
            
            const chunk = decoder.decode(value)
            
            // Extraer el contenido del texto de las respuestas SSE
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data !== '[DONE]') {
                  try {
                    const parsed = JSON.parse(data)
                    const content = parsed.choices?.[0]?.delta?.content || ''
                    fullBotResponse += content
                  } catch (e) {
                    // Skip invalid JSON
                  }
                }
              }
            }
            
            controller.enqueue(encoder.encode(chunk))
          }
          
          // Registrar la interacción completa después del streaming
          const responseTime = Date.now() - startTime
          logInteraction(
            tenant.id,
            query,
            fullBotResponse,
            intent,
            category,
            hasPublicData,
            analysis.filters,
            responseTime
          ).catch(err => console.error('Failed to log interaction:', err))
          
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (error) {
    console.error('AI Query error:', error)
    return NextResponse.json(
      { 
        error: 'El servicio de datos está temporalmente no disponible. Intenta nuevamente o revisa los módulos del sitio.',
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
