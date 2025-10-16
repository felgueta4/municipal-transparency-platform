#!/usr/bin/env node

/**
 * Load Demo Data Script
 * Carga datos de demostración para la Plataforma de Transparencia Municipal
 */

const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { PrismaClient } = require('../packages/database/src/generated/client');
const { parse } = require('csv-parse/sync');

const prisma = new PrismaClient();

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Parse date from DD-MM-YYYY or YYYY-MM-DD format
function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // Try DD-MM-YYYY format
  const parts = dateStr.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      return new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      // DD-MM-YYYY
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
  }
  
  return new Date(dateStr);
}

// Parse currency amount
function parseAmount(amountStr) {
  if (!amountStr) return 0;
  // Remove currency symbols and thousand separators
  const cleaned = amountStr.toString().replace(/[CLP$\s]/g, '').replace(/\./g, '').replace(/,/g, '.');
  return parseFloat(cleaned) || 0;
}

// Read CSV file
function readCSV(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    return records;
  } catch (error) {
    log(`❌ Error leyendo archivo ${filePath}: ${error.message}`, 'red');
    return [];
  }
}

async function loadData() {
  log('\n🚀 Iniciando carga de datos de demostración...', 'blue');
  
  try {
    // 1. Verificar/Crear Municipalidad
    log('\n📍 Paso 1: Verificando municipalidad...', 'yellow');
    let municipality = await prisma.municipality.findFirst();
    
    if (!municipality) {
      municipality = await prisma.municipality.create({
        data: {
          name: 'Santiago',
          country: 'Chile',
          region: 'Metropolitana',
          locale: 'es-CL',
          timezone: 'America/Santiago',
        },
      });
      log(`✓ Municipalidad creada: ${municipality.name}`, 'green');
    } else {
      log(`✓ Municipalidad existente: ${municipality.name}`, 'green');
    }

    // 2. Crear Años Fiscales
    log('\n📅 Paso 2: Creando años fiscales...', 'yellow');
    const fiscalYears = {};
    
    for (const year of [2023, 2024, 2025]) {
      let fiscalYear = await prisma.fiscalYear.findUnique({
        where: { year },
      });
      
      if (!fiscalYear) {
        fiscalYear = await prisma.fiscalYear.create({
          data: {
            year,
            status: year === 2024 ? 'active' : year < 2024 ? 'closed' : 'future',
          },
        });
        log(`✓ Año fiscal ${year} creado`, 'green');
      } else {
        log(`✓ Año fiscal ${year} ya existe`, 'green');
      }
      
      fiscalYears[year] = fiscalYear.id;
    }

    // 3. Cargar Presupuestos
    log('\n💰 Paso 3: Cargando presupuestos...', 'yellow');
    const budgetsPath = path.join(__dirname, '../test-data/budgets/sample_budgets.csv');
    const budgetRecords = readCSV(budgetsPath);
    
    let budgetCount = 0;
    for (const record of budgetRecords) {
      try {
        const fiscalYear = parseInt(record.fiscalYear);
        
        // Check if budget already exists
        const existing = await prisma.budget.findFirst({
          where: {
            municipalityId: municipality.id,
            fiscalYearId: fiscalYears[fiscalYear],
            department: record.department,
            program: record.program,
            category: record.category,
            subcategory: record.subcategory,
          },
        });
        
        if (!existing) {
          await prisma.budget.create({
            data: {
              municipalityId: municipality.id,
              fiscalYearId: fiscalYears[fiscalYear],
              department: record.department,
              program: record.program,
              category: record.category,
              subcategory: record.subcategory,
              amountPlanned: parseAmount(record.amountPlanned),
              currency: record.currency || 'CLP',
              notes: record.notes || null,
            },
          });
          budgetCount++;
        }
      } catch (error) {
        log(`  ⚠️  Error en registro: ${error.message}`, 'red');
      }
    }
    log(`✓ ${budgetCount} presupuestos cargados`, 'green');

    // 4. Cargar Proveedores (necesario para gastos y contratos)
    log('\n🏢 Paso 4: Creando proveedores...', 'yellow');
    const suppliers = new Map();
    
    const supplierData = [
      { name: 'Farmacia SalMed', taxId: '76.123.456-7', sector: 'Salud' },
      { name: 'Constructora VialChile S.A.', taxId: '96.789.123-4', sector: 'Construcción' },
      { name: 'Jardinería Verde Ltda.', taxId: '77.456.789-1', sector: 'Servicios' },
      { name: 'Deportes Total', taxId: '78.234.567-8', sector: 'Comercio' },
      { name: 'Iluminación Eficiente', taxId: '79.345.678-9', sector: 'Servicios' },
      { name: 'Tecnología Digital SpA', taxId: '76.987.654-3', sector: 'Tecnología' },
      { name: 'Construcciones Urbanas', taxId: '96.456.789-0', sector: 'Construcción' },
      { name: 'Servicios Culturales Ltda.', taxId: '77.654.321-8', sector: 'Cultura' },
    ];
    
    for (const data of supplierData) {
      let supplier = await prisma.supplier.findUnique({
        where: { taxId: data.taxId },
      });
      
      if (!supplier) {
        supplier = await prisma.supplier.create({ data });
        log(`  ✓ Proveedor creado: ${data.name}`, 'green');
      }
      
      suppliers.set(data.taxId, supplier.id);
    }

    // 5. Cargar Gastos
    log('\n💸 Paso 5: Cargando gastos...', 'yellow');
    const expendituresPath = path.join(__dirname, '../test-data/expenditures/sample_expenditures.csv');
    const expenditureRecords = readCSV(expendituresPath);
    
    let expenditureCount = 0;
    for (const record of expenditureRecords) {
      try {
        const fiscalYear = parseInt(record.fiscalYear);
        const date = parseDate(record.date);
        
        await prisma.expenditure.create({
          data: {
            municipalityId: municipality.id,
            fiscalYearId: fiscalYears[fiscalYear],
            date,
            department: record.department,
            program: record.program,
            category: record.category,
            subcategory: record.subcategory,
            concept: record.concept,
            amountActual: parseAmount(record.amountActual),
            currency: record.currency || 'CLP',
            supplierId: record.supplierTaxId ? suppliers.get(record.supplierTaxId) : null,
            procurementRef: record.procurementRef || null,
          },
        });
        expenditureCount++;
      } catch (error) {
        log(`  ⚠️  Error en registro: ${error.message}`, 'red');
      }
    }
    log(`✓ ${expenditureCount} gastos cargados`, 'green');

    // 6. Cargar Fuentes de Financiamiento
    log('\n💵 Paso 6: Creando fuentes de financiamiento...', 'yellow');
    const fundingSources = new Map();
    
    const fundingData = [
      { name: 'Fondo Nacional de Desarrollo Regional', type: 'Nacional', description: 'FNDR - Financiamiento regional' },
      { name: 'Presupuesto Municipal', type: 'Municipal', description: 'Recursos propios de la municipalidad' },
      { name: 'Gobierno Regional', type: 'Regional', description: 'Gobierno Regional Metropolitano' },
      { name: 'Programa de Eficiencia Energética', type: 'Nacional', description: 'Programa del Ministerio de Energía' },
      { name: 'Fondo del Libro y la Lectura', type: 'Nacional', description: 'Financiamiento para proyectos culturales' },
      { name: 'Servicio Nacional de Capacitación', type: 'Nacional', description: 'SENCE - Financiamiento laboral' },
      { name: 'Consejo de Monumentos Nacionales', type: 'Nacional', description: 'Financiamiento patrimonial' },
    ];
    
    for (const data of fundingData) {
      let source = await prisma.fundingSource.findFirst({
        where: { name: data.name },
      });
      
      if (!source) {
        source = await prisma.fundingSource.create({ data });
        log(`  ✓ Fuente creada: ${data.name}`, 'green');
      }
      
      fundingSources.set(data.name, source.id);
    }

    // 7. Cargar Proyectos
    log('\n🏗️  Paso 7: Cargando proyectos...', 'yellow');
    const projectsPath = path.join(__dirname, '../test-data/projects/sample_projects.csv');
    const projectRecords = readCSV(projectsPath);
    
    let projectCount = 0;
    for (const record of projectRecords) {
      try {
        // Check if project already exists
        const existing = await prisma.project.findFirst({
          where: {
            municipalityId: municipality.id,
            title: record.title,
          },
        });
        
        if (!existing) {
          await prisma.project.create({
            data: {
              municipalityId: municipality.id,
              title: record.title,
              description: record.description,
              status: record.status,
              startDate: parseDate(record.startDate),
              endDate: parseDate(record.endDate),
              department: record.department,
              category: record.category,
              requestedBudget: record.requestedBudget ? parseAmount(record.requestedBudget) : null,
              approvedBudget: record.approvedBudget ? parseAmount(record.approvedBudget) : null,
              fundingSourceId: record.fundingSourceName ? fundingSources.get(record.fundingSourceName) : null,
            },
          });
          projectCount++;
        }
      } catch (error) {
        log(`  ⚠️  Error en registro: ${error.message}`, 'red');
      }
    }
    log(`✓ ${projectCount} proyectos cargados`, 'green');

    // 8. Cargar Contratos
    log('\n📄 Paso 8: Cargando contratos...', 'yellow');
    const contracts = [
      {
        supplierId: suppliers.get('96.789.123-4'), // Constructora VialChile
        title: 'Pavimentación Avenida Principal',
        description: 'Contrato para pavimentación de Av. Principal, 2 kilómetros, incluye señalética y áreas verdes',
        amount: 120000000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-30'),
        status: 'en_ejecucion',
        contractNumber: 'CONT-2024-001',
      },
      {
        supplierId: suppliers.get('76.987.654-3'), // Tecnología Digital
        title: 'Plataforma Digital de Trámites',
        description: 'Desarrollo e implementación de plataforma web para trámites municipales en línea',
        amount: 18000000,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-10-31'),
        status: 'planificado',
        contractNumber: 'CONT-2024-002',
      },
      {
        supplierId: suppliers.get('79.345.678-9'), // Iluminación Eficiente
        title: 'Recambio Luminarias LED',
        description: 'Suministro e instalación de 500 luminarias LED en toda la comuna',
        amount: 25000000,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-09-30'),
        status: 'en_ejecucion',
        contractNumber: 'CONT-2024-003',
      },
      {
        supplierId: suppliers.get('96.456.789-0'), // Construcciones Urbanas
        title: 'Construcción Centro de Salud Familiar',
        description: 'Construcción de nuevo CESFAM de 1.200 m², incluye equipamiento básico',
        amount: 450000000,
        startDate: new Date('2023-06-01'),
        endDate: new Date('2024-12-31'),
        status: 'en_ejecucion',
        contractNumber: 'CONT-2023-015',
      },
      {
        supplierId: suppliers.get('77.456.789-1'), // Jardinería Verde
        title: 'Mantención Áreas Verdes 2024',
        description: 'Servicio anual de mantención de parques, plazas y áreas verdes municipales',
        amount: 15000000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        status: 'en_ejecucion',
        contractNumber: 'CONT-2024-004',
      },
      {
        supplierId: suppliers.get('77.654.321-8'), // Servicios Culturales
        title: 'Construcción Centro Cultural',
        description: 'Construcción de centro cultural con sala de teatro de 300 personas y biblioteca pública',
        amount: 95000000,
        startDate: new Date('2024-07-01'),
        endDate: new Date('2025-06-30'),
        status: 'planificado',
        contractNumber: 'CONT-2024-005',
      },
    ];
    
    let contractCount = 0;
    for (const contractData of contracts) {
      try {
        if (!contractData.supplierId) {
          log(`  ⚠️  Proveedor no encontrado para contrato: ${contractData.title}`, 'yellow');
          continue;
        }
        
        const existing = await prisma.contract.findUnique({
          where: { contractNumber: contractData.contractNumber },
        });
        
        if (!existing) {
          await prisma.contract.create({
            data: {
              municipalityId: municipality.id,
              ...contractData,
            },
          });
          contractCount++;
        }
      } catch (error) {
        log(`  ⚠️  Error en contrato: ${error.message}`, 'red');
      }
    }
    log(`✓ ${contractCount} contratos cargados`, 'green');

    // 9. Mostrar resumen
    log('\n📊 Resumen de datos cargados:', 'blue');
    
    const stats = await Promise.all([
      prisma.budget.count({ where: { municipalityId: municipality.id } }),
      prisma.expenditure.count({ where: { municipalityId: municipality.id } }),
      prisma.project.count({ where: { municipalityId: municipality.id } }),
      prisma.contract.count({ where: { municipalityId: municipality.id } }),
      prisma.supplier.count(),
      prisma.fundingSource.count(),
    ]);
    
    log(`  • Presupuestos: ${stats[0]}`, 'green');
    log(`  • Gastos: ${stats[1]}`, 'green');
    log(`  • Proyectos: ${stats[2]}`, 'green');
    log(`  • Contratos: ${stats[3]}`, 'green');
    log(`  • Proveedores: ${stats[4]}`, 'green');
    log(`  • Fuentes de Financiamiento: ${stats[5]}`, 'green');
    
    log('\n✅ ¡Carga de datos completada exitosamente!', 'green');
    
  } catch (error) {
    log(`\n❌ Error durante la carga de datos: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute
loadData();
