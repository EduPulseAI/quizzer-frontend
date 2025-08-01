'use server';

import api from '@feature/base/lib/axios';
import { handleError } from '@feature/base/lib/axios/error';
import type { BackendResponse } from '@feature/base/lib/axios/types';
import { z } from 'zod';
import { SUBMIT_QUIZ_CHOICE } from '../constants';
import type {
  QuizResponseDetails,
  SubmitQuizChoice,
  SubmitQuizChoiceRequest,
  SubmitQuizChoiceResponse,
} from '../types';

interface BackendRequestOptions {
  selected: QuizResponseDetails;
  quizId: number;
}

export async function submitQuizChoice(
  options: BackendRequestOptions
): Promise<BackendResponse<SubmitQuizChoice>> {
  try {
    const endpoint = `/api/quizzes/${options.quizId}`;
    const body: SubmitQuizChoiceRequest = {
      optionId: options.selected.option,
      questionId: options.selected.question,
    };

    const parsed = z.object({
      optionId: z.number(),
      questionId: z.number()
    }).safeParse(body);

    if (!parsed.success) {
      return handleError(parsed.error, SUBMIT_QUIZ_CHOICE);
    }

    const { data } = await api.post<SubmitQuizChoiceResponse>(
      endpoint,
      parsed.data
    );

    return { data };
  } catch (error) {
    return handleError<SubmitQuizChoice>(error, SUBMIT_QUIZ_CHOICE);
  }
}
