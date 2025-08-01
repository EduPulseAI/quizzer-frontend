'use client';

import { type AnswerId, GetQuiz, type QuestionDetails, type QuizResponseDetails } from '../types/index';
import { useEffect, useState, createContext, useContext, type ReactNode } from 'react';

type QuizContextProviderProps = {
  data: GetQuiz;
  children: ReactNode;
};

type QuizContextType = {
  position: number;
  question: QuestionDetails | null;
  selected: QuizResponseDetails | null;
  showNext: boolean;
  selectChoice(answerId: AnswerId): void;
  proceed(): void;
};

const QuizContext = createContext<QuizContextType | null>(null);

export default function QuizContextProvider({
  data,
  children,
}: QuizContextProviderProps) {
  const [position, setPosition] = useState(1);
  const [completed, setCompleted] = useState<QuizResponseDetails[]>(data.responses);
  const [question, setQuestion] = useState<QuestionDetails>(data.questions[0].question);
  const [selected, setSelected] = useState<QuizResponseDetails | null>(null);
  const [showNext, setShowNext] = useState(false);

  function selectChoice(answerId: AnswerId) {
    const set = new Set(completed);
    const selected: QuizResponseDetails = {
      question: question.id,
      choice: answerId,
      correct: answerId === question.answerId,
    };
    set.add(selected);
    setSelected(selected);
    setCompleted(Array.from(set))

    setTimeout(() => setShowNext(true), 2000)
  }

  function proceed() {
    if (position < data.total) {
      setPosition(position + 1);
      setQuestion(null);
      setSelected(null);
      setShowNext(false);
    }
  }


  useEffect(() => {
    function loadQuestion() {
      const questionDetails = data.questions.find(
        (q) => q.position === position
      );
      if (questionDetails) {
        setQuestion(questionDetails.question);
      }
    }

    loadQuestion();

  }, [position, data.questions, data.total, setQuestion]);

  useEffect(() => {
    function loadAnswer() {
      if (selected === null) {
        const details = completed.find(
          (a) => a.question === question?.id
        );

        if (details) {
          setSelected(details);
          setShowNext(true);
        }
      }
    }

    loadAnswer();

  }, [completed, question?.id, selected]);



  return (
    <QuizContext.Provider
      value={{
        ...data,
        position,
        question,
        selected,
        showNext,
        selectChoice,
        proceed
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (context === null) {
    throw new Error('useQuiz must be used within a QuizContextProvider');
  }

  return context;
}
