import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from './update-user.dto';

export class CreateUserDto {
  @ApiProperty({
    example: 'usuario@municipio.cl',
    description: 'Email del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'funcionario_muni',
    description: 'Rol del usuario',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID del municipio (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  municipalityId?: string;
}
