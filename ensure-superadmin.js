const { PrismaClient } = require('./packages/database/src/generated/client');
require('dotenv').config();
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function ensureSuperAdmin() {
  try {
    console.log('🔧 Verificando y arreglando credenciales de superadmin...\n');

    const email = 'superadmin@transparencia.cl';
    const password = 'demo12345';
    const role = 'super_admin';

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if superadmin exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('✅ Usuario superadmin encontrado');
      console.log(`   ID: ${existingUser.id}`);
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Role actual: ${existingUser.role}`);
      
      // Update password and ensure correct role
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          passwordHash,
          role,
        },
      });

      console.log('\n🔄 Credenciales actualizadas:');
      console.log(`   Email: ${updatedUser.email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${updatedUser.role}`);
      console.log('\n✨ Password y role actualizados correctamente!');
    } else {
      console.log('❌ Usuario superadmin NO encontrado');
      console.log('🆕 Creando nuevo usuario superadmin...\n');

      const newUser = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role,
        },
      });

      console.log('✅ Nuevo usuario superadmin creado:');
      console.log(`   ID: ${newUser.id}`);
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${newUser.role}`);
    }

    console.log('\n' + '═'.repeat(80));
    console.log('📝 CREDENCIALES DE ACCESO SUPERADMIN');
    console.log('═'.repeat(80));
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role:     ${role}`);
    console.log('═'.repeat(80));
    console.log('\n✅ Proceso completado exitosamente!');

  } catch (error) {
    console.error('\n❌ Error durante el proceso:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

ensureSuperAdmin()
  .catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
