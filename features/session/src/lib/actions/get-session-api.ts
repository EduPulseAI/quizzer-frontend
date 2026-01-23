'use server';

import api, { ApiError, type ApiResponse } from '../config/client';
import { GET_SESSION } from '../constants/session';
import type { Session } from "../types/session";


export interface GetSessionResponse {
  isComplete: boolean;
  session: Session
}

export async function getSession(
  sessionId: string
): Promise<ApiResponse<GetSessionResponse>> {
  try {
    const endpoint = '/api/quiz/sessions/' + sessionId;
    const response = await api.get<Session>(endpoint);

    return {
      success: true,
      message: 'getSession successful',
      data: {
        isComplete: response.status === "COMPLETED",
        session: response
      },
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: GET_SESSION,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
