
/**
 * Upload Result Interface
 * Defines the structure of upload operation results
 */

export interface UploadError {
  row: number;
  field?: string;
  message: string;
  value?: any;
}

export interface UploadSummary {
  totalRecords: number;
  successfulInserts: number;
  failedRecords: number;
}

export interface UploadResult {
  success: boolean;
  summary: UploadSummary;
  errors: UploadError[];
}

export interface ParsedRecord {
  data: any;
  rowNumber: number;
  isValid: boolean;
  errors: UploadError[];
}

export enum FileType {
  CSV = 'csv',
  XLSX = 'xlsx',
  JSON = 'json',
}

export interface ColumnMapping {
  [key: string]: string; // Maps file column name to database field name
}
