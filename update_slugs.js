const { PrismaClient } = require('./packages/database/src/generated/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function updateSlugs() {
  try {
    console.log('🔧 Actualizando slugs de municipios...\n');

    // Get all municipalities
    const municipalities = await prisma.municipality.findMany();
    
    console.log(`📍 Encontrados ${municipalities.length} municipios:\n`);

    for (const muni of municipalities) {
      let slug = '';
      
      // Generate slug from name
      if (muni.name.includes('Santiago')) {
        slug = 'santiago';
      } else if (muni.name.includes('Valparaíso')) {
        slug = 'valparaiso';
      } else if (muni.name.includes('Concepción')) {
        slug = 'concepcion';
      } else {
        // Default: lowercase and replace spaces with hyphens
        slug = muni.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
      }

      console.log(`   ${muni.name} → slug: "${slug}"`);

      // Update municipality
      await prisma.municipality.update({
        where: { id: muni.id },
        data: { 
          slug,
          currency: muni.currency || 'CLP',
          status: muni.status || 'active'
        },
      });
    }

    // Also create a "demo" municipality if it doesn't exist
    const demoMuni = await prisma.municipality.findUnique({
      where: { slug: 'demo' }
    });

    if (!demoMuni) {
      console.log('\n🆕 Creando municipio demo...');
      
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('demo12345', 10);

      const newMuni = await prisma.municipality.create({
        data: {
          name: 'Municipalidad Demo',
          slug: 'demo',
          region: 'Metropolitana',
          country: 'Chile',
          locale: 'es-CL',
          timezone: 'America/Santiago',
          currency: 'CLP',
          status: 'active',
        },
      });

      console.log(`   ✅ Municipio demo creado: ${newMuni.name} (id: ${newMuni.id})`);

      // Create admin user for demo municipality
      const demoAdmin = await prisma.user.create({
        data: {
          email: 'admin@demo.cl',
          passwordHash: hashedPassword,
          role: 'admin_muni',
          municipalityId: newMuni.id,
        },
      });

      console.log(`   ✅ Usuario admin demo creado: ${demoAdmin.email}`);

      console.log('\n📋 Credenciales del municipio demo:');
      console.log('   URL: https://admin.transparenciaciudadana.com/demo');
      console.log('   Admin: https://admin.transparenciaciudadana.com/demo/admin/login');
      console.log('   Email: admin@demo.cl');
      console.log('   Password: demo12345');
    }

    console.log('\n✅ Slugs actualizados exitosamente!');

    // Show all municipalities with slugs
    const updated = await prisma.municipality.findMany();
    console.log('\n📍 Municipios finales:');
    updated.forEach(m => {
      console.log(`   - ${m.name} (slug: ${m.slug})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSlugs();
