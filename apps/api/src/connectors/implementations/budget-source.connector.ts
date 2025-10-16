
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseConnector } from '../services/base-connector.service';
import { ConnectorLogService } from '../services/connector-log.service';
import {
  IConnectorConfig,
  IConnectorResponse,
  ISyncOptions,
  ISyncResult,
  ISyncable,
  EntityType,
} from '../interfaces';
import { PrismaService } from '../../prisma/prisma.service';
import { ValidationService } from '../../validation/validation.service';
import { TransformationService } from '../../transformation/transformation.service';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Budget Source Connector
 * Generic connector for budget data from external sources
 * This could be DIPRES (Chilean Budget Office) or other sources
 * 
 * NOTE: This is a mock implementation
 */
@Injectable()
export class BudgetSourceConnector extends BaseConnector implements ISyncable {

  constructor(
    config: IConnectorConfig,
    httpService: HttpService,
    logService: ConnectorLogService,
    private readonly prisma: PrismaService,
    private readonly validationService?: ValidationService,
    private readonly transformationService?: TransformationService,
  ) {
    super(config, httpService, logService);
  }

  /**
   * Get health check endpoint
   */
  protected getHealthCheckEndpoint(): string {
    return '/api/v1/status';
  }

  /**
   * Test connection (overridden for mock implementation)
   * In a real implementation, this would call the parent testConnection()
   */
  async testConnection(): Promise<boolean> {
    this.logger.log('Testing Budget Source connection (mock)');
    // Mock implementation - always return true
    // In production, this would make a real API call
    await this.sleep(200); // Simulate network delay
    return true;
  }

