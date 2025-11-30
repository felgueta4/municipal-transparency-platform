require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  
  try {
    const budgetCount = await prisma.budget.count()
    const expenditureCount = await prisma.expenditure.count()
    const projectCount = await prisma.project.count()
    const contractCount = await prisma.contract.count()
    
    console.log('=== Database Records Count ===')
    console.log(`Budgets: ${budgetCount}`)
    console.log(`Expenditures: ${expenditureCount}`)
    console.log(`Projects: ${projectCount}`)
    console.log(`Contracts: ${contractCount}`)
    
    if (budgetCount > 0) {
      const firstBudget = await prisma.budget.findFirst()
      console.log('\n=== First Budget Record ===')
      console.log(JSON.stringify(firstBudget, null, 2))
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
