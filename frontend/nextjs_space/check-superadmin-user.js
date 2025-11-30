const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSuperAdmin() {
  try {
    // Buscar usuarios con rol super_admin
    const superAdmins = await prisma.user.findMany({
      where: {
        role: 'super_admin'
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      }
    });

    console.log('=== USUARIOS CON ROL SUPER_ADMIN ===');
    console.log(JSON.stringify(superAdmins, null, 2));

    // Buscar el usuario específico por email
    const targetUser = await prisma.user.findUnique({
      where: {
        email: 'superadmin@transparenciaciudadana.com'
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      }
    });

    console.log('\n=== USUARIO superadmin@transparenciaciudadana.com ===');
    console.log(JSON.stringify(targetUser, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSuperAdmin();
