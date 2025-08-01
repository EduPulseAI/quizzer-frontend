'use client';

import { ReactNode } from 'react';
import { useQuizQuestionStore } from '../lib/store/use-quiz-question-store';

interface Props {
  children?: ReactNode;
}

export function QuizOptions(props: Props) {
  const { selected, setAnswer, question, setShowNext } = useQuizQuestionStore();

  const handleAnswerSelect = (id: number) => {
    setAnswer(id);

    // make request

    setTimeout(() => {
      setShowNext(true)
    }, 2000)
  };

  
  return (
    <div className="space-y-4">
      {question !== null && question.options.map((option, index) => {
        let buttonClass =
          'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ';

        if (selected === null) {
          buttonClass +=
            'border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white';
        } else if (option.id === question.answerId) {
          buttonClass += 'border-green-500 bg-green-100 text-green-800';
        } else if (option.id === selected.choice) {
          buttonClass += 'border-red-500 bg-red-100 text-red-800';
        } else {
          buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
        }

        return (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            disabled={selected !== null}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option.value}</span>
              {selected !== null && (
                <>
                  {option.id === question.answerId && (
                    <span className="ml-auto text-green-600">✓</span>
                  )}

                  {selected.choice === option.id && !selected.correct && (
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
