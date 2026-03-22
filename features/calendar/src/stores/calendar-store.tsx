'use client';

import { create } from 'zustand';
import type { CalendarEvent, CalendarView } from '../lib/types';

export type { CalendarView };

interface CalendarState {
  events: CalendarEvent[]; // populated from API — empty by default
  currentDate: Date;
  view: CalendarView;
}

interface CalendarActions {
  setView: (view: CalendarView) => void;
  setCurrentDate: (date: Date) => void;
  navigateForward: () => void;
  navigateBack: () => void;
  navigateToday: () => void;
}

export type CalendarStore = CalendarState & CalendarActions;

const initialState: CalendarState = {
  events: [],
  currentDate: new Date(),
  view: 'month',
};

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  ...initialState,

  setView: (view) => set({ view }),

  setCurrentDate: (date) => set({ currentDate: new Date(date) }),

  navigateForward: () => {
    const d = new Date(get().currentDate);
    if (get().view === "month") d.setMonth(d.getMonth() + 1);
    else if (get().view === "week") d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    set({ currentDate: d });
  },

  navigateBack: () => {
    const d = new Date(get().currentDate);
    if (get().view === "month") d.setMonth(d.getMonth() - 1);
    else if (get().view === "week") d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    set({ currentDate: d });
  },

  navigateToday: () => set({ currentDate: new Date() }),
}));
