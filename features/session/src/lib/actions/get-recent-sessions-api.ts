'use server';

import api, { ApiError, type ApiResponse } from '../config/client';
import type { Session } from '../types/session';

export async function getRecentSessions(
  studentId: string
): Promise<ApiResponse<Session[]>> {
  try {
    const params: URLSearchParams = new URLSearchParams({
      studentId,
    });
    const endpoint = '/api/quiz/sessions?' + params.toString();
    const response = await api.get<Session[]>(endpoint);

    return {
      success: true,
      message: 'getRecentSessions successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: [],
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
