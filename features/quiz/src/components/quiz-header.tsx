'use client';

import { useQuizQuestionStore } from '../lib/store/use-quiz-question-store';
import React, { useEffect, useState } from 'react';
import { GetQuiz } from '../lib/types/index';

interface Props {
  data: GetQuiz;
}

export function QuizHeader({ data }: Props) {
  const { topic, total, questions } = data;
  const quiz = useQuizQuestionStore(state => state.quiz)

  const setId = useQuizQuestionStore(state => state.setId)
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (!quiz.questionId) {
      setId(questions[0].id);
    }
  }, [questions, quiz.questionId, setId]);

  useEffect(() => {
    function loadQuestion() {
      const questionDetails = questions.find(q => q.id === quiz.questionId);
      if (questionDetails) {
        setQuestion(questionDetails.question);
      }
    }

    loadQuestion();

  }, [quiz, questions]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {topic}
        </span>
        <span className="text-sm text-gray-500">
          Question {quiz.completed.length + 1} of {total}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.floor((quiz.completed.length / total) * 100)}%` }}
        ></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
        {question}
      </h2>
    </div>
  );
}
