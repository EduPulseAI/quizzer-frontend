import { InternalAxiosRequestConfig } from 'axios';

/**
 * Configuration options for the API client
 *
 * [api-client-config]
 * next-feature@0.1.1-beta.5
 * January 11th 2026, 9:24:45 pm
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  enableRefreshToken?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  onAuthenticated?: (
    config: InternalAxiosRequestConfig
  ) => void | Promise<void>;
  onUnauthorized?: () => void | Promise<void>;
  onRefreshTokenExpired?: () => void | Promise<void>;
  onRefreshToken?: () => string | Promise<string>;
}
