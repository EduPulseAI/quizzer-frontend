import type { Difficulty, Question } from "@edupulse/question/lib/types/question";

export type SessionStatus = "STARTED" | "NAVIGATION" | "DWELL" | "PAUSED" | "RESUMED" | "COMPLETED"

/**
 * [session]
 * next-feature@0.1.1-beta.5
 * January 11th 2026, 5:19:42 am
 */
export interface Session {
  id: string;
  studentId: string;
  currentQuestion: Question,
  currentDifficulty: Difficulty,
  status: SessionStatus
}

export interface SessionProgress {
  currentIndex: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface AnswerFeedback {
  isCorrect: boolean;
  explanation: string;
  attemptNumber: number;
  correctAnswer?: string;
}
