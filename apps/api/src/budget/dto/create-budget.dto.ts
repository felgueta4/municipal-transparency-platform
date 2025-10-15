
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBudgetDto {
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
    example: 50000000,
    description: 'Monto planificado',
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amountPlanned: number;

  @ApiProperty({
    example: 'CLP',
    description: 'Moneda',
    default: 'CLP',
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    example: 'Presupuesto para mantención de plazas públicas',
    description: 'Notas adicionales',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
