

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
import { ContractService } from './contract.service';
import { CreateContractDto, UpdateContractDto, ContractFilterDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Contracts')
@Controller('contracts')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Crear contrato (admin/editor)' })
  @ApiResponse({
    status: 201,
    description: 'Contrato creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Número de contrato ya existe',
  })
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener contratos con filtros y paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de contratos',
  })
  findAll(@Query() filters: ContractFilterDto) {
    return this.contractService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener contrato por ID' })
  @ApiResponse({
    status: 200,
    description: 'Contrato encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Contrato no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Actualizar contrato (admin/editor)' })
  @ApiResponse({
    status: 200,
    description: 'Contrato actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Contrato no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'Número de contrato ya existe',
  })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar contrato (solo admin)' })
  @ApiResponse({
    status: 204,
    description: 'Contrato eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Contrato no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.contractService.remove(id);
  }
}
