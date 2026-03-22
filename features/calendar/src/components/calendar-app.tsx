import { Header } from "./header/header"
import { CalendarContent } from "./calendar-content"

export function CalendarApp() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <CalendarContent />
      </main>
    </div>
  )
}

export default CalendarApp
