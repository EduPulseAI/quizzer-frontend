'use client';

import { ReactNode } from 'react';
import { useSidebarStore } from '../stores/sidebar-store';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function SidebarContent(props: Props) {
  const { openPanel, closePanel } = useSidebarStore();
  return (
    <aside
      className={`relative flex border-r border-border bg-background py-4 transition-all duration-300 ease-in-out z-50 h-full ${
        openPanel ? "w-[280px]" : "w-16"
      }`}
      onMouseLeave={closePanel}
    >
      {props.children}
    </aside>
  );
}

export default SidebarContent;
