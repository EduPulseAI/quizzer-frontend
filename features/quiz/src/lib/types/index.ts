/**
 * [get-quiz]
 * Tue Jul 29 2025
 */
export interface GetQuiz {
  id: number;
  topic: string;
  total: number;
  showResult: boolean;
  questions: PositionalQuestion[];
  responses: QuizResponseDetails[];
}

export type AnswerId = QuestionDetails["answerId"];

/**
 * [quiz]
 * Tue Jul 29 2025
 */
export interface Quiz {
  // position: number;
  // completed: AnswerId[];
}

/**
 * [get-quiz-response]
 * Tue Jul 29 2025
 */
export interface GetQuizResponse {
  id: number;
  topic: string;
  questions: PositionalQuestion[];
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
  question: number;
  choice: number;
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
export interface QuestionOption {
  id: number;
  value: string;
}

/**
 * [positional]
 * Thu Jul 31 2025
 */
export interface PositionalQuestion {
  question: QuestionDetails
  position: number;
}
