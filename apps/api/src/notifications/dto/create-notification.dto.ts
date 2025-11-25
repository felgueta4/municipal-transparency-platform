import { IsString, IsEnum, IsOptional, IsObject, IsUUID } from 'class-validator';

export enum NotificationType {
  VERSION_UPDATE = 'version_update',
  SYSTEM = 'system',
  WARNING = 'warning',
  INFO = 'info',
}

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsUUID()
  municipalityId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
