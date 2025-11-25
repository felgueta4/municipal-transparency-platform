import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VersionHistoryFilterDto } from './dto';

@Injectable()
export class VersionHistoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear un registro de historial de versión
   */
  async create(
    municipalityId: string,
    fromVersion: string | null,
    toVersion: string,
    updatedBy: string,
    notes?: string,
  ) {
    return this.prisma.versionHistory.create({
      data: {
        municipalityId,
        fromVersion,
        toVersion,
        updatedBy,
        notes,
      },
      include: {
        municipality: {
          select: {
            id: true,
            name: true,
            region: true,
          },
        },
        softwareVersion: {
          select: {
            version: true,
            name: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  /**
   * Obtener todo el historial con filtros y paginación
   */
  async findAll(filters: VersionHistoryFilterDto) {
    const {
      page = 1,
      limit = 10,
      municipalityId,
      toVersion,
      fromDate,
      toDate,
    } = filters;
    const skip = (page - 1) * limit;

    // Construir cláusula where
    const where: any = {};

    if (municipalityId) {
      where.municipalityId = municipalityId;
    }

    if (toVersion) {
      where.toVersion = toVersion;
    }

    if (fromDate || toDate) {
      where.updatedAt = {};
      if (fromDate) {
        where.updatedAt.gte = new Date(fromDate);
      }
      if (toDate) {
        where.updatedAt.lte = new Date(toDate);
      }
    }

    // Ejecutar consultas en paralelo
    const [data, total] = await Promise.all([
      this.prisma.versionHistory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          municipality: {
            select: {
              id: true,
              name: true,
              region: true,
            },
          },
          softwareVersion: {
            select: {
              version: true,
              name: true,
              description: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.versionHistory.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener historial de un municipio específico
   */
  async findByMunicipality(municipalityId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // Verificar que el municipio existe
    const municipality = await this.prisma.municipality.findUnique({
      where: { id: municipalityId },
    });

    if (!municipality) {
      throw new NotFoundException(
        `Municipio con ID ${municipalityId} no encontrado`,
      );
    }

    const [data, total] = await Promise.all([
      this.prisma.versionHistory.findMany({
        where: { municipalityId },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          softwareVersion: {
            select: {
              version: true,
              name: true,
              description: true,
              releaseDate: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.versionHistory.count({ where: { municipalityId } }),
    ]);

    return {
      data,
      municipality: {
        id: municipality.id,
        name: municipality.name,
        region: municipality.region,
        currentVersion: municipality.softwareVersion,
      },
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener el historial de una versión específica
   */
  async findByVersion(versionNumber: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // Verificar que la versión existe
    const version = await this.prisma.softwareVersion.findUnique({
      where: { version: versionNumber },
    });

    if (!version) {
      throw new NotFoundException(
        `Versión ${versionNumber} no encontrada`,
      );
    }

    const [data, total] = await Promise.all([
      this.prisma.versionHistory.findMany({
        where: { toVersion: versionNumber },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          municipality: {
            select: {
              id: true,
              name: true,
              region: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.versionHistory.count({ where: { toVersion: versionNumber } }),
    ]);

    return {
      data,
      version: {
        version: version.version,
        name: version.name,
        releaseDate: version.releaseDate,
        status: version.status,
      },
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener estadísticas del historial de versiones
   */
  async getStatistics() {
    const [totalChanges, uniqueMunicipalities, recentChanges] =
      await Promise.all([
        this.prisma.versionHistory.count(),
        this.prisma.versionHistory.groupBy({
          by: ['municipalityId'],
          _count: true,
        }),
        this.prisma.versionHistory.findMany({
          take: 10,
          orderBy: { updatedAt: 'desc' },
          include: {
            municipality: {
              select: {
                name: true,
              },
            },
            softwareVersion: {
              select: {
                version: true,
                name: true,
              },
            },
          },
        }),
      ]);

    return {
      totalChanges,
      totalMunicipalitiesWithChanges: uniqueMunicipalities.length,
      recentChanges,
    };
  }
}
