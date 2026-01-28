'use client';

import type { AnswerChoice } from '@edupulse/quiz';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  submitAnswer,
  type SubmitAnswerResponse,
} from '../lib/actions/submit-answer-api';
import { ApiError } from '../lib/config/client';
import { useSessionStore } from '../stores/session-store';

export function useSubmitAnswer() {
  // const queryClient = useQueryClient();
  const {
    session,
    selectChoice,
    setIsSubmitting,
    setFeedback,
    incrementCorrectAnswers,
  } = useSessionStore();

  return useMutation({
    mutationFn: async (choice: AnswerChoice) => {
      if (!session) {
        throw new Error('No active session');
      }

      const { success, data, error } = await submitAnswer({ session, choice });

      if (!success || !data) {
        throw new ApiError(error);
      }

      return data;
    },

    onMutate: async (choice: AnswerChoice) => {
      // Optimistic update: immediately show selection
      selectChoice(choice);
      setIsSubmitting(true);
    },

    onSuccess: (data: SubmitAnswerResponse, choice: AnswerChoice) => {
      setIsSubmitting(false);
      setFeedback({
        isCorrect: data.isCorrect,
        explanation: data.explanation,
        attemptNumber: data.attemptNumber,
        correctAnswer: data.correctAnswer,
      });

      if (data.isCorrect) {
        incrementCorrectAnswers();
        // Invalidate next question query to trigger prefetch
        // queryClient.invalidateQueries({
        //   queryKey: ['nextQuestion', session?.id],
        // });
      }
    },

    onError: (error: Error, choice: AnswerChoice) => {
      setIsSubmitting(false);
      // Rollback: clear selection on error
      selectChoice(null);
      toast.error('Failed to submit answer', {
        description: error.message,
      });
    },
  });
}
