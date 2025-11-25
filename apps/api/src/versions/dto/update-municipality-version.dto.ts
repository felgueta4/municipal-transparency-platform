import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class UpdateMunicipalityVersionDto {
  @ApiProperty({
    example: '1.15.2',
    description: 'Versión del software a asignar (debe existir y estar en estado stable)',
    pattern: '^\\d+\\.\\d+\\.\\d+$',
  })
  @IsString()
  @IsNotEmpty({ message: 'La versión es requerida' })
  @Matches(/^\d+\.\d+\.\d+$/, {
    message: 'La versión debe seguir el formato semántico (ej: 1.15.2)',
  })
  toVersion: string;

  @ApiProperty({
    example: 'Actualización programada por el administrador',
    description: 'Notas sobre el cambio de versión',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
