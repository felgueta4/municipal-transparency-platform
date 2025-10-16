
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@municipal-platform/database';

/**
 * PrismaService - Servicio global para interactuar con la base de datos
 * Extiende PrismaClient y maneja el ciclo de vida de la conexión
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Database disconnected');
  }

  /**
   * Método helper para limpiar base de datos (solo para tests)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'test') {
      // Eliminar todos los registros de las tablas en orden correcto
      await this.queryAudit.deleteMany();
      await this.ingestionRun.deleteMany();
      await this.dataset.deleteMany();
      await this.expenditure.deleteMany();
      await this.budget.deleteMany();
      await this.project.deleteMany();
      await this.user.deleteMany();
      await this.supplier.deleteMany();
      await this.fundingSource.deleteMany();
      await this.fiscalYear.deleteMany();
      await this.municipality.deleteMany();
    }
  }
}
