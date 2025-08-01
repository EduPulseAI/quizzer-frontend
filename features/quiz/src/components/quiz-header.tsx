'use client';

import React, { useEffect, useState } from 'react';
import { useQuizQuestionStore } from '../lib/store/use-quiz-question-store';

interface Props {
  total: number;
  topic: string;
}

export function QuizHeader({ total, topic }: Props) {
  const { position, question } = useQuizQuestionStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      if (position >= total) {
        setProgress(100)
      } else if (position <= 1) {
        setProgress(0)
      } else {
        setProgress(Math.floor(((position - 1) / total) * 100));
      }
    }

    updateProgress();
  }, [position, total]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {topic}
        </span>
        <span className="text-sm text-gray-500">
          Question {position} of {total}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
        {question !== null ? question.question : ''}
      </h2>
    </div>
  );
}
