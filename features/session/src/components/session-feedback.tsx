'use client';

import { ReactNode } from 'react';
import { useSession } from "../stores/use-session-context";
import { Button } from "@feature/ui/components/button"

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function SessionFeedback(props: Props) {
  const { choice, showNext, question, proceed } = useSession();

  const correctOption = question && question.choices.find(
    (o) => o.isCorrect
  );

  if (choice === null) {
    return null;
  }
  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 rounded-xl bg-gray-50 border-l-4 border-purple-500">
        <p className="text-sm text-gray-600">
          {choice && choice.isCorrect ? (
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
            Next Question
            <span className="ml-2">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default SessionFeedback;
