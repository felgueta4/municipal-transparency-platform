import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { VersionHistoryService } from './version-history.service';
import { VersionHistoryFilterDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Version History')
@Controller('version-history')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class VersionHistoryController {
  constructor(
    private readonly versionHistoryService: VersionHistoryService,
  ) {}

  @Get()
  @Roles('super_admin')
  @ApiOperation({
    summary: 'Obtener todo el historial de cambios de versiones (solo superadmin)',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'municipalityId', required: false, type: String })
  @ApiQuery({ name: 'toVersion', required: false, type: String })
  @ApiQuery({ name: 'fromDate', required: false, type: String })
  @ApiQuery({ name: 'toDate', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Lista de cambios de versiones',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  findAll(@Query() filters: VersionHistoryFilterDto) {
    return this.versionHistoryService.findAll(filters);
  }

  @Get('municipality/:municipalityId')
  @ApiOperation({
    summary: 'Obtener historial de versiones de un municipio específico',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Historial del municipio',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio no encontrado',
  })
  findByMunicipality(
    @Param('municipalityId') municipalityId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.versionHistoryService.findByMunicipality(
      municipalityId,
      page,
      limit,
    );
  }

  @Get('version/:versionNumber')
  @Roles('super_admin')
  @ApiOperation({
    summary: 'Obtener historial de adopción de una versión específica (solo superadmin)',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Historial de la versión',
  })
  @ApiResponse({
    status: 404,
    description: 'Versión no encontrada',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  findByVersion(
    @Param('versionNumber') versionNumber: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.versionHistoryService.findByVersion(versionNumber, page, limit);
  }

  @Get('statistics')
  @Roles('super_admin')
  @ApiOperation({
    summary: 'Obtener estadísticas del historial de versiones (solo superadmin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas del historial',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  getStatistics() {
    return this.versionHistoryService.getStatistics();
  }
}
