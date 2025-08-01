'use client';

import { create } from 'zustand';
import { type AnswerId, type QuestionDetails, type QuizResponseDetails } from '../types';

interface IQuizQuestionStore {
  position: number;
  selected: QuizResponseDetails | null;
  question: QuestionDetails | null;
  completed: QuizResponseDetails[];
  showNext: boolean;
  setAnswer: (answerId: AnswerId) => void;
  setQuestion: (question: QuestionDetails) => void;
  setCompleted: (completed: QuizResponseDetails[]) => void;
}

export const useQuizQuestionStore = create<IQuizQuestionStore>((set, get) => ({
  completed: [],
  position: 1,
  selected: null,
  question: null,
  showNext: false,
  setAnswer: (answerId: AnswerId) => set(({ completed, question }) => {
    const set = new Set(completed);
    const selected: QuizResponseDetails = {
      question: question.id,
      choice: answerId,
      correct: answerId === question.id,
    };
    set.add(selected);
    return { selected, completed: Array.from(set) }
  }),
  setQuestion: (question: QuestionDetails) => set({ question }),
  setCompleted: (completed: QuizResponseDetails[]) => set({ completed: completed ?? [] }),

}));
