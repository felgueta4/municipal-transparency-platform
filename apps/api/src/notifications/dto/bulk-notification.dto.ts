import { IsString, IsEnum, IsOptional, IsObject, IsArray, IsUUID } from 'class-validator';
import { NotificationType } from './create-notification.dto';

export class BulkNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsArray()
  @IsUUID('4', { each: true })
  municipalityIds: string[];

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
