
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class ConnectorLogFilterDto {
  @ApiPropertyOptional({
    description: 'Filter by connector config ID',
    example: 'clw123abc',
  })
  @IsString()
  @IsOptional()
  connectorConfigId?: string;

  @ApiPropertyOptional({
    description: 'Filter by endpoint',
    example: '/api/suppliers',
  })
  @IsString()
  @IsOptional()
  endpoint?: string;

  @ApiPropertyOptional({
    description: 'Filter by HTTP method',
    example: 'GET',
  })
  @IsString()
  @IsOptional()
  method?: string;

  @ApiPropertyOptional({
    description: 'Filter by response status code',
    example: 200,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  responseStatus?: number;

  @ApiPropertyOptional({
    description: 'Filter logs from this date',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter logs until this date',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 50,
    default: 50,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 50;
}
