
import { Injectable, Logger } from '@nestjs/common';
import {
  ITransformationResult,
  ITransformationWarning,
  IFieldMapping,
  IDataSourceConfig,
} from './interfaces';

/**
 * Transformation Service
 * Normalizes data from different sources to match the standard schema
 */
@Injectable()
export class TransformationService {
  private readonly logger = new Logger(TransformationService.name);

  /**
   * Transform Budget data
   */
  transformBudget(
    data: any,
    config?: IDataSourceConfig,
  ): ITransformationResult {
    const warnings: ITransformationWarning[] = [];
    const transformed: any = {};

    // Apply field mappings if provided
    const mappedData = config?.fieldMappings
      ? this.applyFieldMappings(data, config.fieldMappings, warnings)
      : data;

    // Normalize fiscalYear
    transformed.fiscalYear = this.normalizeInteger(
      mappedData.fiscalYear,
      'fiscalYear',
      warnings,
    );

    // Normalize string fields
    transformed.department = this.normalizeString(
      mappedData.department,
      'department',
      warnings,
    );
    transformed.program = this.normalizeString(
      mappedData.program,
      'program',
      warnings,
    );
    transformed.category = this.normalizeString(
      mappedData.category,
      'category',
      warnings,
    );
    transformed.subcategory = this.normalizeString(
      mappedData.subcategory,
      'subcategory',
      warnings,
    );

    // Normalize amount
    transformed.amountPlanned = this.normalizeCurrency(
      mappedData.amountPlanned,
      'amountPlanned',
      config,
      warnings,
    );

    // Normalize currency
    transformed.currency = this.normalizeCurrencyCode(
      mappedData.currency,
      'currency',
      warnings,
    );

    // Optional fields
    transformed.notes = mappedData.notes
      ? this.normalizeString(mappedData.notes, 'notes', warnings)
      : null;

    this.logger.debug(
      `Transformed budget data with ${warnings.length} warnings`,
    );

    return { data: transformed, warnings };
  }

  /**
   * Transform Expenditure data
   */
  transformExpenditure(
    data: any,
    config?: IDataSourceConfig,
  ): ITransformationResult {
    const warnings: ITransformationWarning[] = [];
    const transformed: any = {};

    // Apply field mappings if provided
    const mappedData = config?.fieldMappings
      ? this.applyFieldMappings(data, config.fieldMappings, warnings)
      : data;

    // Normalize date
    transformed.date = this.normalizeDate(
      mappedData.date,
      'date',
      config,
      warnings,
    );

    // Normalize fiscalYear
    transformed.fiscalYear = this.normalizeInteger(
      mappedData.fiscalYear,
      'fiscalYear',
      warnings,
    );

    // Normalize string fields
    transformed.department = this.normalizeString(
      mappedData.department,
      'department',
      warnings,
    );
    transformed.program = this.normalizeString(
      mappedData.program,
      'program',
      warnings,
    );
    transformed.category = this.normalizeString(
      mappedData.category,
      'category',
      warnings,
    );
    transformed.subcategory = this.normalizeString(
      mappedData.subcategory,
      'subcategory',
      warnings,
    );
    transformed.concept = this.normalizeString(
      mappedData.concept,
      'concept',
      warnings,
    );

    // Normalize amount
    transformed.amountActual = this.normalizeCurrency(
      mappedData.amountActual,
      'amountActual',
      config,
      warnings,
    );

    // Normalize currency
    transformed.currency = this.normalizeCurrencyCode(
      mappedData.currency,
      'currency',
      warnings,
    );

    // Optional fields
    transformed.supplierName = mappedData.supplierName
      ? this.normalizeString(mappedData.supplierName, 'supplierName', warnings)
      : null;
    transformed.supplierTaxId = mappedData.supplierTaxId
      ? this.normalizeString(
          mappedData.supplierTaxId,
          'supplierTaxId',
          warnings,
        )
      : null;
    transformed.procurementRef = mappedData.procurementRef
      ? this.normalizeString(
          mappedData.procurementRef,
          'procurementRef',
          warnings,
        )
      : null;
    transformed.location = mappedData.location
      ? this.normalizeString(mappedData.location, 'location', warnings)
      : null;

    this.logger.debug(
      `Transformed expenditure data with ${warnings.length} warnings`,
    );

    return { data: transformed, warnings };
  }

