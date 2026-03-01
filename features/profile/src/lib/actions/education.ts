'use server';

import { withApi, withForm } from '@next-feature/client/server';
import { z } from 'zod';
import api, { ApiResponse } from '../config/client';
import { revalidatePath } from 'next/cache';
import type { Education } from '../types/profile';

/**
 * [add-education]
 * next-feature@0.1.3-1
 * February 28th 2026, 6:28:53 pm
 */
const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  year: z.string().min(1, 'Year is required'),
  logo: z.string().optional(),
});
export type EducationRequest = z.infer<typeof educationSchema>;

function parseEducationRequest(formData: FormData): EducationRequest {
  return {
    degree: formData.get('degree') as string,
    institution: formData.get('institution') as string,
    year: formData.get('year') as string,
    logo: (formData.get('logo') as string) || undefined,
  };
}

export const addEducation = withApi(async (formData: FormData) => {
  const options = parseEducationRequest(formData);
  const parsed = educationSchema.safeParse(options);

  if (!parsed.success) {
    throw parsed.error;
  }

  const endpoint = '/api/profiles/education';
  const response = await api.post<Education>(endpoint, parsed.data);

  revalidatePath('/resume');

  return response;
}, {});

export const addEducationAction = withForm(addEducation);

/**
 * [update-education]
 * next-feature@0.1.3-1
 * February 28th 2026, 6:59:02 pm
 */

export const updateEducation = withApi(
  async (
    index: number,
    formData: FormData,
  ) => {
    const options = parseEducationRequest(formData);
    const parsed = educationSchema.safeParse(options);

    if (!parsed.success) {
      throw parsed.error;
    }

    const response = await api.put<Education>(
      `/api/profiles/education/${index}`,
      parsed.data,
    );

    revalidatePath('/resume');

    return response;
  },
  { successMessage: "Education updated successfully"},
);

export const updateEducationAction = async (
  index: number,
  prevState: ApiResponse<Education>,
  formData: FormData,
) => {
  const response = await updateEducation(index, formData);
  if (!response.success) {
    return { ...response, data: prevState.data }
  }

  return response;
}

/**
 * [delete-education]
 * next-feature@0.1.3-1
 * February 28th 2026, 7:05:39 pm
 */
export const deleteEducationAction = withApi(
  async (index: number) => {
    await api.delete(`/api/profiles/education/${index}`);
    revalidatePath('/resume');
  },
);
