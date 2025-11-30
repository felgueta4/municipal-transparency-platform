
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const { type, category, timeframe } = await request.json()

    // Usar IA para generar predicciones basadas en datos históricos
    const historicalData = await fetchHistoricalData(type, category)
    const predictions = await generatePredictions(historicalData, timeframe)

    return NextResponse.json({
      success: true,
      predictions,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confianza
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: 'Error generating predictions' },
      { status: 500 }
    )
  }
}

async function fetchHistoricalData(type: string, category: string) {
  // Simular obtención de datos históricos
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    value: Math.floor(Math.random() * 100000) + 50000
  }))
}

async function generatePredictions(historicalData: any[], timeframe: string) {
  // Simular predicciones usando tendencias
  const avgGrowth = 1.05 // 5% crecimiento promedio
  const lastValue = historicalData[historicalData.length - 1]?.value || 100000

  const months = timeframe === 'quarter' ? 3 : timeframe === 'semester' ? 6 : 12
  
  return Array.from({ length: months }, (_, i) => ({
    month: i + 1,
    predicted: Math.floor(lastValue * Math.pow(avgGrowth, i + 1)),
    min: Math.floor(lastValue * Math.pow(avgGrowth, i + 1) * 0.9),
    max: Math.floor(lastValue * Math.pow(avgGrowth, i + 1) * 1.1)
  }))
}
