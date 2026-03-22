'use client';

import {
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Settings,
  Sun,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@feature/ui/components/button"
import { cn } from "@feature/ui/lib/utils"
import { formatDayHeader, formatMonthYear, formatWeekRange, getWeekDays } from "../../lib/utils/date"
import { useCalendarStore, type CalendarView } from "../../stores/calendar-store"

const VIEW_OPTIONS: { value: CalendarView; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
]

export function Header() {
  const { currentDate, view, setView, navigateForward, navigateBack, navigateToday } =
    useCalendarStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const getTitle = () => {
    if (view === "month") return formatMonthYear(currentDate)
    if (view === "week") return formatWeekRange(getWeekDays(currentDate))
    return formatDayHeader(currentDate)
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card px-3 py-2 md:px-6 md:py-3">
        {/* Left: title + nav */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground hover:underline md:text-lg"
          >
            Chronos
          </Link>
          <span className="hidden text-muted-foreground md:inline">/</span>
          <span className="hidden text-sm text-muted-foreground md:inline">Calendar</span>
          <span className="hidden text-muted-foreground md:inline">/</span>
          <span className="hidden text-sm text-muted-foreground md:inline">{getTitle()}</span>
        </div>

        {/* Center: navigation (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="icon" onClick={navigateBack} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={navigateToday} className="text-xs">
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={navigateForward} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="ml-4 flex items-center rounded-lg bg-muted p-0.5">
            {VIEW_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setView(opt.value)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  view === opt.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            aria-label="Open AI assistant"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" className="hidden gap-1.5 md:flex">
            <Plus className="h-4 w-4" />
            New Event
          </Button>

          {/* Mobile: current title */}
          <span className="mr-1 text-xs text-muted-foreground md:hidden">
            {view === "month"
              ? formatMonthYear(currentDate)
              : view === "week"
                ? "This Week"
                : currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile: navigation bar below header */}
      <div className="flex items-center justify-between border-b bg-card px-3 py-1.5 md:hidden">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={navigateBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={navigateToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={navigateForward}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center rounded-lg bg-muted p-0.5">
          {VIEW_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setView(opt.value)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                view === opt.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold text-foreground">Chronos</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <button
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Plus className="h-5 w-5" />
              New Event
            </button>
            <button
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              AI Assistant
            </button>
            <button
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </>
  )
}

export default Header
