
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkSchema() {
  try {
    console.log('🔍 Verificando estructura de la tabla users...')
    
    // Consulta raw para obtener información de las columnas
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `
    
    console.log('\n📋 Columnas en la tabla users:')
    console.log(columns)
    
  } catch (error) {
    console.error('❌ Error al verificar schema:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

checkSchema()
