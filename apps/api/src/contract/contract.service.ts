

import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto, UpdateContractDto, ContractFilterDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear contrato
   */
  async create(createContractDto: CreateContractDto) {
    // Validar fechas
    const startDate = new Date(createContractDto.startDate);

    if (createContractDto.endDate) {
      const endDate = new Date(createContractDto.endDate);

      if (endDate < startDate) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    // Validar monto
    if (createContractDto.amount < 0) {
      throw new BadRequestException('Amount must be a positive number');
    }

    const data: any = {
      ...createContractDto,
      startDate,
      amount: new Decimal(createContractDto.amount.toString()),
    };

    if (createContractDto.endDate) {
      data.endDate = new Date(createContractDto.endDate);
    }

    try {
      return await this.prisma.contract.create({
        data,
        include: {
          municipality: true,
          supplier: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Contract with this contract number already exists');
      }
      throw error;
    }
  }

  /**
   * Obtener contratos con filtros y paginación
   */
  async findAll(filters: ContractFilterDto) {
    const {
      page = 1,
      limit = 10,
      municipalityId,
      supplierId,
      status,
      startDateFrom,
      startDateTo,
      search,
    } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (municipalityId) {
      where.municipalityId = municipalityId;
    }

    if (supplierId) {
      where.supplierId = supplierId;
    }

    if (status) {
      where.status = status;
    }

    if (startDateFrom || startDateTo) {
      where.startDate = {};
      if (startDateFrom) {
        where.startDate.gte = new Date(startDateFrom);
      }
      if (startDateTo) {
        where.startDate.lte = new Date(startDateTo);
      }
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get total count
    const total = await this.prisma.contract.count({ where });

    // Get contracts
    const contracts = await this.prisma.contract.findMany({
      where,
      skip,
      take: limit,
      include: {
        municipality: true,
        supplier: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return {
      data: contracts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener contrato por ID
   */
  async findOne(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        municipality: true,
        supplier: true,
      },
    });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    return contract;
  }

  /**
   * Actualizar contrato
   */
  async update(id: string, updateContractDto: UpdateContractDto) {
    // Check if contract exists
    await this.findOne(id);

    // Validar fechas si se proporcionan ambas
    if (updateContractDto.startDate && updateContractDto.endDate) {
      const startDate = new Date(updateContractDto.startDate);
      const endDate = new Date(updateContractDto.endDate);

      if (endDate < startDate) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    const updateData: any = { ...updateContractDto };

    if (updateContractDto.startDate) {
      updateData.startDate = new Date(updateContractDto.startDate);
    }

    if (updateContractDto.endDate) {
      updateData.endDate = new Date(updateContractDto.endDate);
    }

    if (updateContractDto.amount !== undefined) {
      updateData.amount = new Decimal(updateContractDto.amount.toString());
    }

    try {
      return await this.prisma.contract.update({
        where: { id },
        data: updateData,
        include: {
          municipality: true,
          supplier: true,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Contract with this contract number already exists');
      }
      throw error;
    }
  }

  /**
   * Eliminar contrato
   */
  async remove(id: string) {
    // Check if contract exists
    await this.findOne(id);

    return this.prisma.contract.delete({
      where: { id },
    });
  }
}
