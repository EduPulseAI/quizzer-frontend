'use server';

import { z } from 'zod';
import api, { ApiError, type ApiResponse } from '../config/client';

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

export type SubmitSignupRequest = z.infer<typeof schema>;

export interface SubmitSignupResponse {
  id: string;
}

export async function submitSignupAction(
  prevState: ApiResponse<SubmitSignupRequest>,
  formData: FormData
): Promise<ApiResponse<SubmitSignupRequest>> {
  const body: SubmitSignupRequest = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string
  };
  try {

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: body,
        error: apiError.body,
      };
    }

    const endpoint = '/api/users/student';
    const response = await api.post<SubmitSignupResponse>(
      endpoint,
      parsed.data
    );

    return {
      success: true,
      message: 'SubmitSignup successful',
      data: body,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: body,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