  /**
   * Fetch budgets from external source
   */
  async fetchBudgets(params?: {
    year?: number;
    municipalityCode?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<IConnectorResponse<any>> {
    // Mock implementation - replace with real API call
    return this.mockFetchBudgets(params);
  }

  /**
   * Sync budget data
   */
  async syncData(options: ISyncOptions): Promise<ISyncResult> {
    const startTime = Date.now();
    const errors: Array<{ record?: any; error: string }> = [];

    try {
      this.logger.log(`Starting sync for ${options.entityType}`);

      if (options.entityType !== EntityType.BUDGET) {
        throw new Error(`BudgetSource connector only supports ${EntityType.BUDGET} sync`);
      }

      if (!options.municipalityId) {
        throw new Error('municipalityId is required for budget sync');
      }

      let recordsFetched = 0;
      let recordsInserted = 0;
      let recordsUpdated = 0;
      let recordsSkipped = 0;

      // Fetch data from external API
      const response = await this.fetchBudgets({
        startDate: options.startDate?.toISOString(),
        endDate: options.endDate?.toISOString(),
      });

      if (!response.success || !response.data) {
        throw new Error(`Failed to fetch budgets: ${response.error}`);
      }

      const budgets = response.data.data || [];
      recordsFetched = budgets.length;

      // Get or create fiscal year
      const currentYear = new Date().getFullYear();
      let fiscalYear = await this.prisma.fiscalYear.findFirst({
        where: { year: currentYear },
      });

      if (!fiscalYear) {
        fiscalYear = await this.prisma.fiscalYear.create({
          data: { year: currentYear, status: 'active' },
        });
      }

      // Transform and save data
      const transformed = await this.transformData(budgets, options.entityType);

      for (const budgetData of transformed) {
        try {
          // Add municipality and fiscal year
          const fullBudgetData = {
            ...budgetData,
            municipalityId: options.municipalityId,
            fiscalYearId: fiscalYear.id,
          };

          // Check if budget exists (by category, department, program)
          const existing = await this.prisma.budget.findFirst({
            where: {
              municipalityId: options.municipalityId,
              fiscalYearId: fiscalYear.id,
              category: budgetData.category,
              department: budgetData.department,
              program: budgetData.program,
            },
          });

          if (existing) {
            // Update existing budget
            await this.prisma.budget.update({
              where: { id: existing.id },
              data: fullBudgetData,
            });
            recordsUpdated++;
          } else {
            // Create new budget
            await this.prisma.budget.create({
              data: fullBudgetData,
            });
            recordsInserted++;
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error';
          errors.push({
            record: budgetData,
            error: errMsg,
          });
          recordsSkipped++;
        }
      }

      const duration = Date.now() - startTime;

      return {
        success: true,
        recordsFetched,
        recordsInserted,
        recordsUpdated,
        recordsSkipped,
        errors,
        duration,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Sync failed: ${message}`);

      return {
        success: false,
        recordsFetched: 0,
        recordsInserted: 0,
        recordsUpdated: 0,
        recordsSkipped: 0,
        errors: [{ error: message }],
        duration,
      };
    }
  }

  /**
   * Transform external data to internal format
   * Enhanced version using TransformationService and ValidationService
   */
  async transformData(externalData: any[], entityType: EntityType): Promise<any[]> {
    if (entityType !== EntityType.BUDGET) {
      throw new Error(`BudgetSource connector only supports ${EntityType.BUDGET} transformation`);
    }

    // If transformation service is available, use it
    if (this.transformationService) {
      const currentYear = new Date().getFullYear();
      
      // Normalize field names
      const normalizedData = externalData.map((item) => ({
        fiscalYear: item.year || item.año || currentYear,
        department: item.department || item.unidad || 'General',
        program: item.program || item.programa || 'General',
        category: item.category || item.categoria || 'Otros',
        subcategory: item.subcategory || item.subcategoria || 'General',
        amountPlanned: item.amount || item.monto || 0,
        currency: item.currency || item.moneda || 'CLP',
        notes: item.notes || item.observaciones || null,
      }));

      // Transform using TransformationService
      const transformedResults = this.transformationService.transformBatch(
        'budget',
        normalizedData,
      );

      // Validate if validation service is available
      const validatedData: any[] = [];
      
      if (this.validationService) {
        for (const result of transformedResults) {
          const validation = await this.validationService.validateBudget(
            result.data,
            { entityType: 'budget', skipForeignKeyValidation: true },
          );

          if (validation.isValid) {
            validatedData.push(result.data);
          } else {
            this.logger.warn(
              `Skipping invalid record: ${validation.errors.map(e => e.message).join(', ')}`,
            );
          }
        }
        
        return validatedData;
      } else {
        return transformedResults.map(r => r.data);
      }
    }

    // Fallback to basic transformation
    return externalData.map((item) => ({
      department: item.department || item.unidad || 'General',
      program: item.program || item.programa || 'General',
      category: item.category || item.categoria || 'Otros',
      subcategory: item.subcategory || item.subcategoria || 'General',
      amountPlanned: new Decimal(item.amount || item.monto || 0),
      currency: 'CLP',
      notes: item.notes || item.observaciones || null,
    }));
  }

  /**
   * Mock implementation for fetching budgets
   */
  private async mockFetchBudgets(_params?: {
    year?: number;
    municipalityCode?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<IConnectorResponse<any>> {
    // Simulate API delay (reduced for testing)
    await this.sleep(100);

    // Generate mock budget data
    const departments = ['Educación', 'Salud', 'Obras Públicas', 'Seguridad'];
    const programs = ['Programa 1', 'Programa 2', 'Programa 3'];
    const categories = ['Personal', 'Bienes y Servicios', 'Inversión', 'Transferencias'];

    const mockBudgets = [];
    for (const dept of departments) {
      for (const prog of programs) {
        for (const cat of categories) {
          mockBudgets.push({
            department: dept,
            programa: prog,
            categoria: cat,
            subcategoria: 'General',
            monto: Math.floor(Math.random() * 10000000) + 1000000,
            observaciones: `Presupuesto ${dept} - ${cat}`,
          });
        }
      }
    }

    return {
      success: true,
      data: {
        data: mockBudgets,
        total: mockBudgets.length,
      },
      statusCode: 200,
      duration: 100,
    };
  }
}
