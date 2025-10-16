
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConnectorLogFilterDto } from '../dto';
import { ConnectorLog } from '@municipal-platform/database/src/generated/client';

@Injectable()
export class ConnectorLogService {
  private readonly logger = new Logger(ConnectorLogService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new connector log entry
   */
  async create(data: {
    connectorConfigId: string;
    endpoint: string;
    method: string;
    requestHeaders?: any;
    requestBody?: any;
    responseStatus?: number;
    responseHeaders?: any;
    responseBody?: any;
    duration?: number;
    error?: string;
  }): Promise<ConnectorLog> {
    return this.prisma.connectorLog.create({
      data: {
        connectorConfigId: data.connectorConfigId,
        endpoint: data.endpoint,
        method: data.method,
        requestHeaders: data.requestHeaders || {},
        requestBody: data.requestBody || {},
        responseStatus: data.responseStatus,
        responseHeaders: data.responseHeaders || {},
        responseBody: data.responseBody || {},
        duration: data.duration,
        error: data.error,
      },
    });
  }

  /**
   * Query connector logs with filters
   */
  async findAll(
    filterDto: ConnectorLogFilterDto,
  ): Promise<{ data: ConnectorLog[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 50, ...filters } = filterDto;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (filters.connectorConfigId) {
      where.connectorConfigId = filters.connectorConfigId;
    }

    if (filters.endpoint) {
      where.endpoint = { contains: filters.endpoint, mode: 'insensitive' };
    }

    if (filters.method) {
      where.method = filters.method;
    }

    if (filters.responseStatus) {
      where.responseStatus = filters.responseStatus;
    }

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.createdAt.lte = new Date(filters.endDate);
      }
    }

    // Get total count
    const total = await this.prisma.connectorLog.count({ where });

    // Get paginated data
    const data = await this.prisma.connectorLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        connectorConfig: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  /**
   * Get a specific log entry
   */
  async findOne(id: string): Promise<ConnectorLog | null> {
    return this.prisma.connectorLog.findUnique({
      where: { id },
      include: {
        connectorConfig: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });
  }

  /**
   * Delete old logs (retention policy)
   */
  async deleteOldLogs(daysToKeep: number = 30): Promise<number> {
    this.logger.log(`Deleting logs older than ${daysToKeep} days`);

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await this.prisma.connectorLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    this.logger.log(`Deleted ${result.count} old log entries`);
    return result.count;
  }

  /**
   * Get log statistics for a connector
   */
  async getStats(connectorConfigId: string, days: number = 7): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await this.prisma.connectorLog.findMany({
      where: {
        connectorConfigId,
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        responseStatus: true,
        duration: true,
        error: true,
        createdAt: true,
      },
    });

    const total = logs.length;
    const successful = logs.filter((log) => log.responseStatus && log.responseStatus < 400).length;
    const failed = logs.filter((log) => log.error || (log.responseStatus && log.responseStatus >= 400)).length;
    const avgDuration = logs.reduce((sum, log) => sum + (log.duration || 0), 0) / total || 0;

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      avgDuration: Math.round(avgDuration),
      period: `${days} days`,
    };
  }
}
