import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

config()

const prisma = new PrismaClient()

async function fixAdminRole() {
  try {
    // Actualizar el rol del admin
    const updated = await prisma.user.update({
      where: { email: 'admin@muni.cl' },
      data: { role: 'admin' }
    })
    
    console.log('✅ Rol actualizado correctamente:')
    console.log(`Usuario: ${updated.email}`)
    console.log(`Rol anterior: SUPER_ADMIN`)
    console.log(`Rol nuevo: ${updated.role}`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixAdminRole()
