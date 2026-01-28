'use server';

import { Difficulty, Question } from '@edupulse/quiz';
import { z } from 'zod';

import api, { ApiError, type ApiResponse } from '../config/client';
import { START_SESSION } from '../constants/session';

const schema = z.object({
  studentId: z.string().uuid(),
  topicId: z.string().uuid(),
});
export type StartSessionRequest = z.infer<typeof schema>;

export interface StartSessionResponse {
  sessionId: string;
  startedAt: number;
  initialDifficulty: Difficulty,
  firstQuestion: Question
}

export async function startSession(
  options: StartSessionRequest
): Promise<ApiResponse<StartSessionResponse>> {
  try {
    const body: StartSessionRequest = {
      ...options,
    };

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: START_SESSION,
        error: apiError.problemDetail,
      };
    }

    const params: URLSearchParams = new URLSearchParams();
    const endpoint = '/api/quiz/sessions/start' + params.toString();
    const response = await api.post<StartSessionResponse>(
      endpoint,
      parsed.data
    );

    return {
      success: true,
      message: 'startSession successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: START_SESSION,
      error: apiError.problemDetail,
      message: apiError.message,
      success: false,
    };
  }
}
