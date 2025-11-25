import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class VersionHistoryFilterDto {
  @ApiProperty({
    example: 1,
    description: 'Número de página',
    required: false,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Número de resultados por página',
    required: false,
    default: 10,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    example: 'clxyz123abc',
    description: 'Filtrar por ID de municipio',
    required: false,
  })
  @IsString()
  @IsOptional()
  municipalityId?: string;

  @ApiProperty({
    example: '1.15.2',
    description: 'Filtrar por versión de destino',
    required: false,
  })
  @IsString()
  @IsOptional()
  toVersion?: string;

  @ApiProperty({
    example: '2024-11-01T00:00:00Z',
    description: 'Filtrar desde esta fecha',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  fromDate?: string;

  @ApiProperty({
    example: '2024-11-30T23:59:59Z',
    description: 'Filtrar hasta esta fecha',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  toDate?: string;
}
