const { PrismaClient } = require('./packages/database/src/generated/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function createAdminUser() {
  try {
    // Hash de la contraseña demo123
    const passwordHash = await bcrypt.hash('demo123', 10);
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'felgueta4@gmail.com' }
    });
    
    if (existingUser) {
      console.log('⚠️  El usuario felgueta4@gmail.com ya existe');
      console.log('   Actualizando contraseña...');
      
      // Actualizar la contraseña del usuario existente
      await prisma.user.update({
        where: { email: 'felgueta4@gmail.com' },
        data: { 
          passwordHash,
          role: 'admin'
        }
      });
      console.log('✅ Usuario felgueta4@gmail.com actualizado exitosamente');
    } else {
      // Crear el nuevo usuario administrador
      const newUser = await prisma.user.create({
        data: {
          email: 'felgueta4@gmail.com',
          passwordHash,
          role: 'admin'
        }
      });
      console.log('✅ Usuario administrador creado exitosamente');
      console.log(`   ID: ${newUser.id}`);
    }
    
    console.log('\n📧 Credenciales del usuario administrador:');
    console.log('   Email: felgueta4@gmail.com');
    console.log('   Password: demo123');
    console.log('   Role: admin');
    
    // Verificar que el usuario se creó correctamente
    console.log('\n🔍 Verificando usuario en la base de datos...');
    const user = await prisma.user.findUnique({
      where: { email: 'felgueta4@gmail.com' },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (user) {
      console.log('✅ Usuario verificado:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Creado: ${user.createdAt}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
