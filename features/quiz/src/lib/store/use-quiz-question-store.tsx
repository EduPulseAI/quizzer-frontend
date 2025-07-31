'use client';

import { QUIZ_DEFAULT } from '../constants/index';
import { type PositionalQuestion, type QuestionDetails, Quiz } from '../types';
import { create } from 'zustand';

interface IQuizQuestionStore {
  quiz: Quiz;
  isLoading: boolean;
  setQuiz: (quizQuestion: Quiz) => void;
  // setQuestion: (question: PositionalQuestion) => void;
  setId: (questionId: number) => void;
  toggleLoading: () => void;
}

export const useQuizQuestionStore = create<IQuizQuestionStore>((set, get) => ({
  quiz: QUIZ_DEFAULT,
  isLoading: false,
  setQuiz: (quiz: Quiz) => set({ quiz }),
  // setQuestion: (question: PositionalQuestion) => set({ quiz: {...get().quiz, question } }),
  setId: (questionId: number) => set({ quiz: {...get().quiz, position: questionId }}),
  toggleLoading: () => set(({ isLoading }) => ({ isLoading: !isLoading })),
}));
