const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true }
  })
  
  console.log('Users in database:')
  console.log(JSON.stringify(users, null, 2))
  
  const budgets = await prisma.budget.count()
  const expenditures = await prisma.expenditure.count()
  const projects = await prisma.project.count()
  const contracts = await prisma.contract.count()
  
  console.log('\nData counts:')
  console.log(`Budgets: ${budgets}`)
  console.log(`Expenditures: ${expenditures}`)
  console.log(`Projects: ${projects}`)
  console.log(`Contracts: ${contracts}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
