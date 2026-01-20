'use server';

import { Question } from "@edupulse/question/lib/types/question";
import { type ApiResponse, ApiError } from '../config/client';

import api from '../config/client';
import { GET_NEXT_QUESTION } from '../constants/next-question';
import type { Session } from "../types/session";

export interface GetNextQuestionRequest {}

export interface GetNextQuestionResponse {}

export async function getNextQuestion(
  session: Session
): Promise<ApiResponse<Question>> {
  try {
    const params: URLSearchParams = new URLSearchParams();
    params.set("sessionId", session.id);
    params.set("difficulty", session.currentDifficulty);
    const endpoint = '/api/quiz/questions/next' + params.toString();
    const response = await api.get<Question>(endpoint);

    return {
      success: true,
      message: 'getNextQuestion successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: GET_NEXT_QUESTION,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
