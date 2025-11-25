import { Module } from '@nestjs/common';
import { VersionHistoryService } from './version-history.service';
import { VersionHistoryController } from './version-history.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VersionHistoryController],
  providers: [VersionHistoryService],
  exports: [VersionHistoryService],
})
export class VersionHistoryModule {}
