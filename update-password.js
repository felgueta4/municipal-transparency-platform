const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenvx').config();

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    const email = 'felgueta4@gmail.com';
    const newPassword = 'demo1234'; // 8 caracteres
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Contraseña actualizada correctamente');
    console.log(`   Email: ${email}`);
    console.log(`   Nueva password: ${newPassword}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword();
