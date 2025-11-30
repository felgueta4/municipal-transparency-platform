
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { requirePermissions, errorResponse, successResponse } from '@/lib/auth-middleware';

const prisma = new PrismaClient();

// GET /api/users - Obtener todos los usuarios
export async function GET(request: NextRequest) {
  try {
    // Verificar permisos
    const authResult = await requirePermissions(request, ['manage_users']);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return errorResponse('Error al obtener usuarios', 500);
  }
}

// POST /api/users - Crear nuevo usuario
export async function POST(request: NextRequest) {
  try {
    // Verificar permisos
    const authResult = await requirePermissions(request, ['manage_users']);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const { email, password, role } = body;

    // Validaciones
    if (!email || !password || !role) {
      return errorResponse('Faltan campos requeridos: email, password y role son obligatorios', 400);
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse('Formato de email inválido', 400);
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return errorResponse('La contraseña debe tener al menos 8 caracteres', 400);
    }

    // Validar rol
    const validRoles = ['admin', 'funcionario', 'visualizador'];
    if (!validRoles.includes(role)) {
      return errorResponse(`Rol inválido. Roles válidos: ${validRoles.join(', ')}`, 400);
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('El email ya está registrado', 400);
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return successResponse(newUser, 201);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return errorResponse('Error al crear usuario', 500);
  }
}
