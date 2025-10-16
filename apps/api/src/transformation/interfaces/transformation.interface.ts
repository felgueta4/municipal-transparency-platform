
/**
 * Interface for transformation result
 */
export interface ITransformationResult {
  data: any;
  warnings?: ITransformationWarning[];
}

/**
 * Interface for transformation warning
 */
export interface ITransformationWarning {
  field: string;
  originalValue: any;
  transformedValue: any;
  reason: string;
}

/**
 * Interface for field mapping
 */
export interface IFieldMapping {
  sourceField: string;
  targetField: string;
  transformer?: (value: any) => any;
  defaultValue?: any;
}

/**
 * Interface for data source configuration
 */
export interface IDataSourceConfig {
  source: 'csv' | 'excel' | 'json' | 'api';
  fieldMappings?: IFieldMapping[];
  dateFormat?: string;
  currencyFormat?: string;
  decimalSeparator?: '.' | ',';
  thousandsSeparator?: ',' | '.' | ' ' | '';
}
