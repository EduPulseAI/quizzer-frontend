'use server';

import type { User } from 'next-auth';
import api, { ApiError, type ApiResponse } from '../config/client';
import { loginSchema, type SubmitLoginRequest } from './submit-login-action';

interface PostLoginResponse {
  id: string;
  name: string;
  email: string
  jwtToken: string;
  role: string;
}

export async function postLogin(
  options: Partial<Record<"email" | "password", unknown>>
): Promise<ApiResponse<User>> {
  try {
    const body: SubmitLoginRequest = {
      email: options.email as string,
      password: options.password as string,
    };

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: null,
        error: apiError.body,
      };
    }

    const endpoint = '/api/auth/login';
    const response = await api.post<PostLoginResponse>(
      endpoint,
      parsed.data
    );

    const user: User = {
      email: response.email,
      expiration: 0,
      jwtToken: response.jwtToken,
      name: response.name,
      refreshToken: '',
      role: response.role,
      id: response.id
    }

    return {
      success: true,
      message: 'postLogin successful',
      data: user,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: null,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
