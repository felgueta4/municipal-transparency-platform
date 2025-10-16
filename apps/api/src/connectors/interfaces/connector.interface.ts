
/**
 * Connector Interface
 * Base interface for all API connectors
 */

export enum AuthType {
  NONE = 'none',
  API_KEY = 'api-key',
  BEARER = 'bearer',
  OAUTH = 'oauth',
  BASIC = 'basic',
}

export enum ConnectorType {
  CHILECOMPRA = 'chilecompra',
  BUDGET_SOURCE = 'budget-source',
  CUSTOM = 'custom',
}

export interface IConnectorConfig {
  id: string;
  name: string;
  type: string;
  baseUrl: string;
  apiKey?: string;
  authType: AuthType;
  authConfig?: Record<string, any>;
  config?: Record<string, any>;
  headers?: Record<string, string>;
  timeout: number;
  retryCount: number;
  rateLimit?: number;
  isActive: boolean;
}

export interface IRequestOptions {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface IConnectorResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  duration: number;
}

export interface IConnector {
  /**
   * Execute a request to the external API
   */
  executeRequest<T>(options: IRequestOptions): Promise<IConnectorResponse<T>>;

  /**
   * Test the connection to the external API
   */
  testConnection(): Promise<boolean>;

  /**
   * Get connector information
   */
  getInfo(): {
    name: string;
    type: string;
    isActive: boolean;
  };
}
