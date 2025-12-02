const { PrismaClient } = require('./packages/database/src/generated/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function checkData() {
  try {
    console.log('🔍 Verificando datos en la base de datos...\n');

    // Check municipalities
    const municipalities = await prisma.municipality.findMany();
    console.log(`📍 Municipios encontrados: ${municipalities.length}`);
    municipalities.forEach(m => {
      console.log(`   - ${m.name} (slug: ${m.slug}, id: ${m.id})`);
    });

    // Check users
    const users = await prisma.user.findMany({
      include: { municipality: true }
    });
    console.log(`\n👥 Usuarios encontrados: ${users.length}`);
    users.forEach(u => {
      console.log(`   - ${u.email} (role: ${u.role}, municipality: ${u.municipality?.name || 'N/A'})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
