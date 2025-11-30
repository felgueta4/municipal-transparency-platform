const { PrismaClient } = require('../src/generated/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Create or update superadmin user
    console.log('👤 Creating/updating superadmin user...');
    
    const hashedPassword = await bcrypt.hash('demo12345', 10);
    
    const superadmin = await prisma.user.upsert({
      where: { email: 'superadmin@transparencia.cl' },
      update: {
        passwordHash: hashedPassword,
        role: 'super_admin',
      },
      create: {
        email: 'superadmin@transparencia.cl',
        passwordHash: hashedPassword,
        role: 'super_admin',
      },
    });
    
    console.log('✅ Superadmin user created/updated:', superadmin.email);

    // 2. Create demo municipalities if they don't exist
    console.log('🏛️  Creating demo municipalities...');
    
    const municipalities = [
      { name: 'Santiago', slug: 'santiago', region: 'Metropolitana' },
      { name: 'Valparaíso', slug: 'valparaiso', region: 'Valparaíso' },
      { name: 'Concepción', slug: 'concepcion', region: 'Biobío' },
    ];

    for (const munData of municipalities) {
      const municipality = await prisma.municipality.upsert({
        where: { slug: munData.slug },
        update: {},
        create: {
          name: munData.name,
          slug: munData.slug,
          region: munData.region,
          country: 'Chile',
          status: 'active',
          locale: 'es-CL',
          timezone: 'America/Santiago',
          currency: 'CLP',
        },
      });
      console.log(`  ✅ Municipality: ${municipality.name} (${municipality.slug})`);
    }

    // 3. Create software versions
    console.log('📦 Creating software versions...');
    
    const versions = [
      { version: '1.0.0', name: 'Versión Inicial', status: 'stable' },
      { version: '1.1.0', name: 'Actualización Menor', status: 'stable' },
      { version: '1.2.0', name: 'Nuevas Características', status: 'stable' },
      { version: '1.3.0', name: 'Mejoras de Rendimiento', status: 'stable' },
      { version: '1.4.0', name: 'Versión Actual', status: 'stable' },
    ];

    for (const versionData of versions) {
      const version = await prisma.softwareVersion.upsert({
        where: { version: versionData.version },
        update: {},
        create: {
          version: versionData.version,
          name: versionData.name,
          status: versionData.status,
          releaseDate: new Date(),
          releaseNotes: `Notas de la versión ${versionData.version}`,
        },
      });
      console.log(`  ✅ Version: ${version.version} - ${version.name}`);
    }

    // 4. Assign latest version to municipalities
    console.log('🔗 Assigning version 1.4.0 to municipalities...');
    
    const latestVersion = await prisma.softwareVersion.findUnique({
      where: { version: '1.4.0' },
    });

    if (latestVersion) {
      await prisma.municipality.updateMany({
        data: { softwareVersionId: latestVersion.id },
      });
      console.log('  ✅ All municipalities assigned to version 1.4.0');
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - Superadmin: superadmin@transparencia.cl / demo12345');
    console.log('   - Municipalities: 3 created');
    console.log('   - Software Versions: 5 created');
    console.log('   - All municipalities assigned to version 1.4.0');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    console.error(error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
