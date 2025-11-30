
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuarios en la base de datos...')
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
    
    console.log(`\n📊 Total de usuarios encontrados: ${users.length}`)
    
    if (users.length > 0) {
      console.log('\n👥 Usuarios en la base de datos:')
      users.forEach(user => {
        console.log(`  - Email: ${user.email}`)
        console.log(`    Rol: ${user.role}`)
        console.log(`    ID: ${user.id}`)
        console.log(`    Creado: ${user.createdAt}`)
        console.log('---')
      })
    } else {
      console.log('\n⚠️ No se encontraron usuarios en la base de datos')
    }
    
  } catch (error) {
    console.error('❌ Error al verificar usuarios:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
