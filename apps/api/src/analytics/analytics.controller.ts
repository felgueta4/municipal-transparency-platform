import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * GET /api/analytics/versions/adoption
   * Get version adoption statistics
   * Returns how many municipalities are using each version
   */
  @Get('versions/adoption')
  @Roles('super_admin')
  async getVersionAdoption() {
    try {
      const data = await this.analyticsService.getVersionAdoption();
      return {
        success: true,
        data,
        message: 'Estadísticas de adopción de versiones obtenidas correctamente',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener estadísticas de adopción de versiones',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/analytics/versions/timeline
   * Get timeline of version updates over time
   * Query params: startDate, endDate (ISO date strings)
   */
  @Get('versions/timeline')
  @Roles('super_admin')
  async getVersionTimeline(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      const start = startDate ? new Date(startDate) : undefined;
      const end = endDate ? new Date(endDate) : undefined;

      // Validate dates
      if (start && isNaN(start.getTime())) {
        throw new HttpException(
          {
            success: false,
            message: 'Fecha de inicio inválida',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (end && isNaN(end.getTime())) {
        throw new HttpException(
          {
            success: false,
            message: 'Fecha de fin inválida',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.analyticsService.getVersionTimeline(start, end);
      return {
        success: true,
        data,
        message: 'Línea de tiempo de versiones obtenida correctamente',
      };
    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener línea de tiempo de versiones',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/analytics/municipalities/status
   * Get municipality version status
   * Compares each municipality's version with latest stable
   */
  @Get('municipalities/status')
  @Roles('super_admin')
  async getMunicipalityStatus() {
    try {
      const data = await this.analyticsService.getMunicipalityStatus();
      return {
        success: true,
        data,
        message: 'Estado de versiones de municipalidades obtenido correctamente',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener estado de versiones de municipalidades',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/analytics/updates/frequency
   * Get update frequency statistics
   * Calculate average time between updates per municipality
   */
  @Get('updates/frequency')
  @Roles('super_admin')
  async getUpdateFrequency() {
    try {
      const data = await this.analyticsService.getUpdateFrequency();
      return {
        success: true,
        data,
        message: 'Frecuencia de actualizaciones obtenida correctamente',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener frecuencia de actualizaciones',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/analytics/versions/comparison
   * Compare versions with detailed statistics
   */
  @Get('versions/comparison')
  @Roles('super_admin')
  async getVersionComparison() {
    try {
      const data = await this.analyticsService.getVersionComparison();
      return {
        success: true,
        data,
        message: 'Comparación de versiones obtenida correctamente',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener comparación de versiones',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /api/analytics/dashboard/summary
   * Get overall dashboard summary
   * Key metrics for dashboard overview
   */
  @Get('dashboard/summary')
  @Roles('super_admin')
  async getDashboardSummary() {
    try {
      const data = await this.analyticsService.getDashboardSummary();
      return {
        success: true,
        data,
        message: 'Resumen del dashboard obtenido correctamente',
      };
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener resumen del dashboard',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
