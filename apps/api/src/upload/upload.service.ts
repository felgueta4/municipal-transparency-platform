import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../validation/validation.service';
import { TransformationService } from '../transformation/transformation.service';
import { FileParserUtil } from './utils/file-parser.util';
import { DateParserUtil } from './utils/date-parser.util';
import { CurrencyParserUtil } from './utils/currency-parser.util';
import { ValidationUtil } from './utils/validation.util';
import {
  UploadResult,
  UploadError,
  ParsedRecord,
} from './interfaces/upload-result.interface';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private prisma: PrismaService,
    private _validationService: ValidationService,
    private _transformationService: TransformationService,
  ) {}

  /**
   * Helper method to safely extract error message
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return this.getErrorMessage(error);
    }
    return String(error);
  }

  /**
   * Upload Budget Data
   */
  async uploadBudgets(
    file: Express.Multer.File,
    municipalityId: string,
  ): Promise<UploadResult> {
    this.logger.log(
      `Starting budget upload for municipality ${municipalityId}`,
    );

    // Parse file
    const rawData = await FileParserUtil.parse(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    if (rawData.length === 0) {
      throw new BadRequestException('El archivo está vacío');
    }

    this.logger.log(`Parsed ${rawData.length} records from file`);

    // Required fields for budget
    const requiredFields = [
      'fiscalYear',
      'department',
      'program',
      'category',
      'subcategory',
      'amountPlanned',
    ];

    // Validate and transform records
    const parsedRecords: ParsedRecord[] = [];
    const errors: UploadError[] = [];

    for (let i = 0; i < rawData.length; i++) {
      const rowNumber = i + 2; // Row 1 is header, so data starts at row 2
      const record = ValidationUtil.normalizeFieldNames(rawData[i]);
      const recordErrors: UploadError[] = [];

      try {
        // Validate required fields
        const requiredFieldErrors = ValidationUtil.validateRequiredFields(
          record,
          requiredFields,
          rowNumber,
        );
        recordErrors.push(...requiredFieldErrors);

        if (recordErrors.length === 0) {
          // Parse and validate fiscal year
          const fiscalYear = parseInt(record.fiscalYear);
          if (isNaN(fiscalYear)) {
            recordErrors.push({
              row: rowNumber,
              field: 'fiscalYear',
              message: 'Año fiscal debe ser un número',
              value: record.fiscalYear,
            });
          }

          // Parse amount
          let amount: number;
          try {
            amount = CurrencyParserUtil.parseAmount(record.amountPlanned);
            CurrencyParserUtil.validatePositive(amount, 'amountPlanned');
          } catch (error) {
            recordErrors.push({
              row: rowNumber,
              field: 'amountPlanned',
              message: error instanceof Error ? this.getErrorMessage(error) : 'Error al parsear monto',
              value: record.amountPlanned,
            });
          }

          // Parse currency (optional)
          const currency = record.currency
            ? CurrencyParserUtil.parseCurrency(record.currency)
            : 'CLP';

          if (recordErrors.length === 0) {
            parsedRecords.push({
              data: {
                fiscalYear,
                department: record.department.trim(),
                program: record.program.trim(),
                category: record.category.trim(),
                subcategory: record.subcategory.trim(),
                amountPlanned: amount,
                currency,
                notes: record.notes || null,
              },
              rowNumber,
              isValid: true,
              errors: [],
            });
          }
        }
      } catch (error) {
        recordErrors.push({
          row: rowNumber,
          message: `Error al procesar registro: ${this.getErrorMessage(error)}`,
        });
      }

      if (recordErrors.length > 0) {
        errors.push(...recordErrors);
        parsedRecords.push({
          data: record,
          rowNumber,
          isValid: false,
          errors: recordErrors,
        });
      }
    }

    // Bulk insert valid records
    const validRecords = parsedRecords.filter((r) => r.isValid);
    let successfulInserts = 0;

    if (validRecords.length > 0) {
      try {
        await this.prisma.$transaction(async (tx) => {
          for (const record of validRecords) {
            try {
              // Get or create fiscal year
              let fiscalYear = await tx.fiscalYear.findFirst({
                where: { year: record.data.fiscalYear },
              });

              if (!fiscalYear) {
                fiscalYear = await tx.fiscalYear.create({
                  data: {
                    year: record.data.fiscalYear,
                    status: 'active',
                  },
                });
              }

              // Insert budget
              await tx.budget.create({
                data: {
                  municipalityId,
                  fiscalYearId: fiscalYear.id,
                  department: record.data.department,
                  program: record.data.program,
                  category: record.data.category,
                  subcategory: record.data.subcategory,
                  amountPlanned: new Decimal(record.data.amountPlanned),
                  currency: record.data.currency,
                  notes: record.data.notes,
                },
              });

              successfulInserts++;
            } catch (error) {
              this.logger.error(
                `Failed to insert record at row ${record.rowNumber}`,
                error,
              );
              errors.push({
                row: record.rowNumber,
                message: `Error al insertar: ${this.getErrorMessage(error)}`,
              });
            }
          }
        });
      } catch (error) {
        this.logger.error('Transaction failed', error);
        throw new BadRequestException(
          `Error en la transacción: ${this.getErrorMessage(error)}`,
        );
      }
    }

    this.logger.log(
      `Budget upload completed. Success: ${successfulInserts}, Errors: ${errors.length}`,
    );

    return {
      success: errors.length === 0,
      summary: {
        totalRecords: rawData.length,
        successfulInserts,
        failedRecords: rawData.length - successfulInserts,
      },
      errors,
    };
  }

  /**
   * Upload Expenditure Data
   */
  async uploadExpenditures(
    file: Express.Multer.File,
    municipalityId: string,
  ): Promise<UploadResult> {
    this.logger.log(
      `Starting expenditure upload for municipality ${municipalityId}`,
    );

    // Parse file
    const rawData = await FileParserUtil.parse(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    if (rawData.length === 0) {
      throw new BadRequestException('El archivo está vacío');
    }

    this.logger.log(`Parsed ${rawData.length} records from file`);

    // Required fields for expenditure
    const requiredFields = [
      'date',
      'fiscalYear',
      'department',
      'program',
      'category',
      'subcategory',
      'concept',
      'amountActual',
    ];

    // Validate and transform records
    const parsedRecords: ParsedRecord[] = [];
    const errors: UploadError[] = [];

    for (let i = 0; i < rawData.length; i++) {
      const rowNumber = i + 2;
      const record = ValidationUtil.normalizeFieldNames(rawData[i]);
      const recordErrors: UploadError[] = [];

      try {
        // Validate required fields
        const requiredFieldErrors = ValidationUtil.validateRequiredFields(
          record,
          requiredFields,
          rowNumber,
        );
        recordErrors.push(...requiredFieldErrors);

        if (recordErrors.length === 0) {
          // Parse date
          let date: Date;
          try {
            date = DateParserUtil.parseDate(record.date);
            if (!date) {
              throw new Error('Fecha inválida');
            }
          } catch (error) {
            recordErrors.push({
              row: rowNumber,
              field: 'date',
              message: this.getErrorMessage(error),
              value: record.date,
            });
          }

          // Parse fiscal year
          const fiscalYear = parseInt(record.fiscalYear);
          if (isNaN(fiscalYear)) {
            recordErrors.push({
              row: rowNumber,
              field: 'fiscalYear',
              message: 'Año fiscal debe ser un número',
              value: record.fiscalYear,
            });
          }

          // Parse amount
          let amount: number;
          try {
            amount = CurrencyParserUtil.parseAmount(record.amountActual);
            CurrencyParserUtil.validatePositive(amount, 'amountActual');
          } catch (error) {
            recordErrors.push({
              row: rowNumber,
              field: 'amountActual',
              message: this.getErrorMessage(error),
              value: record.amountActual,
            });
          }

          // Parse currency (optional)
          const currency = record.currency
            ? CurrencyParserUtil.parseCurrency(record.currency)
            : 'CLP';

          if (recordErrors.length === 0) {
            parsedRecords.push({
              data: {
                date,
                fiscalYear,
                department: record.department.trim(),
                program: record.program.trim(),
                category: record.category.trim(),
                subcategory: record.subcategory.trim(),
                concept: record.concept.trim(),
                amountActual: amount,
                currency,
                supplierName: record.supplierName?.trim() || null,
                supplierTaxId: record.supplierTaxId?.trim() || null,
                procurementRef: record.procurementRef?.trim() || null,
                location: record.location?.trim() || null,
              },
              rowNumber,
              isValid: true,
              errors: [],
            });
          }
        }
      } catch (error) {
        recordErrors.push({
          row: rowNumber,
          message: `Error al procesar registro: ${this.getErrorMessage(error)}`,
        });
      }

      if (recordErrors.length > 0) {
        errors.push(...recordErrors);
        parsedRecords.push({
          data: record,
          rowNumber,
          isValid: false,
          errors: recordErrors,
        });
      }
    }

    // Bulk insert valid records
    const validRecords = parsedRecords.filter((r) => r.isValid);
    let successfulInserts = 0;

    if (validRecords.length > 0) {
      try {
        await this.prisma.$transaction(async (tx) => {
          for (const record of validRecords) {
            try {
              // Get or create fiscal year
              let fiscalYear = await tx.fiscalYear.findFirst({
                where: { year: record.data.fiscalYear },
              });

              if (!fiscalYear) {
                fiscalYear = await tx.fiscalYear.create({
                  data: {
                    year: record.data.fiscalYear,
                    status: 'active',
                  },
                });
              }

              // Get or create supplier (if provided)
              let supplierId: string | null = null;
              if (record.data.supplierName || record.data.supplierTaxId) {
                let supplier = null;

                // Try to find by tax ID first
                if (record.data.supplierTaxId) {
                  supplier = await tx.supplier.findUnique({
                    where: { taxId: record.data.supplierTaxId },
                  });
                }

                // If not found, try by name
                if (!supplier && record.data.supplierName) {
                  supplier = await tx.supplier.findFirst({
                    where: { name: record.data.supplierName },
                  });
                }

                // Create if not exists
                if (!supplier && record.data.supplierName) {
                  supplier = await tx.supplier.create({
                    data: {
                      name: record.data.supplierName,
                      taxId: record.data.supplierTaxId || null,
                    },
                  });
                }

                supplierId = supplier?.id || null;
              }

              // Insert expenditure
              await tx.expenditure.create({
                data: {
                  municipalityId,
                  fiscalYearId: fiscalYear.id,
                  date: record.data.date,
                  department: record.data.department,
                  program: record.data.program,
                  category: record.data.category,
                  subcategory: record.data.subcategory,
                  concept: record.data.concept,
                  amountActual: new Decimal(record.data.amountActual),
                  currency: record.data.currency,
                  supplierId,
                  procurementRef: record.data.procurementRef,
                  location: record.data.location,
                },
              });

              successfulInserts++;
            } catch (error) {
              this.logger.error(
                `Failed to insert record at row ${record.rowNumber}`,
                error,
              );
              errors.push({
                row: record.rowNumber,
                message: `Error al insertar: ${this.getErrorMessage(error)}`,
              });
            }
          }
        });
      } catch (error) {
        this.logger.error('Transaction failed', error);
        throw new BadRequestException(
          `Error en la transacción: ${this.getErrorMessage(error)}`,
        );
      }
    }

    this.logger.log(
      `Expenditure upload completed. Success: ${successfulInserts}, Errors: ${errors.length}`,
    );

    return {
      success: errors.length === 0,
      summary: {
        totalRecords: rawData.length,
        successfulInserts,
        failedRecords: rawData.length - successfulInserts,
      },
      errors,
    };
  }

  /**
   * Upload Project Data
   */
  async uploadProjects(
    file: Express.Multer.File,
    municipalityId: string,
  ): Promise<UploadResult> {
    this.logger.log(
      `Starting project upload for municipality ${municipalityId}`,
    );

    // Parse file
    const rawData = await FileParserUtil.parse(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    if (rawData.length === 0) {
      throw new BadRequestException('El archivo está vacío');
    }

    this.logger.log(`Parsed ${rawData.length} records from file`);

    // Required fields for project
    const requiredFields = [
      'title',
      'description',
      'status',
      'department',
      'category',
    ];

    // Valid status values
    const validStatuses = [
      'planificado',
      'en_progreso',
      'completado',
      'cancelado',
      'suspendido',
    ];

    // Validate and transform records
    const parsedRecords: ParsedRecord[] = [];
    const errors: UploadError[] = [];

    for (let i = 0; i < rawData.length; i++) {
      const rowNumber = i + 2;
      const record = ValidationUtil.normalizeFieldNames(rawData[i]);
      const recordErrors: UploadError[] = [];

      try {
        // Validate required fields
        const requiredFieldErrors = ValidationUtil.validateRequiredFields(
          record,
          requiredFields,
          rowNumber,
        );
        recordErrors.push(...requiredFieldErrors);

        if (recordErrors.length === 0) {
          // Validate status
          const statusError = ValidationUtil.validateEnum(
            record.status,
            'status',
            validStatuses,
            rowNumber,
          );
          if (statusError) {
            recordErrors.push(statusError);
          }

          // Parse dates (optional)
          let startDate: Date | null = null;
          let endDate: Date | null = null;

          if (record.startDate) {
            try {
              startDate = DateParserUtil.parseDate(record.startDate);
            } catch (error) {
              recordErrors.push({
                row: rowNumber,
                field: 'startDate',
                message: this.getErrorMessage(error),
                value: record.startDate,
              });
            }
          }

          if (record.endDate) {
            try {
              endDate = DateParserUtil.parseDate(record.endDate);
            } catch (error) {
              recordErrors.push({
                row: rowNumber,
                field: 'endDate',
                message: this.getErrorMessage(error),
                value: record.endDate,
              });
            }
          }

          // Validate start date is before end date
          if (startDate && endDate && startDate > endDate) {
            recordErrors.push({
              row: rowNumber,
              field: 'endDate',
              message: 'Fecha de fin debe ser posterior a fecha de inicio',
              value: record.endDate,
            });
          }

          // Parse budgets (optional)
          let requestedBudget: number | null = null;
          let approvedBudget: number | null = null;

          if (record.requestedBudget) {
            try {
              requestedBudget = CurrencyParserUtil.parseAmount(
                record.requestedBudget,
              );
            } catch (error) {
              recordErrors.push({
                row: rowNumber,
                field: 'requestedBudget',
                message: this.getErrorMessage(error),
                value: record.requestedBudget,
              });
            }
          }

          if (record.approvedBudget) {
            try {
              approvedBudget = CurrencyParserUtil.parseAmount(
                record.approvedBudget,
              );
            } catch (error) {
              recordErrors.push({
                row: rowNumber,
                field: 'approvedBudget',
                message: this.getErrorMessage(error),
                value: record.approvedBudget,
              });
            }
          }

          if (recordErrors.length === 0) {
            parsedRecords.push({
              data: {
                title: record.title.trim(),
                description: record.description.trim(),
                status: record.status.trim(),
                department: record.department.trim(),
                category: record.category.trim(),
                startDate,
                endDate,
                requestedBudget,
                approvedBudget,
                fundingSourceName: record.fundingSourceName?.trim() || null,
                location: record.location?.trim() || null,
              },
              rowNumber,
              isValid: true,
              errors: [],
            });
          }
        }
      } catch (error) {
        recordErrors.push({
          row: rowNumber,
          message: `Error al procesar registro: ${this.getErrorMessage(error)}`,
        });
      }

      if (recordErrors.length > 0) {
        errors.push(...recordErrors);
        parsedRecords.push({
          data: record,
          rowNumber,
          isValid: false,
          errors: recordErrors,
        });
      }
    }

    // Bulk insert valid records
    const validRecords = parsedRecords.filter((r) => r.isValid);
    let successfulInserts = 0;

    if (validRecords.length > 0) {
      try {
        await this.prisma.$transaction(async (tx) => {
          for (const record of validRecords) {
            try {
              // Get or create funding source (if provided)
              let fundingSourceId: string | null = null;
              if (record.data.fundingSourceName) {
                let fundingSource = await tx.fundingSource.findFirst({
                  where: { name: record.data.fundingSourceName },
                });

                if (!fundingSource) {
                  fundingSource = await tx.fundingSource.create({
                    data: {
                      name: record.data.fundingSourceName,
                      type: 'municipal',
                    },
                  });
                }

                fundingSourceId = fundingSource.id;
              }

              // Insert project
              await tx.project.create({
                data: {
                  municipalityId,
                  title: record.data.title,
                  description: record.data.description,
                  status: record.data.status,
                  department: record.data.department,
                  category: record.data.category,
                  startDate: record.data.startDate,
                  endDate: record.data.endDate,
                  requestedBudget: record.data.requestedBudget
                    ? new Decimal(record.data.requestedBudget)
                    : null,
                  approvedBudget: record.data.approvedBudget
                    ? new Decimal(record.data.approvedBudget)
                    : null,
                  fundingSourceId,
                  location: record.data.location,
                },
              });

              successfulInserts++;
            } catch (error) {
              this.logger.error(
                `Failed to insert record at row ${record.rowNumber}`,
                error,
              );
              errors.push({
                row: record.rowNumber,
                message: `Error al insertar: ${this.getErrorMessage(error)}`,
              });
            }
          }
        });
      } catch (error) {
        this.logger.error('Transaction failed', error);
        throw new BadRequestException(
          `Error en la transacción: ${this.getErrorMessage(error)}`,
        );
      }
    }

    this.logger.log(
      `Project upload completed. Success: ${successfulInserts}, Errors: ${errors.length}`,
    );

    return {
      success: errors.length === 0,
      summary: {
        totalRecords: rawData.length,
        successfulInserts,
        failedRecords: rawData.length - successfulInserts,
      },
      errors,
    };
  }
}
