
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsBoolean,
  IsInt,
  IsObject,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { AuthType } from '../interfaces';

export class CreateConnectorConfigDto {
  @ApiProperty({
    description: 'Connector name (must be unique)',
    example: 'ChileCompra API',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Connector type',
    example: 'chilecompra',
    enum: ['chilecompra', 'budget-source', 'custom'],
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({
    description: 'Description of the connector',
    example: 'Chilean public procurement API connector',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Base URL of the API',
    example: 'https://api.mercadopublico.cl',
  })
  @IsUrl()
  @IsNotEmpty()
  baseUrl: string;

  @ApiPropertyOptional({
    description: 'API key for authentication (will be encrypted)',
    example: 'your-api-key-here',
  })
  @IsString()
  @IsOptional()
  apiKey?: string;

  @ApiProperty({
    description: 'Authentication type',
    enum: AuthType,
    example: AuthType.API_KEY,
  })
  @IsEnum(AuthType)
  authType: AuthType;

  @ApiPropertyOptional({
    description: 'Additional authentication configuration',
    example: { headerName: 'X-API-Key' },
  })
  @IsObject()
  @IsOptional()
  authConfig?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Additional connector-specific configuration',
    example: { version: 'v1', format: 'json' },
  })
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Custom headers to include in requests',
    example: { 'User-Agent': 'MunicipalPlatform/1.0' },
  })
  @IsObject()
  @IsOptional()
  headers?: Record<string, string>;

  @ApiPropertyOptional({
    description: 'Request timeout in milliseconds',
    example: 30000,
    default: 30000,
  })
  @IsInt()
  @Min(1000)
  @Max(300000)
  @IsOptional()
  timeout?: number;

  @ApiPropertyOptional({
    description: 'Number of retry attempts',
    example: 3,
    default: 3,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  retryCount?: number;

  @ApiPropertyOptional({
    description: 'Rate limit (requests per minute)',
    example: 60,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  rateLimit?: number;

  @ApiPropertyOptional({
    description: 'Whether the connector is active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
