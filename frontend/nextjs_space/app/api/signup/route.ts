
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 })
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role || 'user'
      }
    })
    
    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role
    }
    
    return NextResponse.json({ 
      success: true, 
      user: userData 
    })
    
  } catch (error) {
    console.error('Error during signup:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
