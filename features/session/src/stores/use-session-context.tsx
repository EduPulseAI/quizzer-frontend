'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import type { Session } from "../lib/types/session";
import type { AnswerChoice, Question } from "@edupulse/question/lib/types/question";
import { submitAnswer } from "../lib/actions/submit-answer-api";
import { getNextQuestion } from "../lib/actions/get-next-question-api";


type SessionContextProviderProps = {
  session: Session
  children: React.ReactNode;
};

type SessionContextType = {
  question: Question;
  choice: AnswerChoice | null;
  showNext: boolean;
  selectChoice(choice: AnswerChoice): void
  proceed(): void
};

const SessionContext = createContext<SessionContextType | null>(null);

export default function SessionContextProvider({
  children,
  session
}: SessionContextProviderProps) {
  const [question, setQuestion] = useState<Question>(session.currentQuestion)
  const [choice, setChoice] = useState<AnswerChoice | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [showNext, setShowNext] = useState(false)

  async function selectChoice(choice: AnswerChoice) {
    if (question === null) {
      throw new Error("No question set");
    }

    setChoice(choice);

    const { success, data, error } = await submitAnswer({
      session,
      answerId: choice.choiceId,
      startTime
    })

    if (success && data.isCorrect) {
      proceed();
    }

  }

  async function proceed() {
    const { success, data } = await getNextQuestion(session);
    if (success) {
      setQuestion(data);
      setChoice(null);
      setStartTime(Date.now());
    }
  }

  return (
    <SessionContext.Provider
      value={{
        question,
        choice,
        selectChoice,
        showNext,
        proceed
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (context === null) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }

  return context;
}
