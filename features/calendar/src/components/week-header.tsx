'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function WeekHeader(props: Props) {
  return (
    <>
      WeekHeader
      {props.children}
    </>
  );
}

export default WeekHeader;
