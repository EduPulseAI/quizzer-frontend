'use server';

import { withApi } from '@next-feature/client/server';
import { z } from 'zod';
import api from '../config/client';
import type 
{ Profile } from '../types/profile';

const MAX_SIZE_MB = 20;

/**
 * [upload-resume]
 * next-feature@0.1.2-10
 * February 26th 2026, 2:59:23 pm
 */
const uploadResumeSchema = z.object({
  file: z.any()
})
  .refine(({ file }) => /.(pdf|docx)$/i.test(file.name), {
    message: "Please upload a DOCX/PDF file",
    path: ["file"]
  })
  .refine(({ file }) => file.size <= MAX_SIZE_MB * 1024 * 1024, {
    message: `File size exceeds ${MAX_SIZE_MB}MB limit`,
    path: ["file"]
  });

export type UploadResumeRequest = z.infer<typeof uploadResumeSchema>;

export const uploadResume = withApi(async (file: File) => {
  const parsed = uploadResumeSchema.safeParse({ file });

  if (!parsed.success) {
    throw parsed.error;
  }

  const formData = new FormData();
  formData.append("file", file);

  const endpoint = '/api/resumes/upload';
  return await api.post<Profile>(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: null,
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      console.log(percent);
    },
  });
}, {});
