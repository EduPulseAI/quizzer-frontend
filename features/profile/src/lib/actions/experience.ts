'use server';

import { withApi, withForm } from '@next-feature/client/server';
import { z } from 'zod';
import api, { ApiResponse } from '../config/client';
import { ExperienceItem } from '../types/profile';
import { revalidatePath } from 'next/cache';

/**
 * [add-experience]
 * next-feature@0.1.3-1
 * February 28th 2026, 7:23:43 pm
 */
const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  period: z.string().min(1, 'Period is required'),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
});
export type ExperienceRequest = z.infer<typeof experienceSchema>;

function parseExperienceRequest(formData: FormData): ExperienceRequest {
  const achievementsRaw = formData.get('achievements') as string;
  const technologiesRaw = formData.get('technologies') as string;

  return {
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: (formData.get('description') as string) || undefined,
    achievements: achievementsRaw
      ? achievementsRaw
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
      : [],
    technologies: technologiesRaw
      ? technologiesRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      : [],
  };
}

export const addExperience = withApi(async (formData: FormData) => {
  const options = parseExperienceRequest(formData);
  const parsed = experienceSchema.safeParse(options);

  if (!parsed.success) {
    throw parsed.error;
  }

  const response = await api.post<ExperienceItem>(
    '/api/profiles/experience',
    parsed.data,
  );

  revalidatePath('/resume');

  return response;
}, {});

export const addExperienceAction = withForm(addExperience);

/**
 * [update-experience]
 * next-feature@0.1.3-1
 * February 28th 2026, 7:28:00 pm
 */

export const updateExperience = withApi(
  async (index: number, formData: FormData) => {
    const options = parseExperienceRequest(formData);
    const parsed = experienceSchema.safeParse(options);

    if (!parsed.success) {
      throw parsed.error;
    }

    const response = await api.put<ExperienceItem>(
      `/api/profiles/experience/${index}`,
      parsed.data,
    );

    revalidatePath('/resume');

    return response;
  },
  {},
);

export const updateExperienceAction = async (
  index: number,
  prevState: ApiResponse<ExperienceItem>,
  formData: FormData,
) => {
  const response = await updateExperience(index, formData);
  if (!response.success) {
    return { ...response, data: prevState.data };
  }

  return response;
};

/**
 * [delete-experience]
 * next-feature@0.1.3-1
 * February 28th 2026, 7:33:18 pm
 */
export const deleteExperience = withApi(
  async (index: number) => {
    await api.delete(`/api/profiles/experience/${index}`);
    revalidatePath('/resume');
  },
  {},
);
