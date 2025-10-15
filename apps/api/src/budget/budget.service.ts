
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto, UpdateBudgetDto, BudgetFilterDto, BudgetSummaryDto, GroupBy } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear presupuesto
   */
  async create(createBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        ...createBudgetDto,
        amountPlanned: new Decimal(createBudgetDto.amountPlanned.toString()),
      },
      include: {
        municipality: true,
        fiscalYear: true,
      },
    });
  }

  /**
   * Obtener presupuestos con filtros y paginación
   */
  async findAll(filters: BudgetFilterDto) {
    const { page = 1, limit = 10, year, department, category } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (year) {
      const fiscalYear = await this.prisma.fiscalYear.findFirst({
        where: { year },
      });

      if (fiscalYear) {
        where.fiscalYearId = fiscalYear.id;
      }
    }

    if (department) {
      where.department = department;
    }

    if (category) {
      where.category = category;
    }

    // Get total count
    const total = await this.prisma.budget.count({ where });

    // Get budgets
    const budgets = await this.prisma.budget.findMany({
      where,
      skip,
      take: limit,
      include: {
        municipality: true,
        fiscalYear: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: budgets,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener presupuesto por ID
   */
  async findOne(id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: {
        municipality: true,
        fiscalYear: true,
      },
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  /**
   * Actualizar presupuesto
   */
  async update(id: string, updateBudgetDto: UpdateBudgetDto) {
    // Check if budget exists
    await this.findOne(id);

    const updateData: any = { ...updateBudgetDto };

    if (updateBudgetDto.amountPlanned !== undefined) {
      updateData.amountPlanned = new Decimal(updateBudgetDto.amountPlanned.toString());
    }

    return this.prisma.budget.update({
      where: { id },
      data: updateData,
      include: {
        municipality: true,
        fiscalYear: true,
      },
    });
  }

  /**
   * Eliminar presupuesto
   */
  async remove(id: string) {
    // Check if budget exists
    await this.findOne(id);

    return this.prisma.budget.delete({
      where: { id },
    });
  }

  /**
   * Obtener resumen de presupuestos agrupados
   */
  async getSummary(summaryDto: BudgetSummaryDto) {
    const { year, groupBy = GroupBy.CATEGORY } = summaryDto;

    // Get fiscal year
    const fiscalYear = await this.prisma.fiscalYear.findFirst({
      where: { year },
    });

    if (!fiscalYear) {
      throw new NotFoundException(`Fiscal year ${year} not found`);
    }

    // Group by category or department
    const groupByField = groupBy === GroupBy.CATEGORY ? 'category' : 'department';

    const summary = await this.prisma.budget.groupBy({
      by: [groupByField],
      where: {
        fiscalYearId: fiscalYear.id,
      },
      _sum: {
        amountPlanned: true,
      },
      _count: {
        id: true,
      },
    });

    return {
      year,
      groupBy,
      data: summary.map((item) => ({
        [groupByField]: item[groupByField],
        totalPlanned: item._sum.amountPlanned?.toString() || '0',
        count: item._count.id,
      })),
    };
  }
}
