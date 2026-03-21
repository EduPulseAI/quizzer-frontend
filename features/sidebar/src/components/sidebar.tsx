
import { PROJECT_NAME } from '@feature/base';
import { Sparkles } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ReactNode } from 'react';
import { APP_NAVIGATION } from '../lib/constants/navigation';
import type { NavigationItem } from '../lib/types';
import AccountMenu from './account-menu';
import ModalButtons from './modal-buttons';
import NavButton from './nav/nav-button';
import SidebarContent from './sidebar-content';
import SidebarPanel from './sidebar-panel';


interface Props {
  children?: ReactNode;
  items?: NavigationItem[]
}


export function Sidebar({ items = APP_NAVIGATION, children }: Props) {
  return (
    <aside className="">
      <SidebarContent>
        <div className='flex flex-col h-full w-16 shrink-0 items-center'>
          {/* logo */}
          <div className="relative mb-2 ">
            <NavButton panel={null} href={"/dashboard"}>
              <Sparkles className="h-5 w-5" />
            </NavButton>
            <div className="text-[9px] text-muted-foreground text-center mt-1 font-medium">{PROJECT_NAME}</div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-1 flex-col gap-1 items-center">
            {items !== null && items.map((item) => (
              <div key={item.name} className="relative mb-2">
                <NavButton panel={item.name} href={item.href}>
                  <DynamicIcon name={item.icon} className="h-5 w-5" />
                </NavButton>
                <div className="text-[9px] text-muted-foreground text-center mt-1 font-medium">{item.name}</div>
              </div>
            ))}
          </nav>

          <ModalButtons />
        </div>
        
        <SidebarPanel items={items}>
          {children}
        </SidebarPanel>
      </SidebarContent>
      <AccountMenu />
      {/* <UpgradeModal /> */}
    </aside>
  );
}

export default Sidebar;
