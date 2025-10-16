

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto, SupplierFilterDto } from './dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear proveedor
   */
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      return await this.prisma.supplier.create({
        data: createSupplierDto,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Supplier with this taxId already exists');
      }
      throw error;
    }
  }

  /**
   * Obtener proveedores con filtros y paginación
   */
  async findAll(filters: SupplierFilterDto) {
    const { page = 1, limit = 10, search, sector, locality } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (sector) {
      where.sector = sector;
    }

    if (locality) {
      where.locality = locality;
    }

    // Get total count
    const total = await this.prisma.supplier.count({ where });

    // Get suppliers
    const suppliers = await this.prisma.supplier.findMany({
      where,
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            expenditures: true,
            contracts: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data: suppliers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener proveedor por ID
   */
  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            expenditures: true,
            contracts: true,
          },
        },
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return supplier;
  }

  /**
   * Actualizar proveedor
   */
  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    // Check if supplier exists
    await this.findOne(id);

    try {
      return await this.prisma.supplier.update({
        where: { id },
        data: updateSupplierDto,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Supplier with this taxId already exists');
      }
      throw error;
    }
  }

  /**
   * Eliminar proveedor
   */
  async remove(id: string) {
    // Check if supplier exists
    await this.findOne(id);

    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}
