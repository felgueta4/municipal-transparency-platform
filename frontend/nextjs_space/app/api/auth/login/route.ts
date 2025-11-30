
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = "force-dynamic"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true,
        lastLoginAt: true,
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas. Verifique su email y contraseña.' }, 
        { status: 401 }
      )
    }
    
    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas. Verifique su email y contraseña.' }, 
        { status: 401 }
      )
    }
    
    // Actualizar última conexión
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      })
    } catch (updateError) {
      console.warn('Could not update lastLoginAt:', updateError)
      // Continue with login even if update fails
    }
    
    // Generar token JWT
    const secret = process.env.NEXTAUTH_SECRET || 'default-secret-key'
    const access_token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      secret,
      { expiresIn: '24h' }
    )
    
    // Formatear respuesta
    const formattedUser = {
      id: user.id,
      email: user.email,
      fullName: user.email.split('@')[0], // Temporal: usar parte del email como nombre
      role: user.role,
    }
    
    return NextResponse.json({
      access_token,
      user: formattedUser
    })
    
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
