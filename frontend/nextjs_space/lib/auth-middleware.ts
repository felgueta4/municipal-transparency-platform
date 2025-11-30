
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends NextRequest {
  user?: AuthUser;
}

// Tipos de permisos
export type Permission = 
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'manage_users'
  | 'manage_municipalities'
  | 'manage_integrations'
  | 'upload_files'
  | 'view_analytics';

// Configuración de permisos por rol
const rolePermissions: Record<string, Permission[]> = {
  admin: [
    'view',
    'create',
    'edit',
    'delete',
    'manage_users',
    'manage_municipalities',
    'manage_integrations',
    'upload_files',
    'view_analytics',
  ],
  funcionario: [
    'view',
    'create',
    'edit',
    'delete',
    'manage_integrations',
    'upload_files',
    'view_analytics',
  ],
  visualizador: [
    'view',
    'view_analytics',
  ],
};

/**
 * Extrae y valida el token JWT del header de autorización
 */
export async function validateToken(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Para el entorno de desarrollo, permitimos un token simplificado
    // En producción, deberías usar un secret fuerte y validación JWT real
    if (token === 'demo-token') {
      // Usuario demo para desarrollo
      return {
        id: 'demo-user',
        email: 'demo@municipio.cl',
        role: 'admin',
      };
    }

    // Intentar decodificar el token JWT
    try {
      const secret = process.env.NEXTAUTH_SECRET || 'default-secret-key';
      const decoded = jwt.verify(token, secret) as any;
      
      // El token puede tener userId o sub (subject)
      const userId = decoded.userId || decoded.sub;
      
      if (!userId) {
        return null;
      }
      
      // Buscar el usuario en la base de datos
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      
      // Si falla la validación JWT, intentamos buscar el usuario por email en el token
      // Esto es un fallback temporal para desarrollo
      const parts = token.split(':');
      if (parts.length === 2) {
        const email = parts[0];
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            role: true,
          },
        });
        return user;
      }
      
      return null;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
}

/**
 * Verifica si un usuario tiene un permiso específico
 */
export function hasPermission(user: AuthUser, permission: Permission): boolean {
  const permissions = rolePermissions[user.role] || [];
  return permissions.includes(permission);
}

/**
 * Verifica si un usuario tiene alguno de los permisos especificados
 */
export function hasAnyPermission(user: AuthUser, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(user, permission));
}

/**
 * Verifica si un usuario tiene todos los permisos especificados
 */
export function hasAllPermissions(user: AuthUser, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(user, permission));
}

/**
 * Middleware para proteger rutas que requieren autenticación
 */
export async function requireAuth(request: NextRequest): Promise<AuthUser | NextResponse> {
  const user = await validateToken(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'No autorizado. Token inválido o expirado.' },
      { status: 401 }
    );
  }
  
  return user;
}

/**
 * Middleware para proteger rutas que requieren permisos específicos
 */
export async function requirePermissions(
  request: NextRequest,
  permissions: Permission[]
): Promise<AuthUser | NextResponse> {
  const user = await validateToken(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'No autorizado. Token inválido o expirado.' },
      { status: 401 }
    );
  }
  
  if (!hasAllPermissions(user, permissions)) {
    return NextResponse.json(
      { error: 'Permisos insuficientes para realizar esta acción.' },
      { status: 403 }
    );
  }
  
  return user;
}

/**
 * Middleware para proteger rutas que requieren un rol específico
 */
export async function requireRole(
  request: NextRequest,
  roles: string[]
): Promise<AuthUser | NextResponse> {
  const user = await validateToken(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'No autorizado. Token inválido o expirado.' },
      { status: 401 }
    );
  }
  
  if (!roles.includes(user.role)) {
    return NextResponse.json(
      { error: `Se requiere uno de los siguientes roles: ${roles.join(', ')}` },
      { status: 403 }
    );
  }
  
  return user;
}

/**
 * Helper para respuestas de error
 */
export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Helper para respuestas exitosas
 */
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}
