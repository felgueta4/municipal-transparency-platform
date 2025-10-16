

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN_MUNI = 'admin_muni',
  EDITOR_MUNI = 'editor_muni',
  VIEWER_MUNI = 'viewer_muni',
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'admin_muni',
    description: 'Rol del usuario',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID del municipio',
    required: false,
  })
  @IsOptional()
  @IsString()
  municipalityId?: string;
}
