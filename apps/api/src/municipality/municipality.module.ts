

import { Module, forwardRef } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { VersionsModule } from '../versions/versions.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => VersionsModule),
    NotificationsModule,
  ],
  controllers: [MunicipalityController],
  providers: [MunicipalityService],
  exports: [MunicipalityService],
})
export class MunicipalityModule {}
