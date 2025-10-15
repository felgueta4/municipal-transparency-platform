
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

/**
 * Bootstrap - Inicializa la aplicación NestJS
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Crear aplicación NestJS
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Get config service
  const configService = app.get(ConfigService);

  // Security headers con Helmet
  app.use(helmet());

  // CORS
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');
  app.enableCors({
    origin: corsOrigin.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en DTOs
      transform: true, // Transforma tipos automáticamente
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger/OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('Municipal Transparency Platform API')
    .setDescription(
      'API REST para la plataforma de transparencia municipal chilena. ' +
        'Fase 1A: Gestión de presupuestos, gastos, proyectos y proveedores.',
    )
    .setVersion('1.0.0')
    .addTag('Auth', 'Autenticación y autorización')
    .addTag('Budget', 'Gestión de presupuestos municipales')
    .addTag('Expenditures', 'Gestión de gastos ejecutados')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3001', 'Development server')
    .addServer('https://api.municipal.cl', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Municipal API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  // Get port
  const port = configService.get<number>('PORT', 3001);

  // Start server
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 API Documentation available at: http://localhost:${port}/api/docs`);
  logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`🔒 CORS enabled for: ${corsOrigin}`);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.log('SIGTERM signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.log('SIGINT signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});
