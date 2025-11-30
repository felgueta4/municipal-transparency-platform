const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Test the budget query with mapping
  const budgets = await prisma.budget.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  })
  
  console.log('\nSample budgets from database:')
  budgets.forEach(b => {
    console.log(`  - ${b.fiscalYearId}: ${b.amountPlanned} CLP (${b.category})`)
  })
  
  // Calculate totals like the frontend does
  const allBudgets = await prisma.budget.findMany()
  const totalBudget = allBudgets.reduce((sum, b) => sum + (b?.totalAmount || b?.amountPlanned || 0), 0)
  
  console.log(`\nTotal Budget calculated: ${totalBudget}`)
  console.log(`Number of budgets: ${allBudgets.length}`)
  
  // Check if totalAmount field exists
  console.log(`\nFirst budget structure:`)
  console.log(JSON.stringify(allBudgets[0], null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