  /**
   * Transform Project data
   */
  transformProject(
    data: any,
    config?: IDataSourceConfig,
  ): ITransformationResult {
    const warnings: ITransformationWarning[] = [];
    const transformed: any = {};

    // Apply field mappings if provided
    const mappedData = config?.fieldMappings
      ? this.applyFieldMappings(data, config.fieldMappings, warnings)
      : data;

    // Normalize string fields
    transformed.title = this.normalizeString(
      mappedData.title,
      'title',
      warnings,
    );
    transformed.description = this.normalizeString(
      mappedData.description,
      'description',
      warnings,
    );
    transformed.status = this.normalizeProjectStatus(
      mappedData.status,
      'status',
      warnings,
    );
    transformed.department = this.normalizeString(
      mappedData.department,
      'department',
      warnings,
    );
    transformed.category = this.normalizeString(
      mappedData.category,
      'category',
      warnings,
    );

    // Normalize dates (optional)
    transformed.startDate = mappedData.startDate
      ? this.normalizeDate(mappedData.startDate, 'startDate', config, warnings)
      : null;
    transformed.endDate = mappedData.endDate
      ? this.normalizeDate(mappedData.endDate, 'endDate', config, warnings)
      : null;

    // Normalize budgets (optional)
    transformed.requestedBudget = mappedData.requestedBudget
      ? this.normalizeCurrency(
          mappedData.requestedBudget,
          'requestedBudget',
          config,
          warnings,
        )
      : null;
    transformed.approvedBudget = mappedData.approvedBudget
      ? this.normalizeCurrency(
          mappedData.approvedBudget,
          'approvedBudget',
          config,
          warnings,
        )
      : null;

    // Optional fields
    transformed.fundingSourceName = mappedData.fundingSourceName
      ? this.normalizeString(
          mappedData.fundingSourceName,
          'fundingSourceName',
          warnings,
        )
      : null;
    transformed.location = mappedData.location
      ? this.normalizeString(mappedData.location, 'location', warnings)
      : null;

    this.logger.debug(
      `Transformed project data with ${warnings.length} warnings`,
    );

    return { data: transformed, warnings };
  }

  /**
   * Transform Contract data
   */
  transformContract(
    data: any,
    config?: IDataSourceConfig,
  ): ITransformationResult {
    const warnings: ITransformationWarning[] = [];
    const transformed: any = {};

    // Apply field mappings if provided
    const mappedData = config?.fieldMappings
      ? this.applyFieldMappings(data, config.fieldMappings, warnings)
      : data;

    // Normalize string fields
    transformed.title = this.normalizeString(
      mappedData.title,
      'title',
      warnings,
    );
    transformed.description = this.normalizeString(
      mappedData.description,
      'description',
      warnings,
    );
    transformed.status = this.normalizeContractStatus(
      mappedData.status,
      'status',
      warnings,
    );

    // Normalize amount
    transformed.amount = this.normalizeCurrency(
      mappedData.amount,
      'amount',
      config,
      warnings,
    );

    // Normalize currency
    transformed.currency = this.normalizeCurrencyCode(
      mappedData.currency,
      'currency',
      warnings,
    );

    // Normalize dates
    transformed.startDate = this.normalizeDate(
      mappedData.startDate,
      'startDate',
      config,
      warnings,
    );
    transformed.endDate = mappedData.endDate
      ? this.normalizeDate(mappedData.endDate, 'endDate', config, warnings)
      : null;

    // Optional fields
    transformed.contractNumber = mappedData.contractNumber
      ? this.normalizeString(
          mappedData.contractNumber,
          'contractNumber',
          warnings,
        )
      : null;

    // Supplier info (if name/taxId provided instead of ID)
    if (mappedData.supplierName || mappedData.supplierTaxId) {
      transformed.supplierName = mappedData.supplierName
        ? this.normalizeString(
            mappedData.supplierName,
            'supplierName',
            warnings,
          )
        : null;
      transformed.supplierTaxId = mappedData.supplierTaxId
        ? this.normalizeString(
            mappedData.supplierTaxId,
            'supplierTaxId',
            warnings,
          )
        : null;
    } else {
      transformed.supplierId = mappedData.supplierId;
    }

    this.logger.debug(
      `Transformed contract data with ${warnings.length} warnings`,
    );

    return { data: transformed, warnings };
  }

  /**
   * Batch transform multiple records
   */
  transformBatch(
    entityType: 'budget' | 'expenditure' | 'project' | 'contract',
    records: any[],
    config?: IDataSourceConfig,
  ): ITransformationResult[] {
    return records.map((record) => {
      switch (entityType) {
        case 'budget':
          return this.transformBudget(record, config);
        case 'expenditure':
          return this.transformExpenditure(record, config);
        case 'project':
          return this.transformProject(record, config);
        case 'contract':
          return this.transformContract(record, config);
        default:
          throw new Error(`Unsupported entity type: ${entityType}`);
      }
    });
  }

