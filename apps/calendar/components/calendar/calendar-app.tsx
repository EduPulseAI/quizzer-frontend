"use client"

import { useState } from "react"
import { Header } from "./header"
import { MonthView } from "./month-view"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"
import { EventDialog } from "./event-dialog"
import { ChatPanel } from "./chat-panel"
import { SettingsModal } from "./settings-modal"
import { useCalendarStore } from "@/lib/calendar-store"
import type { CalendarEvent } from "@/lib/types"
import { Plus, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CalendarApp() {
  const { view } = useCalendarStore()
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [defaultDate, setDefaultDate] = useState<Date | null>(null)

  function handleNewEvent() {
    setSelectedEvent(null)
    setDefaultDate(null)
    setEventDialogOpen(true)
  }

  function handleSelectEvent(event: CalendarEvent) {
    setSelectedEvent(event)
    setDefaultDate(null)
    setEventDialogOpen(true)
  }

  function handleSelectDate(date: Date) {
    setSelectedEvent(null)
    setDefaultDate(date)
    setEventDialogOpen(true)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header
        onNewEvent={handleNewEvent}
        onOpenChat={() => setChatOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <main className="flex-1 overflow-hidden">
        {view === "month" && (
          <MonthView onSelectDate={handleSelectDate} onSelectEvent={handleSelectEvent} />
        )}
        {view === "week" && (
          <WeekView onSelectDate={handleSelectDate} onSelectEvent={handleSelectEvent} />
        )}
        {view === "day" && (
          <DayView onSelectDate={handleSelectDate} onSelectEvent={handleSelectEvent} />
        )}
      </main>

      {/* Mobile FABs */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 md:hidden">
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full bg-card shadow-lg"
          onClick={() => setChatOpen(true)}
          aria-label="Open AI assistant"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={handleNewEvent}
          aria-label="New event"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <EventDialog
        open={eventDialogOpen}
        onOpenChange={setEventDialogOpen}
        event={selectedEvent}
        defaultDate={defaultDate}
      />

      <ChatPanel open={chatOpen} onOpenChange={setChatOpen} />

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}
