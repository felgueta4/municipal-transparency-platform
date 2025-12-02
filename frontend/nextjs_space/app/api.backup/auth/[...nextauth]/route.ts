
import { NextRequest, NextResponse } from 'next/server'

// Handle all NextAuth routes with custom implementation
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname.split('/').pop()
  
  switch (path) {
    case 'providers':
      return NextResponse.json({})
    case 'session':
      return NextResponse.json({ user: null })
    default:
      return NextResponse.json({ 
        message: "Authentication handled by custom provider" 
      })
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.pathname.split('/').pop()
  
  switch (path) {
    case 'signin':
    case 'signout':
    case 'callback':
      return NextResponse.json({ 
        message: "Authentication handled by custom provider" 
      })
    default:
      return NextResponse.json({ 
        message: "Authentication handled by custom provider" 
      })
  }
}
