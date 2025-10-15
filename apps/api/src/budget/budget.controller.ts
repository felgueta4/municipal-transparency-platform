
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
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto, BudgetFilterDto, BudgetSummaryDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Budget')
@Controller('budget')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Crear presupuesto (admin/editor)' })
  @ApiResponse({
    status: 201,
    description: 'Presupuesto creado exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener presupuestos con filtros y paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'department', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Lista de presupuestos',
  })
  findAll(@Query() filters: BudgetFilterDto) {
    return this.budgetService.findAll(filters);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Obtener resumen de presupuestos agrupados' })
  @ApiQuery({ name: 'year', required: true, type: Number })
  @ApiQuery({ name: 'groupBy', required: false, enum: ['category', 'department'] })
  @ApiResponse({
    status: 200,
    description: 'Resumen de presupuestos',
  })
  getSummary(@Query() summaryDto: BudgetSummaryDto) {
    return this.budgetService.getSummary(summaryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener presupuesto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Presupuesto no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Actualizar presupuesto (admin/editor)' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Presupuesto no encontrado',
  })
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar presupuesto (solo admin)' })
  @ApiResponse({
    status: 204,
    description: 'Presupuesto eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Presupuesto no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.budgetService.remove(id);
  }
}
