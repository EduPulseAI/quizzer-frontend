'use client';

import { create } from 'zustand';
import type { AnswerChoice, Question } from '@edupulse/quiz';
import type { Session, SessionProgress, AnswerFeedback } from '../lib/types/session';

export interface SessionState {
  session: Session | null;
  currentQuestion: Question | null;
  selectedChoice: AnswerChoice | null;
  isSubmitting: boolean;
  feedback: AnswerFeedback | null;
  progress: SessionProgress;
  questionStartTime: number | null;
}

export interface SessionActions {
  initializeSession: (session: Session) => void;
  selectChoice: (choice: AnswerChoice) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setFeedback: (feedback: AnswerFeedback | null) => void;
  proceedToNext: (nextQuestion: Question) => void;
  incrementCorrectAnswers: () => void;
  getDwellTime: () => number;
  reset: () => void;
}

export type SessionStore = SessionState & SessionActions;

const initialProgress: SessionProgress = {
  currentIndex: 0,
  totalQuestions: 10,
  correctAnswers: 0,
};

const initialState: SessionState = {
  session: null,
  currentQuestion: null,
  selectedChoice: null,
  isSubmitting: false,
  feedback: null,
  progress: initialProgress,
  questionStartTime: null,
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  ...initialState,

  initializeSession: (session: Session) => {
    set({
      session,
      currentQuestion: session.currentQuestion,
      questionStartTime: Date.now(),
      selectedChoice: null,
      feedback: null,
      progress: {
        ...initialProgress,
        currentIndex: 1,
      },
    });
  },

  selectChoice: (choice: AnswerChoice) => {
    set({ selectedChoice: choice });
  },

  setIsSubmitting: (isSubmitting: boolean) => {
    set({ isSubmitting });
  },

  setFeedback: (feedback: AnswerFeedback | null) => {
    set({ feedback });
  },

  proceedToNext: (nextQuestion: Question) => {
    const { session, progress } = get();

    if (!nextQuestion || !session) return;

    set({
      currentQuestion: nextQuestion,
      session: {
        ...session,
        currentQuestion: nextQuestion,
      },
      selectedChoice: null,
      feedback: null,
      questionStartTime: Date.now(),
      progress: {
        ...progress,
        currentIndex: progress.currentIndex + 1,
      },
    });
  },

  incrementCorrectAnswers: () => {
    const { progress } = get();
    set({
      progress: {
        ...progress,
        correctAnswers: progress.correctAnswers + 1,
      },
    });
  },

  getDwellTime: () => {
    const { questionStartTime } = get();
    if (questionStartTime === null) return 0;
    return Date.now() - questionStartTime;
  },

  reset: () => {
    set(initialState);
  },
}));
