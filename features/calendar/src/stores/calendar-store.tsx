'use client';

import { create } from 'zustand';

export type CalendarView = "month" | "week" | "day"


interface CalendarState {
  calendar: CalendarView | null;
  currentDate: Date;
  view: CalendarView;
}

interface CalendarActions {
  initializeCalendar: (calendar: CalendarView) => void;
  setView: (view: CalendarView) => void;
  navigateForward: () => void;
  navigateBack: () => void;
  navigateToday: () => void;
  reset: () => void;
}

export type CalendarStore = CalendarState & CalendarActions;

const initialState: CalendarState = {
  calendar: null,
  currentDate: new Date(),
  view: 'month'
};

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  ...initialState,

  initializeCalendar: (calendar: CalendarView) => {
    set({
      calendar,
    });
  },

  setView: (view: CalendarView) => {
    set({ view });
  },

  navigateForward: () => {
    const d = new Date(get().currentDate);
    if (get().view === "month") d.setMonth(d.getMonth() + 1)
    else if (get().view === "week") d.setDate(d.getDate() + 7)
    else d.setDate(d.getDate() + 1)
    set({ currentDate: d });
  },

  navigateBack: () => {
    const d = new Date(get().currentDate);
    if (get().view === "month") d.setMonth(d.getMonth() - 1)
    else if (get().view === "week") d.setDate(d.getDate() - 7)
    else d.setDate(d.getDate() - 1)
    set({ currentDate: d });
  },

  navigateToday: () => {
    set({ currentDate: new Date() });
  },

  reset: () => {
    set(initialState);
  },
}));
