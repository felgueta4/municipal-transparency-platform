const { PrismaClient } = require('../../packages/database/src/generated/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createDemoUser() {
  try {
    const passwordHash = await bcrypt.hash('demo123', 10);
    
    const municipality = await prisma.municipality.findFirst();
    
    if (!municipality) {
      console.error('No se encontró ninguna municipalidad');
      process.exit(1);
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email: 'demo@municipio.cl' }
    });
    
    if (existingUser) {
      await prisma.user.update({
        where: { email: 'demo@municipio.cl' },
        data: { passwordHash }
      });
      console.log('✅ Usuario demo@municipio.cl actualizado con nueva contraseña');
    } else {
      await prisma.user.create({
        data: {
          email: 'demo@municipio.cl',
          passwordHash,
          role: 'admin',
          municipalityId: municipality.id
        }
      });
      console.log('✅ Usuario demo@municipio.cl creado exitosamente');
    }
    
    console.log('\nCredenciales:');
    console.log('  Email: demo@municipio.cl');
    console.log('  Password: demo123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoUser();
