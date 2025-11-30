import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Creando tenant demo para desarrollo...')

  const slug = 'demo'

  // Verificar si ya existe
  const existing = await prisma.tenant.findUnique({
    where: { slug },
  })

  if (existing) {
    console.log('✅ Tenant demo ya existe')
    console.log('   ID:', existing.id)
    return
  }

  const tenant = await prisma.tenant.create({
    data: {
      slug,
      name: 'Municipalidad Demo',
      status: 'active',
      plan: 'pro',
      region: 'Región Metropolitana',
      comuna: 'Santiago',
      contactEmail: 'demo@municipalidad.cl',
      defaultMapComuna: 'Santiago',
      mapCenterLat: -33.4489,
      mapCenterLng: -70.6693,
      mapZoom: 12,
      demoDataEnabled: true,
      maxUsers: 50,
      maxStorageGB: 50,
    },
  })

  console.log('✅ Tenant demo creado exitosamente')
  console.log('   ID:', tenant.id)
  console.log('   Slug:', tenant.slug)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
