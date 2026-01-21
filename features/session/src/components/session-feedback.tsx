'use client';

import { Button } from '@feature/ui/components/button';
import { useSessionStore } from '../stores/session-store';
import { useNextQuestion } from '../hooks/use-next-question';

export function SessionFeedback() {
  const { feedback, currentQuestion, proceedToNext } = useSessionStore();
  const { nextQuestion, isLoading } = useNextQuestion();

  if (!feedback) {
    return null;
  }

  const canProceed = feedback.isCorrect && nextQuestion !== null;

  const handleProceed = () => {
    if (canProceed) {
      proceedToNext(nextQuestion);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div
        className={`p-4 rounded-xl border-l-4 ${
          feedback.isCorrect
            ? 'bg-green-50 border-green-500'
            : 'bg-red-50 border-red-500'
        }`}
      >
        <p className="text-sm">
          {feedback.isCorrect ? (
            <span className="text-green-700 font-medium">
              Correct! {currentQuestion?.explanation}
            </span>
          ) : (
            <span className="text-red-700 font-medium">
              Incorrect. Try again!
            </span>
          )}
        </p>
        {feedback.attemptNumber > 1 && (
          <p className="text-xs text-gray-500 mt-1">
            Attempt {feedback.attemptNumber}
          </p>
        )}
      </div>

      {feedback.isCorrect && (
        <div className="text-center">
          <Button
            disabled={!canProceed || isLoading}
            onClick={handleProceed}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Loading...
              </>
            ) : (
              <>
                Next Question
                <span className="ml-2">→</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default SessionFeedback;
