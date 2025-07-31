import { QuizHeader } from '@feature/quiz/components/quiz-header';
import { QuizOptions } from '@feature/quiz/components/quiz-options';
import { getQuiz } from '@feature/quiz/lib/api/get-quiz';

import React from 'react';

interface Props {
  params: Promise<{ quizId: string }>;
}

export async function QuizPage({ params }: Props) {
  const quizId = parseInt((await params).quizId);
  const { isError, data, error } = await getQuiz({ quizId });

  if (isError) {
    console.error(error);
  }
  console.log("QuizPage", data);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <QuizHeader data={data} />
      <QuizOptions data={data} />
    </div>
  );
}

export default QuizPage;