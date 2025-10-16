

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
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto, ProjectFilterDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Crear proyecto (admin/editor)' })
  @ApiResponse({
    status: 201,
    description: 'Proyecto creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener proyectos con filtros y paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de proyectos',
  })
  findAll(@Query() filters: ProjectFilterDto) {
    return this.projectService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proyecto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Proyecto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Proyecto no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Actualizar proyecto (admin/editor)' })
  @ApiResponse({
    status: 200,
    description: 'Proyecto actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Proyecto no encontrado',
  })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar proyecto (solo admin)' })
  @ApiResponse({
    status: 204,
    description: 'Proyecto eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Proyecto no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
