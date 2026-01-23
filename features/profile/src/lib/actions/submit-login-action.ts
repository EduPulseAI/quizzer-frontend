'use server';

import type { User } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '../auth';
import api, { ApiError, type ApiResponse } from '../config/client';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SubmitLoginRequest = z.infer<typeof loginSchema>;

export async function submitLoginAction(
  prevState: ApiResponse<SubmitLoginRequest>,
  formData: FormData
): Promise<ApiResponse<SubmitLoginRequest>> {
  try {
    const body: SubmitLoginRequest = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: body,
        error: apiError.body,
      };
    }

    await signIn('credentials', {
      ...body,
      redirect: false
    });

    return {
      success: true,
      message: 'SubmitLogin successful',
      data: body,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: prevState.data,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}

export interface LoginResponse {
  token: { value: string, issuedAt: Date, expiration: Date, }
  user: User
}


export async function postLogin(
  options: Partial<Record<'email' | 'password', unknown>>
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
    const response = await api.post<LoginResponse>(endpoint, parsed.data);

    const user: User = {
      expiration: response.token.expiration,
      jwtToken: response.token.value,
      refreshToken: '',
      email: response.user.email,
      name: response.user.name,
      role: response.user.role,
      id: response.user.id,
    };

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