  /**
   * Apply field mappings to transform field names
   */
  private applyFieldMappings(
    data: any,
    mappings: IFieldMapping[],
    _warnings: ITransformationWarning[],
  ): any {
    const result: any = { ...data };

    for (const mapping of mappings) {
      if (data[mapping.sourceField] !== undefined) {
        let value = data[mapping.sourceField];

        // Apply custom transformer if provided
        if (mapping.transformer) {
          try {
            value = mapping.transformer(value);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : 'Unknown error';
            this.logger.warn(
              `Failed to transform field ${mapping.sourceField}: ${message}`,
            );
          }
        }

        result[mapping.targetField] = value;

        // Remove source field if different from target
        if (mapping.sourceField !== mapping.targetField) {
          delete result[mapping.sourceField];
        }
      } else if (mapping.defaultValue !== undefined) {
        result[mapping.targetField] = mapping.defaultValue;
      }
    }

    return result;
  }

  /**
   * Normalize string: trim, handle empty values
   */
  private normalizeString(
    value: any,
    fieldName: string,
    warnings: ITransformationWarning[],
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    const original = value;
    let normalized = String(value).trim();

    // Replace multiple spaces with single space
    normalized = normalized.replace(/\s+/g, ' ');

    if (original !== normalized) {
      warnings.push({
        field: fieldName,
        originalValue: original,
        transformedValue: normalized,
        reason: 'Espacios en blanco normalizados',
      });
    }

    return normalized;
  }

  /**
   * Normalize integer
   */
  private normalizeInteger(
    value: any,
    fieldName: string,
    warnings: ITransformationWarning[],
  ): number {
    if (typeof value === 'number') {
      return Math.round(value);
    }

    if (typeof value === 'string') {
      const cleaned = value.trim().replace(/[^\d-]/g, '');
      const parsed = parseInt(cleaned, 10);

      if (!isNaN(parsed) && value !== cleaned) {
        warnings.push({
          field: fieldName,
          originalValue: value,
          transformedValue: parsed,
          reason: 'Formato de número normalizado',
        });
      }

      return parsed;
    }

    return NaN;
  }

  /**
   * Normalize currency amount
   */
  private normalizeCurrency(
    value: any,
    fieldName: string,
    config?: IDataSourceConfig,
    warnings?: ITransformationWarning[],
  ): number {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      const original = value;
      let cleaned = value.trim();

      // Remove currency symbols
      cleaned = cleaned.replace(/[$€£¥₹₽CLP UF]/gi, '').trim();

      // Handle different decimal and thousands separators
      const decimalSeparator = config?.decimalSeparator || '.';
      const thousandsSeparator = config?.thousandsSeparator || ',';

      // Remove thousands separator
      if (thousandsSeparator) {
        cleaned = cleaned.replace(
          new RegExp(`\\${thousandsSeparator}`, 'g'),
          '',
        );
      }

      // Replace decimal separator with standard '.'
      if (decimalSeparator !== '.') {
        cleaned = cleaned.replace(decimalSeparator, '.');
      }

      const parsed = parseFloat(cleaned);

      if (!isNaN(parsed) && original !== cleaned && warnings) {
        warnings.push({
          field: fieldName,
          originalValue: original,
          transformedValue: parsed,
          reason: 'Formato monetario normalizado',
        });
      }

      return parsed;
    }

