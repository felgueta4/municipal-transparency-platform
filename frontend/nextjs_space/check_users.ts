import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config() // Carga las variables de entorno

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        lastLoginAt: true
      }
    })
    
    console.log('=== USUARIOS EN LA BASE DE DATOS ===')
    console.log(JSON.stringify(users, null, 2))
    console.log(`\nTotal de usuarios: ${users.length}`)
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
