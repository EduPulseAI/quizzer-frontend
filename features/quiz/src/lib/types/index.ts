/**
 * [get-quiz]
 * Tue Jul 29 2025
 */
export interface GetQuiz {}

/**
 * [quiz]
 * Tue Jul 29 2025
 */
export interface Quiz {}

/**
 * [get-quiz-response]
 * Tue Jul 29 2025
 */
export interface GetQuizResponse {}

/**
 * [create-quiz]
 * Tue Jul 29 2025
 */
export interface CreateQuiz {
  quizId: number;
}

/**
 * [create-quiz-response]
 * Tue Jul 29 2025
 */
export interface CreateQuizResponse {
  id: number;
  topic: string;
}

/**
 * [create-quiz-request]
 * Tue Jul 29 2025
 */
export interface CreateQuizRequest {
  topic: string;
}
