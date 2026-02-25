'use client';

import { Button } from '@feature/ui/components/button';
import { LayoutGrid, Pin, Plus } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';
import { APP_NAVIGATION } from '../server';
import { useSidebarStore } from '../stores/sidebar-store';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function SidebarPanel(props: Props) {
  const { openPanel, pinnedPanel, togglePinned } = useSidebarStore();

  const nodes = useMemo(() => {
    if (openPanel) {
      const item = APP_NAVIGATION.find(nav => nav.name === openPanel);
      return item !== undefined ? item.nodes : [];
    } else {
      return [];
    }
  }, [openPanel])

  return (
    <div className={`${!openPanel && "hidden"} w-[216px] bg-background border-r border-border `}>
      <div className="flex flex-col h-full animate-in fade-in duration-300">
        <div className="flex items-center justify-between px-3 py-2.5">
          <h2 className="text-sm font-semibold">{openPanel}</h2>
          <Button
            variant="ghost"
            size="icon"
            className={`h-6 w-6 transition-colors ${pinnedPanel ? "text-primary" : ""}`}
            onClick={() => togglePinned(openPanel)}
          >
            <Pin
              className={`h-3.5 w-3.5 transition-transform ${pinnedPanel ? "rotate-45" : ""}`}
            />
          </Button>
        </div>
        <div className="p-1.5">
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[13px] hover:bg-accent rounded transition-colors">
            <LayoutGrid className="h-4 w-4 shrink-0" />
            <span className="font-normal">Templates</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[13px] hover:bg-accent rounded transition-colors">
            <Plus className="h-4 w-4 shrink-0" />
            <span className="font-normal">Create new Space</span>
          </button>
        </div>
        {nodes && nodes.map(node => (
          <Link href={node.href}>
            <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[13px] hover:bg-accent rounded transition-colors">
              <node.icon className="h-4 w-4 shrink-0" />
              <span className="font-normal">{node.name}</span>
            </button>
          </Link>
        ))}
        {props.children}
      </div>
    </div>
  );
}

export default SidebarPanel;
