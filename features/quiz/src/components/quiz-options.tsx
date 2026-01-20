'use client';

import { useQuiz } from '../stores/use-quiz-context';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function QuizOptions(props: Props) {
  const { selected, question, selectChoice } = useQuiz();

  return (
    <div className="space-y-4">
      {question && question.options.map((option, index) => {
        let buttonClass =
          'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ';

        if (selected === null) {
          buttonClass +=
            'border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white';
        } else if (option.id === question.answerId) {
          buttonClass += 'border-green-500 bg-green-100 text-green-800';
        } else if (option.id === selected.optionId) {
          buttonClass += 'border-red-500 bg-red-100 text-red-800';
        } else {
          buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
        }

        return (
          <button
            key={option.id}
            onClick={() => selectChoice(option.id)}
            disabled={selected && (selected.correct || selected.optionId === option.id)}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option.value}</span>
              {selected && selected.correct && (
                <>
                  {option.id === question.answerId && (
                    <span className="ml-auto text-green-600">✓</span>
                  )}
                </>
              )}
              {selected && !selected.correct && (
                <>
                  {selected.optionId === option.id && (
                    <span className="ml-auto text-red-600">✗</span>
                  )}
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
