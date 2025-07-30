'use server';

import { z } from 'zod';
import type {
  CreateQuiz,
  Quiz,
  CreateQuizResponse,
  CreateQuizRequest,
} from '../types';
import { CREATE_QUIZ } from '../constants';
import api from '@feature/base/lib/axios';
import { handleError } from '@feature/base/lib/axios/error';
import type { BackendResponse } from '@feature/base/lib/axios/types';

interface BackendRequestOptions {
  topic: string;
  questions?: number;
}

export async function createQuiz({
  topic,
  questions = 5,
}: BackendRequestOptions): Promise<BackendResponse<CreateQuiz>> {
  try {
    const endpoint = `/api/quizzes`;

    const body: CreateQuizRequest = {
      topic,
      questions
    };

    const parsed = z
      .object({
        topic: z.string(),
        questions: z.number().gt(0),
      })
      .safeParse(body);

    if (!parsed.success) {
      return handleError(parsed.error, CREATE_QUIZ);
    }

    const { data } = await api.post<CreateQuizResponse>(endpoint, parsed.data);

    return { data: { quizId: data.id } };
  } catch (error) {
    return handleError<CreateQuiz>(error, CREATE_QUIZ);
  }
}
