const { PrismaClient } = require('./packages/database/src/generated/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function verifyUsers() {
  try {
    console.log('🔍 Consultando todos los usuarios en la base de datos...\n');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`✅ Total de usuarios: ${users.length}\n`);
    console.log('📋 Listado de usuarios:');
    console.log('─'.repeat(80));
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. Usuario:`);
      console.log(`   ID:    ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role:  ${user.role}`);
      console.log(`   Creado: ${user.createdAt.toISOString()}`);
    });
    
    console.log('\n' + '─'.repeat(80));
    
    // Verificar específicamente el nuevo usuario
    const newUser = users.find(u => u.email === 'felgueta4@gmail.com');
    if (newUser) {
      console.log('\n✅ Usuario felgueta4@gmail.com CONFIRMADO en la base de datos');
      console.log(`   Puede iniciar sesión con:`);
      console.log(`   Email: felgueta4@gmail.com`);
      console.log(`   Password: demo123`);
    } else {
      console.log('\n❌ Usuario felgueta4@gmail.com NO encontrado');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyUsers();
