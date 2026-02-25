'use client';

import { ReactNode } from 'react';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function UpgradeModal(props: Props) {
  return (
    <>
      UpgradeModal
      {props.children}
    </>
  );
}

export default UpgradeModal;
