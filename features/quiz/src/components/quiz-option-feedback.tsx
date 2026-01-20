'use client';

import { useQuiz } from '../stores/use-quiz-context';
import { Button } from '@feature/ui/components/button';
import { ReactNode } from 'react';

interface Props {
  total: number;
  children?: ReactNode;
}

export function QuizOptionFeedback({ total }: Props) {
  const { selected, proceed, showNext, question, position } = useQuiz();

  const correctOption = question && question.options.find(
    (o) => o.id === question.answerId
  );

  if (selected === null) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 rounded-xl bg-gray-50 border-l-4 border-purple-500">
        <p className="text-sm text-gray-600">
          {selected && selected.correct ? (
            <span className="text-green-600 font-medium">
              <span role="img" aria-label={'correct'}>
                🎉
              </span>
              {' '}Correct! Well done!
            </span>
          ) : (
            <span className="text-red-600 font-medium">
              <span role="img" aria-label={'incorrect'}>
                ❌
              </span>
              {' '}Incorrect. The correct answer is:{' '}
              <strong>{correctOption && correctOption.value}</strong>
            </span>
          )}
        </p>
      </div>

      {showNext && (
        <div className="text-center">
          <Button
            onClick={proceed}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {position < total ? 'Next Question' : 'View Results'}
            <span className="ml-2">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}
