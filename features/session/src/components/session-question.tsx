'use client';

import { useSubmitAnswer } from '../hooks/use-submit-answer';
import { useSessionStore } from '../stores/session-store';

export function SessionQuestion() {
  const { currentQuestion, selectedChoice, isSubmitting, feedback } =
    useSessionStore();
  const submitAnswer = useSubmitAnswer();

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  const hasAnswered = selectedChoice !== null;
  const isCorrectAnswer = feedback?.isCorrect ?? false;

  return (
    <div className="space-y-4">
      {currentQuestion.choices.map((option, index) => {
        const isSelected = selectedChoice?.choiceId === option.choiceId;

        let buttonClass =
          'w-full p-4 text-left rounded-xl border-[3px] transition-all duration-300 transform ';

        if (isSelected && option.isCorrect) {
          // Selected the correct answer - green with thick border
          buttonClass +=
            'border-green-500 bg-green-500/20 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
        } else if (isSelected && !option.isCorrect) {
          // Selected wrong answer - red with thick border (but can try again)
          buttonClass +=
            'border-red-500 bg-red-500/20 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
        } else {
          // Default state - blue gradient (available to select)
          buttonClass +=
            'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50 text-slate-100 hover:border-blue-400 hover:from-blue-600/30 hover:to-cyan-600/30 hover:scale-[1.02]';
        }

        // Only disable if submitting, already selected this option, or answered correctly
        const isDisabled = isSubmitting || isSelected || isCorrectAnswer;

        return (
          <button
            key={option.choiceId}
            onClick={() => submitAnswer.mutate(option)}
            disabled={isDisabled}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                  isSubmitting && isSelected
                    ? 'bg-blue-500/40'
                    : isSelected && option.isCorrect
                    ? 'bg-green-500/30 text-green-300'
                    : isSelected && !option.isCorrect
                    ? 'bg-red-500/30 text-red-300'
                    : 'bg-blue-500/30 text-blue-200'
                }`}
              >
                {isSubmitting && isSelected ? (
                  <span className="animate-spin h-5 w-5 border-[3px] border-white/30 border-t-white rounded-full" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="text-lg">{option.value}</span>
              {isSubmitting && isSelected && (
                <span className="ml-auto">
                  <span className="animate-pulse text-blue-400 text-sm">
                    Submitting...
                  </span>
                </span>
              )}
              {!isSubmitting &&
                hasAnswered &&
                isSelected &&
                option.isCorrect && (
                  <span className="ml-auto text-green-400 text-xl">✓</span>
                )}
              {!isSubmitting &&
                hasAnswered &&
                isSelected &&
                !option.isCorrect && (
                  <span className="ml-auto text-red-400 text-xl">✗</span>
                )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default SessionQuestion;
