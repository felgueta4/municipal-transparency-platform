
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Simple test authentication - accept demo credentials
    if ((email === 'demo@municipio.cl' && password === 'demo123') ||
        (email === 'john@doe.com' && password === 'johndoe123') ||
        (email === 'admin@santiago.cl' && password === 'santiago123')) {
      
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          email: email,
          name: 'Usuario Demo'
        },
        token: 'demo-token'
      })
    }
    
    return NextResponse.json(
      { error: 'Credenciales incorrectas' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Test auth error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test authentication endpoint available',
    testCredentials: [
      { email: 'demo@municipio.cl', password: 'demo123' },
      { email: 'john@doe.com', password: 'johndoe123' },
      { email: 'admin@santiago.cl', password: 'santiago123' }
    ]
  })
}
