
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';
import { ExpenditureModule } from './expenditure/expenditure.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { envValidationSchema } from './config/env.validation';

/**
 * AppModule - Módulo raíz de la aplicación
 * Configura todos los módulos, guards y filtros globales
 */
@Module({
  imports: [
    // Config Module con validación de env
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),

    // Throttler para rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 segundo
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000, // 10 segundos
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000, // 1 minuto
        limit: 100,
      },
    ]),

    // Módulos de la aplicación
    PrismaModule,
    AuthModule,
    BudgetModule,
    ExpenditureModule,
  ],
  providers: [
    // JWT Guard global (por defecto todos los endpoints requieren autenticación)
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Roles Guard global
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
