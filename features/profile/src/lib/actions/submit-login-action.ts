'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '../auth';
import { ApiError, type ApiResponse } from '../config/client';

export const loginSchema = z.object({
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
      email: formData.get("email") as string,
      password: formData.get("password") as string
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

    await signIn("credentials", body);

    redirect("/dashboard")

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
