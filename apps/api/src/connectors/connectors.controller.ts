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
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ConnectorConfigService,
  ConnectorLogService,
  ConnectorService,
} from './services';
import {
  CreateConnectorConfigDto,
  UpdateConnectorConfigDto,
  ConnectorLogFilterDto,
  SyncDataDto,
} from './dto';

@ApiTags('Connectors')
@Controller('connectors')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ConnectorsController {
  private readonly logger = new Logger(ConnectorsController.name);

  constructor(
    private readonly configService: ConnectorConfigService,
    private readonly logService: ConnectorLogService,
    private readonly connectorService: ConnectorService,
  ) {}

  // ==================== Connector Config Endpoints ====================

  @Post('config')
  @Roles('admin_muni')
  @ApiOperation({
    summary: 'Create connector configuration',
    description: 'Create a new API connector configuration (admin only)',
  })
  @ApiResponse({
    status: 201,
    description: 'Connector configuration created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin only' })
  @ApiResponse({ status: 409, description: 'Connector name already exists' })
  async createConfig(@Body() createDto: CreateConnectorConfigDto) {
    this.logger.log(`Creating connector config: ${createDto.name}`);
    return this.configService.create(createDto);
  }

  @Get('config')
  @Roles('admin_muni', 'editor_muni', 'viewer_muni')
  @ApiOperation({
    summary: 'List all connector configurations',
    description: 'Get all configured API connectors',
  })
  @ApiResponse({
    status: 200,
    description: 'List of connector configurations',
  })
  async getAllConfigs() {
    return this.configService.findAll();
  }

  @Get('config/:id')
  @Roles('admin_muni', 'editor_muni', 'viewer_muni')
  @ApiOperation({
    summary: 'Get connector configuration',
    description: 'Get a specific connector configuration by ID',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiResponse({
    status: 200,
    description: 'Connector configuration details',
  })
  @ApiResponse({ status: 404, description: 'Connector not found' })
  async getConfig(@Param('id') id: string) {
    return this.configService.findOne(id);
  }

  @Patch('config/:id')
  @Roles('admin_muni')
  @ApiOperation({
    summary: 'Update connector configuration',
    description: 'Update an existing connector configuration (admin only)',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiResponse({
    status: 200,
    description: 'Connector configuration updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Connector not found' })
  @ApiResponse({ status: 409, description: 'Connector name already exists' })
  async updateConfig(
    @Param('id') id: string,
    @Body() updateDto: UpdateConnectorConfigDto,
  ) {
    this.logger.log(`Updating connector config: ${id}`);
    return this.configService.update(id, updateDto);
  }

  @Delete('config/:id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete connector configuration',
    description: 'Delete a connector configuration (admin only)',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiResponse({
    status: 204,
    description: 'Connector configuration deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Connector not found' })
  async deleteConfig(@Param('id') id: string) {
    this.logger.log(`Deleting connector config: ${id}`);
    await this.configService.remove(id);
  }

  // ==================== Connector Logs Endpoints ====================

  @Get('logs')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({
    summary: 'Query connector logs',
    description: 'Get connector request/response logs with filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of connector logs',
  })
  async getLogs(@Query() filterDto: ConnectorLogFilterDto) {
    return this.logService.findAll(filterDto);
  }

  @Get('logs/:id')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({
    summary: 'Get specific log entry',
    description: 'Get detailed information about a specific log entry',
  })
  @ApiParam({ name: 'id', description: 'Log entry ID' })
  @ApiResponse({
    status: 200,
    description: 'Log entry details',
  })
  @ApiResponse({ status: 404, description: 'Log entry not found' })
  async getLog(@Param('id') id: string) {
    return this.logService.findOne(id);
  }

  @Get(':id/stats')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({
    summary: 'Get connector statistics',
    description: 'Get usage statistics for a connector',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiResponse({
    status: 200,
    description: 'Connector statistics',
  })
  async getStats(
    @Param('id') id: string,
    @Query('days') days?: number,
  ) {
    return this.connectorService.getConnectorStats(id, days || 7);
  }

  // ==================== Connector Operations Endpoints ====================

  @Post(':id/test')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({
    summary: 'Test connector connection',
    description: 'Test if a connector can successfully connect to its external API',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiResponse({
    status: 200,
    description: 'Connection test result',
    schema: {
      example: {
        connectorId: 'clw123abc',
        success: true,
        message: 'Connection successful',
      },
    },
  })
  async testConnection(@Param('id') id: string) {
    this.logger.log(`Testing connection for connector: ${id}`);
    const success = await this.connectorService.testConnection(id);
    return {
      connectorId: id,
      success,
      message: success ? 'Connection successful' : 'Connection failed',
    };
  }

  // ==================== Data Sync Endpoints ====================

  @Post(':id/sync/suppliers')
  @Roles('admin_muni')
  @ApiOperation({
    summary: 'Sync suppliers',
    description: 'Synchronize supplier data from external source (admin only)',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiBody({
    schema: {
      example: {
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        batchSize: 100,
        incrementalSync: true,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sync completed successfully',
    schema: {
      example: {
        success: true,
        recordsFetched: 500,
        recordsInserted: 300,
        recordsUpdated: 150,
        recordsSkipped: 50,
        errors: [],
        duration: 15000,
      },
    },
  })
  async syncSuppliers(
    @Param('id') id: string,
    @Body() syncDto: Partial<SyncDataDto>,
  ) {
    this.logger.log(`Syncing suppliers for connector: ${id}`);
    return this.connectorService.syncData(id, {
      entityType: 'supplier' as any,
      ...syncDto,
      startDate: syncDto.startDate ? new Date(syncDto.startDate) : undefined,
      endDate: syncDto.endDate ? new Date(syncDto.endDate) : undefined,
    });
  }

  @Post(':id/sync/budgets')
  @Roles('admin_muni')
  @ApiOperation({
    summary: 'Sync budgets',
    description: 'Synchronize budget data from external source (admin only)',
  })
  @ApiParam({ name: 'id', description: 'Connector config ID' })
  @ApiBody({
    schema: {
      example: {
        municipalityId: 'clw123abc',
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        batchSize: 100,
        incrementalSync: true,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sync completed successfully',
    schema: {
      example: {
        success: true,
        recordsFetched: 200,
        recordsInserted: 100,
        recordsUpdated: 80,
        recordsSkipped: 20,
        errors: [],
        duration: 10000,
      },
    },
  })
  async syncBudgets(
    @Param('id') id: string,
    @Body() syncDto: Partial<SyncDataDto> & { municipalityId: string },
  ) {
    this.logger.log(`Syncing budgets for connector: ${id}`);
    
    if (!syncDto.municipalityId) {
      throw new Error('municipalityId is required for budget sync');
    }

    return this.connectorService.syncData(id, {
      entityType: 'budget' as any,
      ...syncDto,
      startDate: syncDto.startDate ? new Date(syncDto.startDate) : undefined,
      endDate: syncDto.endDate ? new Date(syncDto.endDate) : undefined,
    });
  }

  // ==================== Example Connector-Specific Endpoints ====================

  @Get('chilecompra/suppliers')
  @Roles('admin_muni', 'editor_muni', 'viewer_muni')
  @ApiOperation({
    summary: 'Fetch suppliers from ChileCompra',
    description: 'Fetch supplier data from ChileCompra API',
  })
  @ApiResponse({
    status: 200,
    description: 'Supplier data from ChileCompra',
  })
  async fetchChileCompraSuppliers(
    @Query('connectorId') connectorId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    this.logger.log(`Fetching ChileCompra suppliers via connector: ${connectorId}`);
    return this.connectorService.executeRequest(
      connectorId,
      '/api/v1/publico/proveedores',
      'GET',
      { page, limit },
    );
  }

  @Get('budget-source/budgets')
  @Roles('admin_muni', 'editor_muni', 'viewer_muni')
  @ApiOperation({
    summary: 'Fetch budgets from external source',
    description: 'Fetch budget data from external budget source',
  })
  @ApiResponse({
    status: 200,
    description: 'Budget data from external source',
  })
  async fetchBudgetSourceData(
    @Query('connectorId') connectorId: string,
    @Query('year') year?: number,
    @Query('municipalityCode') municipalityCode?: string,
  ) {
    this.logger.log(`Fetching budget data via connector: ${connectorId}`);
    return this.connectorService.executeRequest(
      connectorId,
      '/api/v1/budgets',
      'GET',
      { year, municipalityCode },
    );
  }
}
