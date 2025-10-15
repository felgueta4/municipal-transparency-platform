
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * @Roles() decorator - Define roles permitidos para un endpoint
 * Uso: @Roles('admin_muni', 'editor_muni')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
