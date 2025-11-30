
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function updateAdminPassword() {
  try {
    console.log('🔐 Actualizando contraseña del administrador...')
    
    const email = 'admin@santiago.cl'
    const newPassword = 'admin123'
    
    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.log(`❌ Usuario ${email} no encontrado`)
      return
    }
    
    console.log(`✅ Usuario encontrado: ${email}`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Rol: ${user.role}`)
    
    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    
    // Actualizar la contraseña
    await prisma.user.update({
      where: { email },
      data: { passwordHash: hashedPassword }
    })
    
    console.log(`\n🎉 ¡Contraseña actualizada exitosamente!`)
    console.log(`\n📧 Credenciales de acceso:`)
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${newPassword}`)
    console.log(`\n🔗 URL de acceso: https://lumen.abacusai.app/admin/login`)
    
  } catch (error) {
    console.error('❌ Error al actualizar contraseña:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

updateAdminPassword()
