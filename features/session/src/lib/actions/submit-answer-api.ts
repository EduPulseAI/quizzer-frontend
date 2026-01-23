'use server';

import { type ApiResponse, ApiError } from '../config/client';
import { z } from 'zod';

import api from '../config/client';
import { SUBMIT_ANSWER } from '../constants/answer';
import type { Session } from "../types/session";
import type { AnswerChoice } from "@edupulse/quiz";

const schema = z.object({
  sessionId: z
    .string(),
  answerId: z
    .string()
});
export type SubmitAnswerRequest = z.infer<typeof schema>;

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  attemptNumber: number;
  eventId: string;
}

export async function submitAnswer(
  options: {
    session: Session;
    choice: AnswerChoice;
  }
): Promise<ApiResponse<SubmitAnswerResponse>> {
  try {
    const body: SubmitAnswerRequest = {
      sessionId: options.session.id,
      answerId: options.choice.choiceId
    };

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: SUBMIT_ANSWER,
        error: apiError.body,
      };
    }

    const endpoint = '/api/quiz/answer/submit';
    const response = await api.post<SubmitAnswerResponse>(
      endpoint,
      parsed.data
    );

    return {
      success: true,
      message: 'submitAnswer successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: SUBMIT_ANSWER,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
