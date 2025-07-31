import { GetQuiz, GetQuizResponse } from '../types';

/**
 * [get-quiz-mapper]
 * Thu Jul 31 2025
 */
export function getQuizMapper(r: GetQuizResponse): GetQuiz {
  return {
    questions: r.questions,
    topic: r.topic,
    total: r.questions.length

  };
}
