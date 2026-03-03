'use client';

import { useSyncExternalStore, useCallback } from "react"
import type { CalendarEvent, CalendarView, AgentSettings } from "./types"

// Simple event ID generator
let nextId = 1
export function generateId() {
  return `evt-${Date.now()}-${nextId++}`
}

// Default sample events for a nice demo
function getDefaultEvents(): CalendarEvent[] {
  const today = new Date()
  const y = today.getFullYear()
  const m = today.getMonth()
  const d = today.getDate()

  return [
    {
      id: generateId(),
      title: "Team Standup",
      description: "Daily sync with the engineering team",
      start: new Date(y, m, d, 9, 0).toISOString(),
      end: new Date(y, m, d, 9, 30).toISOString(),
      allDay: false,
      color: "blue",
    },
    {
      id: generateId(),
      title: "Design Review",
      description: "Review new calendar mockups",
      start: new Date(y, m, d, 14, 0).toISOString(),
      end: new Date(y, m, d, 15, 0).toISOString(),
      allDay: false,
      color: "green",
    },
    {
      id: generateId(),
      title: "Lunch with Sarah",
      start: new Date(y, m, d + 1, 12, 0).toISOString(),
      end: new Date(y, m, d + 1, 13, 0).toISOString(),
      allDay: false,
      color: "orange",
    },
    {
      id: generateId(),
      title: "Project Deadline",
      description: "Submit final deliverables",
      start: new Date(y, m, d + 3, 0, 0).toISOString(),
      end: new Date(y, m, d + 3, 23, 59).toISOString(),
      allDay: true,
      color: "red",
    },
    {
      id: generateId(),
      title: "Yoga Class",
      start: new Date(y, m, d + 2, 7, 0).toISOString(),
      end: new Date(y, m, d + 2, 8, 0).toISOString(),
      allDay: false,
      color: "pink",
    },
    {
      id: generateId(),
      title: "Sprint Planning",
      description: "Plan next sprint goals and tasks",
      start: new Date(y, m, d - 1, 10, 0).toISOString(),
      end: new Date(y, m, d - 1, 11, 30).toISOString(),
      allDay: false,
      color: "blue",
    },
  ]
}

interface CalendarState {
  events: CalendarEvent[]
  currentDate: Date
  view: CalendarView
  agentSettings: AgentSettings
}

let state: CalendarState = {
  events: getDefaultEvents(),
  currentDate: new Date(),
  view: "month",
  agentSettings: {
    model: "anthropic/claude-opus-4.6",
    temperature: 0.7,
    systemPrompt: `You are Chronos, a smart calendar assistant. You help users manage their schedule, create events, find free time, and offer scheduling suggestions. Be concise and helpful. When the user asks to create an event, confirm the details and let them know it's been added. The current date/time is: ${new Date().toISOString()}.`,
  },
}

const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

export const calendarStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(): CalendarState {
    return state
  },
  setView(view: CalendarView) {
    state = { ...state, view }
    emitChange()
  },
  setCurrentDate(date: Date) {
    state = { ...state, currentDate: new Date(date) }
    emitChange()
  },
  addEvent(event: CalendarEvent) {
    state = { ...state, events: [...state.events, event] }
    emitChange()
  },
  updateEvent(id: string, updates: Partial<CalendarEvent>) {
    state = {
      ...state,
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }
    emitChange()
  },
  deleteEvent(id: string) {
    state = { ...state, events: state.events.filter((e) => e.id !== id) }
    emitChange()
  },
  updateAgentSettings(settings: Partial<AgentSettings>) {
    state = {
      ...state,
      agentSettings: { ...state.agentSettings, ...settings },
    }
    emitChange()
  },
  navigateForward() {
    const d = new Date(state.currentDate)
    if (state.view === "month") d.setMonth(d.getMonth() + 1)
    else if (state.view === "week") d.setDate(d.getDate() + 7)
    else d.setDate(d.getDate() + 1)
    state = { ...state, currentDate: d }
    emitChange()
  },
  navigateBack() {
    const d = new Date(state.currentDate)
    if (state.view === "month") d.setMonth(d.getMonth() - 1)
    else if (state.view === "week") d.setDate(d.getDate() - 7)
    else d.setDate(d.getDate() - 1)
    state = { ...state, currentDate: d }
    emitChange()
  },
  goToToday() {
    state = { ...state, currentDate: new Date() }
    emitChange()
  },
}

export function useCalendarStore() {
  const snapshot = useSyncExternalStore(
    calendarStore.subscribe,
    calendarStore.getSnapshot,
    calendarStore.getSnapshot,
  )

  return {
    ...snapshot,
    setView: calendarStore.setView,
    setCurrentDate: calendarStore.setCurrentDate,
    addEvent: calendarStore.addEvent,
    updateEvent: calendarStore.updateEvent,
    deleteEvent: calendarStore.deleteEvent,
    updateAgentSettings: calendarStore.updateAgentSettings,
    navigateForward: calendarStore.navigateForward,
    navigateBack: calendarStore.navigateBack,
    goToToday: calendarStore.goToToday,
  }
}
