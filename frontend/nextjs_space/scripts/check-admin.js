
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    // Buscar todos los usuarios
    console.log('🔍 Verificando usuarios en la base de datos...\n')
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        municipalityId: true,
        createdAt: true
      }
    })
    
    console.log(`📊 Total de usuarios encontrados: ${users.length}\n`)
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`)
      console.log(`   Role: ${user.role}`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Municipality ID: ${user.municipalityId || 'N/A'}`)
      console.log(`   Created: ${user.createdAt}`)
      console.log('')
    })
    
    // Verificar si existe el usuario admin@muni.cl
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@muni.cl' }
    })
    
    if (adminUser) {
      console.log('✅ Usuario admin@muni.cl existe. Actualizando contraseña...\n')
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.user.update({
        where: { email: 'admin@muni.cl' },
        data: { 
          passwordHash: hashedPassword,
          role: 'SUPER_ADMIN'
        }
      })
      console.log('✅ Contraseña actualizada exitosamente')
      console.log('📧 Email: admin@muni.cl')
      console.log('🔑 Contraseña: admin123')
    } else {
      console.log('⚠️  Usuario admin@muni.cl no existe. Creándolo...\n')
      const hashedPassword = await bcrypt.hash('admin123', 10)
      const newAdmin = await prisma.user.create({
        data: {
          email: 'admin@muni.cl',
          passwordHash: hashedPassword,
          role: 'SUPER_ADMIN',
          municipalityId: null
        }
      })
      console.log('✅ Usuario creado exitosamente')
      console.log('📧 Email: admin@muni.cl')
      console.log('🔑 Contraseña: admin123')
      console.log(`🆔 ID: ${newAdmin.id}`)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
