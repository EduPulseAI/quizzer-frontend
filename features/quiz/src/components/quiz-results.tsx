'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function QuizResults(props: Props) {
  return (
    <>
      QuizResults
      {props.children}
    </>
  );
}
