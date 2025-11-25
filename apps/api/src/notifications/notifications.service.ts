import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationFilterDto } from './dto/notification-filter.dto';
import { BulkNotificationDto } from './dto/bulk-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a single notification
   */
  async create(createDto: CreateNotificationDto, userId: string) {
    // Validate municipality exists if provided
    if (createDto.municipalityId) {
      const municipality = await this.prisma.municipality.findUnique({
        where: { id: createDto.municipalityId },
      });
      if (!municipality) {
        throw new NotFoundException(
          `Municipio con ID ${createDto.municipalityId} no encontrado`,
        );
      }
    }

    return this.prisma.notification.create({
      data: {
        ...createDto,
        createdBy: userId,
        metadata: createDto.metadata || {},
      },
      include: {
        municipality: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
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
   * Find all notifications with filtering and pagination
   */
  async findAll(filterDto: NotificationFilterDto) {
    const { page = 1, limit = 20, type, isRead, municipalityId } = filterDto;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (type) where.type = type;
    if (isRead !== undefined) where.isRead = isRead;
    if (municipalityId) where.municipalityId = municipalityId;

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          municipality: {
            select: {
              id: true,
              name: true,
            },
          },
          creator: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find one notification by ID
   */
  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include: {
        municipality: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }

    return notification;
  }

  /**
   * Update a notification
   */
  async update(id: string, updateDto: UpdateNotificationDto) {
    await this.findOne(id); // Validate exists

    // Validate municipality exists if provided
    if (updateDto.municipalityId) {
      const municipality = await this.prisma.municipality.findUnique({
        where: { id: updateDto.municipalityId },
      });
      if (!municipality) {
        throw new NotFoundException(
          `Municipio con ID ${updateDto.municipalityId} no encontrado`,
        );
      }
    }

    return this.prisma.notification.update({
      where: { id },
      data: updateDto,
      include: {
        municipality: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
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
   * Delete a notification
   */
  async remove(id: string) {
    await this.findOne(id); // Validate exists
    await this.prisma.notification.delete({
      where: { id },
    });
    return { message: 'Notificación eliminada exitosamente' };
  }

  /**
   * Find notifications for a specific municipality
   */
  async findByMunicipality(municipalityId: string, filterDto: NotificationFilterDto) {
    // Validate municipality exists
    const municipality = await this.prisma.municipality.findUnique({
      where: { id: municipalityId },
    });
    if (!municipality) {
      throw new NotFoundException(
        `Municipio con ID ${municipalityId} no encontrado`,
      );
    }

    const { page = 1, limit = 20, type, isRead } = filterDto;
    const skip = (page - 1) * limit;

    const where: any = {
      OR: [
        { municipalityId },
        { municipalityId: null }, // Global notifications
      ],
    };
    if (type) where.type = type;
    if (isRead !== undefined) where.isRead = isRead;

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          municipality: {
            select: {
              id: true,
              name: true,
            },
          },
          creator: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(id: string) {
    await this.findOne(id); // Validate exists
    return this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
      include: {
        municipality: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
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
   * Count unread notifications for a municipality
   */
  async countUnread(municipalityId?: string) {
    const where: any = {
      isRead: false,
    };

    if (municipalityId) {
      where.OR = [
        { municipalityId },
        { municipalityId: null }, // Global notifications
      ];
    }

    return this.prisma.notification.count({ where });
  }

  /**
   * Create multiple notifications (bulk)
   */
  async createBulk(bulkDto: BulkNotificationDto, userId: string) {
    // Validate all municipalities exist
    const municipalities = await this.prisma.municipality.findMany({
      where: {
        id: { in: bulkDto.municipalityIds },
      },
    });

    if (municipalities.length !== bulkDto.municipalityIds.length) {
      throw new BadRequestException(
        'Algunos municipios especificados no existen',
      );
    }

    // Create notification for each municipality
    const notifications = await this.prisma.$transaction(
      bulkDto.municipalityIds.map((municipalityId) =>
        this.prisma.notification.create({
          data: {
            title: bulkDto.title,
            message: bulkDto.message,
            type: bulkDto.type,
            municipalityId,
            createdBy: userId,
            metadata: bulkDto.metadata || {},
          },
        }),
      ),
    );

    return {
      message: `${notifications.length} notificaciones creadas exitosamente`,
      count: notifications.length,
    };
  }

  /**
   * Auto-create notification when new stable version is released
   * Called by VersionsService
   */
  async createVersionUpdateNotification(
    version: string,
    versionName: string,
    userId: string,
  ) {
    // Get all municipalities
    const municipalities = await this.prisma.municipality.findMany({
      select: { id: true },
    });

    if (municipalities.length === 0) {
      return { message: 'No hay municipios para notificar', count: 0 };
    }

    // Create notification for each municipality
    const notifications = await this.prisma.$transaction(
      municipalities.map((municipality) =>
        this.prisma.notification.create({
          data: {
            title: 'Nueva versión disponible',
            message: `Se ha lanzado la versión ${version} (${versionName}). Consulte con el superadmin para actualizar su sistema.`,
            type: 'version_update',
            municipalityId: municipality.id,
            createdBy: userId,
            metadata: {
              version,
              versionName,
            },
          },
        }),
      ),
    );

    return {
      message: `Notificaciones de versión creadas para ${notifications.length} municipios`,
      count: notifications.length,
    };
  }
}
