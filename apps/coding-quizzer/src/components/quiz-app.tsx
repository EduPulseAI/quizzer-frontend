'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function QuizApp(props: Props) {
  return (
    <>
      QuizApp
      {props.children}
    </>
  );
}
