import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString, Matches } from 'class-validator';

export enum VersionStatus {
  DRAFT = 'draft',
  STABLE = 'stable',
  DEPRECATED = 'deprecated',
}

export class CreateSoftwareVersionDto {
  @ApiProperty({
    example: '1.15.2',
    description: 'Versión del software (formato semántico: X.Y.Z)',
    pattern: '^\\d+\\.\\d+\\.\\d+$',
  })
  @IsString()
  @IsNotEmpty({ message: 'La versión es requerida' })
  @Matches(/^\d+\.\d+\.\d+$/, {
    message: 'La versión debe seguir el formato semántico (ej: 1.15.2)',
  })
  version: string;

  @ApiProperty({
    example: 'Mejoras en Dashboard',
    description: 'Nombre descriptivo de la versión',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    example: 'Actualización del dashboard con nuevas funcionalidades y mejoras de rendimiento',
    description: 'Descripción de la versión',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '## Nuevas Funcionalidades\n- Gráficos interactivos\n- Filtros avanzados',
    description: 'Changelog en formato Markdown',
    required: false,
  })
  @IsString()
  @IsOptional()
  changelog?: string;

  @ApiProperty({
    example: '2024-11-25T10:00:00Z',
    description: 'Fecha de lanzamiento de la versión',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  releaseDate?: string;

  @ApiProperty({
    example: 'draft',
    description: 'Estado de la versión',
    enum: VersionStatus,
    default: 'draft',
  })
  @IsEnum(VersionStatus, {
    message: 'El estado debe ser: draft, stable o deprecated',
  })
  @IsOptional()
  status?: VersionStatus;
}
