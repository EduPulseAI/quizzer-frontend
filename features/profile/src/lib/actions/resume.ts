'use server';

import { withApi } from '@next-feature/client/server';
import { z } from 'zod';
import api from '../config/client';

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

export const uploadResume = withApi(async (formData: FormData) => {
  const parsed = uploadResumeSchema.safeParse({ file: formData.get("file") as File });

  if (!parsed.success) {
    throw parsed.error;
  }

  const backendFormData = new FormData();
  backendFormData.append("file", parsed.data.file);

  const endpoint = `/api/resumes/upload`;
  const response = await api.post<{ resumeId: string }>(endpoint, backendFormData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  console.log("uploadResume#response", response);
  return response;
}, {});
