

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear nuevo usuario
   */
  async create(createUserDto: CreateUserDto) {
    const { email, password, role, municipalityId } = createUserDto;

    // Verificar si el email ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        municipalityId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        municipalityId: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        municipality: true,
      },
    });

    return newUser;
  }

  /**
   * Obtener usuarios con filtros y paginación
   */
  async findAll(filters: UserFilterDto) {
    const { page = 1, limit = 10, role, municipalityId, search } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (municipalityId) {
      where.municipalityId = municipalityId;
    }

    if (search) {
      where.email = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get total count
    const total = await this.prisma.user.count({ where });

    // Get users (sin el passwordHash)
    const users = await this.prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        role: true,
        municipalityId: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        municipality: true,
      },
    });

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener usuario por ID
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        municipalityId: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        municipality: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Actualizar usuario (rol y municipalidad)
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    await this.findOne(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        role: true,
        municipalityId: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        municipality: true,
      },
    });

    return updatedUser;
  }

  /**
   * Eliminar usuario
   */
  async remove(id: string) {
    // Check if user exists
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
