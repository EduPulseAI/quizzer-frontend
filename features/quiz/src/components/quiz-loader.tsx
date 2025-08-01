'use client';

import { useQuizQuestionStore } from '../lib/store/use-quiz-question-store';
import { GetQuiz } from '../lib/types/index';
import { ReactNode, useEffect } from 'react';

interface Props {
  data: GetQuiz;
  children: ReactNode;
}

export function QuizLoader({ data, children }: Props) {
  const { position, setQuestion, completed, setCompleted } = useQuizQuestionStore();

  useEffect(() => {
    function loadCompleted() {
      if (completed.length < data.responses.length) {
        setCompleted(data.responses)
      }
    }

    loadCompleted();

  }, [completed.length, data.responses, setCompleted]);

  useEffect(() => {
    function loadQuestion() {
      const questionDetails = data.questions.find(
        (q) => q.position === position
      );
      if (questionDetails) {
        setQuestion(questionDetails.question);
      }
    }

    loadQuestion();

  }, [position, data.questions, data.total, setQuestion]);
  
  return children;
}
