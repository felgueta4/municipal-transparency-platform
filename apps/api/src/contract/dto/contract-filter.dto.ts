

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ContractStatus } from './create-contract.dto';

export class ContractFilterDto {
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
    example: 'clxyz456def',
    description: 'Filtrar por ID de proveedor',
    required: false,
  })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiProperty({
    example: 'active',
    description: 'Filtrar por estado',
    enum: ContractStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(ContractStatus)
  status?: ContractStatus;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Fecha de inicio desde',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDateFrom?: string;

  @ApiProperty({
    example: '2024-12-31T00:00:00.000Z',
    description: 'Fecha de inicio hasta',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDateTo?: string;

  @ApiProperty({
    example: 'Construcción',
    description: 'Buscar en título',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
