/**
 * [date]
 * next-feature@0.1.3-1
 * March 5th 2026, 5:19:33 pm
 */
export function getMonthDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay() // 0=Sunday
  const days: Date[] = []

  // Fill in previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i))
  }

  // Fill in current month days
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  // Fill remaining cells to complete the grid (6 rows x 7 cols = 42)
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i))
  }

  return days
}

export function getWeekDays(date: Date): Date[] {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  const days: Date[] = []

  for (let i = 0; i < 7; i++) {
    days.push(new Date(d.getFullYear(), d.getMonth(), diff + i))
  }

  return days
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatDateRange(start: Date, end: Date, allDay: boolean): string {
  if (allDay) return "All day"
  return `${formatTime(start)} - ${formatTime(end)}`
}

export function getHours(): number[] {
  return Array.from({ length: 24 }, (_, i) => i)
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

export function formatDayHeader(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
}

export function formatWeekRange(days: Date[]): string {
  const start = days[0]
  const end = days[6]
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString("en-US", { month: "long" })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
  }
  return `${start.toLocaleDateString("en-US", { month: "short" })} ${start.getDate()} - ${end.toLocaleDateString("en-US", { month: "short" })} ${end.getDate()}, ${end.getFullYear()}`
}
