import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConnectorConfigService } from './connector-config.service';
import { ConnectorLogService } from './connector-log.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ChileCompraConnector,
  BudgetSourceConnector,
} from '../implementations';
import {
  IConnector,
  IConnectorResponse,
  ISyncable,
  ISyncOptions,
  ISyncResult,
  ConnectorType,
} from '../interfaces';

/**
 * Connector Service
 * Main service for managing and executing connector operations
 */
@Injectable()
export class ConnectorService {
  private readonly logger = new Logger(ConnectorService.name);
  private connectorInstances: Map<string, IConnector> = new Map();

  constructor(
    private readonly configService: ConnectorConfigService,
    private readonly logService: ConnectorLogService,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get or create a connector instance
   */
  async getConnector(connectorId: string): Promise<IConnector> {
    // Check if instance already exists
    if (this.connectorInstances.has(connectorId)) {
      return this.connectorInstances.get(connectorId)!;
    }

    // Get connector config
    const config = await this.configService.findOneWithDecryptedKey(connectorId);

    if (!config.isActive) {
      throw new Error('Connector is not active');
    }

    // Create connector instance based on type
    let connector: IConnector;

    // Convert config to IConnectorConfig with proper types
    const connectorConfig: any = {
      id: config.id,
      name: config.name,
      type: config.type,
      baseUrl: config.baseUrl,
      apiKey: config.decryptedApiKey,
      authType: config.authType as any,
      authConfig: config.authConfig as any,
      config: config.config as any,
      headers: config.headers as any,
      timeout: config.timeout,
      retryCount: config.retryCount,
      rateLimit: config.rateLimit ?? undefined,
      isActive: config.isActive,
    };

    switch (config.type) {
      case ConnectorType.CHILECOMPRA:
        connector = new ChileCompraConnector(
          connectorConfig,
          this.httpService,
          this.logService,
          this.prisma,
        );
        break;

      case ConnectorType.BUDGET_SOURCE:
        connector = new BudgetSourceConnector(
          connectorConfig,
          this.httpService,
          this.logService,
          this.prisma,
        );
        break;

      default:
        throw new Error(`Unsupported connector type: ${config.type}`);
    }

    // Cache the instance
    this.connectorInstances.set(connectorId, connector);

    return connector;
  }

  /**
   * Execute a request using a connector
   */
  async executeRequest<T>(
    connectorId: string,
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    params?: Record<string, any>,
    data?: any,
  ): Promise<IConnectorResponse<T>> {
    this.logger.log(`Executing request on connector ${connectorId}: ${method} ${endpoint}`);

    const connector = await this.getConnector(connectorId);

    return connector.executeRequest<T>({
      endpoint,
      method,
      params,
      data,
    });
  }

  /**
   * Test connection for a connector
   */
  async testConnection(connectorId: string): Promise<boolean> {
    this.logger.log(`Testing connection for connector ${connectorId}`);

    try {
      const connector = await this.getConnector(connectorId);
      return await connector.testConnection();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Connection test failed: ${message}`);
      return false;
    }
  }

  /**
   * Sync data from a connector
   */
  async syncData(
    connectorId: string,
    options: ISyncOptions,
  ): Promise<ISyncResult> {
    this.logger.log(
      `Starting data sync for connector ${connectorId}, entity: ${options.entityType}`,
    );

    const connector = await this.getConnector(connectorId);

    // Check if connector supports sync
    if (!this.isSyncable(connector)) {
      throw new Error('Connector does not support data synchronization');
    }

    return await connector.syncData(options);
  }

  /**
   * Clear connector instance cache
   */
  clearCache(connectorId?: string): void {
    if (connectorId) {
      this.connectorInstances.delete(connectorId);
      this.logger.log(`Cleared cache for connector ${connectorId}`);
    } else {
      this.connectorInstances.clear();
      this.logger.log('Cleared all connector caches');
    }
  }

  /**
   * Check if connector is syncable
   */
  private isSyncable(connector: IConnector): connector is ISyncable {
    return 'syncData' in connector && 'transformData' in connector;
  }

  /**
   * Get connector statistics
   */
  async getConnectorStats(connectorId: string, days: number = 7): Promise<any> {
    await this.configService.findOne(connectorId); // Verify exists
    return this.logService.getStats(connectorId, days);
  }
}
