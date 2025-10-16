
import { BadRequestException } from '@nestjs/common';

/**
 * Interface for validation error detail
 */
export interface IValidationErrorDetail {
  field: string;
  value?: any;
  message: string;
  constraint?: string;
  suggestion?: string;
}

/**
 * Custom validation exception with detailed field-level errors
 */
export class ValidationException extends BadRequestException {
  constructor(
    public readonly errors: IValidationErrorDetail[],
    message: string = 'Validation failed',
  ) {
    super({
      statusCode: 400,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Create exception from a single field error
   */
  static fromField(
    field: string,
    value: any,
    message: string,
    constraint?: string,
    suggestion?: string,
  ): ValidationException {
    return new ValidationException([
      {
        field,
        value,
        message,
        constraint,
        suggestion,
      },
    ]);
  }

  /**
   * Create exception from multiple field errors
   */
  static fromErrors(errors: IValidationErrorDetail[]): ValidationException {
    return new ValidationException(errors);
  }

  /**
   * Get a formatted error message for display
   */
  getFormattedMessage(): string {
    if (this.errors.length === 0) {
      return 'Validation failed';
    }

    if (this.errors.length === 1) {
      const error = this.errors[0];
      return `${error.field}: ${error.message}`;
    }

    return `Se encontraron ${this.errors.length} errores de validación:\n` +
      this.errors.map((e) => `  - ${e.field}: ${e.message}`).join('\n');
  }

  /**
   * Get errors grouped by field
   */
  getErrorsByField(): Record<string, IValidationErrorDetail[]> {
    return this.errors.reduce((acc, error) => {
      if (!acc[error.field]) {
        acc[error.field] = [];
      }
      acc[error.field].push(error);
      return acc;
    }, {} as Record<string, IValidationErrorDetail[]>);
  }
}

/**
 * Exception for required field validation failures
 */
export class RequiredFieldException extends ValidationException {
  constructor(field: string, suggestion?: string) {
    super(
      [
        {
          field,
          message: `El campo '${field}' es requerido`,
          constraint: 'required',
          suggestion: suggestion || `Debe proporcionar un valor para '${field}'`,
        },
      ],
      `Campo requerido faltante: ${field}`,
    );
  }
}

/**
 * Exception for data type validation failures
 */
export class TypeValidationException extends ValidationException {
  constructor(
    field: string,
    value: any,
    expectedType: string,
    suggestion?: string,
  ) {
    super(
      [
        {
          field,
          value,
          message: `El campo '${field}' debe ser de tipo ${expectedType}`,
          constraint: 'type',
          suggestion: suggestion || `Proporcione un valor de tipo ${expectedType}`,
        },
      ],
      `Error de tipo de dato en campo: ${field}`,
    );
  }
}

/**
 * Exception for range validation failures
 */
export class RangeValidationException extends ValidationException {
  constructor(
    field: string,
    value: any,
    min?: number,
    max?: number,
    suggestion?: string,
  ) {
    let message = `El campo '${field}' está fuera del rango permitido`;
    if (min !== undefined && max !== undefined) {
      message = `El campo '${field}' debe estar entre ${min} y ${max}`;
    } else if (min !== undefined) {
      message = `El campo '${field}' debe ser mayor o igual a ${min}`;
    } else if (max !== undefined) {
      message = `El campo '${field}' debe ser menor o igual a ${max}`;
    }

    super(
      [
        {
          field,
          value,
          message,
          constraint: 'range',
          suggestion: suggestion || `Proporcione un valor dentro del rango permitido`,
        },
      ],
      `Error de rango en campo: ${field}`,
    );
  }
}

/**
 * Exception for foreign key validation failures
 */
export class ForeignKeyValidationException extends ValidationException {
  constructor(
    field: string,
    value: any,
    referencedEntity: string,
    suggestion?: string,
  ) {
    super(
      [
        {
          field,
          value,
          message: `El valor '${value}' no existe en ${referencedEntity}`,
          constraint: 'foreign_key',
          suggestion: suggestion || `Proporcione un ID válido que exista en ${referencedEntity}`,
        },
      ],
      `Referencia inválida en campo: ${field}`,
    );
  }
}

/**
 * Exception for enum validation failures
 */
export class EnumValidationException extends ValidationException {
  constructor(
    field: string,
    value: any,
    allowedValues: string[],
    suggestion?: string,
  ) {
    super(
      [
        {
          field,
          value,
          message: `El valor '${value}' no es válido para '${field}'`,
          constraint: 'enum',
          suggestion: suggestion || `Valores permitidos: ${allowedValues.join(', ')}`,
        },
      ],
      `Valor de enumeración inválido en campo: ${field}`,
    );
  }
}

/**
 * Exception for date validation failures
 */
export class DateValidationException extends ValidationException {
  constructor(
    field: string,
    value: any,
    reason?: string,
    suggestion?: string,
  ) {
    super(
      [
        {
          field,
          value,
          message: reason || `El campo '${field}' contiene una fecha inválida`,
          constraint: 'date',
          suggestion: suggestion || `Proporcione una fecha válida (formatos: DD/MM/YYYY, YYYY-MM-DD, ISO 8601)`,
        },
      ],
      `Error de validación de fecha en campo: ${field}`,
    );
  }
}

/**
 * Exception for currency validation failures
 */
export class CurrencyValidationException extends ValidationException {
  constructor(
    field: string,
    value: any,
    reason?: string,
    suggestion?: string,
  ) {
    super(
      [
        {
          field,
          value,
          message: reason || `El campo '${field}' contiene un valor monetario inválido`,
          constraint: 'currency',
          suggestion: suggestion || `Proporcione un monto válido (números con hasta 2 decimales)`,
        },
      ],
      `Error de validación monetaria en campo: ${field}`,
    );
  }
}
