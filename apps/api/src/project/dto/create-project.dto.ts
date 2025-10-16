

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum ProjectStatus {
  DRAFT = 'draft',
  PROPOSED = 'proposed',
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateProjectDto {
  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID del municipio',
  })
  @IsString()
  @IsNotEmpty()
  municipalityId: string;

  @ApiProperty({
    example: 'Remodelación Plaza de Armas',
    description: 'Título del proyecto',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Proyecto de remodelación integral de la Plaza de Armas, incluyendo áreas verdes, iluminación y mobiliario urbano.',
    description: 'Descripción del proyecto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'proposed',
    description: 'Estado del proyecto',
    enum: ProjectStatus,
  })
  @IsEnum(ProjectStatus)
  @IsNotEmpty()
  status: ProjectStatus;

  @ApiProperty({
    example: '2024-03-01T00:00:00.000Z',
    description: 'Fecha de inicio',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    example: '2024-12-31T00:00:00.000Z',
    description: 'Fecha de finalización',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    example: 'Obras Públicas',
    description: 'Departamento',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    example: 'Espacios Públicos',
    description: 'Categoría del proyecto',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 150000000,
    description: 'Presupuesto solicitado',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  requestedBudget?: number;

  @ApiProperty({
    example: 120000000,
    description: 'Presupuesto aprobado',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  approvedBudget?: number;

  @ApiProperty({
    example: 'clxyz789ghi',
    description: 'ID de la fuente de financiamiento',
    required: false,
  })
  @IsOptional()
  @IsString()
  fundingSourceId?: string;

  @ApiProperty({
    example: '{"type":"Point","coordinates":[-70.6506,-33.4372]}',
    description: 'Ubicación geográfica del proyecto (GeoJSON o texto)',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}
