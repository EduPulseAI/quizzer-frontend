import { auth } from '@edupulse/auth';
import { ApiClient, ApiError, type ApiResponse } from '@next-feature/client';
import { BACKEND_API_URL } from './env';
const json = require("../../../package.json");

/**
 * Centralized API client configuration
 *
 * This file provides a single point to configure:
 * - Base API URL
 * - Request/response interceptors
 * - Default headers
 * - Authentication handling
 */


const apiClient = new ApiClient({
  baseURL: BACKEND_API_URL,
  enableRefreshToken: false,
  onAuthenticated: async (config) => {
    const session = await auth();

    if (session?.user) {
      const token = (session.user as any).jwtToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
  },
  onRefreshToken: async (originalRequest) => {
    return "";
  }
});

apiClient.getAxiosInstance().defaults.headers.common['User-Agent'] = [json.name, json.version].join(":")

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
