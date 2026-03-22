'use client';

import { useCalendarStore } from "../stores/calendar-store"
import { MonthView } from "./month-view"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"

export function CalendarContent() {
  const { view } = useCalendarStore()

  return (
    <>
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}
    </>
  )
}

export default CalendarContent
