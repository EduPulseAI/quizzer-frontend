'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import api, { ApiError, type ApiResponse } from '../config/client';
import type { ExperienceItem } from '../types/profile';

const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  period: z.string().min(1, 'Period is required'),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
});

export type ExperienceRequest = z.infer<typeof experienceSchema>;

function parseFormData(formData: FormData): ExperienceRequest {
  const achievementsRaw = formData.get('achievements') as string;
  const technologiesRaw = formData.get('technologies') as string;

  return {
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: (formData.get('description') as string) || undefined,
    achievements: achievementsRaw
      ? achievementsRaw.split('\n').map((s) => s.trim()).filter(Boolean)
      : [],
    technologies: technologiesRaw
      ? technologiesRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
  };
}

export async function addExperienceAction(
  prevState: ApiResponse<ExperienceItem>,
  formData: FormData
): Promise<ApiResponse<ExperienceItem>> {
  try {
    const body = parseFormData(formData);
    const parsed = experienceSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);
      return {
        success: false,
        message: apiError.message,
        data: prevState.data,
        error: apiError.body,
      };
    }

    const response = await api.post<ExperienceItem>(
      '/api/profiles/experience',
      parsed.data
    );

    revalidatePath('/resume');

    return {
      success: true,
      message: 'Experience added successfully',
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

export async function updateExperienceAction(
  index: number,
  prevState: ApiResponse<ExperienceItem>,
  formData: FormData
): Promise<ApiResponse<ExperienceItem>> {
  try {
    const body = parseFormData(formData);
    const parsed = experienceSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);
      return {
        success: false,
        message: apiError.message,
        data: prevState.data,
        error: apiError.body,
      };
    }

    const response = await api.put<ExperienceItem>(
      `/api/profiles/experience/${index}`,
      parsed.data
    );

    revalidatePath('/resume');

    return {
      success: true,
      message: 'Experience updated successfully',
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

export async function deleteExperienceAction(index: number): Promise<ApiResponse<void>> {
  try {
    await api.delete(`/api/profiles/experience/${index}`);

    revalidatePath('/resume');

    return {
      success: true,
      message: 'Experience deleted successfully',
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
