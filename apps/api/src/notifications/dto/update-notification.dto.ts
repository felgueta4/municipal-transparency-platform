import { IsBoolean, IsOptional, IsString, IsEnum, IsObject, IsUUID } from 'class-validator';
import { NotificationType } from './create-notification.dto';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @IsOptional()
  @IsUUID()
  municipalityId?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
