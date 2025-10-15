
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsISO8601, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ExpenditureFilterDto {
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
    example: '2024-01-01T00:00:00.000Z',
    description: 'Fecha desde',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  from?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59.999Z',
    description: 'Fecha hasta',
    required: false,
  })
  @IsOptional()
  @IsISO8601()
  to?: string;

  @ApiProperty({
    example: 'Espacios Públicos',
    description: 'Categoría',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    example: 'Obras Públicas',
    description: 'Departamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    example: 'clxyz789ghi',
    description: 'ID del proveedor',
    required: false,
  })
  @IsOptional()
  @IsString()
  supplierId?: string;
}
