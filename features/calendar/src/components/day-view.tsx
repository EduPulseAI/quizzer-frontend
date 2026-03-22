'use client';

import { useRef, useEffect } from "react"
import { cn } from "@feature/ui/lib/utils"
import { isSameDay, isToday, formatTime, getHours, formatDayHeader } from "../lib/utils/date"
import { EVENT_COLORS, type CalendarEvent } from "../lib/types"
import { useCalendarStore } from "../stores/calendar-store"

function getTimedEvents(events: CalendarEvent[], currentDate: Date, hour: number) {
  return events.filter((event) => {
    if (event.allDay) return false
    const start = new Date(event.start)
    return isSameDay(start, currentDate) && start.getHours() === hour
  })
}

export function DayView() {
  const { currentDate, events } = useCalendarStore()
  const hours = getHours()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 8 * 64
    }
  }, [])

  const dayEvents = events.filter((e) => isSameDay(new Date(e.start), currentDate))
  const allDayEvents = dayEvents.filter((e) => e.allDay)

  return (
    <div className="flex h-full flex-col">
      {/* Day header */}
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3 md:px-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground md:text-base">
            {formatDayHeader(currentDate)}
          </h2>
          {isToday(currentDate) && (
            <span className="text-xs text-primary">Today</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* All-day events */}
      {allDayEvents.length > 0 && (
        <div className="flex items-center gap-2 border-b px-4 py-2 md:px-6">
          <span className="text-xs text-muted-foreground">All day</span>
          <div className="flex flex-wrap gap-1">
            {allDayEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "rounded px-2 py-0.5 text-xs font-medium",
                  EVENT_COLORS[event.color].class,
                  "text-primary-foreground",
                )}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time slots */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {hours.map((hour) => {
          const hourEvents = getTimedEvents(events, currentDate, hour)
          return (
            <div
              key={hour}
              className="grid grid-cols-[50px_1fr] border-b hover:bg-accent/20 md:grid-cols-[80px_1fr]"
            >
              <div className="flex h-16 items-start justify-end border-r bg-muted/30 pr-2 pt-1 text-[10px] text-muted-foreground md:pr-3 md:text-xs">
                {hour === 0
                  ? "12 AM"
                  : new Date(2000, 0, 1, hour).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
              </div>
              <div className="relative min-h-[64px] p-1">
                {hourEvents.map((event) => {
                  const start = new Date(event.start)
                  const end = new Date(event.end)
                  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60)

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2",
                        EVENT_COLORS[event.color].class,
                        "text-primary-foreground",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{event.title}</div>
                        <div className="text-xs opacity-80">
                          {formatTime(start)} - {formatTime(end)} ({Math.round(durationMinutes)} min)
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DayView
