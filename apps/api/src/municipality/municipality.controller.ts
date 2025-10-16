

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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto, UpdateMunicipalityDto, MunicipalityFilterDto } from './dto';
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
}
