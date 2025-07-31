'use client';

import { QUIZ_DEFAULT } from '../constants/index';
import { Quiz } from '../types';
import { create } from 'zustand';

interface IQuizQuestionStore {
  quiz: Quiz;
  isLoading: boolean;
  setQuizQuestion: (quizQuestion: Quiz) => void;
  setId: (questionId: number) => void;
  toggleLoading: () => void;
}

export const useQuizQuestionStore = create<IQuizQuestionStore>((set, get) => ({
  quiz: QUIZ_DEFAULT,
  isLoading: false,
  setQuizQuestion: (quiz: Quiz) => set({ quiz }),
  setId: (questionId: number) => set({ quiz: {...get().quiz, position: questionId }}),
  toggleLoading: () => set(({ isLoading }) => ({ isLoading: !isLoading })),
}));
