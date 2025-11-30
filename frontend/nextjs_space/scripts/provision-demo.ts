import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Provisionando datos para tenant demo...')

  const tenant = await prisma.tenant.findUnique({
    where: { slug: 'demo' },
  })

  if (!tenant) {
    console.error('❌ Tenant demo no encontrado')
    process.exit(1)
  }

  const currentYear = new Date().getFullYear()
  
  // Presupuestos
  console.log('📊 Creando presupuestos...')
  await prisma.budget.createMany({
    data: [
      {
        tenantId: tenant.id,
        fiscalYearId: currentYear.toString(),
        department: 'Educación',
        program: 'Educación Básica',
        category: 'Personal',
        subcategory: 'Docentes',
        amountPlanned: 150000000,
        currency: 'CLP',
        isPublic: true,
      },
      {
        tenantId: tenant.id,
        fiscalYearId: currentYear.toString(),
        department: 'Salud',
        program: 'Atención Primaria',
        category: 'Operaciones',
        subcategory: 'Medicamentos',
        amountPlanned: 80000000,
        currency: 'CLP',
        isPublic: true,
      },
      {
        tenantId: tenant.id,
        fiscalYearId: currentYear.toString(),
        department: 'Obras Públicas',
        program: 'Infraestructura',
        category: 'Inversión',
        subcategory: 'Construcción',
        amountPlanned: 200000000,
        currency: 'CLP',
        isPublic: true,
      },
    ],
  })

  // Gastos
  console.log('💰 Creando gastos...')
  await prisma.expenditure.createMany({
    data: [
      {
        tenantId: tenant.id,
        fiscalYearId: currentYear.toString(),
        date: new Date('2024-01-15'),
        department: 'Educación',
        program: 'Educación Básica',
        category: 'Personal',
        subcategory: 'Docentes',
        concept: 'Salarios mensuales',
        amountActual: 12500000,
        currency: 'CLP',
        isPublic: true,
      },
      {
        tenantId: tenant.id,
        fiscalYearId: currentYear.toString(),
        date: new Date('2024-02-10'),
        department: 'Salud',
        program: 'Atención Primaria',
        category: 'Operaciones',
        subcategory: 'Medicamentos',
        concept: 'Compra medicamentos',
        amountActual: 6500000,
        currency: 'CLP',
        isPublic: true,
      },
    ],
  })

  // Proyectos
  console.log('🏗️  Creando proyectos...')
  await prisma.project.createMany({
    data: [
      {
        tenantId: tenant.id,
        title: 'Mejoramiento Plaza Central',
        description: 'Renovación completa de la Plaza Central con áreas verdes y juegos infantiles',
        status: 'En Progreso',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        department: 'Obras Públicas',
        category: 'Infraestructura',
        requestedBudget: 50000000,
        approvedBudget: 45000000,
        location: tenant.comuna,
        isPublic: true,
      },
      {
        tenantId: tenant.id,
        title: 'Centro de Salud Familiar',
        description: 'Construcción de nuevo CESFAM en sector norte',
        status: 'Planificado',
        startDate: new Date('2024-06-01'),
        department: 'Salud',
        category: 'Infraestructura',
        requestedBudget: 150000000,
        approvedBudget: 140000000,
        location: tenant.comuna,
        isPublic: true,
      },
    ],
  })

  // Contratos
  console.log('📄 Creando contratos...')
  await prisma.contract.createMany({
    data: [
      {
        tenantId: tenant.id,
        supplierId: 'SUP-001',
        title: 'Mantenimiento Áreas Verdes',
        description: 'Servicio de mantención de áreas verdes municipales',
        amount: 15000000,
        currency: 'CLP',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        status: 'Vigente',
        contractNumber: 'CT-2024-001',
        isPublic: true,
      },
    ],
  })

  // Proyectos del mapa
  console.log('🗺️  Creando proyectos en el mapa...')
  await prisma.municipalMapProject.createMany({
    data: [
      {
        tenantId: tenant.id,
        name: 'Plaza Central Renovada',
        description: 'Renovación de plaza con juegos y áreas verdes',
        category: 'Infraestructura',
        latitude: tenant.mapCenterLat || -33.4489,
        longitude: tenant.mapCenterLng || -70.6693,
        progress: 65,
        amount: 45000000,
        isActive: true,
        comuna: tenant.comuna,
      },
      {
        tenantId: tenant.id,
        name: 'Nuevo CESFAM Norte',
        description: 'Centro de Salud Familiar en construcción',
        category: 'Salud',
        latitude: (tenant.mapCenterLat || -33.4489) + 0.01,
        longitude: (tenant.mapCenterLng || -70.6693) + 0.01,
        progress: 30,
        amount: 140000000,
        isActive: true,
        comuna: tenant.comuna,
      },
    ],
  })

  // Actualizar tenant
  await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      demoDataEnabled: true,
    },
  })

  console.log('✅ Datos provisionados exitosamente')
  console.log('')
  console.log('📊 Resumen:')
  console.log('   - 3 Presupuestos')
  console.log('   - 2 Gastos')
  console.log('   - 2 Proyectos')
  console.log('   - 1 Contrato')
  console.log('   - 2 Proyectos en mapa')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
