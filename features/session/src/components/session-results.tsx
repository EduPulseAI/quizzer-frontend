'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function SessionResults(props: Props) {
  return (
    <>
      SessionResults
      {props.children}
    </>
  );
}

export default SessionResults;
