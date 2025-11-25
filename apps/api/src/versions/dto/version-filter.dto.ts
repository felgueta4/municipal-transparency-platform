import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { VersionStatus } from './create-software-version.dto';

export class VersionFilterDto {
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
    example: 'stable',
    description: 'Filtrar por estado',
    enum: VersionStatus,
    required: false,
  })
  @IsEnum(VersionStatus)
  @IsOptional()
  status?: VersionStatus;

  @ApiProperty({
    example: '1.15',
    description: 'Buscar versiones que contengan este texto',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
