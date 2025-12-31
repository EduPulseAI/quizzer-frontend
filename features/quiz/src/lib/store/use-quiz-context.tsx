'use client';

import { ErrorComponent } from '@feature/ui/components/error-component';
import { useRouter } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { submitQuizChoice } from '../api/submit-quiz-choice';
import {
  type AnswerId,
  GetQuiz,
  type QuestionDetails,
  type QuizResponseDetails,
} from '../types';
import { toast } from 'sonner';
import { submitAnswer } from "@feature/ingest";


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
  const [question, setQuestion] = useState<QuestionDetails | null>(data.questions[0].question);
  const [selected, setSelected] = useState<QuizResponseDetails | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [startTime, setStartTime] = useState(Date.now())

  const router = useRouter()

  async function selectChoice(answerId: AnswerId) {
    const set = new Set(completed);
    const selected: QuizResponseDetails = {
      question: question !==  null ? question.id : -1,
      choice: '',
      option: answerId,
      correct: answerId === question?.answerId,
    };

    set.add(selected);
    setCompleted(Array.from(set))
    setSelected(selected);

    const { isError, error, data: quizChoice } = await submitQuizChoice({ quizId: data.id, selected });

    if (isError) {
      toast.error(error.message)
      return;
    }

    const timeSpentMs = Date.now() - startTime;

    await submitAnswer({
      sessionId: String(data.id),
      studentId: "anonymous",
      questionId: String(selected.question),
      answer: (question.options.find(
        (o) => o.id === selected.option
      ).value),
      timeSpentMs
    })

    setShowNext(true)
    // setTimeout(() => setShowNext(true), 2000)
  }

  function proceed() {
    if (position < data.total) {
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
