'use client';

import { Button } from '@feature/ui/components/button';
import { useNextQuestion } from '../hooks/use-next-question';
import { useSessionStore } from '../stores/session-store';

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
            ? 'bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
            : 'bg-red-500/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
        }`}
      >
        <p className="text-sm">
          {feedback.isCorrect ? (
            <span className="text-green-400 font-medium">
              Correct! {currentQuestion?.explanation}
            </span>
          ) : (
            <span className="text-red-400 font-medium">
              Incorrect. Try again!
            </span>
          )}
        </p>
        {feedback.attemptNumber > 1 && (
          <p className="text-xs text-slate-500 mt-1">
            Attempt {feedback.attemptNumber}
          </p>
        )}
      </div>

      {feedback.isCorrect && (
        <div className="text-center">
          <Button
            disabled={!canProceed || isLoading}
            onClick={handleProceed}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-10 py-4 text-lg rounded-xl border-[3px] border-blue-400/50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
