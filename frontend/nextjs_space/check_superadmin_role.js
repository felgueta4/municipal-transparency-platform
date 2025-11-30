const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkSuperadmin() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'superadmin@transparenciaciudadana.com' },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })
    
    if (user) {
      console.log('✅ Usuario encontrado:')
      console.log(JSON.stringify(user, null, 2))
    } else {
      console.log('❌ Usuario no encontrado')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkSuperadmin()
