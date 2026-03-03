"use client"

import {
  CalendarDays,
  MessageSquare,
  Palette,
  SlidersHorizontal,
  Smartphone,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const FEATURES = [
  {
    icon: CalendarDays,
    label: "Month, Week & Day Views",
    description:
      "Three swappable calendar view components ready to drop into your app. Each is self-contained and easy to extend.",
  },
  {
    icon: MessageSquare,
    label: "AI Chat Panel",
    description:
      "A pre-wired chat component using AI SDK 6 and the Vercel AI Gateway. Swap the system prompt and tools to fit your domain.",
  },
  {
    icon: Palette,
    label: "Color-Coded Event System",
    description:
      "Five-color event model with a reactive store. Add your own fields, categories, or data sources without rearchitecting.",
  },
  {
    icon: SlidersHorizontal,
    label: "Agent Settings Panel",
    description:
      "Model selector, temperature slider, and editable system prompt out of the box. A foundation for any AI-powered feature.",
  },
  {
    icon: Smartphone,
    label: "Mobile-First Components",
    description:
      "Responsive header, full-screen mobile menu, and floating action buttons you can reuse across any layout.",
  },
  {
    icon: Moon,
    label: "Themed Design Tokens",
    description:
      "Light and dark modes via CSS custom properties. Override the token values to match your brand in minutes.",
  },
]

const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "AI SDK 6",
  "shadcn/ui",
  "Tailwind CSS",
  "date-fns",
  "Recharts",
  "next-themes",
  "Zod",
  "lucide-react",
]

export function TemplateListing() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          Chronos - Calendar Starter Kit
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A production-ready set of calendar components, event management, and an AI scheduling assistant.
          Fork it as a starting point and build your own app on top.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex flex-col gap-2 rounded-lg border bg-card p-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{f.label}</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Tech stack pills */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((t) => (
            <span
              key={t}
              className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div>
        <Button size="lg" className="gap-2">
          Use this template
        </Button>
      </div>
    </div>
  )
}
