'use client';

import { cn } from "@feature/ui/lib/utils"
import { getMonthDays, isSameDay, isToday } from "../lib/utils/date"
import { EVENT_COLORS, type CalendarEvent } from "../lib/types"
import { useCalendarStore } from "../stores/calendar-store"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getEventsForDay(events: CalendarEvent[], date: Date) {
  return events.filter((event) => isSameDay(new Date(event.start), date))
}

export function MonthView() {
  const { currentDate, events, setCurrentDate, setView } = useCalendarStore()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = getMonthDays(year, month)

  return (
    <div className="flex h-full flex-col">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b bg-muted/50">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="px-1 py-2 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {days.map((date, i) => {
          const dayEvents = getEventsForDay(events, date)
          const isCurrentMonth = date.getMonth() === month
          const today = isToday(date)

          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              className={cn(
                "group relative flex cursor-pointer flex-col border-b border-r p-1 text-left transition-colors hover:bg-accent/50 md:p-2",
                !isCurrentMonth && "bg-muted/30",
              )}
              onClick={() => {
                setCurrentDate(date)
                setView("day")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setCurrentDate(date)
                  setView("day")
                }
              }}
            >
              <span
                className={cn(
                  "mb-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium md:h-7 md:w-7 md:text-sm",
                  today && "bg-primary text-primary-foreground",
                  !today && isCurrentMonth && "text-foreground",
                  !today && !isCurrentMonth && "text-muted-foreground",
                )}
              >
                {date.getDate()}
              </span>
              <div className="flex flex-col gap-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "flex items-center gap-1 truncate rounded px-1 py-0.5 text-[10px] font-medium leading-tight md:text-xs",
                      EVENT_COLORS[event.color].class,
                      "text-primary-foreground opacity-90",
                    )}
                  >
                    <span className="truncate">{event.title}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <span className="px-1 text-[10px] text-muted-foreground">
                    +{dayEvents.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthView
