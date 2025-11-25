import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import {
  CreateSoftwareVersionDto,
  UpdateSoftwareVersionDto,
  VersionFilterDto,
  VersionStatus,
} from './dto';

@Injectable()
export class VersionsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => NotificationsService))
    private notificationsService: NotificationsService,
  ) {}

  /**
   * Crear una nueva versión de software
   */
  async create(createDto: CreateSoftwareVersionDto, userId?: string) {
    // Verificar que la versión no exista
    const existingVersion = await this.prisma.softwareVersion.findUnique({
      where: { version: createDto.version },
    });

    if (existingVersion) {
      throw new ConflictException(
        `La versión ${createDto.version} ya existe`,
      );
    }

    const newVersion = await this.prisma.softwareVersion.create({
      data: {
        version: createDto.version,
        name: createDto.name,
        description: createDto.description,
        changelog: createDto.changelog,
        releaseDate: createDto.releaseDate
          ? new Date(createDto.releaseDate)
          : new Date(),
        status: createDto.status || VersionStatus.DRAFT,
      },
    });

    // Si la versión es estable y tenemos userId, crear notificaciones
    if (newVersion.status === VersionStatus.STABLE && userId) {
      try {
        await this.notificationsService.createVersionUpdateNotification(
          newVersion.version,
          newVersion.name,
          userId,
        );
      } catch (error) {
        // Log error but don't fail the version creation
        console.error('Error creating version notifications:', error);
      }
    }

    return newVersion;
  }

  /**
   * Obtener todas las versiones con filtros y paginación
   */
  async findAll(filters: VersionFilterDto) {
    const { page = 1, limit = 10, status, search } = filters;
    const skip = (page - 1) * limit;

    // Construir cláusula where
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { version: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Ejecutar consultas en paralelo
    const [data, total] = await Promise.all([
      this.prisma.softwareVersion.findMany({
        where,
        skip,
        take: limit,
        orderBy: { releaseDate: 'desc' },
      }),
      this.prisma.softwareVersion.count({ where }),
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
   * Obtener una versión por ID
   */
  async findOne(id: string) {
    const version = await this.prisma.softwareVersion.findUnique({
      where: { id },
      include: {
        municipalities: {
          select: {
            id: true,
            name: true,
            region: true,
          },
        },
        versionHistory: {
          take: 10,
          orderBy: { updatedAt: 'desc' },
          include: {
            municipality: {
              select: {
                id: true,
                name: true,
              },
            },
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!version) {
      throw new NotFoundException(`Versión con ID ${id} no encontrada`);
    }

    return version;
  }

  /**
   * Obtener una versión por número de versión
   */
  async findByVersion(versionNumber: string) {
    const version = await this.prisma.softwareVersion.findUnique({
      where: { version: versionNumber },
    });

    if (!version) {
      throw new NotFoundException(
        `Versión ${versionNumber} no encontrada`,
      );
    }

    return version;
  }

  /**
   * Obtener la última versión estable
   */
  async getLatestStable() {
    const latestStable = await this.prisma.softwareVersion.findFirst({
      where: { status: VersionStatus.STABLE },
      orderBy: { releaseDate: 'desc' },
    });

    if (!latestStable) {
      throw new NotFoundException('No hay versiones estables disponibles');
    }

    return latestStable;
  }

  /**
   * Actualizar una versión
   */
  async update(id: string, updateDto: UpdateSoftwareVersionDto, userId?: string) {
    // Verificar que la versión existe
    const existingVersion = await this.prisma.softwareVersion.findUnique({
      where: { id },
    });

    if (!existingVersion) {
      throw new NotFoundException(`Versión con ID ${id} no encontrada`);
    }

    // Preparar datos de actualización
    const updateData: any = {};

    if (updateDto.name !== undefined) {
      updateData.name = updateDto.name;
    }

    if (updateDto.description !== undefined) {
      updateData.description = updateDto.description;
    }

    if (updateDto.changelog !== undefined) {
      updateData.changelog = updateDto.changelog;
    }

    if (updateDto.releaseDate !== undefined) {
      updateData.releaseDate = new Date(updateDto.releaseDate);
    }

    if (updateDto.status !== undefined) {
      updateData.status = updateDto.status;
    }

    const updatedVersion = await this.prisma.softwareVersion.update({
      where: { id },
      data: updateData,
    });

    // Si la versión cambió a 'stable' y no lo era antes, crear notificaciones
    if (
      updateDto.status === VersionStatus.STABLE &&
      existingVersion.status !== VersionStatus.STABLE &&
      userId
    ) {
      try {
        await this.notificationsService.createVersionUpdateNotification(
          updatedVersion.version,
          updatedVersion.name,
          userId,
        );
      } catch (error) {
        // Log error but don't fail the version update
        console.error('Error creating version notifications:', error);
      }
    }

    return updatedVersion;
  }

  /**
   * Eliminar una versión (soft delete - solo si no está en uso)
   */
  async remove(id: string) {
    // Verificar que la versión existe
    const version = await this.prisma.softwareVersion.findUnique({
      where: { id },
      include: {
        municipalities: true,
      },
    });

    if (!version) {
      throw new NotFoundException(`Versión con ID ${id} no encontrada`);
    }

    // Verificar que no esté en uso
    if (version.municipalities.length > 0) {
      throw new BadRequestException(
        `No se puede eliminar la versión ${version.version} porque está siendo utilizada por ${version.municipalities.length} municipio(s)`,
      );
    }

    // Eliminar la versión
    await this.prisma.softwareVersion.delete({
      where: { id },
    });

    return {
      message: `Versión ${version.version} eliminada exitosamente`,
    };
  }

  /**
   * Validar que una versión existe y está en estado estable
   */
  async validateStableVersion(versionNumber: string): Promise<boolean> {
    const version = await this.prisma.softwareVersion.findUnique({
      where: { version: versionNumber },
    });

    if (!version) {
      throw new NotFoundException(
        `La versión ${versionNumber} no existe`,
      );
    }

    if (version.status !== VersionStatus.STABLE) {
      throw new BadRequestException(
        `La versión ${versionNumber} no está en estado estable. Estado actual: ${version.status}`,
      );
    }

    return true;
  }

  /**
   * Obtener la versión anterior desde el historial de un municipio
   */
  async getPreviousVersion(municipalityId: string): Promise<string | null> {
    // Buscar la última entrada del historial que tenga un fromVersion
    const lastHistory = await this.prisma.versionHistory.findFirst({
      where: {
        municipalityId,
        fromVersion: { not: null },
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        fromVersion: true,
      },
    });

    return lastHistory?.fromVersion || null;
  }

  /**
   * Validar que se puede realizar un rollback
   */
  async validateRollback(
    municipalityId: string,
  ): Promise<{ canRollback: boolean; previousVersion: string | null; reason?: string }> {
    // Obtener versión anterior
    const previousVersion = await this.getPreviousVersion(municipalityId);

    if (!previousVersion) {
      return {
        canRollback: false,
        previousVersion: null,
        reason: 'No hay una versión anterior disponible en el historial',
      };
    }

    // Verificar que la versión anterior aún existe
    const versionExists = await this.prisma.softwareVersion.findUnique({
      where: { version: previousVersion },
    });

    if (!versionExists) {
      return {
        canRollback: false,
        previousVersion,
        reason: `La versión anterior ${previousVersion} ya no existe en el sistema`,
      };
    }

    // Verificar que la versión anterior está estable
    if (versionExists.status !== VersionStatus.STABLE) {
      return {
        canRollback: false,
        previousVersion,
        reason: `La versión anterior ${previousVersion} no está en estado estable (${versionExists.status})`,
      };
    }

    return {
      canRollback: true,
      previousVersion,
    };
  }
}
