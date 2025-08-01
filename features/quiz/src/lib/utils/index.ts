import { GetQuiz, GetQuizResponse } from '../types';

/**
 * [get-quiz-mapper]
 * Thu Jul 31 2025
 */
export function getQuizMapper(r: GetQuizResponse): GetQuiz {

  const correct = r.responses.reduce((sum, curr) => {
    if (curr.correct) {
      return sum + 1;
    }
    return sum
  }, 0)
  const score = correct / r.questions.length
  return {
    correct,
    score,
    id: r.id,
    responses: r.responses,
    questions: r.questions,
    topic: r.topic,
    total: r.questions.length,
    showResult: r.responses.length === r.questions.length
  };
}
