'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import api, { ApiError, type ApiResponse } from '../config/client';
import type { About, Language } from '../types/profile';

const languageSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().min(1),
  level: z.number().min(0).max(100),
  flag: z.string().optional().default(''),
});

const aboutSchema = z.object({
  bio: z.string().min(1, 'Bio is required'),
  focus: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  languages: z.array(languageSchema).default([]),
});

export type UpdateAboutRequest = z.infer<typeof aboutSchema>;

function parseFormData(formData: FormData): UpdateAboutRequest {
  const focusRaw = formData.get('focus') as string;
  const interestsRaw = formData.get('interests') as string;
  const languagesRaw = formData.get('languages') as string;

  let languages: Language[] = [];
  if (languagesRaw) {
    try {
      languages = JSON.parse(languagesRaw);
    } catch {
      languages = [];
    }
  }

  return {
    bio: formData.get('bio') as string,
    focus: focusRaw
      ? focusRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    interests: interestsRaw
      ? interestsRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    languages,
  };
}

export async function updateAboutAction(
  prevState: ApiResponse<About>,
  formData: FormData
): Promise<ApiResponse<About>> {
  try {
    const body = parseFormData(formData);
    const parsed = aboutSchema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);
      return {
        success: false,
        message: apiError.message,
        data: prevState.data,
        error: apiError.body,
      };
    }

    const response = await api.put<About>(
      '/api/profiles/about',
      parsed.data
    );

    revalidatePath('/resume');

    return {
      success: true,
      message: 'About updated successfully',
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
