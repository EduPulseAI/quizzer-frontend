'use client';

import { useQuizQuestionStore } from '../lib/store/use-quiz-question-store';
import { GetQuiz, QuestionDetails } from '../lib/types/index';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  data: GetQuiz;
  children?: ReactNode;
}

export function QuizOptions({ data }: Props) {
  const quiz = useQuizQuestionStore(state => state.quiz);
  const [question, setQuestion] = useState<QuestionDetails>();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (id: number) => {
    setSelectedAnswer(id);
  };

  console.log({ data, quiz });
  useEffect(() => {
    function loadQuestion() {
      if (quiz && quiz.position) {
        setQuestion(data.questions[quiz.position]);
      }
    }
    loadQuestion();
  }, [data.questions, quiz]);
  
  return (
    <div className="space-y-4">
      {question.options.map((option, index) => {
        let buttonClass =
          'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ';

        if (selectedAnswer === null) {
          buttonClass +=
            'border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white';
        } else if (option.id === question.answerId) {
          buttonClass += 'border-green-500 bg-green-100 text-green-800';
        } else if (index === selectedAnswer) {
          buttonClass += 'border-red-500 bg-red-100 text-red-800';
        } else {
          buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
        }

        return (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            disabled={selectedAnswer !== null}
            className={buttonClass}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg">{option.value}</span>
              {selectedAnswer !== null && option.id === question.answerId && (
                <span className="ml-auto text-green-600">✓</span>
              )}
              {selectedAnswer === option.id && index !== question.answerId && (
                <span className="ml-auto text-red-600">✗</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
