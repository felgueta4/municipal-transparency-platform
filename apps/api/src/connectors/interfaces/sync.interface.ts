
import { IConnector } from './connector.interface';

/**
 * Data Synchronization Interface
 * Interface for syncing data from external sources
 */

export enum EntityType {
  SUPPLIER = 'supplier',
  BUDGET = 'budget',
  EXPENDITURE = 'expenditure',
  CONTRACT = 'contract',
  PROJECT = 'project',
}

export interface ISyncOptions {
  entityType: EntityType;
  startDate?: Date;
  endDate?: Date;
  batchSize?: number;
  incrementalSync?: boolean;
  municipalityId?: string;
}

export interface ISyncable extends IConnector {
  /**
   * Sync data from external source
   */
  syncData(options: ISyncOptions): Promise<ISyncResult>;

  /**
   * Transform external data to internal format
   */
  transformData(externalData: any[], entityType: EntityType): Promise<any[]>;
}

export interface ISyncResult {
  success: boolean;
  recordsFetched: number;
  recordsInserted: number;
  recordsUpdated: number;
  recordsSkipped: number;
  errors: Array<{
    record?: any;
    error: string;
  }>;
  duration: number;
  metadata?: Record<string, any>;
}
