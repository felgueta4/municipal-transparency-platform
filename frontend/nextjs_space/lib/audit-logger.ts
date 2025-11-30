
/**
 * Audit Logger
 * Registra todas las acciones críticas para compliance y seguridad
 */

import { prisma } from './db'

export interface AuditLogParams {
  tenantId?: string
  actor: string
  actorRole: string
  action: string
  resource: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

/**
 * Registra una acción en el audit log
 */
export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId: params.tenantId || null,
        actor: params.actor,
        actorRole: params.actorRole,
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId || null,
        metadata: params.metadata || undefined,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
      },
    })
  } catch (error) {
    console.error('Error logging audit:', error)
    // No lanzar error para no interrumpir el flujo principal
  }
}

/**
 * Acciones de auditoría predefinidas
 */
export const AUDIT_ACTIONS = {
  // Tenant management
  CREATE_TENANT: 'CREATE_TENANT',
  UPDATE_TENANT: 'UPDATE_TENANT',
  SUSPEND_TENANT: 'SUSPEND_TENANT',
  REACTIVATE_TENANT: 'REACTIVATE_TENANT',
  PROVISION_TENANT: 'PROVISION_TENANT',
  
  // User management
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  CHANGE_USER_ROLE: 'CHANGE_USER_ROLE',
  RESET_PASSWORD: 'RESET_PASSWORD',
  
  // Data operations
  CREATE_PROJECT: 'CREATE_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  PUBLISH_PROJECT: 'PUBLISH_PROJECT',
  UNPUBLISH_PROJECT: 'UNPUBLISH_PROJECT',
  
  CREATE_BUDGET: 'CREATE_BUDGET',
  UPDATE_BUDGET: 'UPDATE_BUDGET',
  DELETE_BUDGET: 'DELETE_BUDGET',
  
  CREATE_EXPENDITURE: 'CREATE_EXPENDITURE',
  UPDATE_EXPENDITURE: 'UPDATE_EXPENDITURE',
  DELETE_EXPENDITURE: 'DELETE_EXPENDITURE',
  
  CREATE_CONTRACT: 'CREATE_CONTRACT',
  UPDATE_CONTRACT: 'UPDATE_CONTRACT',
  DELETE_CONTRACT: 'DELETE_CONTRACT',
  
  // System operations
  DEPLOY_UPDATE: 'DEPLOY_UPDATE',
  RUN_MIGRATION: 'RUN_MIGRATION',
  BACKUP_DATA: 'BACKUP_DATA',
  RESTORE_DATA: 'RESTORE_DATA',
  
  // Security events
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  ACCESS_DENIED: 'ACCESS_DENIED',
} as const
