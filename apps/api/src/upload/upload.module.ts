import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ValidationModule } from '../validation/validation.module';
import { TransformationModule } from '../transformation/transformation.module';

@Module({
  imports: [PrismaModule, ValidationModule, TransformationModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
