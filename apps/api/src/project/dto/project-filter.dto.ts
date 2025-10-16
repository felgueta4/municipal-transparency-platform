

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectStatus } from './create-project.dto';

export class ProjectFilterDto {
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
    example: 'clxyz123abc',
    description: 'Filtrar por ID de municipio',
    required: false,
  })
  @IsOptional()
  @IsString()
  municipalityId?: string;

  @ApiProperty({
    example: 'approved',
    description: 'Filtrar por estado del proyecto',
    enum: ProjectStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({
    example: 'Espacios Públicos',
    description: 'Filtrar por categoría',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    example: 'Obras Públicas',
    description: 'Filtrar por departamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    example: 'Plaza',
    description: 'Buscar en título',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
