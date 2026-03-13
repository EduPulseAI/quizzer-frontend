'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function MonthHeader(props: Props) {
  return (
    <>
      MonthHeader
      {props.children}
    </>
  );
}

export default MonthHeader;
