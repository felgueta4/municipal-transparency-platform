

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMunicipalityDto {
  @ApiProperty({
    example: 'Municipalidad de Santiago',
    description: 'Nombre del municipio',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Chile',
    description: 'País',
    default: 'Chile',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: 'Región Metropolitana',
    description: 'Región',
  })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    example: 'es-CL',
    description: 'Configuración regional',
    default: 'es-CL',
  })
  @IsString()
  @IsOptional()
  locale?: string;

  @ApiProperty({
    example: 'America/Santiago',
    description: 'Zona horaria',
    default: 'America/Santiago',
  })
  @IsString()
  @IsOptional()
  timezone?: string;
}
