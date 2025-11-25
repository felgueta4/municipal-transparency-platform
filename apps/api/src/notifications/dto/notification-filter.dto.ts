import { IsOptional, IsEnum, IsBoolean, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationType } from './create-notification.dto';

export class NotificationFilterDto {
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isRead?: boolean;

  @IsOptional()
  @IsUUID()
  municipalityId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 20;
}
