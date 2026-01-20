'use client';

import { ReactNode } from 'react';
import { useSession } from "../stores/use-session-context";

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function SessionOptions(props: Props) {
  const { question, choice, selectChoice } = useSession();

  return (
    <div className="space-y-4">
      {question && question.choices.map((option, index) => {
        let buttonClass =
          'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ';

        if (choice === null) {
          buttonClass +=
            'border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white';
        } else if (choice.isCorrect && (option.choiceId === choice.choiceId)) {
          buttonClass += 'border-green-500 bg-green-100 text-green-800';
        } else if (option.choiceId === choice.choiceId) {
          buttonClass += 'border-red-500 bg-red-100 text-red-800';
        } else {
          buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
        }

        return (
          <button
            key={option.choiceId}
            onClick={() => selectChoice(option)}
            disabled={choice !== null && (choice.isCorrect || choice.choiceId === option.choiceId)}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option.value}</span>
              {choice && choice.isCorrect && (
                <>
                  {option.isCorrect && (
                    <span className="ml-auto text-green-600">✓</span>
                  )}
                </>
              )}
              {choice && !choice.isCorrect && (
                <>
                  {choice.choiceId === option.choiceId && (
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

export default SessionOptions;
