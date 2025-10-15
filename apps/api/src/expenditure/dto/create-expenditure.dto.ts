
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsISO8601, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenditureDto {
  @ApiProperty({
    example: 'clxyz123abc',
    description: 'ID del municipio',
  })
  @IsString()
  @IsNotEmpty()
  municipalityId: string;

  @ApiProperty({
    example: 'clxyz456def',
    description: 'ID del año fiscal',
  })
  @IsString()
  @IsNotEmpty()
  fiscalYearId: string;

  @ApiProperty({
    example: '2024-01-15T00:00:00.000Z',
    description: 'Fecha del gasto',
  })
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: 'Obras Públicas',
    description: 'Departamento',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({
    example: 'Mantención de Espacios Públicos',
    description: 'Programa',
  })
  @IsString()
  @IsNotEmpty()
  program: string;

  @ApiProperty({
    example: 'Espacios Públicos',
    description: 'Categoría',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 'Plazas',
    description: 'Subcategoría',
  })
  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @ApiProperty({
    example: 'Reparación de juegos infantiles',
    description: 'Concepto del gasto',
  })
  @IsString()
  @IsNotEmpty()
  concept: string;

  @ApiProperty({
    example: 2500000,
    description: 'Monto ejecutado',
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amountActual: number;

  @ApiProperty({
    example: 'CLP',
    description: 'Moneda',
    default: 'CLP',
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    example: 'clxyz789ghi',
    description: 'ID del proveedor',
    required: false,
  })
  @IsString()
  @IsOptional()
  supplierId?: string;

  @ApiProperty({
    example: 'PO-2024-001234',
    description: 'Referencia de adquisición',
    required: false,
  })
  @IsString()
  @IsOptional()
  procurementRef?: string;

  @ApiProperty({
    example: 'POINT(-70.6483 -33.4489)',
    description: 'Ubicación geográfica (formato WKT o JSON)',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;
}
