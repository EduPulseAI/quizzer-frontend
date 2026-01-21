'use client';

import { useQuery } from '@tanstack/react-query';
import { getNextQuestion } from '../lib/actions/get-next-question-api';
import { useSessionStore } from '../stores/session-store';
import { ApiError } from "../lib/config/client";

export function useNextQuestion() {
  const { session, feedback } = useSessionStore();

  const query = useQuery({
    queryKey: ['nextQuestion', session?.id, session?.currentQuestion.id],
    queryFn: async () => {
      if (!session) {
        throw new Error('No active session');
      }

      const { success, data, error } = await getNextQuestion(session);

      if (!success) {
        throw new ApiError(error);
      }

      return data;
    },
    enabled: !!session && !!feedback?.isCorrect,
    staleTime: 0,
    gcTime: 0,
  });

  // Update store when question is fetched
  // if (query.data && !query.isLoading) {
  //   setNextQuestion(query.data);
  // }

  return {
    nextQuestion: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
