
import { Module } from '@nestjs/common';
import { ExpenditureService } from './expenditure.service';
import { ExpenditureController } from './expenditure.controller';

@Module({
  controllers: [ExpenditureController],
  providers: [ExpenditureService],
  exports: [ExpenditureService],
})
export class ExpenditureModule {}
