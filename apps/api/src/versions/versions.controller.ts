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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { VersionsService } from './versions.service';
import {
  CreateSoftwareVersionDto,
  UpdateSoftwareVersionDto,
  VersionFilterDto,
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Versions')
@Controller('versions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @Post()
  @Roles('super_admin')
  @ApiOperation({
    summary: 'Crear nueva versión de software (solo superadmin)',
  })
  @ApiResponse({
    status: 201,
    description: 'Versión creada exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'La versión ya existe',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  create(@Body() createDto: CreateSoftwareVersionDto, @Req() req: any) {
    const userId = req.user?.id || req.user?.sub;
    return this.versionsService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las versiones con filtros y paginación',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['draft', 'stable', 'deprecated'] })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Lista de versiones',
  })
  findAll(@Query() filters: VersionFilterDto) {
    return this.versionsService.findAll(filters);
  }

  @Get('latest')
  @ApiOperation({ summary: 'Obtener la última versión estable' })
  @ApiResponse({
    status: 200,
    description: 'Última versión estable',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay versiones estables disponibles',
  })
  getLatestStable() {
    return this.versionsService.getLatestStable();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de una versión por ID' })
  @ApiResponse({
    status: 200,
    description: 'Versión encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Versión no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.versionsService.findOne(id);
  }

  @Patch(':id')
  @Roles('super_admin')
  @ApiOperation({
    summary: 'Actualizar una versión (solo superadmin)',
  })
  @ApiResponse({
    status: 200,
    description: 'Versión actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Versión no encontrada',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateSoftwareVersionDto, @Req() req: any) {
    const userId = req.user?.id || req.user?.sub;
    return this.versionsService.update(id, updateDto, userId);
  }

  @Delete(':id')
  @Roles('super_admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar una versión (solo superadmin, solo si no está en uso)',
  })
  @ApiResponse({
    status: 200,
    description: 'Versión eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Versión no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'No se puede eliminar la versión porque está en uso',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  remove(@Param('id') id: string) {
    return this.versionsService.remove(id);
  }
}
