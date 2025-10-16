#!/usr/bin/env node

/**
 * Create Demo Users Script
 * Crea usuarios de demostración para el sistema
 */

const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { PrismaClient } = require('../packages/database/src/generated/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

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

async function createDemoUsers() {
  log('\n👥 Creando usuarios de demostración...', 'blue');
  
  try {
    const municipality = await prisma.municipality.findFirst();
    
    if (!municipality) {
      log('❌ No se encontró ninguna municipalidad', 'red');
      process.exit(1);
    }
    
    const users = [
      {
        email: 'admin@santiago.cl',
        password: 'demo123',
        role: 'admin',
        name: 'Administrador Municipal',
      },
      {
        email: 'funcionario@santiago.cl',
        password: 'demo123',
        role: 'funcionario',
        name: 'Funcionario Presupuesto',
      },
      {
        email: 'visualizador@santiago.cl',
        password: 'demo123',
        role: 'visualizador',
        name: 'Visualizador Público',
      },
    ];
    
    log('\n📝 Creando/actualizando usuarios...', 'yellow');
    
    for (const userData of users) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      
      if (existingUser) {
        await prisma.user.update({
          where: { email: userData.email },
          data: {
            passwordHash,
            role: userData.role,
          },
        });
        log(`  ✓ Usuario actualizado: ${userData.email} (${userData.role})`, 'green');
      } else {
        await prisma.user.create({
          data: {
            email: userData.email,
            passwordHash,
            role: userData.role,
            municipalityId: municipality.id,
          },
        });
        log(`  ✓ Usuario creado: ${userData.email} (${userData.role})`, 'green');
      }
    }
    
    log('\n📋 Credenciales de acceso:', 'blue');
    log('─────────────────────────────────────────', 'blue');
    users.forEach(u => {
      log(`  Email: ${u.email}`, 'yellow');
      log(`  Password: ${u.password}`, 'yellow');
      log(`  Rol: ${u.role}`, 'yellow');
      log('─────────────────────────────────────────', 'blue');
    });
    
    log('\n✅ Usuarios creados exitosamente!\n', 'green');
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoUsers();
