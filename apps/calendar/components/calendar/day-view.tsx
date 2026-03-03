"use client"

import { useCalendarStore } from "@/lib/calendar-store"
import { isSameDay, isToday, formatTime, getHours, formatDayHeader } from "@/lib/date-utils"
import { EVENT_COLORS, type CalendarEvent } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useRef, useEffect } from "react"

interface DayViewProps {
  onSelectEvent: (event: CalendarEvent) => void
  onSelectDate: (date: Date) => void
}

export function DayView({ onSelectEvent, onSelectDate }: DayViewProps) {
  const { currentDate, events } = useCalendarStore()
  const hours = getHours()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 8 * 64
    }
  }, [])

  const dayEvents = events.filter((event) => {
    const start = new Date(event.start)
    return isSameDay(start, currentDate)
  })

  const allDayEvents = dayEvents.filter((e) => e.allDay)
  const timedEvents = dayEvents.filter((e) => !e.allDay)

  function getEventsForHour(hour: number) {
    return timedEvents.filter((event) => {
      const start = new Date(event.start)
      return start.getHours() === hour
    })
  }

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

      {/* All day events */}
      {allDayEvents.length > 0 && (
        <div className="flex items-center gap-2 border-b px-4 py-2 md:px-6">
          <span className="text-xs text-muted-foreground">All day</span>
          <div className="flex flex-wrap gap-1">
            {allDayEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event)}
                className={cn(
                  "rounded px-2 py-0.5 text-xs font-medium",
                  EVENT_COLORS[event.color].class,
                  "text-primary-foreground hover:opacity-90",
                )}
              >
                {event.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time slots */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour)
          return (
            <div
              key={hour}
              className="grid grid-cols-[50px_1fr] border-b hover:bg-accent/20 md:grid-cols-[80px_1fr]"
              onClick={() => {
                const d = new Date(currentDate)
                d.setHours(hour, 0, 0, 0)
                onSelectDate(d)
              }}
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
                  const durationMinutes =
                    (end.getTime() - start.getTime()) / (1000 * 60)

                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectEvent(event)
                      }}
                      className={cn(
                        "mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left",
                        EVENT_COLORS[event.color].class,
                        "text-primary-foreground hover:opacity-90",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{event.title}</div>
                        <div className="text-xs opacity-80">
                          {formatTime(start)} - {formatTime(end)} ({Math.round(durationMinutes)} min)
                        </div>
                      </div>
                    </button>
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
