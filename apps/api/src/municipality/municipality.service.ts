

import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMunicipalityDto, UpdateMunicipalityDto, MunicipalityFilterDto } from './dto';
import { VersionsService } from '../versions/versions.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MunicipalityService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => VersionsService))
    private versionsService: VersionsService,
    private notificationsService: NotificationsService,
  ) {}

  /**
   * Crear municipio
   */
  async create(createMunicipalityDto: CreateMunicipalityDto) {
    return this.prisma.municipality.create({
      data: createMunicipalityDto,
    });
  }

  /**
   * Obtener municipios con filtros y paginación
   */
  async findAll(filters: MunicipalityFilterDto) {
    const { page = 1, limit = 10, region, search } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (region) {
      where.region = region;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get total count
    const total = await this.prisma.municipality.count({ where });

    // Get municipalities
    const municipalities = await this.prisma.municipality.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data: municipalities,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener municipio por ID
   */
  async findOne(id: string) {
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            budgets: true,
            expenditures: true,
            projects: true,
            contracts: true,
            users: true,
          },
        },
      },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipality with ID ${id} not found`);
    }

    return municipality;
  }

  /**
   * Actualizar municipio
   */
  async update(id: string, updateMunicipalityDto: UpdateMunicipalityDto) {
    // Check if municipality exists
    await this.findOne(id);

    return this.prisma.municipality.update({
      where: { id },
      data: updateMunicipalityDto,
    });
  }

  /**
   * Eliminar municipio
   */
  async remove(id: string) {
    // Check if municipality exists
    await this.findOne(id);

    return this.prisma.municipality.delete({
      where: { id },
    });
  }

  /**
   * Obtener la versión actual de un municipio
   */
  async getVersion(id: string) {
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        softwareVersion: true,
        version: {
          select: {
            version: true,
            name: true,
            description: true,
            releaseDate: true,
            status: true,
          },
        },
      },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    return municipality;
  }

  /**
   * Actualizar la versión de un municipio y registrar el cambio en el historial
   */
  async updateVersion(
    id: string,
    toVersion: string,
    updatedBy: string,
    notes?: string,
  ) {
    // Verificar que el municipio existe
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    // Verificar que la versión de destino existe y está en estado estable
    const targetVersion = await this.prisma.softwareVersion.findUnique({
      where: { version: toVersion },
    });

    if (!targetVersion) {
      throw new NotFoundException(`La versión ${toVersion} no existe`);
    }

    if (targetVersion.status !== 'stable') {
      throw new BadRequestException(
        `La versión ${toVersion} no está en estado estable. Estado actual: ${targetVersion.status}`,
      );
    }

    // Verificar que no sea la misma versión
    if (municipality.softwareVersion === toVersion) {
      throw new BadRequestException(
        `El municipio ya está utilizando la versión ${toVersion}`,
      );
    }

    // Actualizar la versión del municipio y crear registro de historial en una transacción
    const result = await this.prisma.$transaction(async (tx) => {
      // Actualizar el municipio
      const updatedMunicipality = await tx.municipality.update({
        where: { id },
        data: {
          softwareVersion: toVersion,
        },
        include: {
          version: true,
        },
      });

      // Crear registro en el historial
      const historyRecord = await tx.versionHistory.create({
        data: {
          municipalityId: id,
          fromVersion: municipality.softwareVersion,
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
            },
          },
        },
      });

      return {
        municipality: updatedMunicipality,
        historyRecord,
      };
    });

    return result;
  }

  /**
   * Obtener el historial de versiones de un municipio
   */
  async getVersionHistory(id: string, page = 1, limit = 10) {
    // Verificar que el municipio existe
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.versionHistory.findMany({
        where: { municipalityId: id },
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
      this.prisma.versionHistory.count({ where: { municipalityId: id } }),
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
   * Rollback a la versión anterior del municipio
   */
  async rollbackVersion(id: string, userId: string) {
    // Verificar que el municipio existe
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    // Validar que se puede hacer rollback
    const validation = await this.versionsService.validateRollback(id);

    if (!validation.canRollback) {
      throw new BadRequestException(
        validation.reason || 'No se puede realizar el rollback',
      );
    }

    const previousVersion = validation.previousVersion!;
    const currentVersion = municipality.softwareVersion;

    // Realizar el rollback en una transacción
    const result = await this.prisma.$transaction(async (tx) => {
      // Actualizar el municipio
      const updatedMunicipality = await tx.municipality.update({
        where: { id },
        data: {
          softwareVersion: previousVersion,
        },
        include: {
          version: true,
        },
      });

      // Crear registro en el historial
      const historyRecord = await tx.versionHistory.create({
        data: {
          municipalityId: id,
          fromVersion: currentVersion,
          toVersion: previousVersion,
          updatedBy: userId,
          notes: `Rollback desde ${currentVersion} a ${previousVersion}`,
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
            },
          },
        },
      });

      // Crear notificación sobre el rollback
      await tx.notification.create({
        data: {
          title: 'Rollback de versión realizado',
          message: `Se ha revertido la versión del sistema desde ${currentVersion} a ${previousVersion}.`,
          type: 'warning',
          municipalityId: id,
          createdBy: userId,
          metadata: {
            fromVersion: currentVersion,
            toVersion: previousVersion,
            action: 'rollback',
          },
        },
      });

      return {
        municipality: updatedMunicipality,
        historyRecord,
        message: `Rollback exitoso: ${currentVersion} → ${previousVersion}`,
      };
    });

    return result;
  }

  /**
   * Obtener información de la versión anterior disponible para rollback
   */
  async getPreviousVersionInfo(id: string) {
    // Verificar que el municipio existe
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    // Validar rollback
    const validation = await this.versionsService.validateRollback(id);

    if (!validation.canRollback) {
      return {
        canRollback: false,
        currentVersion: municipality.softwareVersion,
        previousVersion: null,
        reason: validation.reason,
      };
    }

    // Obtener detalles de la versión anterior
    const previousVersionDetails = await this.prisma.softwareVersion.findUnique({
      where: { version: validation.previousVersion! },
      select: {
        version: true,
        name: true,
        description: true,
        releaseDate: true,
        status: true,
      },
    });

    return {
      canRollback: true,
      currentVersion: municipality.softwareVersion,
      previousVersion: validation.previousVersion,
      previousVersionDetails,
    };
  }
}
