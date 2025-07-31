/**
 * [get-quiz]
 * Tue Jul 29 2025
 */
export interface GetQuiz {
  topic: string;
  total: number;
  questions: QuestionDetails[];
  responses: QuizResponseDetails[];

}

type QuestionId = number;

/**
 * [quiz]
 * Tue Jul 29 2025
 */
export interface Quiz {
  questionId: QuestionId;
  completed: QuestionId[];

}

/**
 * [get-quiz-response]
 * Tue Jul 29 2025
 */
export interface GetQuizResponse {
  id: number;
  topic: string;
  questions: QuestionDetails[];
  responses: QuizResponseDetails[];
}

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
  questions: number;
}

/**
 * [quiz-response-details]
 * Wed Jul 30 2025
 */
export interface QuizResponseDetails {
  question: string;
  choice: string;
  correct: boolean;
}

/**
 * [question-details]
 * Wed Jul 30 2025
 */
export interface QuestionDetails {
  id: number;
  question: string;
  answerId: number;
  topics: string[];
  options: QuestionOption[];
}

/**
 * [question-option]
 * Wed Jul 30 2025
 */
export interface QuestionOption {}
