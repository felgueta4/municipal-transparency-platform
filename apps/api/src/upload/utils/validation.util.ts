
import { ParsedRecord, UploadError } from '../interfaces/upload-result.interface';

/**
 * Validation Utility
 * Helper functions for data validation
 */
export class ValidationUtil {
  /**
   * Check if required fields are present
   */
  static validateRequiredFields(
    record: any,
    requiredFields: string[],
    rowNumber: number,
  ): UploadError[] {
    const errors: UploadError[] = [];

    for (const field of requiredFields) {
      const value = record[field];
      if (value === undefined || value === null || value === '') {
        errors.push({
          row: rowNumber,
          field,
          message: `Campo requerido: ${field} no puede estar vacío`,
          value,
        });
      }
    }

    return errors;
  }

  /**
   * Validate string length
   */
  static validateStringLength(
    value: string,
    fieldName: string,
    minLength: number,
    maxLength: number,
    rowNumber: number,
  ): UploadError | null {
    if (value && (value.length < minLength || value.length > maxLength)) {
      return {
        row: rowNumber,
        field: fieldName,
        message: `${fieldName} debe tener entre ${minLength} y ${maxLength} caracteres`,
        value,
      };
    }
    return null;
  }

  /**
   * Validate enum value
   */
  static validateEnum(
    value: string,
    fieldName: string,
    allowedValues: string[],
    rowNumber: number,
  ): UploadError | null {
    if (value && !allowedValues.includes(value)) {
      return {
        row: rowNumber,
        field: fieldName,
        message: `${fieldName} debe ser uno de: ${allowedValues.join(', ')}`,
        value,
      };
    }
    return null;
  }

  /**
   * Create parsed record with validation results
   */
  static createParsedRecord(
    data: any,
    rowNumber: number,
    errors: UploadError[],
  ): ParsedRecord {
    return {
      data,
      rowNumber,
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Normalize field names (trim and lowercase)
   */
  static normalizeFieldNames(record: any): any {
    const normalized: any = {};
    for (const key in record) {
      const normalizedKey = key.trim();
      normalized[normalizedKey] = record[key];
    }
    return normalized;
  }
}
