

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class MunicipalityFilterDto {
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
    example: 'Región Metropolitana',
    description: 'Filtrar por región',
    required: false,
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({
    example: 'Santiago',
    description: 'Buscar por nombre',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
