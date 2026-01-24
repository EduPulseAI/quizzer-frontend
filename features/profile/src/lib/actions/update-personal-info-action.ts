'use server';

import { z } from 'zod';
import api, { ApiError, type ApiResponse } from '../config/client';
import type { Personal } from '../types/profile';

const schema = z.object({
  firstName: z.string().min(3, "Must contain at least 3 characters"),
  lastName: z.string().min(3, "Must contain at least 3 characters"),
  email: z.string().email("invalid email"),
  title: z.string().min(3, "Must contain at least 3 characters"),
  location: z.string().min(3, "Must contain at least 3 characters"),
  phone: z.string().optional(),
  workingHours: z.string().optional(),
  availableForWork: z.boolean(),
  avatarUpload: z.instanceof(File).optional()
});

export type UpdatePersonalInfoRequest = z.infer<typeof schema>;

export interface UpdatePersonalInfoResponse {}

export async function updatePersonalInfoAction(
  prevState: ApiResponse<Personal>,
  formData: FormData
): Promise<ApiResponse<Personal>> {
  try {
    const body: UpdatePersonalInfoRequest = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      phone: formData.get("phone") as string || undefined,
      workingHours: formData.get("workingHours") as string || undefined,
      availableForWork: formData.get("availableForWork") === "on",
      avatarUpload: formData.get("avatar-upload") as File
    };

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: { ...prevState.data, ...body },
        error: apiError.body,
      };
    }

    const endpoint = '/api/profiles/personal';
    const response = await api.put<Personal>(
      endpoint,
      parsed.data
    );

    return {
      success: true,
      message: 'UpdatePersonalInfo successful',
      data: response,
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
