require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
    take: 10
  });
  
  console.log('Usuarios en la base de datos:');
  users.forEach(user => {
    console.log(`Email: ${user.email}, Role: ${user.role}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
