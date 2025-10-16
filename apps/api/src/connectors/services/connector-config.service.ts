
import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateConnectorConfigDto,
  UpdateConnectorConfigDto,
} from '../dto';
import { EncryptionUtil } from '../utils';
import { ConnectorConfig } from '@municipal-platform/database/src/generated/client';

@Injectable()
export class ConnectorConfigService {
  private readonly logger = new Logger(ConnectorConfigService.name);

  constructor(private readonly prisma: PrismaService) {
    // Initialize encryption
    EncryptionUtil.initialize();
  }

  /**
   * Create a new connector configuration
   */
  async create(
    createDto: CreateConnectorConfigDto,
  ): Promise<ConnectorConfig> {
    this.logger.log(`Creating connector config: ${createDto.name}`);

    // Check if connector with same name already exists
    const existing = await this.prisma.connectorConfig.findUnique({
      where: { name: createDto.name },
    });

    if (existing) {
      throw new ConflictException(
        `Connector with name '${createDto.name}' already exists`,
      );
    }

    // Encrypt API key if provided
    const apiKey = createDto.apiKey
      ? EncryptionUtil.encrypt(createDto.apiKey)
      : null;

    return this.prisma.connectorConfig.create({
      data: {
        name: createDto.name,
        type: createDto.type,
        description: createDto.description,
        baseUrl: createDto.baseUrl,
        apiKey,
        authType: createDto.authType,
        authConfig: createDto.authConfig || {},
        config: createDto.config || {},
        headers: createDto.headers || {},
        timeout: createDto.timeout ?? 30000,
        retryCount: createDto.retryCount ?? 3,
        rateLimit: createDto.rateLimit,
        isActive: createDto.isActive ?? true,
      },
    });
  }

  /**
   * Get all connector configurations
   */
  async findAll(): Promise<ConnectorConfig[]> {
    return this.prisma.connectorConfig.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a specific connector configuration
   */
  async findOne(id: string): Promise<ConnectorConfig> {
    const config = await this.prisma.connectorConfig.findUnique({
      where: { id },
    });

    if (!config) {
      throw new NotFoundException(`Connector config with ID '${id}' not found`);
    }

    return config;
  }

  /**
   * Get connector config with decrypted API key
   */
  async findOneWithDecryptedKey(id: string): Promise<ConnectorConfig & { decryptedApiKey?: string }> {
    const config = await this.findOne(id);
    
    return {
      ...config,
      decryptedApiKey: config.apiKey ? EncryptionUtil.decrypt(config.apiKey) : undefined,
    };
  }

  /**
   * Update a connector configuration
   */
  async update(
    id: string,
    updateDto: UpdateConnectorConfigDto,
  ): Promise<ConnectorConfig> {
    this.logger.log(`Updating connector config: ${id}`);

    // Check if exists
    await this.findOne(id);

    // If updating name, check for conflicts
    if (updateDto.name) {
      const existing = await this.prisma.connectorConfig.findFirst({
        where: {
          name: updateDto.name,
          id: { not: id },
        },
      });

      if (existing) {
        throw new ConflictException(
          `Connector with name '${updateDto.name}' already exists`,
        );
      }
    }

    // Encrypt API key if provided
    const apiKey = updateDto.apiKey
      ? EncryptionUtil.encrypt(updateDto.apiKey)
      : undefined;

    return this.prisma.connectorConfig.update({
      where: { id },
      data: {
        ...(updateDto.name && { name: updateDto.name }),
        ...(updateDto.type && { type: updateDto.type }),
        ...(updateDto.description !== undefined && { description: updateDto.description }),
        ...(updateDto.baseUrl && { baseUrl: updateDto.baseUrl }),
        ...(apiKey !== undefined && { apiKey }),
        ...(updateDto.authType && { authType: updateDto.authType }),
        ...(updateDto.authConfig && { authConfig: updateDto.authConfig }),
        ...(updateDto.config && { config: updateDto.config }),
        ...(updateDto.headers && { headers: updateDto.headers }),
        ...(updateDto.timeout && { timeout: updateDto.timeout }),
        ...(updateDto.retryCount !== undefined && { retryCount: updateDto.retryCount }),
        ...(updateDto.rateLimit !== undefined && { rateLimit: updateDto.rateLimit }),
        ...(updateDto.isActive !== undefined && { isActive: updateDto.isActive }),
      },
    });
  }

  /**
   * Delete a connector configuration
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting connector config: ${id}`);

    // Check if exists
    await this.findOne(id);

    await this.prisma.connectorConfig.delete({
      where: { id },
    });
  }

  /**
   * Get connectors by type
   */
  async findByType(type: string): Promise<ConnectorConfig[]> {
    return this.prisma.connectorConfig.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get active connectors
   */
  async findActive(): Promise<ConnectorConfig[]> {
    return this.prisma.connectorConfig.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
