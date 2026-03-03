"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useCalendarStore, generateId } from "@/lib/calendar-store"
import { EVENT_COLORS, type CalendarEvent, type EventColor } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/date-utils"
import { Trash2 } from "lucide-react"

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: CalendarEvent | null
  defaultDate?: Date | null
}

export function EventDialog({ open, onOpenChange, event, defaultDate }: EventDialogProps) {
  const { addEvent, updateEvent, deleteEvent } = useCalendarStore()
  const isEditing = !!event

  const getDefaultStart = () => {
    if (defaultDate) {
      const d = new Date(defaultDate)
      if (d.getHours() === 0 && d.getMinutes() === 0) {
        d.setHours(9, 0, 0, 0)
      }
      return d
    }
    const d = new Date()
    d.setMinutes(0, 0, 0)
    d.setHours(d.getHours() + 1)
    return d
  }

  const getDefaultEnd = () => {
    const start = getDefaultStart()
    return new Date(start.getTime() + 60 * 60 * 1000)
  }

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [allDay, setAllDay] = useState(false)
  const [color, setColor] = useState<EventColor>("blue")

  useEffect(() => {
    if (open) {
      if (event) {
        const s = new Date(event.start)
        const e = new Date(event.end)
        setTitle(event.title)
        setDescription(event.description || "")
        setStartDate(toDateInput(s))
        setStartTime(toTimeInput(s))
        setEndDate(toDateInput(e))
        setEndTime(toTimeInput(e))
        setAllDay(event.allDay)
        setColor(event.color)
      } else {
        const s = getDefaultStart()
        const e = getDefaultEnd()
        setTitle("")
        setDescription("")
        setStartDate(toDateInput(s))
        setStartTime(toTimeInput(s))
        setEndDate(toDateInput(e))
        setEndTime(toTimeInput(e))
        setAllDay(false)
        setColor("blue")
      }
    }
  }, [open, event])

  function toDateInput(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  }

  function toTimeInput(d: Date) {
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const start = allDay
      ? new Date(`${startDate}T00:00:00`)
      : new Date(`${startDate}T${startTime}:00`)
    const end = allDay
      ? new Date(`${endDate}T23:59:59`)
      : new Date(`${endDate}T${endTime}:00`)

    if (isEditing && event) {
      updateEvent(event.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay,
        color,
      })
    } else {
      addEvent({
        id: generateId(),
        title: title.trim(),
        description: description.trim() || undefined,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay,
        color,
      })
    }
    onOpenChange(false)
  }

  function handleDelete() {
    if (event) {
      deleteEvent(event.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Event" : "New Event"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update event details below." : "Fill in the details for your new event."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-title">Title</Label>
            <Input
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={2}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} />
            <Label htmlFor="all-day">All day</Label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="start-date">Start date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            {!allDay && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="start-time">Start time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="end-date">End date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            {!allDay && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="end-time">End time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {/* Color picker chips */}
          <div className="flex flex-col gap-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {(Object.keys(EVENT_COLORS) as EventColor[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-7 w-7 rounded-full transition-all",
                    color === c
                      ? "ring-2 ring-ring ring-offset-2 ring-offset-background scale-110"
                      : "opacity-60 hover:opacity-100",
                  )}
                  style={{ backgroundColor: EVENT_COLORS[c].style }}
                  aria-label={EVENT_COLORS[c].label}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="flex-row gap-2">
            {isEditing && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="mr-auto gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Save" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
