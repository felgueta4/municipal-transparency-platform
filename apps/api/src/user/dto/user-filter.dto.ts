

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from './update-user.dto';

export class UserFilterDto {
  @ApiProperty({
    example: 1,
    description: 'Número de página',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Cantidad de registros por página',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    example: 'admin_muni',
    description: 'Filtrar por rol',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    example: 'clxyz123abc',
    description: 'Filtrar por ID de municipio',
    required: false,
  })
  @IsOptional()
  @IsString()
  municipalityId?: string;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Buscar por email',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
