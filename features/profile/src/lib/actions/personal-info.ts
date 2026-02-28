'use server';

import { withApi, withForm } from '@next-feature/client/server';
import { z } from 'zod';
import api from '../config/client';
import { Personal } from '../types/profile';

/**
 * [update-personal-info]
 * next-feature@0.1.3-0
 * February 27th 2026, 3:05:24 pm
 */
const updatePersonalInfoSchema = z.object({
  firstName: z.string().min(3, "Must contain at least 3 characters"),
  lastName: z.string().min(3, "Must contain at least 3 characters"),
  email: z.string().email("invalid email"),
  title: z.string().min(3, "Must contain at least 3 characters"),
  location: z.string().min(3, "Must contain at least 3 characters"),
  phone: z.string().optional(),
  // avatarUpload: z.instanceof(File).optional()
});
export type UpdatePersonalInfoRequest = z.infer<
  typeof updatePersonalInfoSchema
>;

export const updatePersonalInfo = withApi(
  async (formData: FormData) => {
    const body: UpdatePersonalInfoRequest = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      phone: formData.get("phone") as string || undefined,
      // avatarUpload: formData.get("avatar-upload") as File
    };
    const parsed = updatePersonalInfoSchema.safeParse(body);

    if (!parsed.success) {
      throw parsed.error;
    }

    const endpoint = '/api/profiles/personal';
    const response = await api.put<Personal>(
      endpoint,
      parsed.data,
    );
    return response;
  },
  { successMessage: "Personal info updated" },
);

export const updatePersonalInfoAction = withForm(updatePersonalInfo)