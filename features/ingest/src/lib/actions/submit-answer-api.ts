'use server';

import { type ApiResponse, ApiError } from '../config/client';
import { z } from 'zod';

import api from '../config/client';
import { SUBMIT_ANSWER } from '../constants/answer';

const schema = z.object({
  sessionId: z
    .string(),
  studentId: z
    .string(),
  questionId: z
    .string(),
  answerId: z
    .string(),
  skillTag: z
    .string(),
  timeSpentMs: z
    .number()
});

export type SubmitAnswerRequest = z.infer<typeof schema>;

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  attemptNumber: number;
  eventId: string;
}

export async function submitAnswer(
  options: SubmitAnswerRequest
): Promise<ApiResponse<SubmitAnswerResponse>> {
  try {
    const body: SubmitAnswerRequest = {
      ...options,
    };

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.fromZodError(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: SUBMIT_ANSWER,
        error: apiError.problemDetail,
      };
    }

    const endpoint = '/api/quiz/submit-answer';
    const response = await api.post<SubmitAnswerResponse>(endpoint, parsed.data);

    return {
      success: true,
      message: 'submitAnswer successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: SUBMIT_ANSWER,
      error: apiError.problemDetail,
      message: apiError.message,
      success: false,
    };
  }
}
