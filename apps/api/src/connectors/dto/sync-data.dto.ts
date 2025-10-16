
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString, IsInt, IsBoolean, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityType } from '../interfaces';

export class SyncDataDto {
  @ApiProperty({
    description: 'Entity type to sync',
    enum: EntityType,
    example: EntityType.SUPPLIER,
  })
  @IsEnum(EntityType)
  entityType: EntityType;

  @ApiPropertyOptional({
    description: 'Start date for sync (for incremental sync)',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date for sync',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Batch size for processing',
    example: 100,
    default: 100,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  @Type(() => Number)
  batchSize?: number;

  @ApiPropertyOptional({
    description: 'Whether to perform incremental sync (only new/updated records)',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  incrementalSync?: boolean;

  @ApiPropertyOptional({
    description: 'Municipality ID to sync data for',
    example: 'clw123abc',
  })
  @IsString()
  @IsOptional()
  municipalityId?: string;
}
