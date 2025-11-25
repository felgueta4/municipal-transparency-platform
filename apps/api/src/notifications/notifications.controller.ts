import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationFilterDto } from './dto/notification-filter.dto';
import { BulkNotificationDto } from './dto/bulk-notification.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * POST /api/notifications - Create notification (superadmin only)
   */
  @Post()
  @Roles('super_admin')
  create(@Body() createDto: CreateNotificationDto, @Request() req) {
    return this.notificationsService.create(createDto, req.user.userId);
  }

  /**
   * GET /api/notifications - List all notifications (superadmin)
   */
  @Get()
  @Roles('super_admin')
  findAll(@Query() filterDto: NotificationFilterDto) {
    return this.notificationsService.findAll(filterDto);
  }

  /**
   * POST /api/notifications/bulk - Create multiple notifications (superadmin only)
   */
  @Post('bulk')
  @Roles('super_admin')
  createBulk(@Body() bulkDto: BulkNotificationDto, @Request() req) {
    return this.notificationsService.createBulk(bulkDto, req.user.userId);
  }

  /**
   * GET /api/notifications/unread/count - Count unread notifications
   */
  @Get('unread/count')
  countUnread(@Request() req) {
    // If user is admin_muni, count for their municipality
    // If superadmin, count all
    const municipalityId =
      req.user.role === 'admin_muni' ? req.user.municipalityId : undefined;
    return this.notificationsService.countUnread(municipalityId);
  }

  /**
   * GET /api/notifications/municipality/:id - Get notifications for municipality
   */
  @Get('municipality/:id')
  findByMunicipality(
    @Param('id') id: string,
    @Query() filterDto: NotificationFilterDto,
    @Request() req,
  ) {
    // Admin_muni can only access their own municipality notifications
    if (req.user.role === 'admin_muni' && req.user.municipalityId !== id) {
      throw new Error('No tiene permiso para acceder a estas notificaciones');
    }
    return this.notificationsService.findByMunicipality(id, filterDto);
  }

  /**
   * GET /api/notifications/:id - Get notification details
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  /**
   * PATCH /api/notifications/:id - Update notification
   */
  @Patch(':id')
  @Roles('super_admin')
  update(@Param('id') id: string, @Body() updateDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateDto);
  }

  /**
   * PATCH /api/notifications/:id/read - Mark as read
   */
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  /**
   * DELETE /api/notifications/:id - Delete notification
   */
  @Delete(':id')
  @Roles('super_admin')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
