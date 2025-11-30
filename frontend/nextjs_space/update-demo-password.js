const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updateDemoPassword() {
  try {
    // Hash de la contraseña demo123
    const passwordHash = await bcrypt.hash('demo123', 10);
    
    // Actualizar la contraseña del usuario demo
    const user = await prisma.user.update({
      where: { email: 'demo@municipio.cl' },
      data: { password: passwordHash }
    });
    
    console.log('\n✅ Contraseña actualizada exitosamente!');
    console.log('\n📝 Credenciales Demo:');
    console.log('   Email: demo@municipio.cl');
    console.log('   Password: demo123');
    console.log(`   Rol: ${user.role}`);
    console.log(`   Nombre: ${user.fullName}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateDemoPassword();
