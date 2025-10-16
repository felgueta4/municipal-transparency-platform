const { PrismaClient } = require('./packages/database/src/generated/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createDemoUser() {
  try {
    // Hash de la contraseña demo123
    const passwordHash = await bcrypt.hash('demo123', 10);
    
    // Obtener la primera municipalidad para asignar al usuario
    const municipality = await prisma.municipality.findFirst();
    
    if (!municipality) {
      console.error('No se encontró ninguna municipalidad');
      process.exit(1);
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'demo@municipio.cl' }
    });
    
    if (existingUser) {
      // Actualizar la contraseña del usuario existente
      await prisma.user.update({
        where: { email: 'demo@municipio.cl' },
        data: { passwordHash }
      });
      console.log('✅ Usuario demo@municipio.cl actualizado con nueva contraseña');
    } else {
      // Crear el usuario demo
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
    
    console.log('Credenciales:');
    console.log('  Email: demo@municipio.cl');
    console.log('  Password: demo123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoUser();
