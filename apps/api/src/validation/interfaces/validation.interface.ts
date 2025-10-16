
/**
 * Interface for validation result
 */
export interface IValidationResult {
  isValid: boolean;
  errors: IValidationError[];
}

/**
 * Interface for validation error
 */
export interface IValidationError {
  field: string;
  value?: any;
  message: string;
  constraint?: string;
  suggestion?: string;
}

/**
 * Interface for entity validation context
 */
export interface IValidationContext {
  entityType: 'budget' | 'expenditure' | 'project' | 'contract';
  municipalityId?: string;
  skipForeignKeyValidation?: boolean;
  strictMode?: boolean;
}

/**
 * Interface for validation rule
 */
export interface IValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'decimal';
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  enum?: any[];
  customValidator?: (value: any, data: any) => string | null;
}
