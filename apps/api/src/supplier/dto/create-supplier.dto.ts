

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IsValidChileanRut } from '../../common/validators';

export class CreateSupplierDto {
  @ApiProperty({
    example: 'Constructora Aconcagua SpA',
    description: 'Nombre del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '76.123.456-7',
    description: 'RUT chileno del proveedor',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsValidChileanRut()
  taxId?: string;

  @ApiProperty({
    example: 'Construcción',
    description: 'Sector o industria',
    required: false,
  })
  @IsOptional()
  @IsString()
  sector?: string;

  @ApiProperty({
    example: 'Santiago',
    description: 'Localidad',
    required: false,
  })
  @IsOptional()
  @IsString()
  locality?: string;
}
