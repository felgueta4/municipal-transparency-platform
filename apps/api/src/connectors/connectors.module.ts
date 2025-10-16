import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { ConnectorsController } from './connectors.controller';
import {
  ConnectorConfigService,
  ConnectorLogService,
  ConnectorService,
} from './services';

/**
 * Connectors Module
 * Manages external API integrations and data synchronization
 */
@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
    PrismaModule,
  ],
  controllers: [ConnectorsController],
  providers: [
    ConnectorConfigService,
    ConnectorLogService,
    ConnectorService,
  ],
  exports: [
    ConnectorConfigService,
    ConnectorLogService,
    ConnectorService,
  ],
})
export class ConnectorsModule {}
