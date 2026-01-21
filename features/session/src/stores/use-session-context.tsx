'use client';

/**
 * @deprecated This context is deprecated. Use useSessionStore from './session-store' instead.
 * This file is kept for backward compatibility and will be removed in a future version.
 */

import type { AnswerChoice, Question } from "@edupulse/question/lib/types/question";
import { createContext, useContext, useState } from 'react';
import { getNextQuestion } from "../lib/actions/get-next-question-api";
import { submitAnswer } from "../lib/actions/submit-answer-api";
import type { Session } from "../lib/types/session";


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
  session: initialSession
}: SessionContextProviderProps) {
  const [session, setSession] = useState<Session>(initialSession);
  const [nextQuestion, setNextQuestion] = useState<Question | null>(null);
  const [choice, setChoice] = useState<AnswerChoice | null>(null);

  async function handleNextQuestion() {
    const { success, data, error } = await getNextQuestion(session);
    if (success) {
      setNextQuestion(data);
    } else {
      console.log("SessionContextProvider#handleNextQuestion", error);
    }
  }

  async function selectChoice(choice: AnswerChoice) {
    if (session.currentQuestion === null) {
      throw new Error("No question set");
    }

    setChoice(choice);

    const { success, data } = await submitAnswer({ session, choice })

    if (success && data.isCorrect) {
      await handleNextQuestion();
    }

  }

  function proceed() {
    setSession(prevState => ({
      ...prevState,
      currentQuestion: nextQuestion
    }))
    setChoice(null);
    setNextQuestion(null);
  }

  return (
    <SessionContext.Provider
      value={{
        question: session.currentQuestion,
        choice,
        selectChoice,
        showNext: nextQuestion !== null,
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
