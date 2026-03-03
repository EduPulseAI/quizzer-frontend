"use client"

import { useCalendarStore } from "@/lib/calendar-store"
import { getWeekDays, isSameDay, isToday, formatTime, getHours } from "@/lib/date-utils"
import { EVENT_COLORS, type CalendarEvent } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useRef, useEffect } from "react"

interface WeekViewProps {
  onSelectEvent: (event: CalendarEvent) => void
  onSelectDate: (date: Date) => void
}

export function WeekView({ onSelectEvent, onSelectDate }: WeekViewProps) {
  const { currentDate, events } = useCalendarStore()
  const weekDays = getWeekDays(currentDate)
  const hours = getHours()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to 8am on mount
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 8 * 60
    }
  }, [])

  function getEventsForDayAndHour(date: Date, hour: number) {
    return events.filter((event) => {
      if (event.allDay) return false
      const start = new Date(event.start)
      return isSameDay(start, date) && start.getHours() === hour
    })
  }

  function getAllDayEvents(date: Date) {
    return events.filter((event) => {
      const start = new Date(event.start)
      return event.allDay && isSameDay(start, date)
    })
  }

  return (
    <div className="flex h-full flex-col">
      {/* Day headers */}
      <div className="grid grid-cols-[50px_1fr] border-b md:grid-cols-[64px_1fr]">
        <div className="border-r bg-muted/50" />
        <div className="grid grid-cols-7">
          {weekDays.map((date, i) => {
            const today = isToday(date)
            return (
              <div
                key={i}
                className="flex flex-col items-center border-r py-2 last:border-r-0"
              >
                <span className="text-[10px] font-medium text-muted-foreground md:text-xs">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold md:h-8 md:w-8",
                    today && "bg-primary text-primary-foreground",
                    !today && "text-foreground",
                  )}
                >
                  {date.getDate()}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* All day events row */}
      <div className="grid grid-cols-[50px_1fr] border-b md:grid-cols-[64px_1fr]">
        <div className="flex items-center justify-center border-r bg-muted/50 py-1 text-[10px] text-muted-foreground md:text-xs">
          All day
        </div>
        <div className="grid grid-cols-7">
          {weekDays.map((date, i) => {
            const dayEvents = getAllDayEvents(date)
            return (
              <div key={i} className="min-h-[28px] border-r p-0.5 last:border-r-0">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelectEvent(event)}
                    className={cn(
                      "w-full truncate rounded px-1 py-0.5 text-[10px] font-medium md:text-xs",
                      EVENT_COLORS[event.color].class,
                      "text-primary-foreground hover:opacity-90",
                    )}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[50px_1fr] md:grid-cols-[64px_1fr]">
          {/* Time labels */}
          <div className="border-r bg-muted/50">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex h-[60px] items-start justify-end pr-2 pt-0 text-[10px] text-muted-foreground md:text-xs"
              >
                {hour === 0
                  ? ""
                  : new Date(2000, 0, 1, hour).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="grid grid-cols-7">
            {weekDays.map((date, dayIndex) => (
              <div key={dayIndex} className="border-r last:border-r-0">
                {hours.map((hour) => {
                  const hourEvents = getEventsForDayAndHour(date, hour)
                  return (
                    <div
                      key={hour}
                      className="relative h-[60px] border-b hover:bg-accent/30"
                      onClick={() => {
                        const d = new Date(date)
                        d.setHours(hour, 0, 0, 0)
                        onSelectDate(d)
                      }}
                    >
                      {hourEvents.map((event) => {
                        const start = new Date(event.start)
                        const end = new Date(event.end)
                        const durationMinutes =
                          (end.getTime() - start.getTime()) / (1000 * 60)
                        const topOffset = start.getMinutes()
                        const height = Math.max(durationMinutes, 20)

                        return (
                          <button
                            key={event.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectEvent(event)
                            }}
                            className={cn(
                              "absolute left-0.5 right-0.5 z-10 overflow-hidden rounded px-1 py-0.5 text-left text-[10px] font-medium leading-tight md:text-xs",
                              EVENT_COLORS[event.color].class,
                              "text-primary-foreground hover:opacity-90",
                            )}
                            style={{
                              top: `${topOffset}px`,
                              height: `${height}px`,
                            }}
                          >
                            <div className="truncate">{event.title}</div>
                            <div className="truncate opacity-75">
                              {formatTime(start)}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
