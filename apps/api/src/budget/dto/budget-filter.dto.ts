
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BudgetFilterDto {
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
    example: 2024,
    description: 'Año fiscal',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @ApiProperty({
    example: 'Obras Públicas',
    description: 'Departamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    example: 'Espacios Públicos',
    description: 'Categoría',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
