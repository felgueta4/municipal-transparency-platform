
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requirePermissions, errorResponse, successResponse } from '@/lib/auth-middleware';

const prisma = new PrismaClient();

// PATCH /api/users/[id] - Actualizar usuario
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar permisos
    const authResult = await requirePermissions(request, ['manage_users']);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;
    const body = await request.json();
    const { role } = body;

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return errorResponse('Usuario no encontrado', 404);
    }

    // Validar rol si se está actualizando
    if (role) {
      const validRoles = ['admin', 'funcionario', 'visualizador'];
      if (!validRoles.includes(role)) {
        return errorResponse(`Rol inválido. Roles válidos: ${validRoles.join(', ')}`, 400);
      }
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role: role || existingUser.role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    });

    return successResponse(updatedUser);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return errorResponse('Error al actualizar usuario', 500);
  }
}

// DELETE /api/users/[id] - Eliminar usuario
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar permisos
    const authResult = await requirePermissions(request, ['manage_users']);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const currentUser = authResult;
    const { id } = params;

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return errorResponse('Usuario no encontrado', 404);
    }

    // Prevenir que un usuario se elimine a sí mismo
    if (currentUser.id === id) {
      return errorResponse('No puedes eliminar tu propia cuenta', 400);
    }

    // Prevenir eliminar el último admin
    if (existingUser.role === 'admin') {
      const adminCount = await prisma.user.count({
        where: { role: 'admin' },
      });

      if (adminCount <= 1) {
        return errorResponse('No puedes eliminar el último administrador del sistema', 400);
      }
    }

    // Eliminar usuario
    await prisma.user.delete({
      where: { id },
    });

    return successResponse({ message: 'Usuario eliminado exitosamente' }, 200);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return errorResponse('Error al eliminar usuario', 500);
  }
}
