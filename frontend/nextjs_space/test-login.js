require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  const email = 'admin@muni.cl';
  const password = 'admin123';
  
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      role: true,
    }
  });
  
  if (!user) {
    console.log('Usuario no encontrado');
    return;
  }
  
  console.log('Usuario encontrado:');
  console.log('Email:', user.email);
  console.log('Role:', user.role);
  console.log('PasswordHash:', user.passwordHash.substring(0, 20) + '...');
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  console.log('\n¿Contraseña válida?', isValid);
  
  // Probar también con "password123" por si acaso
  const isValid2 = await bcrypt.compare('password123', user.passwordHash);
  console.log('¿Contraseña "password123" válida?', isValid2);
}

testLogin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
