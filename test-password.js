const { PrismaClient } = require('./packages/database/src/generated/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function testPassword() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'superadmin@transparencia.cl' }
    });

    if (!user) {
      console.log('❌ Usuario no encontrado');
      return;
    }

    console.log('✅ Usuario encontrado:', user.email);
    console.log('📝 Password hash:', user.passwordHash.substring(0, 20) + '...');
    
    const testPassword = 'demo12345';
    const isValid = await bcrypt.compare(testPassword, user.passwordHash);
    
    if (isValid) {
      console.log('✅ La contraseña "demo12345" es CORRECTA');
    } else {
      console.log('❌ La contraseña "demo12345" es INCORRECTA');
      console.log('\n🔧 Actualizando contraseña...');
      
      const newHash = await bcrypt.hash(testPassword, 10);
      await prisma.user.update({
        where: { email: 'superadmin@transparencia.cl' },
        data: { passwordHash: newHash }
      });
      
      console.log('✅ Contraseña actualizada correctamente');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testPassword();
