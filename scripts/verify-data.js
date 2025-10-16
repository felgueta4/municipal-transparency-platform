#!/usr/bin/env node

/**
 * Verify Demo Data Script
 * Verifica que los datos de demostración se hayan cargado correctamente
 */

const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { PrismaClient } = require('../packages/database/src/generated/client');

const prisma = new PrismaClient();

async function verifyData() {
  console.log('\n🔍 Verificando datos en la base de datos...\n');
  
  try {
    // Get municipality
    const municipality = await prisma.municipality.findFirst();
    console.log('📍 Municipalidad:', municipality?.name || 'No encontrada');
    
    if (!municipality) {
      console.log('❌ No se encontró ninguna municipalidad');
      return;
    }
    
    // Get counts
    console.log('\n📊 Estadísticas:');
    
    const budgetCount = await prisma.budget.count();
    console.log(`  • Presupuestos: ${budgetCount}`);
    
    const expenditureCount = await prisma.expenditure.count();
    console.log(`  • Gastos: ${expenditureCount}`);
    
    const projectCount = await prisma.project.count();
    console.log(`  • Proyectos: ${projectCount}`);
    
    const contractCount = await prisma.contract.count();
    console.log(`  • Contratos: ${contractCount}`);
    
    const supplierCount = await prisma.supplier.count();
    console.log(`  • Proveedores: ${supplierCount}`);
    
    const fundingSourceCount = await prisma.fundingSource.count();
    console.log(`  • Fuentes de Financiamiento: ${fundingSourceCount}`);
    
    // Sample data from each table
    console.log('\n💰 Muestra de Presupuestos:');
    const budgets = await prisma.budget.findMany({ take: 3 });
    budgets.forEach(b => {
      console.log(`  - ${b.department} / ${b.category}: $${b.amountPlanned.toLocaleString()}`);
    });
    
    console.log('\n💸 Muestra de Gastos:');
    const expenditures = await prisma.expenditure.findMany({ take: 3, include: { supplier: true } });
    expenditures.forEach(e => {
      console.log(`  - ${e.date.toISOString().split('T')[0]} / ${e.concept}: $${e.amountActual.toLocaleString()} ${e.supplier ? `(${e.supplier.name})` : ''}`);
    });
    
    console.log('\n🏗️  Muestra de Proyectos:');
    const projects = await prisma.project.findMany({ take: 3 });
    projects.forEach(p => {
      console.log(`  - ${p.title} (${p.status}): $${p.approvedBudget?.toLocaleString() || 'N/A'}`);
    });
    
    console.log('\n📄 Muestra de Contratos:');
    const contracts = await prisma.contract.findMany({ take: 3, include: { supplier: true } });
    contracts.forEach(c => {
      console.log(`  - ${c.title} (${c.supplier.name}): $${c.amount.toLocaleString()}`);
    });
    
    // Calculate totals
    console.log('\n📈 Totales Agregados:');
    
    const totalBudget = await prisma.budget.aggregate({
      _sum: { amountPlanned: true }
    });
    console.log(`  • Presupuesto Total Planificado: $${totalBudget._sum.amountPlanned?.toLocaleString() || 0}`);
    
    const totalExpenditure = await prisma.expenditure.aggregate({
      _sum: { amountActual: true }
    });
    console.log(`  • Gastos Totales Ejecutados: $${totalExpenditure._sum.amountActual?.toLocaleString() || 0}`);
    
    const totalContracts = await prisma.contract.aggregate({
      _sum: { amount: true }
    });
    console.log(`  • Monto Total en Contratos: $${totalContracts._sum.amount?.toLocaleString() || 0}`);
    
    console.log('\n✅ Verificación completada exitosamente!\n');
    
  } catch (error) {
    console.error('\n❌ Error durante la verificación:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyData();
