import { PartialType } from '@nestjs/swagger';
import { CreateSoftwareVersionDto } from './create-software-version.dto';
import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VersionStatus } from './create-software-version.dto';

export class UpdateSoftwareVersionDto extends PartialType(CreateSoftwareVersionDto) {
  @ApiProperty({
    example: 'Mejoras en Dashboard - Actualizado',
    description: 'Nombre descriptivo de la versión',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Descripción actualizada de la versión',
    description: 'Descripción de la versión',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '## Actualizaciones\n- Correcciones de errores',
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
    example: 'stable',
    description: 'Estado de la versión',
    enum: VersionStatus,
    required: false,
  })
  @IsEnum(VersionStatus, {
    message: 'El estado debe ser: draft, stable o deprecated',
  })
  @IsOptional()
  status?: VersionStatus;
}
