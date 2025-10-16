

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum ContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  TERMINATED = 'terminated',
  CANCELLED = 'cancelled',
}

export class CreateContractDto {
  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID del municipio',
  })
  @IsString()
  @IsNotEmpty()
  municipalityId: string;

  @ApiProperty({
    example: 'clxyz456def',
    description: 'ID del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @ApiProperty({
    example: 'Construcción de Centro Comunitario',
    description: 'Título del contrato',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Contrato para la construcción de un centro comunitario en el barrio sur de la ciudad.',
    description: 'Descripción del contrato',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 250000000,
    description: 'Monto del contrato',
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    example: 'CLP',
    description: 'Moneda',
    default: 'CLP',
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Fecha de inicio del contrato',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '2024-12-31T00:00:00.000Z',
    description: 'Fecha de finalización del contrato',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    example: 'active',
    description: 'Estado del contrato',
    enum: ContractStatus,
  })
  @IsEnum(ContractStatus)
  @IsNotEmpty()
  status: ContractStatus;

  @ApiProperty({
    example: 'CT-2024-001',
    description: 'Número de contrato',
    required: false,
  })
  @IsOptional()
  @IsString()
  contractNumber?: string;
}
