import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  IValidationResult,
  IValidationError,
  IValidationContext,
} from './interfaces';

/**
 * Validation Service
 * Comprehensive data validation service for all entity types
 */
@Injectable()
export class ValidationService {
  private readonly logger = new Logger(ValidationService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validate Budget data
   */
  async validateBudget(
    data: any,
    context?: IValidationContext,
  ): Promise<IValidationResult> {
    const errors: IValidationError[] = [];

    // Required fields
    const requiredFields = [
      'fiscalYear',
      'department',
      'program',
      'category',
      'subcategory',
      'amountPlanned',
    ];

    for (const field of requiredFields) {
      if (!this.hasValue(data[field])) {
        errors.push({
          field,
          message: `El campo '${field}' es requerido`,
          constraint: 'required',
          suggestion: `Debe proporcionar un valor para '${field}'`,
        });
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // Validate fiscalYear (number, range)
    if (!this.isValidInteger(data.fiscalYear)) {
      errors.push({
        field: 'fiscalYear',
        value: data.fiscalYear,
        message: 'El año fiscal debe ser un número entero',
        constraint: 'type',
        suggestion: 'Proporcione un año válido (ejemplo: 2024)',
      });
    } else {
      const year = parseInt(data.fiscalYear);
      const currentYear = new Date().getFullYear();
      if (year < 2000 || year > currentYear + 10) {
        errors.push({
          field: 'fiscalYear',
          value: data.fiscalYear,
          message: `El año fiscal debe estar entre 2000 y ${currentYear + 10}`,
          constraint: 'range',
          suggestion: `Proporcione un año válido entre 2000 y ${currentYear + 10}`,
        });
      }
    }

    // Validate string fields (length)
    const stringFields = [
      { name: 'department', maxLength: 255 },
      { name: 'program', maxLength: 255 },
      { name: 'category', maxLength: 255 },
      { name: 'subcategory', maxLength: 255 },
    ];

    for (const field of stringFields) {
      if (data[field.name]) {
        const value = String(data[field.name]).trim();
        if (value.length === 0) {
          errors.push({
            field: field.name,
            value: data[field.name],
            message: `El campo '${field.name}' no puede estar vacío`,
            constraint: 'minLength',
            suggestion: 'Proporcione un valor no vacío',
          });
        } else if (value.length > field.maxLength) {
          errors.push({
            field: field.name,
            value: data[field.name],
            message: `El campo '${field.name}' no puede exceder ${field.maxLength} caracteres`,
            constraint: 'maxLength',
            suggestion: `Reduzca la longitud a ${field.maxLength} caracteres o menos`,
          });
        }
      }
    }

    // Validate amountPlanned (positive decimal)
    if (!this.isValidDecimal(data.amountPlanned)) {
      errors.push({
        field: 'amountPlanned',
        value: data.amountPlanned,
        message: 'El monto planificado debe ser un número válido',
        constraint: 'type',
        suggestion: 'Proporcione un monto numérico válido (ejemplo: 1000000.50)',
      });
    } else {
      const amount = parseFloat(data.amountPlanned);
      if (amount <= 0) {
        errors.push({
          field: 'amountPlanned',
          value: data.amountPlanned,
          message: 'El monto planificado debe ser mayor que cero',
          constraint: 'range',
          suggestion: 'Proporcione un monto positivo',
        });
      } else if (amount > 999999999999.99) {
        errors.push({
          field: 'amountPlanned',
          value: data.amountPlanned,
          message: 'El monto planificado excede el límite permitido',
          constraint: 'range',
          suggestion: 'Reduzca el monto a un valor razonable',
        });
      }
    }

    // Validate currency (enum)
    if (data.currency) {
      const validCurrencies = ['CLP', 'UF', 'USD', 'EUR'];
      if (!validCurrencies.includes(data.currency)) {
        errors.push({
          field: 'currency',
          value: data.currency,
          message: `Moneda inválida: ${data.currency}`,
          constraint: 'enum',
          suggestion: `Valores permitidos: ${validCurrencies.join(', ')}`,
        });
      }
    }

    // Validate foreign keys if not skipped
    if (!context?.skipForeignKeyValidation) {
      // Validate municipalityId
      if (context?.municipalityId) {
        const municipalityExists = await this.prisma.municipality.findUnique({
          where: { id: context.municipalityId },
        });

        if (!municipalityExists) {
          errors.push({
            field: 'municipalityId',
            value: context.municipalityId,
            message: 'El municipio no existe',
            constraint: 'foreign_key',
            suggestion: 'Proporcione un ID de municipio válido',
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate Expenditure data
   */
  async validateExpenditure(
    data: any,
    context?: IValidationContext,
  ): Promise<IValidationResult> {
    const errors: IValidationError[] = [];

    // Required fields
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

    for (const field of requiredFields) {
      if (!this.hasValue(data[field])) {
        errors.push({
          field,
          message: `El campo '${field}' es requerido`,
          constraint: 'required',
          suggestion: `Debe proporcionar un valor para '${field}'`,
        });
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // Validate date
    if (!this.isValidDate(data.date)) {
      errors.push({
        field: 'date',
        value: data.date,
        message: 'Fecha inválida',
        constraint: 'date',
        suggestion:
          'Proporcione una fecha válida (formatos: DD/MM/YYYY, YYYY-MM-DD, ISO 8601)',
      });
    } else {
      const date = new Date(data.date);
      const minDate = new Date('2000-01-01');
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1); // Allow up to 1 year in future

      if (date < minDate || date > maxDate) {
        errors.push({
          field: 'date',
          value: data.date,
          message: `La fecha debe estar entre ${minDate.toISOString().split('T')[0]} y ${maxDate.toISOString().split('T')[0]}`,
          constraint: 'range',
          suggestion: 'Proporcione una fecha dentro del rango permitido',
        });
      }
    }

    // Validate fiscalYear
    if (!this.isValidInteger(data.fiscalYear)) {
      errors.push({
        field: 'fiscalYear',
        value: data.fiscalYear,
        message: 'El año fiscal debe ser un número entero',
        constraint: 'type',
        suggestion: 'Proporcione un año válido (ejemplo: 2024)',
      });
    } else {
      const year = parseInt(data.fiscalYear);
      const currentYear = new Date().getFullYear();
      if (year < 2000 || year > currentYear + 1) {
        errors.push({
          field: 'fiscalYear',
          value: data.fiscalYear,
          message: `El año fiscal debe estar entre 2000 y ${currentYear + 1}`,
          constraint: 'range',
          suggestion: `Proporcione un año válido entre 2000 y ${currentYear + 1}`,
        });
      }
    }

    // Validate string fields
    const stringFields = [
      { name: 'department', maxLength: 255 },
      { name: 'program', maxLength: 255 },
      { name: 'category', maxLength: 255 },
      { name: 'subcategory', maxLength: 255 },
      { name: 'concept', maxLength: 255 },
    ];

    for (const field of stringFields) {
      if (data[field.name]) {
        const value = String(data[field.name]).trim();
        if (value.length === 0) {
          errors.push({
            field: field.name,
            value: data[field.name],
            message: `El campo '${field.name}' no puede estar vacío`,
            constraint: 'minLength',
            suggestion: 'Proporcione un valor no vacío',
          });
        } else if (value.length > field.maxLength) {
          errors.push({
            field: field.name,
            value: data[field.name],
            message: `El campo '${field.name}' no puede exceder ${field.maxLength} caracteres`,
            constraint: 'maxLength',
            suggestion: `Reduzca la longitud a ${field.maxLength} caracteres o menos`,
          });
        }
      }
    }

    // Validate amountActual
    if (!this.isValidDecimal(data.amountActual)) {
      errors.push({
        field: 'amountActual',
        value: data.amountActual,
        message: 'El monto debe ser un número válido',
        constraint: 'type',
        suggestion: 'Proporcione un monto numérico válido (ejemplo: 1000000.50)',
      });
    } else {
      const amount = parseFloat(data.amountActual);
      if (amount <= 0) {
        errors.push({
          field: 'amountActual',
          value: data.amountActual,
          message: 'El monto debe ser mayor que cero',
          constraint: 'range',
          suggestion: 'Proporcione un monto positivo',
        });
      } else if (amount > 999999999999.99) {
        errors.push({
          field: 'amountActual',
          value: data.amountActual,
          message: 'El monto excede el límite permitido',
          constraint: 'range',
          suggestion: 'Reduzca el monto a un valor razonable',
        });
      }
    }

    // Validate currency (enum)
    if (data.currency) {
      const validCurrencies = ['CLP', 'UF', 'USD', 'EUR'];
      if (!validCurrencies.includes(data.currency)) {
        errors.push({
          field: 'currency',
          value: data.currency,
          message: `Moneda inválida: ${data.currency}`,
          constraint: 'enum',
          suggestion: `Valores permitidos: ${validCurrencies.join(', ')}`,
        });
      }
    }

    // Validate optional fields
    if (data.procurementRef && data.procurementRef.length > 255) {
      errors.push({
        field: 'procurementRef',
        value: data.procurementRef,
        message: 'La referencia de compra no puede exceder 255 caracteres',
        constraint: 'maxLength',
        suggestion: 'Reduzca la longitud a 255 caracteres o menos',
      });
    }

    // Validate foreign keys if not skipped
    if (!context?.skipForeignKeyValidation && context?.municipalityId) {
      const municipalityExists = await this.prisma.municipality.findUnique({
        where: { id: context.municipalityId },
      });

      if (!municipalityExists) {
        errors.push({
          field: 'municipalityId',
          value: context.municipalityId,
          message: 'El municipio no existe',
          constraint: 'foreign_key',
          suggestion: 'Proporcione un ID de municipio válido',
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate Project data
   */
  async validateProject(
    data: any,
    context?: IValidationContext,
  ): Promise<IValidationResult> {
    const errors: IValidationError[] = [];

    // Required fields
    const requiredFields = [
      'title',
      'description',
      'status',
      'department',
      'category',
    ];

    for (const field of requiredFields) {
      if (!this.hasValue(data[field])) {
        errors.push({
          field,
          message: `El campo '${field}' es requerido`,
          constraint: 'required',
          suggestion: `Debe proporcionar un valor para '${field}'`,
        });
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // Validate title
    if (data.title) {
      const title = String(data.title).trim();
      if (title.length === 0) {
        errors.push({
          field: 'title',
          value: data.title,
          message: 'El título no puede estar vacío',
          constraint: 'minLength',
          suggestion: 'Proporcione un título descriptivo',
        });
      } else if (title.length > 500) {
        errors.push({
          field: 'title',
          value: data.title,
          message: 'El título no puede exceder 500 caracteres',
          constraint: 'maxLength',
          suggestion: 'Reduzca la longitud del título',
        });
      }
    }

    // Validate description
    if (data.description) {
      const description = String(data.description).trim();
      if (description.length === 0) {
        errors.push({
          field: 'description',
          value: data.description,
          message: 'La descripción no puede estar vacía',
          constraint: 'minLength',
          suggestion: 'Proporcione una descripción del proyecto',
        });
      } else if (description.length < 10) {
        errors.push({
          field: 'description',
          value: data.description,
          message: 'La descripción debe tener al menos 10 caracteres',
          constraint: 'minLength',
          suggestion: 'Proporcione una descripción más detallada',
        });
      }
    }

    // Validate status (enum)
    const validStatuses = [
      'planificado',
      'en_progreso',
      'completado',
      'cancelado',
      'suspendido',
    ];

    if (data.status && !validStatuses.includes(data.status)) {
      errors.push({
        field: 'status',
        value: data.status,
        message: `Estado inválido: ${data.status}`,
        constraint: 'enum',
        suggestion: `Valores permitidos: ${validStatuses.join(', ')}`,
      });
    }

    // Validate department and category
    const stringFields = [
      { name: 'department', maxLength: 255 },
      { name: 'category', maxLength: 255 },
    ];

    for (const field of stringFields) {
      if (data[field.name]) {
        const value = String(data[field.name]).trim();
        if (value.length === 0) {
          errors.push({
            field: field.name,
            value: data[field.name],
            message: `El campo '${field.name}' no puede estar vacío`,
            constraint: 'minLength',
            suggestion: 'Proporcione un valor no vacío',
          });
        } else if (value.length > field.maxLength) {
          errors.push({
            field: field.name,
            value: data[field.name],
            message: `El campo '${field.name}' no puede exceder ${field.maxLength} caracteres`,
            constraint: 'maxLength',
            suggestion: `Reduzca la longitud a ${field.maxLength} caracteres o menos`,
          });
        }
      }
    }

    // Validate dates (optional)
    if (data.startDate && !this.isValidDate(data.startDate)) {
      errors.push({
        field: 'startDate',
        value: data.startDate,
        message: 'Fecha de inicio inválida',
        constraint: 'date',
        suggestion:
          'Proporcione una fecha válida (formatos: DD/MM/YYYY, YYYY-MM-DD, ISO 8601)',
      });
    }

    if (data.endDate && !this.isValidDate(data.endDate)) {
      errors.push({
        field: 'endDate',
        value: data.endDate,
        message: 'Fecha de fin inválida',
        constraint: 'date',
        suggestion:
          'Proporcione una fecha válida (formatos: DD/MM/YYYY, YYYY-MM-DD, ISO 8601)',
      });
    }

    // Validate date range
    if (
      data.startDate &&
      data.endDate &&
      this.isValidDate(data.startDate) &&
      this.isValidDate(data.endDate)
    ) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (startDate > endDate) {
        errors.push({
          field: 'endDate',
          value: data.endDate,
          message: 'La fecha de fin debe ser posterior a la fecha de inicio',
          constraint: 'range',
          suggestion: 'Ajuste las fechas para que la fecha de fin sea posterior',
        });
      }
    }

    // Validate budgets (optional)
    if (data.requestedBudget !== undefined && data.requestedBudget !== null) {
      if (!this.isValidDecimal(data.requestedBudget)) {
        errors.push({
          field: 'requestedBudget',
          value: data.requestedBudget,
          message: 'El presupuesto solicitado debe ser un número válido',
          constraint: 'type',
          suggestion: 'Proporcione un monto numérico válido',
        });
      } else {
        const amount = parseFloat(data.requestedBudget);
        if (amount < 0) {
          errors.push({
            field: 'requestedBudget',
            value: data.requestedBudget,
            message: 'El presupuesto solicitado no puede ser negativo',
            constraint: 'range',
            suggestion: 'Proporcione un monto positivo',
          });
        }
      }
    }

    if (data.approvedBudget !== undefined && data.approvedBudget !== null) {
      if (!this.isValidDecimal(data.approvedBudget)) {
        errors.push({
          field: 'approvedBudget',
          value: data.approvedBudget,
          message: 'El presupuesto aprobado debe ser un número válido',
          constraint: 'type',
          suggestion: 'Proporcione un monto numérico válido',
        });
      } else {
        const amount = parseFloat(data.approvedBudget);
        if (amount < 0) {
          errors.push({
            field: 'approvedBudget',
            value: data.approvedBudget,
            message: 'El presupuesto aprobado no puede ser negativo',
            constraint: 'range',
            suggestion: 'Proporcione un monto positivo',
          });
        }
      }
    }

    // Validate foreign keys if not skipped
    if (!context?.skipForeignKeyValidation && context?.municipalityId) {
      const municipalityExists = await this.prisma.municipality.findUnique({
        where: { id: context.municipalityId },
      });

      if (!municipalityExists) {
        errors.push({
          field: 'municipalityId',
          value: context.municipalityId,
          message: 'El municipio no existe',
          constraint: 'foreign_key',
          suggestion: 'Proporcione un ID de municipio válido',
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate Contract data
   */
  async validateContract(
    data: any,
    context?: IValidationContext,
  ): Promise<IValidationResult> {
    const errors: IValidationError[] = [];

    // Required fields
    const requiredFields = [
      'title',
      'description',
      'amount',
      'startDate',
      'status',
      'supplierId',
    ];

    for (const field of requiredFields) {
      if (!this.hasValue(data[field])) {
        errors.push({
          field,
          message: `El campo '${field}' es requerido`,
          constraint: 'required',
          suggestion: `Debe proporcionar un valor para '${field}'`,
        });
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // Validate title
    if (data.title) {
      const title = String(data.title).trim();
      if (title.length === 0) {
        errors.push({
          field: 'title',
          value: data.title,
          message: 'El título no puede estar vacío',
          constraint: 'minLength',
          suggestion: 'Proporcione un título descriptivo',
        });
      } else if (title.length > 500) {
        errors.push({
          field: 'title',
          value: data.title,
          message: 'El título no puede exceder 500 caracteres',
          constraint: 'maxLength',
          suggestion: 'Reduzca la longitud del título',
        });
      }
    }

    // Validate description
    if (data.description) {
      const description = String(data.description).trim();
      if (description.length === 0) {
        errors.push({
          field: 'description',
          value: data.description,
          message: 'La descripción no puede estar vacía',
          constraint: 'minLength',
          suggestion: 'Proporcione una descripción del contrato',
        });
      } else if (description.length < 10) {
        errors.push({
          field: 'description',
          value: data.description,
          message: 'La descripción debe tener al menos 10 caracteres',
          constraint: 'minLength',
          suggestion: 'Proporcione una descripción más detallada',
        });
      }
    }

    // Validate amount
    if (!this.isValidDecimal(data.amount)) {
      errors.push({
        field: 'amount',
        value: data.amount,
        message: 'El monto debe ser un número válido',
        constraint: 'type',
        suggestion: 'Proporcione un monto numérico válido (ejemplo: 1000000.50)',
      });
    } else {
      const amount = parseFloat(data.amount);
      if (amount <= 0) {
        errors.push({
          field: 'amount',
          value: data.amount,
          message: 'El monto debe ser mayor que cero',
          constraint: 'range',
          suggestion: 'Proporcione un monto positivo',
        });
      } else if (amount > 999999999999.99) {
        errors.push({
          field: 'amount',
          value: data.amount,
          message: 'El monto excede el límite permitido',
          constraint: 'range',
          suggestion: 'Reduzca el monto a un valor razonable',
        });
      }
    }

    // Validate currency (enum)
    if (data.currency) {
      const validCurrencies = ['CLP', 'UF', 'USD', 'EUR'];
      if (!validCurrencies.includes(data.currency)) {
        errors.push({
          field: 'currency',
          value: data.currency,
          message: `Moneda inválida: ${data.currency}`,
          constraint: 'enum',
          suggestion: `Valores permitidos: ${validCurrencies.join(', ')}`,
        });
      }
    }

    // Validate dates
    if (!this.isValidDate(data.startDate)) {
      errors.push({
        field: 'startDate',
        value: data.startDate,
        message: 'Fecha de inicio inválida',
        constraint: 'date',
        suggestion:
          'Proporcione una fecha válida (formatos: DD/MM/YYYY, YYYY-MM-DD, ISO 8601)',
      });
    }

    if (data.endDate && !this.isValidDate(data.endDate)) {
      errors.push({
        field: 'endDate',
        value: data.endDate,
        message: 'Fecha de fin inválida',
        constraint: 'date',
        suggestion:
          'Proporcione una fecha válida (formatos: DD/MM/YYYY, YYYY-MM-DD, ISO 8601)',
      });
    }

    // Validate date range
    if (
      data.startDate &&
      data.endDate &&
      this.isValidDate(data.startDate) &&
      this.isValidDate(data.endDate)
    ) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (startDate > endDate) {
        errors.push({
          field: 'endDate',
          value: data.endDate,
          message: 'La fecha de fin debe ser posterior a la fecha de inicio',
          constraint: 'range',
          suggestion: 'Ajuste las fechas para que la fecha de fin sea posterior',
        });
      }
    }

    // Validate status (enum)
    const validStatuses = [
      'activo',
      'completado',
      'cancelado',
      'suspendido',
      'en_revision',
    ];

    if (data.status && !validStatuses.includes(data.status)) {
      errors.push({
        field: 'status',
        value: data.status,
        message: `Estado inválido: ${data.status}`,
        constraint: 'enum',
        suggestion: `Valores permitidos: ${validStatuses.join(', ')}`,
      });
    }

    // Validate contractNumber (optional but unique if provided)
    if (data.contractNumber) {
      const contractNumber = String(data.contractNumber).trim();
      if (contractNumber.length > 255) {
        errors.push({
          field: 'contractNumber',
          value: data.contractNumber,
          message: 'El número de contrato no puede exceder 255 caracteres',
          constraint: 'maxLength',
          suggestion: 'Reduzca la longitud del número de contrato',
        });
      }
    }

    // Validate foreign keys if not skipped
    if (!context?.skipForeignKeyValidation) {
      if (context?.municipalityId) {
        const municipalityExists = await this.prisma.municipality.findUnique({
          where: { id: context.municipalityId },
        });

        if (!municipalityExists) {
          errors.push({
            field: 'municipalityId',
            value: context.municipalityId,
            message: 'El municipio no existe',
            constraint: 'foreign_key',
            suggestion: 'Proporcione un ID de municipio válido',
          });
        }
      }

      // Validate supplier exists
      if (data.supplierId) {
        const supplierExists = await this.prisma.supplier.findUnique({
          where: { id: data.supplierId },
        });

        if (!supplierExists) {
          errors.push({
            field: 'supplierId',
            value: data.supplierId,
            message: 'El proveedor no existe',
            constraint: 'foreign_key',
            suggestion:
              'Proporcione un ID de proveedor válido o cree el proveedor primero',
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate multiple records (batch validation)
   */
  async validateBatch(
    entityType: 'budget' | 'expenditure' | 'project' | 'contract',
    records: any[],
    context?: IValidationContext,
  ): Promise<{ validRecords: any[]; invalidRecords: any[] }> {
    const validRecords: any[] = [];
    const invalidRecords: any[] = [];

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      let result: IValidationResult;

      switch (entityType) {
        case 'budget':
          result = await this.validateBudget(record, context);
          break;
        case 'expenditure':
          result = await this.validateExpenditure(record, context);
          break;
        case 'project':
          result = await this.validateProject(record, context);
          break;
        case 'contract':
          result = await this.validateContract(record, context);
          break;
        default:
          throw new Error(`Unsupported entity type: ${entityType}`);
      }

      if (result.isValid) {
        validRecords.push({ ...record, rowNumber: i + 1 });
      } else {
        invalidRecords.push({
          ...record,
          rowNumber: i + 1,
          validationErrors: result.errors,
        });
      }
    }

    this.logger.log(
      `Batch validation completed: ${validRecords.length} valid, ${invalidRecords.length} invalid`,
    );

    return { validRecords, invalidRecords };
  }

  /**
   * Helper: Check if value exists and is not empty
   */
  private hasValue(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return true;
  }

  /**
   * Helper: Validate integer
   */
  private isValidInteger(value: any): boolean {
    if (typeof value === 'number') {
      return Number.isInteger(value);
    }

    if (typeof value === 'string') {
      const num = parseInt(value, 10);
      return !isNaN(num) && num.toString() === value.trim();
    }

    return false;
  }

  /**
   * Helper: Validate decimal
   */
  private isValidDecimal(value: any): boolean {
    if (typeof value === 'number') {
      return !isNaN(value) && isFinite(value);
    }

    if (typeof value === 'string') {
      const num = parseFloat(value);
      return !isNaN(num) && isFinite(num);
    }

    return false;
  }

  /**
   * Helper: Validate date
   */
  private isValidDate(value: any): boolean {
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }

    return false;
  }
}
