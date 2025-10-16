

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SupplierFilterDto {
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
    example: 'Constructora',
    description: 'Buscar por nombre',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    example: 'Construcción',
    description: 'Filtrar por sector',
    required: false,
  })
  @IsOptional()
  @IsString()
  sector?: string;

  @ApiProperty({
    example: 'Santiago',
    description: 'Filtrar por localidad',
    required: false,
  })
  @IsOptional()
  @IsString()
  locality?: string;
}
