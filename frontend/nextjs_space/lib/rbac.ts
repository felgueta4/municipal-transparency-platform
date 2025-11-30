
/**
 * Role-Based Access Control (RBAC)
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  MUNICIPAL_ADMIN: 'municipal_admin',
  EDITOR: 'editor',
  LECTOR: 'lector',
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

/**
 * Permisos por rol
 */
export const PERMISSIONS = {
  // Superadmin permissions
  CREATE_TENANT: [ROLES.SUPER_ADMIN],
  UPDATE_TENANT: [ROLES.SUPER_ADMIN],
  SUSPEND_TENANT: [ROLES.SUPER_ADMIN],
  DELETE_TENANT: [], // Nadie puede borrar tenants
  VIEW_ALL_TENANTS: [ROLES.SUPER_ADMIN],
  
  // Municipal admin permissions
  MANAGE_TENANT_USERS: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN],
  VIEW_TENANT_SETTINGS: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN],
  UPDATE_TENANT_SETTINGS: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN],
  
  // Data permissions
  CREATE_DATA: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.EDITOR],
  UPDATE_DATA: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.EDITOR],
  DELETE_DATA: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.EDITOR],
  PUBLISH_DATA: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.EDITOR],
  VIEW_DATA: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.EDITOR, ROLES.LECTOR],
  
  // Analytics
  VIEW_ANALYTICS: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.LECTOR],
  EXPORT_DATA: [ROLES.SUPER_ADMIN, ROLES.MUNICIPAL_ADMIN, ROLES.EDITOR, ROLES.LECTOR],
} as const

export type Permission = keyof typeof PERMISSIONS

/**
 * Verifica si un rol tiene un permiso específico
 */
export function hasPermission(role: string, permission: Permission): boolean {
  const allowedRoles = PERMISSIONS[permission] as readonly string[]
  return allowedRoles.includes(role)
}

/**
 * Verifica si un usuario es superadmin
 */
export function isSuperAdmin(role: string): boolean {
  return role === ROLES.SUPER_ADMIN
}

/**
 * Verifica si un usuario puede gestionar un tenant
 */
export function canManageTenant(role: string): boolean {
  return role === ROLES.SUPER_ADMIN || role === ROLES.MUNICIPAL_ADMIN
}

/**
 * Verifica si un usuario puede editar datos
 */
export function canEditData(role: string): boolean {
  return hasPermission(role, 'UPDATE_DATA')
}

/**
 * Verifica si un usuario puede solo leer datos
 */
export function isReadOnly(role: string): boolean {
  return role === ROLES.LECTOR
}
