'use server';

import { Question } from "@edupulse/quiz";
import api, { ApiError, type ApiResponse } from '../config/client';
import type { Session } from "../types/session";


export async function getNextQuestion(
  session: Session
): Promise<ApiResponse<Question | null>> {
  try {
    const params: URLSearchParams = new URLSearchParams({
      sessionId: session.id,
      difficulty: session.currentDifficulty
    });

    const endpoint = '/api/quiz/questions/next?' + params.toString();
    const response = await api.get<Question>(endpoint);

    return {
      success: true,
      message: 'getNextQuestion successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: null,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
