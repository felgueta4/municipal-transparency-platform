
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Creando usuario superadministrador...')

  const email = 'superadmin@transparenciaciudadana.com'
  const password = 'SuperAdmin2024!'

  // Verificar si ya existe
  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    console.log('⚠️  El superadmin ya existe. Actualizando contraseña...')
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash: hashedPassword,
        role: 'super_admin',
        tenantId: null,
      },
    })
    console.log('✅ Superadmin actualizado')
  } else {
    console.log('➕ Creando nuevo superadmin...')
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: 'super_admin',
        firstName: 'Super',
        lastName: 'Admin',
        tenantId: null,
      },
    })
    console.log('✅ Superadmin creado exitosamente')
  }

  console.log('')
  console.log('📋 Credenciales del Superadmin:')
  console.log('   Email:', email)
  console.log('   Password:', password)
  console.log('')
  console.log('🌐 URL de Acceso:')
  console.log('   https://admin.transparenciaciudadana.com')
  console.log('   o http://localhost:3001/superadmin (desarrollo)')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
