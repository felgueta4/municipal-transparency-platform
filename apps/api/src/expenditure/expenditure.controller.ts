
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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ExpenditureService } from './expenditure.service';
import { CreateExpenditureDto, UpdateExpenditureDto, ExpenditureFilterDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Expenditures')
@Controller('expenditures')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ExpenditureController {
  constructor(private readonly expenditureService: ExpenditureService) {}

  @Post()
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Crear gasto (admin/editor)' })
  @ApiResponse({
    status: 201,
    description: 'Gasto creado exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  create(@Body() createExpenditureDto: CreateExpenditureDto) {
    return this.expenditureService.create(createExpenditureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener gastos con filtros y paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'from', required: false, type: String })
  @ApiQuery({ name: 'to', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'department', required: false, type: String })
  @ApiQuery({ name: 'supplierId', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Lista de gastos',
  })
  findAll(@Query() filters: ExpenditureFilterDto) {
    return this.expenditureService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener gasto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Gasto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Gasto no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.expenditureService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Actualizar gasto (admin/editor)' })
  @ApiResponse({
    status: 200,
    description: 'Gasto actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Gasto no encontrado',
  })
  update(@Param('id') id: string, @Body() updateExpenditureDto: UpdateExpenditureDto) {
    return this.expenditureService.update(id, updateExpenditureDto);
  }

  @Delete(':id')
  @Roles('admin_muni', 'editor_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar gasto (admin/editor)' })
  @ApiResponse({
    status: 204,
    description: 'Gasto eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Gasto no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.expenditureService.remove(id);
  }
}
