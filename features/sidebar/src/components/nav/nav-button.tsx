'use client';

import { Panel, useSidebarStore } from '@edupulse/sidebar/stores/sidebar-store';
import { Button } from "@feature/ui/components/button";
import { ReactNode } from 'react';
import Link from "next/link"

interface Props {
  panel: Panel;
  href: string;
  children: ReactNode
}

export function NavButton(props: Props) {
  const { openPanel, changePanel } = useSidebarStore();
  return (
    <Link href={props.href}>
      <Button
        variant="ghost"
        onMouseEnter={() => changePanel(props.panel)}
        className={`cursor-pointer h-10 w-10 shrink-0 mx-auto transition-colors ${openPanel === props.panel
          ? "text-foreground bg-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
      >
        {props.children}
      </Button>
    </Link>
  );
}

export default NavButton;
