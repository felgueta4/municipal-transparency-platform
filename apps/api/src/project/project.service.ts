

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto, ProjectFilterDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crear proyecto
   */
  async create(createProjectDto: CreateProjectDto) {
    // Validar fechas
    if (createProjectDto.startDate && createProjectDto.endDate) {
      const startDate = new Date(createProjectDto.startDate);
      const endDate = new Date(createProjectDto.endDate);

      if (endDate < startDate) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    // Validar presupuestos
    if (
      createProjectDto.requestedBudget !== undefined &&
      createProjectDto.approvedBudget !== undefined &&
      createProjectDto.approvedBudget > createProjectDto.requestedBudget
    ) {
      throw new BadRequestException('Approved budget cannot exceed requested budget');
    }

    const data: any = {
      ...createProjectDto,
    };

    if (createProjectDto.startDate) {
      data.startDate = new Date(createProjectDto.startDate);
    }

    if (createProjectDto.endDate) {
      data.endDate = new Date(createProjectDto.endDate);
    }

    if (createProjectDto.requestedBudget !== undefined) {
      data.requestedBudget = new Decimal(createProjectDto.requestedBudget.toString());
    }

    if (createProjectDto.approvedBudget !== undefined) {
      data.approvedBudget = new Decimal(createProjectDto.approvedBudget.toString());
    }

    return this.prisma.project.create({
      data,
      include: {
        municipality: true,
        fundingSource: true,
      },
    });
  }

  /**
   * Obtener proyectos con filtros y paginación
   */
  async findAll(filters: ProjectFilterDto) {
    const { page = 1, limit = 10, municipalityId, status, category, department, search } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (municipalityId) {
      where.municipalityId = municipalityId;
    }

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (department) {
      where.department = department;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get total count
    const total = await this.prisma.project.count({ where });

    // Get projects
    const projects = await this.prisma.project.findMany({
      where,
      skip,
      take: limit,
      include: {
        municipality: true,
        fundingSource: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: projects,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener proyecto por ID
   */
  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        municipality: true,
        fundingSource: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  /**
   * Actualizar proyecto
   */
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    // Check if project exists
    await this.findOne(id);

    // Validar fechas
    if (updateProjectDto.startDate && updateProjectDto.endDate) {
      const startDate = new Date(updateProjectDto.startDate);
      const endDate = new Date(updateProjectDto.endDate);

      if (endDate < startDate) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    const updateData: any = { ...updateProjectDto };

    if (updateProjectDto.startDate) {
      updateData.startDate = new Date(updateProjectDto.startDate);
    }

    if (updateProjectDto.endDate) {
      updateData.endDate = new Date(updateProjectDto.endDate);
    }

    if (updateProjectDto.requestedBudget !== undefined) {
      updateData.requestedBudget = new Decimal(updateProjectDto.requestedBudget.toString());
    }

    if (updateProjectDto.approvedBudget !== undefined) {
      updateData.approvedBudget = new Decimal(updateProjectDto.approvedBudget.toString());
    }

    return this.prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        municipality: true,
        fundingSource: true,
      },
    });
  }

  /**
   * Eliminar proyecto
   */
  async remove(id: string) {
    // Check if project exists
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
