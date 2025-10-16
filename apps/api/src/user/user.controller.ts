

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
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin_muni')
  @ApiOperation({ summary: 'Crear nuevo usuario (solo admin)' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El email ya está registrado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin_muni')
  @ApiOperation({ summary: 'Obtener usuarios con filtros (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  findAll(@Query() filters: UserFilterDto) {
    return this.userService.findAll(filters);
  }

  @Get(':id')
  @Roles('admin_muni')
  @ApiOperation({ summary: 'Obtener usuario por ID (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin_muni')
  @ApiOperation({ summary: 'Actualizar rol y municipalidad del usuario (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin_muni')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar usuario (solo admin)' })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