    return NaN;
  }

  /**
   * Normalize currency code
   */
  private normalizeCurrencyCode(
    value: any,
    fieldName: string,
    warnings: ITransformationWarning[],
  ): string {
    if (!value) {
      return 'CLP'; // Default to Chilean Peso
    }

    const original = value;
    let normalized = String(value).trim().toUpperCase();

    // Handle common variations
    const currencyMap: Record<string, string> = {
      PESO: 'CLP',
      PESOS: 'CLP',
      'PESO CHILENO': 'CLP',
      'PESOS CHILENOS': 'CLP',
      'UNIDAD DE FOMENTO': 'UF',
      'UNIDADES DE FOMENTO': 'UF',
      DOLAR: 'USD',
      DOLARES: 'USD',
      DOLLAR: 'USD',
      DOLLARS: 'USD',
      EURO: 'EUR',
      EUROS: 'EUR',
    };

    if (currencyMap[normalized]) {
      normalized = currencyMap[normalized];
    }

    if (original !== normalized) {
      warnings.push({
        field: fieldName,
        originalValue: original,
        transformedValue: normalized,
        reason: 'Código de moneda normalizado',
      });
    }

    return normalized;
  }

  /**
   * Normalize date from various formats
   */
  private normalizeDate(
    value: any,
    fieldName: string,
    _config?: IDataSourceConfig,
    warnings?: ITransformationWarning[],
  ): Date | null {
    if (value instanceof Date) {
      return value;
    }

    if (!value) {
      return null;
    }

    const original = value;
    let date: Date | null = null;

    // Try ISO format first
    if (typeof value === 'string' || typeof value === 'number') {
      date = new Date(value);
      if (!isNaN(date.getTime())) {
        if (warnings && original !== date.toISOString()) {
          warnings.push({
            field: fieldName,
            originalValue: original,
            transformedValue: date.toISOString(),
            reason: 'Fecha normalizada a formato ISO',
          });
        }
        return date;
      }
    }

    // Try DD/MM/YYYY format (Chilean standard)
    if (typeof value === 'string') {
      const ddmmyyyy = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
      if (ddmmyyyy) {
        const day = parseInt(ddmmyyyy[1], 10);
        const month = parseInt(ddmmyyyy[2], 10) - 1; // Month is 0-indexed
        const year = parseInt(ddmmyyyy[3], 10);

        date = new Date(year, month, day);
        if (!isNaN(date.getTime()) && warnings) {
          warnings.push({
            field: fieldName,
            originalValue: original,
            transformedValue: date.toISOString(),
            reason: 'Fecha convertida de formato DD/MM/YYYY',
          });
        }
        return date;
      }

      // Try DD-MM-YY format
      const ddmmyy = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2})$/);
      if (ddmmyy) {
        const day = parseInt(ddmmyy[1], 10);
        const month = parseInt(ddmmyy[2], 10) - 1;
        let year = parseInt(ddmmyy[3], 10);

        // Assume 20xx for years 00-50, 19xx for 51-99
        year += year <= 50 ? 2000 : 1900;

        date = new Date(year, month, day);
        if (!isNaN(date.getTime()) && warnings) {
          warnings.push({
            field: fieldName,
            originalValue: original,
            transformedValue: date.toISOString(),
            reason: 'Fecha convertida de formato DD/MM/YY',
          });
        }
        return date;
      }
    }

    return null;
  }

  /**
   * Normalize project status
   */
  private normalizeProjectStatus(
    value: any,
    fieldName: string,
    warnings: ITransformationWarning[],
  ): string {
    if (!value) {
      return 'planificado';
    }

    const original = value;
    let normalized = String(value).trim().toLowerCase();

    // Handle common variations
    const statusMap: Record<string, string> = {
      planificado: 'planificado',
      planned: 'planificado',
      planeado: 'planificado',
      'en progreso': 'en_progreso',
      'en curso': 'en_progreso',
      'in progress': 'en_progreso',
      progress: 'en_progreso',
      activo: 'en_progreso',
      active: 'en_progreso',
      completado: 'completado',
      completo: 'completado',
      complete: 'completado',
      completed: 'completado',
      finalizado: 'completado',
      finished: 'completado',
      cancelado: 'cancelado',
      cancelled: 'cancelado',
      canceled: 'cancelado',
      suspendido: 'suspendido',
      suspended: 'suspendido',
    };

    // Remove spaces, underscores for matching
    const key = normalized.replace(/[\s_]/g, ' ');

    if (statusMap[key]) {
      normalized = statusMap[key];
    } else if (statusMap[normalized]) {
      normalized = statusMap[normalized];
    }

    if (original !== normalized) {
      warnings.push({
        field: fieldName,
        originalValue: original,
        transformedValue: normalized,
        reason: 'Estado de proyecto normalizado',
      });
    }

    return normalized;
  }

  /**
   * Normalize contract status
   */
  private normalizeContractStatus(
    value: any,
    fieldName: string,
    warnings: ITransformationWarning[],
  ): string {
    if (!value) {
      return 'activo';
    }

    const original = value;
    let normalized = String(value).trim().toLowerCase();

    // Handle common variations
    const statusMap: Record<string, string> = {
      activo: 'activo',
      active: 'activo',
      vigente: 'activo',
      completado: 'completado',
      completo: 'completado',
      complete: 'completado',
      completed: 'completado',
      finalizado: 'completado',
      finished: 'completado',
      cancelado: 'cancelado',
      cancelled: 'cancelado',
      canceled: 'cancelado',
      suspendido: 'suspendido',
      suspended: 'suspendido',
      'en revision': 'en_revision',
      'en revisión': 'en_revision',
      revision: 'en_revision',
      review: 'en_revision',
    };

    // Remove spaces, underscores for matching
    const key = normalized.replace(/[\s_]/g, ' ');

    if (statusMap[key]) {
      normalized = statusMap[key];
    } else if (statusMap[normalized]) {
      normalized = statusMap[normalized];
    }

    if (original !== normalized) {
      warnings.push({
        field: fieldName,
        originalValue: original,
        transformedValue: normalized,
        reason: 'Estado de contrato normalizado',
      });
    }

    return normalized;
  }
}
