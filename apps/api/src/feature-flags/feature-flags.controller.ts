import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { UpdateMunicipalityFeaturesDto } from './dto/update-municipality-features.dto';
import { BulkUpdateFeaturesDto } from './dto/bulk-update-features.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('feature-flags')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  /**
   * GET /api/feature-flags
   * List all feature flags
   * Accessible by: super_admin
   */
  @Get()
  @Roles('super_admin')
  async findAll() {
    try {
      const data = await this.featureFlagsService.findAll();
      return {
        success: true,
        data,
        message: 'Feature flags obtenidas correctamente',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener feature flags',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/feature-flags/:id
   * Get a single feature flag by ID
   * Accessible by: super_admin
   */
  @Get(':id')
  @Roles('super_admin')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.featureFlagsService.findOne(id);
      return {
        success: true,
        data,
        message: 'Feature flag obtenida correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener feature flag',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /api/feature-flags
   * Create a new feature flag
   * Accessible by: super_admin
   */
  @Post()
  @Roles('super_admin')
  async create(@Body() createDto: CreateFeatureFlagDto) {
    try {
      const data = await this.featureFlagsService.create(createDto);
      return {
        success: true,
        data,
        message: 'Feature flag creada correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al crear feature flag',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * PATCH /api/feature-flags/:id
   * Update an existing feature flag
   * Accessible by: super_admin
   */
  @Patch(':id')
  @Roles('super_admin')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFeatureFlagDto,
  ) {
    try {
      const data = await this.featureFlagsService.update(id, updateDto);
      return {
        success: true,
        data,
        message: 'Feature flag actualizada correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al actualizar feature flag',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * DELETE /api/feature-flags/:id
   * Delete a feature flag
   * Accessible by: super_admin
   */
  @Delete(':id')
  @Roles('super_admin')
  async remove(@Param('id') id: string) {
    try {
      await this.featureFlagsService.remove(id);
      return {
        success: true,
        message: 'Feature flag eliminada correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al eliminar feature flag',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/feature-flags/municipalities/:id/features
   * Get features for a specific municipality
   * Accessible by: super_admin, admin_muni (only for their own municipality)
   */
  @Get('municipalities/:id/features')
  @Roles('super_admin', 'admin_muni')
  async getMunicipalityFeatures(
    @Param('id') municipalityId: string,
    @Request() req,
  ) {
    try {
      // If user is admin_muni, verify they can only access their own municipality
      if (
        req.user.role === 'admin_muni' &&
        req.user.municipalityId !== municipalityId
      ) {
        throw new HttpException(
          {
            success: false,
            message: 'No tienes permiso para acceder a esta municipalidad',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const data =
        await this.featureFlagsService.getMunicipalityFeatures(municipalityId);
      return {
        success: true,
        data,
        message: 'Features de la municipalidad obtenidas correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener features de la municipalidad',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * PATCH /api/feature-flags/municipalities/:id/features
   * Update features for a specific municipality
   * Accessible by: super_admin
   */
  @Patch('municipalities/:id/features')
  @Roles('super_admin')
  async updateMunicipalityFeatures(
    @Param('id') municipalityId: string,
    @Body() updateDto: UpdateMunicipalityFeaturesDto,
    @Request() req,
  ) {
    try {
      const data = await this.featureFlagsService.updateMunicipalityFeatures(
        municipalityId,
        updateDto,
        req.user.id,
      );
      return {
        success: true,
        data,
        message: 'Features de la municipalidad actualizadas correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al actualizar features de la municipalidad',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /api/feature-flags/municipalities/features/bulk
   * Bulk update features for multiple municipalities
   * Accessible by: super_admin
   */
  @Post('municipalities/features/bulk')
  @Roles('super_admin')
  async bulkUpdateFeatures(
    @Body() bulkDto: BulkUpdateFeaturesDto,
    @Request() req,
  ) {
    try {
      const data = await this.featureFlagsService.bulkUpdateFeatures(
        bulkDto,
        req.user.id,
      );
      return {
        success: true,
        data,
        message: data.message,
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al actualizar features en bulk',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
