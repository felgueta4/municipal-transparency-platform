
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

/**
 * ChileCompra Connector
 * Connector for Chilean public procurement system (Mercado Público)
 * API Documentation: https://desarrolladores.mercadopublico.cl/
 * 
 * NOTE: This is a mock implementation since the actual API requires registration
 * and has rate limits. This can be easily replaced with real API calls.
 */
@Injectable()
export class ChileCompraConnector extends BaseConnector implements ISyncable {

  constructor(
    config: IConnectorConfig,
    httpService: HttpService,
    logService: ConnectorLogService,
    private readonly prisma: PrismaService,
    private readonly _validationService?: ValidationService,
    private readonly _transformationService?: TransformationService,
  ) {
    super(config, httpService, logService);
  }

  /**
   * Get health check endpoint
   */
  protected getHealthCheckEndpoint(): string {
    return '/api/v1/health';
  }

  /**
   * Test connection (overridden for mock implementation)
   * In a real implementation, this would call the parent testConnection()
   */
  async testConnection(): Promise<boolean> {
    this.logger.log('Testing ChileCompra connection (mock)');
    // Mock implementation - always return true
    // In production, this would make a real API call
    await this.sleep(200); // Simulate network delay
    return true;
  }

  /**
   * Fetch suppliers from ChileCompra
   */
  async fetchSuppliers(params?: {
    page?: number;
    limit?: number;
    rut?: string;
  }): Promise<IConnectorResponse<any>> {
    // Mock implementation - replace with real API call
    return this.mockFetchSuppliers(params);
  }

  /**
   * Sync suppliers data
   */
  async syncData(options: ISyncOptions): Promise<ISyncResult> {
    const startTime = Date.now();
    const errors: Array<{ record?: any; error: string }> = [];

    try {
      this.logger.log(`Starting sync for ${options.entityType}`);

      if (options.entityType !== EntityType.SUPPLIER) {
        throw new Error(`ChileCompra connector only supports ${EntityType.SUPPLIER} sync`);
      }

      let recordsFetched = 0;
      let recordsInserted = 0;
      let recordsUpdated = 0;
      let recordsSkipped = 0;

      const batchSize = options.batchSize || 100;
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        // Fetch data from external API
        const response = await this.fetchSuppliers({
          page,
          limit: batchSize,
        });

        if (!response.success || !response.data) {
          errors.push({
            error: `Failed to fetch page ${page}: ${response.error}`,
          });
          break;
        }

        const suppliers = response.data.data || [];
        recordsFetched += suppliers.length;

        // Transform and save data
        const transformed = await this.transformData(suppliers, options.entityType);

        for (const supplierData of transformed) {
          try {
            // Check if supplier exists (by taxId)
            const existing = supplierData.taxId
              ? await this.prisma.supplier.findUnique({
                  where: { taxId: supplierData.taxId },
                })
              : null;

            if (existing) {
              // Update existing supplier
              await this.prisma.supplier.update({
                where: { id: existing.id },
                data: supplierData,
              });
              recordsUpdated++;
            } else {
              // Create new supplier
              await this.prisma.supplier.create({
                data: supplierData,
              });
              recordsInserted++;
            }
          } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown error';
            errors.push({
              record: supplierData,
              error: errMsg,
            });
            recordsSkipped++;
          }
        }

        // Check if there are more pages
        hasMore = suppliers.length === batchSize;
        page++;

        // Add delay to respect rate limits (reduced for mock testing)
        if (hasMore && this.config.rateLimit) {
          await this.sleep(100);
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
   */
  async transformData(externalData: any[], entityType: EntityType): Promise<any[]> {
    if (entityType !== EntityType.SUPPLIER) {
      throw new Error(`ChileCompra connector only supports ${EntityType.SUPPLIER} transformation`);
    }

    return externalData.map((item) => ({
      name: item.razonSocial || item.nombre || 'Unknown',
      taxId: item.rut || item.rutProveedor || null,
      sector: item.rubro || item.sector || null,
      locality: item.comuna || item.region || null,
    }));
  }

  /**
   * Mock implementation for fetching suppliers
   * Replace this with real API call: GET /api/v1/publico/proveedores
   */
  private async mockFetchSuppliers(params?: {
    page?: number;
    limit?: number;
    rut?: string;
  }): Promise<IConnectorResponse<any>> {
    const page = params?.page || 1;
    const limit = params?.limit || 100;
    const mockTotal = 150; // Reduced from 1000 for faster testing

    // Simulate API delay (reduced for testing)
    await this.sleep(100);

    // Calculate how many suppliers to return for this page
    const startIndex = (page - 1) * limit;
    const remainingSuppliers = Math.max(0, mockTotal - startIndex);
    const suppliersToReturn = Math.min(limit, remainingSuppliers);

    // Generate mock data
    const mockSuppliers = [];
    for (let i = 0; i < suppliersToReturn; i++) {
      const index = startIndex + i;
      mockSuppliers.push({
        rut: `${10000000 + index}-${index % 10}`,
        razonSocial: `Proveedor ChileCompra ${index + 1}`,
        rubro: ['Construcción', 'Servicios', 'Tecnología', 'Salud'][index % 4],
        comuna: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta'][index % 4],
        region: ['Metropolitana', 'Valparaíso', 'Biobío', 'Antofagasta'][index % 4],
      });
    }

    return {
      success: true,
      data: {
        data: mockSuppliers,
        pagination: {
          page,
          limit,
          total: mockTotal,
        },
      },
      statusCode: 200,
      duration: 100,
    };
  }
}
