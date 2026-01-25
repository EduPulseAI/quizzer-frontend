'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import api, { ApiError, type ApiResponse } from '../config/client';
import type { Education } from '../types/profile';

const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  year: z.string().min(1, 'Year is required'),
  logo: z.string().optional(),
});

export type EducationRequest = z.infer<typeof educationSchema>;

function parseFormData(formData: FormData): EducationRequest {
  return {
    degree: formData.get('degree') as string,
    institution: formData.get('institution') as string,
    year: formData.get('year') as string,
    logo: (formData.get('logo') as string) || undefined,
  };
}

export async function addEducationAction(
  prevState: ApiResponse<Education>,
  formData: FormData
): Promise<ApiResponse<Education>> {
  try {
    const body = parseFormData(formData);
    const parsed = educationSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);
      return {
        success: false,
        message: apiError.message,
        data: { ...prevState.data, ...body },
        error: apiError.body,
      };
    }

    const response = await api.post<Education>(
      '/api/profiles/education',
      parsed.data
    );

    revalidatePath('/resume');

    return {
      success: true,
      message: 'Education added successfully',
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

export async function updateEducationAction(
  index: number,
  prevState: ApiResponse<Education>,
  formData: FormData
): Promise<ApiResponse<Education>> {
  try {
    const body = parseFormData(formData);
    const parsed = educationSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);
      return {
        success: false,
        message: apiError.message,
        data: prevState.data,
        error: apiError.body,
      };
    }

    const response = await api.put<Education>(
      `/api/profiles/education/${index}`,
      parsed.data
    );

    revalidatePath('/resume');

    return {
      success: true,
      message: 'Education updated successfully',
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

export async function deleteEducationAction(index: number): Promise<ApiResponse<void>> {
  try {
    await api.delete(`/api/profiles/education/${index}`);

    revalidatePath('/resume');

    return {
      success: true,
      message: 'Education deleted successfully',
      data: undefined,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: undefined,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
