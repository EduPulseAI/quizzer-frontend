'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function AppSidebar(props: Props) {
  return (
    <>
      AppSidebar
      {props.children}
    </>
  );
}

export default AppSidebar;
