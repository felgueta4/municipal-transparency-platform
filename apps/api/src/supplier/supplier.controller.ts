

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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto, UpdateSupplierDto, SupplierFilterDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Suppliers')
@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Crear proveedor (admin/editor)' })
  @ApiResponse({
    status: 201,
    description: 'Proveedor creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'RUT ya registrado',
  })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener proveedores con filtros y paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores',
  })
  findAll(@Query() filters: SupplierFilterDto) {
    return this.supplierService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proveedor por ID' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Actualizar proveedor (admin/editor)' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'RUT ya registrado',
  })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar proveedor (solo admin)' })
  @ApiResponse({
    status: 204,
    description: 'Proveedor eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
