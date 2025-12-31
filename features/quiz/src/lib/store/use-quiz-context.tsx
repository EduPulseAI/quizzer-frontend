'use client';

import { useRouter } from 'next/navigation';
import { createContext, type ReactNode, useContext, useEffect, useState, } from 'react';
import { type AnswerId, GetQuiz, type QuestionDetails, type QuizResponseDetails, } from '../types';
import { toast } from 'sonner';
import { submitAnswer } from "@feature/ingest";


type QuizContextProviderProps = {
  quiz: GetQuiz;
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
  quiz,
  children,
}: QuizContextProviderProps) {
  const [position, setPosition] = useState(1);
  const [completed, setCompleted] = useState<QuizResponseDetails[]>(quiz.responses);
  const [question, setQuestion] = useState<QuestionDetails | null>(quiz.questions[0].question);
  const [selected, setSelected] = useState<QuizResponseDetails | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [startTime, setStartTime] = useState(Date.now())

  const router = useRouter()

  async function selectChoice(answerId: AnswerId) {
    if (question === null) {
      throw new Error("No question set");
    }

    const selected: QuizResponseDetails = {
      question: question.id,
      choice: question.options.find((o) => o.id === answerId)?.value || "",
      option: answerId,
      correct: answerId === question.answerId,
    };

    setSelected(selected);


    const { success, message, data: answer } = await submitAnswer({
      sessionId: String(quiz.id),
      studentId: "anonymous",
      questionId: String(selected.question),
      answerId: String(selected.option),
      timeSpentMs: Date.now() - startTime,
      skillTag: quiz.topic
    })

    if (success && answer.isCorrect) {
      const set = new Set(completed);
      set.add(selected);
      setCompleted(Array.from(set))
      setTimeout(() => setShowNext(true), 2000)
    } else {
      toast.info(message);
    }

  }

  function proceed() {
    if (position < quiz.total) {
      setPosition(position + 1);
      setQuestion(null);
      setSelected(null);
      setShowNext(false);
      setStartTime(Date.now());
    } else {
      router.refresh();
    }
  }


  useEffect(() => {
    function loadQuestion() {
      const questionDetails = quiz.questions.find(
        (q) => q.position === position
      );
      if (questionDetails) {
        setQuestion(questionDetails.question);
      }
    }

    loadQuestion();

  }, [position, quiz.questions, quiz.total, setQuestion]);

  useEffect(() => {
    function loadAnswer() {
      if (selected === null) {
        const previousAnswer = completed.find(
          (a) => a.question === question?.id
        );
        if (previousAnswer) {
          setSelected(previousAnswer);
          setShowNext(true);
        }
      }
    }

    loadAnswer();

  }, [completed, question?.id, selected]);



  return (
    <QuizContext.Provider
      value={{
        ...quiz,
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
