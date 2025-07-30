import { getQuiz } from '@feature/quiz/lib/api/get-quiz';

import React from 'react';

interface Props {
  params: Promise<{ quizId: string }>;
}

export async function QuizPage({ params }: Props) {
  const id = parseInt((await params).quizId);
  const { isError, data, error } = await getQuiz(id);

  if (isError) {
    console.error(error);
  }

  // const { topic, questions } = data;
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div></div>
    </div>
  );
}

export default QuizPage;