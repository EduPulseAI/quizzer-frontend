export type CalendarView = "month" | "week" | "day"

export type EventColor = "blue" | "green" | "red" | "orange" | "pink"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: string // ISO date string
  end: string   // ISO date string
  allDay: boolean
  color: EventColor
}

export interface AgentSettings {
  model: string
  temperature: number
  systemPrompt: string
}

export const EVENT_COLORS: Record<
  EventColor,
  { label: string; class: string; dot: string; style: string }
> = {
  blue: {
    label: "Blue",
    class: "bg-[hsl(220,72%,50%)] dark:bg-[hsl(220,72%,55%)]",
    dot: "bg-[hsl(220,72%,50%)] dark:bg-[hsl(220,72%,55%)]",
    style: "hsl(220 72% 50%)",
  },
  green: {
    label: "Green",
    class: "bg-[hsl(152,60%,42%)] dark:bg-[hsl(152,60%,50%)]",
    dot: "bg-[hsl(152,60%,42%)] dark:bg-[hsl(152,60%,50%)]",
    style: "hsl(152 60% 42%)",
  },
  red: {
    label: "Red",
    class: "bg-[hsl(0,72%,51%)] dark:bg-[hsl(0,62%,55%)]",
    dot: "bg-[hsl(0,72%,51%)] dark:bg-[hsl(0,62%,55%)]",
    style: "hsl(0 72% 51%)",
  },
  orange: {
    label: "Orange",
    class: "bg-[hsl(25,95%,53%)] dark:bg-[hsl(25,95%,58%)]",
    dot: "bg-[hsl(25,95%,53%)] dark:bg-[hsl(25,95%,58%)]",
    style: "hsl(25 95% 53%)",
  },
  pink: {
    label: "Pink",
    class: "bg-[hsl(330,65%,55%)] dark:bg-[hsl(330,65%,60%)]",
    dot: "bg-[hsl(330,65%,55%)] dark:bg-[hsl(330,65%,60%)]",
    style: "hsl(330 65% 55%)",
  },
}

export const AVAILABLE_MODELS = [
  { value: "anthropic/claude-opus-4.6", label: "Claude Opus 4.6" },
  { value: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4" },
  { value: "openai/gpt-5", label: "GPT-5" },
  { value: "openai/gpt-5-mini", label: "GPT-5 Mini" },
  { value: "xai/grok-4-fast", label: "Grok 4 Fast" },
]
