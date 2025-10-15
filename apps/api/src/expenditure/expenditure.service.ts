
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenditureDto, UpdateExpenditureDto, ExpenditureFilterDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ExpenditureService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear gasto
   */
  async create(createExpenditureDto: CreateExpenditureDto) {
    const { date, amountActual, ...rest } = createExpenditureDto;

    return this.prisma.expenditure.create({
      data: {
        ...rest,
        date: new Date(date),
        amountActual: new Decimal(amountActual.toString()),
      },
      include: {
        municipality: true,
        fiscalYear: true,
        supplier: true,
      },
    });
  }

  /**
   * Obtener gastos con filtros y paginación
   */
  async findAll(filters: ExpenditureFilterDto) {
    const { page = 1, limit = 10, from, to, category, department, supplierId } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (from || to) {
      where.date = {};
      if (from) {
        where.date.gte = new Date(from);
      }
      if (to) {
        where.date.lte = new Date(to);
      }
    }

    if (category) {
      where.category = category;
    }

    if (department) {
      where.department = department;
    }

    if (supplierId) {
      where.supplierId = supplierId;
    }

    // Get total count
    const total = await this.prisma.expenditure.count({ where });

    // Get expenditures
    const expenditures = await this.prisma.expenditure.findMany({
      where,
      skip,
      take: limit,
      include: {
        municipality: true,
        fiscalYear: true,
        supplier: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return {
      data: expenditures,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener gasto por ID
   */
  async findOne(id: string) {
    const expenditure = await this.prisma.expenditure.findUnique({
      where: { id },
      include: {
        municipality: true,
        fiscalYear: true,
        supplier: true,
      },
    });

    if (!expenditure) {
      throw new NotFoundException(`Expenditure with ID ${id} not found`);
    }

    return expenditure;
  }

  /**
   * Actualizar gasto
   */
  async update(id: string, updateExpenditureDto: UpdateExpenditureDto) {
    // Check if expenditure exists
    await this.findOne(id);

    const { date, amountActual, ...rest } = updateExpenditureDto;

    const updateData: any = { ...rest };

    if (date) {
      updateData.date = new Date(date);
    }

    if (amountActual !== undefined) {
      updateData.amountActual = new Decimal(amountActual.toString());
    }

    return this.prisma.expenditure.update({
      where: { id },
      data: updateData,
      include: {
        municipality: true,
        fiscalYear: true,
        supplier: true,
      },
    });
  }

  /**
   * Eliminar gasto
   */
  async remove(id: string) {
    // Check if expenditure exists
    await this.findOne(id);

    return this.prisma.expenditure.delete({
      where: { id },
    });
  }

  /**
   * Obtener gastos por rango de fechas
   */
  async findByDateRange(from: string, to: string, filters?: Partial<ExpenditureFilterDto>) {
    const where: any = {
      date: {
        gte: new Date(from),
        lte: new Date(to),
      },
    };

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.department) {
      where.department = filters.department;
    }

    if (filters?.supplierId) {
      where.supplierId = filters.supplierId;
    }

    return this.prisma.expenditure.findMany({
      where,
      include: {
        municipality: true,
        fiscalYear: true,
        supplier: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
