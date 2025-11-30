'use client';

import { useAuth } from '@/components/auth-provider';

export interface Permissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canManageIntegrations: boolean;
  canUploadFiles: boolean;
}

export function usePermissions(): Permissions {
  const { user } = useAuth();
  const role = user?.role || '';

  // Administrador: Puede hacer todo
  if (role === 'admin') {
    return {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canManageUsers: true,
      canManageIntegrations: true,
      canUploadFiles: true,
    };
  }

  // Funcionario: Puede hacer todo excepto gestionar usuarios
  if (role === 'funcionario') {
    return {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canManageUsers: false,
      canManageIntegrations: true,
      canUploadFiles: true,
    };
  }

  // Visualizador: Solo puede ver
  if (role === 'visualizador') {
    return {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canManageUsers: false,
      canManageIntegrations: false,
      canUploadFiles: false,
    };
  }

  // Por defecto, sin permisos
  return {
    canView: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canManageUsers: false,
    canManageIntegrations: false,
    canUploadFiles: false,
  };
}

// Helper para obtener el label del rol
export function getRoleLabel(role: string): string {
  const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    funcionario: 'Funcionario',
    visualizador: 'Visualizador',
  };
  return roleLabels[role] || role;
}

// Helper para obtener la descripción del rol
export function getRoleDescription(role: string): string {
  const descriptions: Record<string, string> = {
    admin: 'Puede gestionar usuarios y todo lo demás',
    funcionario: 'Puede gestionar todo excepto usuarios',
    visualizador: 'Solo puede visualizar información',
  };
  return descriptions[role] || '';
}
