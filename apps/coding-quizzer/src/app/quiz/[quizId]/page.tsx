import { QuizHeader } from '@feature/quiz/components/quiz-header';
import { QuizOptionFeedback } from '@feature/quiz/components/quiz-option-feedback';
import { QuizOptions } from '@feature/quiz/components/quiz-options';
import { QuizResults } from '@feature/quiz/components/quiz-results';
import { getQuiz } from '@feature/quiz/lib/api/get-quiz';
import QuizContextProvider from '@feature/quiz/stores/use-quiz-context';

import React from 'react';

interface Props {
  params: Promise<{ quizId: string }>;
}

async function QuizPage({ params }: Props) {
  const quizId = parseInt((await params).quizId);
  const { isError, data, error } = await getQuiz({ quizId });

  if (isError) {
    console.error(error);
  }

  const { total, topic, showResult } = data;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {showResult ? (
        <QuizResults data={data} />
      ) : (
        <QuizContextProvider quiz={data}>
          <QuizHeader total={total} topic={topic} />
          <QuizOptions />
          <QuizOptionFeedback total={total} />
        </QuizContextProvider>
      )}
    </div>
  );
}

export default QuizPage;