'use client';

import { create } from 'zustand';

export type Panel = string;

interface SidebarState {
  openPanel: Panel | null;
  pinnedPanel: Panel | null;
  showUpgradeModal: boolean;
  showAccountMenu: boolean;
}

interface SidebarActions {
  initializeSidebar: (panel: Panel) => void;
  changePanel: (panel: Panel) => void;
  togglePinned: (panel: Panel) => void;
  toggleAccountMenu: () => void;
  setShowAccountMenu: (show: boolean) => void;
  setShowUpgradeModal: (show: boolean) => void;
  closePanel: () => void;
  reset: () => void;
}

export type SidebarStore = SidebarState & SidebarActions;

const initialState: SidebarState = {
  openPanel: null,
  pinnedPanel: null,
  showUpgradeModal: false,
  showAccountMenu: false,
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  ...initialState,

  initializeSidebar: (panel: Panel) => {
    set({
      openPanel: panel,
    });
  },

  changePanel: (panel: Panel) => {
    set({ openPanel: panel });
  },

  closePanel: () => {
    if (!get().pinnedPanel) {
      set({ openPanel: null })
    }
  },

  togglePinned: (panel: Panel) => {
    if (panel === get().pinnedPanel) {
      set({ pinnedPanel: null, openPanel: null })
    } else {
      set({ pinnedPanel: panel, openPanel: panel })
    }
  },

  toggleAccountMenu: () => {
    set(({ showAccountMenu }) => ({ showAccountMenu: !showAccountMenu }))
  },

  setShowAccountMenu: (show: boolean) => {
    set({ showAccountMenu: show })
  },

  setShowUpgradeModal: (show: boolean) => {
    set({ showUpgradeModal: show })
  },

  reset: () => {
    set(initialState);
  },
}));
