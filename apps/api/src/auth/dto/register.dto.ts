
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN_MUNI = 'admin_muni',
  EDITOR_MUNI = 'editor_muni',
  VIEWER_MUNI = 'viewer_muni',
}

export class RegisterDto {
  @ApiProperty({
    example: 'usuario@municipal.cl',
    description: 'Email del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Contraseña del usuario',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'editor_muni',
    enum: UserRole,
    description: 'Rol del usuario',
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID del municipio al que pertenece el usuario',
    required: false,
  })
  @IsString()
  @IsOptional()
  municipalityId?: string;
}
