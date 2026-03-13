'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function DayHeader(props: Props) {
  return (
    <>
      DayHeader
      {props.children}
    </>
  );
}

export default DayHeader;
