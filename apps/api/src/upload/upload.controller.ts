import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UploadResponseDto } from './dto';

@ApiTags('Upload')
@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('budgets')
  @Roles('admin_muni', 'editor_muni')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (_req, file, callback) => {
        // Validate file type
        const allowedMimeTypes = [
          'text/csv',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/json',
        ];

        const allowedExtensions = ['csv', 'xlsx', 'json'];
        const fileExtension = file.originalname.split('.').pop()?.toLowerCase();

        if (
          allowedMimeTypes.includes(file.mimetype) ||
          (fileExtension && allowedExtensions.includes(fileExtension))
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Tipo de archivo no permitido. Use CSV, XLSX o JSON.',
            ),
            false,
          );
        }
      },
    }),
  )
  @ApiOperation({
    summary: 'Cargar presupuestos en lote (admin/editor)',
    description:
      'Permite cargar múltiples registros de presupuesto desde un archivo CSV, Excel o JSON. ' +
      'El archivo debe contener las columnas: fiscalYear, department, program, category, subcategory, amountPlanned. ' +
      'Columnas opcionales: currency, notes.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo CSV, XLSX o JSON con datos de presupuestos',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Carga completada',
    type: UploadResponseDto,
    example: {
      success: true,
      summary: {
        totalRecords: 100,
        successfulInserts: 95,
        failedRecords: 5,
      },
      errors: [
        {
          row: 10,
          field: 'amountPlanned',
          message: 'El monto debe ser un número positivo',
          value: '-1000',
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido o datos incorrectos',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  async uploadBudgets(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('municipalityId') municipalityId: string,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    if (!municipalityId) {
      throw new BadRequestException(
        'Usuario no tiene municipalidad asignada',
      );
    }

    return this.uploadService.uploadBudgets(file, municipalityId);
  }

  @Post('expenditures')
  @Roles('admin_muni', 'editor_muni')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (_req, file, callback) => {
        const allowedMimeTypes = [
          'text/csv',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/json',
        ];

        const allowedExtensions = ['csv', 'xlsx', 'json'];
        const fileExtension = file.originalname.split('.').pop()?.toLowerCase();

        if (
          allowedMimeTypes.includes(file.mimetype) ||
          (fileExtension && allowedExtensions.includes(fileExtension))
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Tipo de archivo no permitido. Use CSV, XLSX o JSON.',
            ),
            false,
          );
        }
      },
    }),
  )
  @ApiOperation({
    summary: 'Cargar gastos en lote (admin/editor)',
    description:
      'Permite cargar múltiples registros de gastos desde un archivo CSV, Excel o JSON. ' +
      'El archivo debe contener las columnas: date, fiscalYear, department, program, category, subcategory, concept, amountActual. ' +
      'Columnas opcionales: currency, supplierName, supplierTaxId, procurementRef, location.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo CSV, XLSX o JSON con datos de gastos',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Carga completada',
    type: UploadResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido o datos incorrectos',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  async uploadExpenditures(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('municipalityId') municipalityId: string,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    if (!municipalityId) {
      throw new BadRequestException(
        'Usuario no tiene municipalidad asignada',
      );
    }

    return this.uploadService.uploadExpenditures(file, municipalityId);
  }

  @Post('projects')
  @Roles('admin_muni', 'editor_muni')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (_req, file, callback) => {
        const allowedMimeTypes = [
          'text/csv',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/json',
        ];

        const allowedExtensions = ['csv', 'xlsx', 'json'];
        const fileExtension = file.originalname.split('.').pop()?.toLowerCase();

        if (
          allowedMimeTypes.includes(file.mimetype) ||
          (fileExtension && allowedExtensions.includes(fileExtension))
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Tipo de archivo no permitido. Use CSV, XLSX o JSON.',
            ),
            false,
          );
        }
      },
    }),
  )
  @ApiOperation({
    summary: 'Cargar proyectos en lote (admin/editor)',
    description:
      'Permite cargar múltiples registros de proyectos desde un archivo CSV, Excel o JSON. ' +
      'El archivo debe contener las columnas: title, description, status, department, category. ' +
      'Columnas opcionales: startDate, endDate, requestedBudget, approvedBudget, fundingSourceName, location. ' +
      'Status válidos: planificado, en_progreso, completado, cancelado, suspendido.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo CSV, XLSX o JSON con datos de proyectos',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Carga completada',
    type: UploadResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido o datos incorrectos',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  async uploadProjects(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('municipalityId') municipalityId: string,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    if (!municipalityId) {
      throw new BadRequestException(
        'Usuario no tiene municipalidad asignada',
      );
    }

    return this.uploadService.uploadProjects(file, municipalityId);
  }
}
