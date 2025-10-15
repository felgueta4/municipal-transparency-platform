
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * GlobalExceptionFilter - Maneja todos los errores de forma consistente
 * Transforma errores de Prisma a respuestas HTTP apropiadas
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'InternalServerError';

    // HTTP Exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        error = (exceptionResponse as any).error || error;
      }
    }
    // Prisma Errors (check by error name instead of instanceof)
    else if (exception && typeof exception === 'object' && 'code' in exception && 'name' in exception) {
      const prismaError = exception as any;
      if (prismaError.name === 'PrismaClientKnownRequestError') {
        status = this.handlePrismaError(prismaError);
        message = this.getPrismaErrorMessage(prismaError);
        error = 'DatabaseError';
      } else if (prismaError.name === 'PrismaClientValidationError') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid data provided';
        error = 'ValidationError';
      }
    }
    // Unknown Errors
    else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    // Log error
    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Error: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    // Send response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    });
  }

  private handlePrismaError(exception: any): number {
    switch (exception.code) {
      case 'P2002': // Unique constraint violation
        return HttpStatus.CONFLICT;
      case 'P2025': // Record not found
        return HttpStatus.NOT_FOUND;
      case 'P2003': // Foreign key constraint failed
        return HttpStatus.BAD_REQUEST;
      case 'P2000': // Value too long
      case 'P2006': // Invalid value
      case 'P2007': // Data validation error
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private getPrismaErrorMessage(exception: any): string {
    switch (exception.code) {
      case 'P2002':
        return `Duplicate entry: ${this.extractFieldFromMeta(exception.meta)}`;
      case 'P2025':
        return 'Record not found';
      case 'P2003':
        return 'Related record not found or constraint violation';
      case 'P2000':
        return 'Value is too long for this field';
      case 'P2006':
        return 'Invalid value provided';
      default:
        return 'Database operation failed';
    }
  }

  private extractFieldFromMeta(meta: any): string {
    if (meta?.target) {
      return Array.isArray(meta.target) ? meta.target.join(', ') : meta.target;
    }
    return 'unknown field';
  }
}
