'use client';

import { useSessionStore } from '../stores/session-store';
import { useSubmitAnswer } from '../hooks/use-submit-answer';

export function SessionQuestion() {
  const { currentQuestion, selectedChoice, isSubmitting, feedback } = useSessionStore();
  const submitAnswer = useSubmitAnswer();


  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  const hasAnswered = selectedChoice !== null;
  const isCorrectAnswer = feedback?.isCorrect ?? false;

  return (
    <div className="space-y-4">
      {currentQuestion.choices.map((option, index) => {
        let buttonClass =
          'w-full p-4 text-left rounded-xl border-2 border-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform ';

        const isSelected = selectedChoice?.choiceId === option.choiceId;

        if (!hasAnswered) {
          // No answer selected yet
          buttonClass +=
            'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:scale-[1.02]';
        } else if (isSelected && option.isCorrect) {
          // Selected the correct answer
          buttonClass += 'border-green-500 bg-green-100 text-green-800';
        } else if (isSelected && !option.isCorrect) {
          // Selected wrong answer
          buttonClass += 'border-red-500 bg-red-100 text-red-800';
        } else if (option.isCorrect && isCorrectAnswer) {
          // Show correct answer after correct selection
          buttonClass += 'border-green-300 bg-green-50 text-green-700';
        } else {
          // Other options after answering
          buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
        }

        // Disable if loading or already answered correctly
        const isDisabled = isSubmitting || (hasAnswered && (isCorrectAnswer || isSelected));

        return (
          <button
            key={option.choiceId}
            onClick={() => submitAnswer.mutate(option)}
            disabled={isDisabled}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium shrink-0">
                {isSubmitting && isSelected ? (
                  <span className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="text-lg">{option.value}</span>
              {hasAnswered && isSelected && option.isCorrect && (
                <span className="ml-auto text-green-600">✓</span>
              )}
              {hasAnswered && isSelected && !option.isCorrect && (
                <span className="ml-auto text-red-600">✗</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default SessionQuestion;
