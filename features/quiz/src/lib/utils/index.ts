import { GetQuiz, GetQuizResponse } from '../types';

/**
 * [get-quiz-mapper]
 * Thu Jul 31 2025
 */
export function getQuizMapper(r: GetQuizResponse): GetQuiz {

  const correct = r.responses.reduce((sum, curr) => {
    return sum + (curr.correct ? 1 : 0)
  }, 0)

  const uniqueResponses = new Set(r.responses.map(r => r.questionId)).size;

  const score = correct / r.questions.length
  return {
    correct,
    score,
    id: r.id,
    responses: r.responses,
    questions: r.questions,
    topic: r.topic,
    total: r.questions.length,
    showResult: uniqueResponses === r.questions.length
  };
}
