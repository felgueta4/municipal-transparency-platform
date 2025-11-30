
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkAllTables() {
  try {
    console.log('🔍 Verificando estructura de todas las tablas...\n')
    
    const tables = ['users', 'budgets', 'expenditures', 'projects', 'contracts']
    
    for (const table of tables) {
      console.log(`\n📋 Tabla: ${table}`)
      console.log('='.repeat(50))
      
      const columns = await prisma.$queryRaw`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = ${table}
        ORDER BY ordinal_position;
      `
      
      console.log(columns)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

checkAllTables()
