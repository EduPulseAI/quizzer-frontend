import { ApiClient, ApiError, type ApiResponse } from '@edupulse/api-client';
import { type InternalAxiosRequestConfig } from 'axios';
import { BACKEND_API_URL } from '.';
import { auth } from '../auth';

/**
 * Centralized API client configuration
 *
 * This file provides a single point to configure:
 * - Base API URL
 * - Request/response interceptors
 * - Default headers
 * - Authentication handling
 */

const NO_AUTH_PATH_PATTERNS = [
  /auth\/login/,
  /users\/student/
]

const apiClient = new ApiClient({
  baseURL: BACKEND_API_URL,
  enableRefreshToken: false,
  skipRefreshPaths: NO_AUTH_PATH_PATTERNS,  // Don't attempt refresh for login/signup
  maxRetries: 3,
  onAuthenticated: async (config: InternalAxiosRequestConfig) => {
    const session = await auth();

    if (session?.user?.jwtToken) {
      config.headers.Authorization = `Bearer ${session.user.jwtToken}`;
    }
  },
  onRefreshToken: async () => {
    const session = await auth();
    if (session?.user?.refreshToken) {
        return session.user.refreshToken;
    }
    throw new Error("No refresh token found")
  }
});

/**
 * Example: Add custom request interceptor
 */
// apiClient.interceptors.request.use((config) => {
//   // Add custom headers, auth tokens, etc.
//   return config;
// });

/**
 * Example: Add custom response interceptor
 */
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// );

// Re-export commonly used utilities
export { ApiError, type ApiResponse };

// Export configured API client for use in server actions
export default apiClient;
