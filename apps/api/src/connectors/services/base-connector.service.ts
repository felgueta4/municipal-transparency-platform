
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import {
  IConnector,
  IConnectorConfig,
  IConnectorResponse,
  IRequestOptions,
  AuthType,
} from '../interfaces';
import { ConnectorLogService } from './connector-log.service';
import { RateLimiter } from '../utils';

/**
 * Base Connector Class
 * Abstract base class for all API connectors
 */
export abstract class BaseConnector implements IConnector {
  protected readonly logger: Logger;
  protected rateLimiter: RateLimiter;

  constructor(
    protected readonly config: IConnectorConfig,
    protected readonly httpService: HttpService,
    protected readonly logService: ConnectorLogService,
  ) {
    this.logger = new Logger(this.constructor.name);
    this.rateLimiter = new RateLimiter();
  }

  /**
   * Execute a request to the external API
   */
  async executeRequest<T>(
    options: IRequestOptions,
  ): Promise<IConnectorResponse<T>> {
    const startTime = Date.now();
    let attempts = 0;
    const maxAttempts = this.config.retryCount + 1;

    while (attempts < maxAttempts) {
      attempts++;

      try {
        // Check rate limit
        if (this.config.rateLimit) {
          const allowed = await this.rateLimiter.checkLimit(
            this.config.id,
            this.config.rateLimit,
          );
          if (!allowed) {
            const resetTime = this.rateLimiter.getResetTime(this.config.id);
            throw new Error(
              `Rate limit exceeded. Try again in ${Math.ceil(resetTime / 1000)} seconds`,
            );
          }
        }

        // Build request config
        const axiosConfig = this.buildRequestConfig(options);

        // Execute request
        this.logger.debug(`Executing ${options.method} ${options.endpoint} (attempt ${attempts}/${maxAttempts})`);
        
        const response = await firstValueFrom(
          this.httpService.request({
            ...axiosConfig,
            url: `${this.config.baseUrl}${options.endpoint}`,
          }),
        );

        const duration = Date.now() - startTime;

        // Log successful request
        await this.logRequest({
          endpoint: options.endpoint,
          method: options.method,
          requestHeaders: axiosConfig.headers,
          requestBody: options.data,
          responseStatus: response.status,
          responseHeaders: response.headers,
          responseBody: response.data,
          duration,
        });

        return {
          success: true,
          data: response.data as T,
          statusCode: response.status,
          duration,
        };
      } catch (error) {
        const duration = Date.now() - startTime;

        if (this.shouldRetry(error, attempts, maxAttempts)) {
          // Wait before retrying (exponential backoff)
          const delay = this.calculateBackoff(attempts);
          this.logger.warn(
            `Request failed (attempt ${attempts}/${maxAttempts}). Retrying in ${delay}ms...`,
          );
          await this.sleep(delay);
          continue;
        }

        // Log failed request
        const axiosError = error as AxiosError;
        await this.logRequest({
          endpoint: options.endpoint,
          method: options.method,
          requestHeaders: options.headers,
          requestBody: options.data,
          responseStatus: axiosError.response?.status,
          responseHeaders: axiosError.response?.headers,
          responseBody: axiosError.response?.data,
          duration,
          error: this.formatError(error),
        });

        return {
          success: false,
          error: this.formatError(error),
          statusCode: axiosError.response?.status,
          duration,
        };
      }
    }

    // Should never reach here
    return {
      success: false,
      error: 'Max retry attempts exceeded',
      duration: Date.now() - startTime,
    };
  }

