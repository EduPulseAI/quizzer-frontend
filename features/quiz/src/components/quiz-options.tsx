'use client';

import { useQuizQuestionStore } from '@feature/quiz/lib/store/use-quiz-question-store';
import type { GetQuiz, QuestionOption } from '@feature/quiz/lib/types';
import { ReactNode, useState } from 'react';

interface Props {
  data: GetQuiz;
  children?: ReactNode;
}

export function QuizOptions({ data }: Props) {
  const store = useQuizQuestionStore();
  const [options, setOptions] = useState<QuestionOption[]>([]);
  return (
    <div className="space-y-4">
      {question.options.map((option, index) => {
        let buttonClass =
          'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ';

        if (selectedAnswer === null) {
          buttonClass +=
            'border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white';
        } else if (index === question.correct) {
          buttonClass += 'border-green-500 bg-green-100 text-green-800';
        } else if (index === selectedAnswer) {
          buttonClass += 'border-red-500 bg-red-100 text-red-800';
        } else {
          buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
        }

        return (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option}</span>
              {selectedAnswer !== null && index === question.correct && (
                <span className="ml-auto text-green-600">✓</span>
              )}
              {selectedAnswer === index && index !== question.correct && (
                <span className="ml-auto text-red-600">✗</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
