'use client';

import { Button } from '@feature/ui/components/button';
import { useQuizQuestionStore } from '../lib/store/use-quiz-question-store';
import { ReactNode } from 'react';

interface Props {
  totalQuestions: number;
  children?: ReactNode;
}

export function QuizOptionFeedback({ totalQuestions }: Props) {
  const { selected, question, position, showNext } = useQuizQuestionStore();

  if (selected === null) {
    return null;
  }
  const correctOption = question.options.find(
    (o) => o.id === question.answerId
  );

  const proceedToNext = () => {

  };
  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 rounded-xl bg-gray-50 border-l-4 border-purple-500">
        <p className="text-sm text-gray-600">
          {selected === question.answerId ? (
            <span className="text-green-600 font-medium">
              <span role="img" aria-label={'correct'}>
                🎉
              </span>
              Correct! Well done!
            </span>
          ) : (
            <span className="text-red-600 font-medium">
              <span role="img" aria-label={'incorrect'}>
                ❌
              </span>
              Incorrect. The correct answer is:{' '}
              <strong>{correctOption && correctOption.value}</strong>
            </span>
          )}
        </p>
      </div>

      {showNext && (
        <div className="text-center">
          <Button
            onClick={proceedToNext}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {position < totalQuestions ? 'Next Question' : 'View Results'}
            <span className="ml-2">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}
