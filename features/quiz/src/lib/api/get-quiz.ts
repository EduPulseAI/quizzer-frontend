'use server';

import type { GetQuiz, Quiz, GetQuizResponse } from '../types';
import { GET_QUIZ } from '../constants';
import api from '@feature/base/lib/axios';
import { handleError } from '@feature/base/lib/axios/error';
import type { BackendResponse } from '@feature/base/lib/axios/types';

interface BackendRequestOptions {}

export async function getQuiz(
  options?: BackendRequestOptions
): Promise<BackendResponse<GetQuiz>> {
  try {
    const params: URLSearchParams = new URLSearchParams();
    const endpoint = `/api/quiz?${params.toString()}`;

    const { data } = await api.get<GetQuizResponse>(endpoint);

    return { data };
  } catch (error) {
    return handleError<GetQuiz>(error, GET_QUIZ);
  }
}
