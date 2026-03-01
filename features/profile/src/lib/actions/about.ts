'use server';

import { withApi, withForm } from '@next-feature/client/server';
import { z } from 'zod';
import api from '../config/client';
import { revalidatePath } from 'next/cache';
import { About } from '../types/profile';

/**
 * [update-about]
 * next-feature@0.1.3-1
 * February 28th 2026, 7:39:56 pm
 */
const updateAboutSchema = z.object({
  bio: z.string().min(1, 'Bio is required'),
  focus: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
});
export type UpdateAboutRequest = z.infer<typeof updateAboutSchema>;

function parseUpdateAboutRequest(formData: FormData): UpdateAboutRequest {
  const focusRaw = formData.get('focus') as string;
  const interestsRaw = formData.get('interests') as string;
  

  return {
    bio: formData.get('bio') as string,
    focus: focusRaw
      ? focusRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    interests: interestsRaw
      ? interestsRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
  };
}

export const updateAbout = withApi(async (formData: FormData) => {
  const options = parseUpdateAboutRequest(formData);
  const parsed = updateAboutSchema.safeParse(options);

  if (!parsed.success) {
    throw parsed.error;
  }

  const response = await api.put<About>(
    '/api/profiles/about',
    parsed.data
  );

  revalidatePath('/resume');
  
  return response;
}, {});

export const updateAboutAction = withForm(updateAbout);
