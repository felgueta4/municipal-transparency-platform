

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto, UpdateMunicipalityDto, MunicipalityFilterDto } from './dto';
import { UpdateMunicipalityVersionDto } from '../versions/dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Municipalities')
@Controller('municipalities')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MunicipalityController {
  constructor(private readonly municipalityService: MunicipalityService) {}

  @Post()
  @Roles('admin_muni')
  @ApiOperation({ summary: 'Crear municipio (solo admin)' })
  @ApiResponse({
    status: 201,
    description: 'Municipio creado exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.municipalityService.create(createMunicipalityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener municipios con filtros y paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de municipios',
  })
  findAll(@Query() filters: MunicipalityFilterDto) {
    return this.municipalityService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener municipio por ID' })
  @ApiResponse({
    status: 200,
    description: 'Municipio encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.municipalityService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni')
  @ApiOperation({ summary: 'Actualizar municipio (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Municipio actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio no encontrado',
  })
  update(@Param('id') id: string, @Body() updateMunicipalityDto: UpdateMunicipalityDto) {
    return this.municipalityService.update(id, updateMunicipalityDto);
  }

  @Delete(':id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar municipio (solo admin)' })
  @ApiResponse({
    status: 204,
    description: 'Municipio eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.municipalityService.remove(id);
  }

  // ===========================
  // Version Management Endpoints
  // ===========================

  @Get(':id/version')
  @ApiOperation({ summary: 'Obtener la versión actual del municipio' })
  @ApiResponse({
    status: 200,
    description: 'Versión actual del municipio',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio no encontrado',
  })
  getVersion(@Param('id') id: string) {
    return this.municipalityService.getVersion(id);
  }

  @Patch(':id/version')
  @Roles('super_admin')
  @ApiOperation({
    summary: 'Actualizar la versión del municipio (solo superadmin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Versión actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio o versión no encontrados',
  })
  @ApiResponse({
    status: 400,
    description: 'Versión no válida o no estable',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  updateVersion(
    @Param('id') id: string,
    @Body() updateVersionDto: UpdateMunicipalityVersionDto,
    @Req() req: any,
  ) {
    // El ID del usuario que realiza el cambio viene del JWT
    const userId = req.user?.id || req.user?.sub;
    return this.municipalityService.updateVersion(
      id,
      updateVersionDto.toVersion,
      userId,
      updateVersionDto.notes,
    );
  }

  @Get(':id/version-history')
  @ApiOperation({ summary: 'Obtener el historial de versiones del municipio' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Historial de versiones',
  })
  @ApiResponse({
    status: 404,
    description: 'Municipio no encontrado',
  })
  getVersionHistory(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.municipalityService.getVersionHistory(id, page, limit);
  }
}
