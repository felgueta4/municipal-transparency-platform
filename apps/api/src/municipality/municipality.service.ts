

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMunicipalityDto, UpdateMunicipalityDto, MunicipalityFilterDto } from './dto';

@Injectable()
export class MunicipalityService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear municipio
   */
  async create(createMunicipalityDto: CreateMunicipalityDto) {
    return this.prisma.municipality.create({
      data: createMunicipalityDto,
    });
  }

  /**
   * Obtener municipios con filtros y paginación
   */
  async findAll(filters: MunicipalityFilterDto) {
    const { page = 1, limit = 10, region, search } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (region) {
      where.region = region;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get total count
    const total = await this.prisma.municipality.count({ where });

    // Get municipalities
    const municipalities = await this.prisma.municipality.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data: municipalities,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener municipio por ID
   */
  async findOne(id: string) {
    const municipality = await this.prisma.municipality.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            budgets: true,
            expenditures: true,
            projects: true,
            contracts: true,
            users: true,
          },
        },
      },
    });

    if (!municipality) {
      throw new NotFoundException(`Municipality with ID ${id} not found`);
    }

    return municipality;
  }

  /**
   * Actualizar municipio
   */
  async update(id: string, updateMunicipalityDto: UpdateMunicipalityDto) {
    // Check if municipality exists
    await this.findOne(id);

    return this.prisma.municipality.update({
      where: { id },
      data: updateMunicipalityDto,
    });
  }

  /**
   * Eliminar municipio
   */
  async remove(id: string) {
    // Check if municipality exists
    await this.findOne(id);

    return this.prisma.municipality.delete({
      where: { id },
    });
  }
}
