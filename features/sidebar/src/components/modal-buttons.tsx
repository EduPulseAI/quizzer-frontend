'use client';

import { Button } from "@feature/ui/components/button";
import {
  ArrowUpFromDot,
} from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useSidebarStore } from '../stores/sidebar-store';

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function ModalButtons(props: Props) {
  const { toggleAccountMenu, setShowUpgradeModal } = useSidebarStore();

  return (
    <div className="flex flex-col gap-1 pt-4 items-center">
      <Button
        variant="ghost"
        onClick={toggleAccountMenu}
        className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent p-0"
      >
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-visible ring-2 ring-primary/60">
          <div className="h-9 w-9 rounded-full overflow-hidden">
            <Image
              src="/placeholder-user.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 text-[7px] font-bold bg-primary text-primary-foreground px-1 py-0.5 rounded">
            pro
          </span>
        </div>
      </Button>
      <div className="text-[9px] text-muted-foreground text-center font-medium">Account</div>
      <Button
        variant="ghost"
        onClick={() => setShowUpgradeModal(true)}
        className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <ArrowUpFromDot className="h-5 w-5 shrink-0" />
      </Button>
      <div className="text-[9px] text-muted-foreground text-center font-medium">Upgrade</div>
    </div>
  );
}

export default ModalButtons;