  /**
   * Test the connection to the external API
   */
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.executeRequest({
        endpoint: this.getHealthCheckEndpoint(),
        method: 'GET',
      });
      return result.success;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Connection test failed: ${message}`);
      return false;
    }
  }

  /**
   * Get connector information
   */
  getInfo() {
    return {
      name: this.config.name,
      type: this.config.type,
      isActive: this.config.isActive,
    };
  }

  /**
   * Build Axios request configuration
   */
  protected buildRequestConfig(options: IRequestOptions): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      method: options.method,
      params: options.params,
      data: options.data,
      timeout: options.timeout || this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...options.headers,
      },
    };

    // Add authentication
    this.addAuthentication(config);

    return config;
  }

  /**
   * Add authentication to request config
   */
  protected addAuthentication(config: AxiosRequestConfig): void {
    const { authType, apiKey, authConfig } = this.config;

    switch (authType) {
      case AuthType.API_KEY:
        const headerName = authConfig?.headerName || 'X-API-Key';
        config.headers[headerName] = apiKey;
        break;

      case AuthType.BEARER:
        config.headers['Authorization'] = `Bearer ${apiKey}`;
        break;

      case AuthType.BASIC:
        if (authConfig?.username && authConfig?.password) {
          const credentials = Buffer.from(
            `${authConfig.username}:${authConfig.password}`,
          ).toString('base64');
          config.headers['Authorization'] = `Basic ${credentials}`;
        }
        break;

      case AuthType.OAUTH:
        // OAuth implementation would go here
        // For now, just use bearer token if available
        if (apiKey) {
          config.headers['Authorization'] = `Bearer ${apiKey}`;
        }
        break;

      case AuthType.NONE:
      default:
        // No authentication
        break;
    }
  }

  /**
   * Determine if request should be retried
   */
  protected shouldRetry(
    error: any,
    attempt: number,
    maxAttempts: number,
  ): boolean {
    if (attempt >= maxAttempts) {
      return false;
    }

    const axiosError = error as AxiosError;

    // Retry on network errors
    if (!axiosError.response) {
      return true;
    }

    // Retry on 5xx errors
    if (axiosError.response.status >= 500) {
      return true;
    }

    // Retry on 429 (rate limit)
    if (axiosError.response.status === 429) {
      return true;
    }

    // Don't retry on 4xx errors (except 429)
    return false;
  }

  /**
   * Calculate backoff delay (exponential backoff)
   */
  protected calculateBackoff(attempt: number): number {
    const baseDelay = 1000; // 1 second
    const maxDelay = 30000; // 30 seconds
    const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
    // Add jitter
    return delay + Math.random() * 1000;
  }

  /**
   * Sleep for a given duration
   */
  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Format error message
   */
  protected formatError(error: any): string {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return `HTTP ${axiosError.response.status}: ${JSON.stringify(axiosError.response.data)}`;
    }

    if (axiosError.request) {
      return 'Network error: No response received from server';
    }

    return error.message || 'Unknown error occurred';
  }

  /**
   * Log request/response
   */
  protected async logRequest(data: {
    endpoint: string;
    method: string;
    requestHeaders?: any;
    requestBody?: any;
    responseStatus?: number;
    responseHeaders?: any;
    responseBody?: any;
    duration: number;
    error?: string;
  }): Promise<void> {
    try {
      // Sanitize logs - don't log sensitive data
      const sanitizedHeaders = this.sanitizeHeaders(data.requestHeaders);
      const sanitizedBody = this.sanitizeBody(data.requestBody);

      await this.logService.create({
        connectorConfigId: this.config.id,
        endpoint: data.endpoint,
        method: data.method,
        requestHeaders: sanitizedHeaders,
        requestBody: sanitizedBody,
        responseStatus: data.responseStatus,
        responseHeaders: data.responseHeaders,
        responseBody: data.responseBody,
        duration: data.duration,
        error: data.error,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to log request: ${message}`);
    }
  }

  /**
   * Sanitize headers (remove sensitive data)
   */
  protected sanitizeHeaders(headers?: any): any {
    if (!headers) return {};

    const sanitized = { ...headers };
    const sensitiveKeys = ['authorization', 'x-api-key', 'api-key', 'cookie', 'set-cookie'];

    for (const key of Object.keys(sanitized)) {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * Sanitize request body (remove sensitive data)
   */
  protected sanitizeBody(body?: any): any {
    if (!body) return {};
    
    // For now, just return as is
    // Could implement field-level sanitization if needed
    return body;
  }

  /**
   * Get health check endpoint (override in subclasses)
   */
  protected abstract getHealthCheckEndpoint(): string;
}
