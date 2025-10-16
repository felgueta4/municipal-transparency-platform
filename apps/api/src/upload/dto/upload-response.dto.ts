
import { ApiProperty } from '@nestjs/swagger';
import { UploadError, UploadSummary } from '../interfaces/upload-result.interface';

export class UploadErrorDto implements UploadError {
  @ApiProperty({ example: 10, description: 'Número de fila con error' })
  row: number;

  @ApiProperty({ example: 'amount', description: 'Campo con error', required: false })
  field?: string;

  @ApiProperty({ example: 'El monto debe ser un número positivo', description: 'Mensaje de error' })
  message: string;

  @ApiProperty({ required: false, description: 'Valor que causó el error' })
  value?: any;
}

export class UploadSummaryDto implements UploadSummary {
  @ApiProperty({ example: 100, description: 'Total de registros en el archivo' })
  totalRecords: number;

  @ApiProperty({ example: 95, description: 'Registros insertados exitosamente' })
  successfulInserts: number;

  @ApiProperty({ example: 5, description: 'Registros con errores' })
  failedRecords: number;
}

export class UploadResponseDto {
  @ApiProperty({ example: true, description: 'Indica si la operación fue exitosa' })
  success: boolean;

  @ApiProperty({ type: UploadSummaryDto, description: 'Resumen de la operación' })
  summary: UploadSummaryDto;

  @ApiProperty({ type: [UploadErrorDto], description: 'Lista de errores encontrados' })
  errors: UploadErrorDto[];
}
