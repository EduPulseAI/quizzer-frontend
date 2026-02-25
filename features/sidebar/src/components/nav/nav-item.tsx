'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function NavItem(props: Props) {
  return (
    <>
      NavItem
      {props.children}
    </>
  );
}

export default NavItem;
