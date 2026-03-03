"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  CalendarDays,
  MessageSquare,
  Palette,
  SlidersHorizontal,
  Smartphone,
  ArrowRight,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Thumbnail } from "@/components/thumbnail"
import { ThumbnailV2 } from "@/components/thumbnail-v2"
import { ThumbnailV3 } from "@/components/thumbnail-v3"
import { ThumbnailV4 } from "@/components/thumbnail-v4"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const THUMBNAIL_VARIANTS = [
  { id: "1", label: "Event Cards", component: Thumbnail },
  { id: "2", label: "AI Focus", component: ThumbnailV2 },
  { id: "3", label: "Week Grid", component: ThumbnailV3 },
  { id: "4", label: "Split Hero", component: ThumbnailV4 },
]

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

// ---------------------------------------------------------------------------
// Auto-advancing thumbnail carousel
// ---------------------------------------------------------------------------

const AUTOPLAY_MS = 5000

function HeroCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [paused, setPaused] = useState(false)

  // A key that we bump to restart the CSS animation from scratch
  const [progressKey, setProgressKey] = useState(0)

  // responsive scaling
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      setScale(Math.min(containerRef.current.offsetWidth / 1200, 1))
    }
  }, [])

  useEffect(() => {
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [updateScale])

  // Auto-advance driven by the CSS animation ending (not setInterval).
  // When the progress bar finishes its 5s fill, onAnimationEnd fires and we advance.
  const advance = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % THUMBNAIL_VARIANTS.length)
    setProgressKey((k) => k + 1)
  }, [])

  const selectVariant = useCallback((i: number) => {
    setActiveIdx(i)
    setProgressKey((k) => k + 1)
  }, [])

  const active = THUMBNAIL_VARIANTS[activeIdx]
  const ActiveComponent = active.component

  return (
    <div
      className="flex flex-col gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Thumbnail display */}
      <div ref={containerRef} className="relative overflow-hidden rounded-xl border shadow-sm">
        <div style={{ width: "100%", height: 630 * scale, position: "relative" }}>
          <div
            style={{
              width: 1200,
              height: 630,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <ActiveComponent />
          </div>
        </div>

        {/* Progress bar -- thin stripe at the bottom of the thumbnail */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-muted-foreground/10">
          <div
            key={progressKey}
            className="h-full bg-primary/80"
            onAnimationEnd={advance}
            style={{
              width: "100%",
              transformOrigin: "left",
              animation: `progress-fill ${AUTOPLAY_MS}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>

        {/* Dot indicators overlaid bottom-center, above the progress bar */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 backdrop-blur-sm">
          {THUMBNAIL_VARIANTS.map((_, i) => (
            <button
              key={THUMBNAIL_VARIANTS[i].id}
              type="button"
              onClick={() => selectVariant(i)}
              aria-label={`View ${THUMBNAIL_VARIANTS[i].label} thumbnail`}
              className={cn(
                "h-2 rounded-full transition-all",
                activeIdx === i
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70",
              )}
            />
          ))}
        </div>
      </div>

      {/* Chip selectors + open full-size */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {THUMBNAIL_VARIANTS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => selectVariant(i)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                activeIdx === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
        <Link href={`/thumbnail?v=${active.id}`} target="_blank">
          <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
            <ExternalLink className="h-3.5 w-3.5" />
            Open full-size
          </Button>
        </Link>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Homepage header
// ---------------------------------------------------------------------------

function HomepageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card px-4 py-3 md:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground md:text-lg">
          Chronos
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/calendar">
            <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
              <CalendarDays className="h-4 w-4" />
              Explore Components
            </Button>
          </Link>
          <Link href="/brand">
            <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
              <ImageIcon className="h-4 w-4" />
              Brand Assets
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-lg font-semibold text-foreground">Chronos</span>
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
              href="/calendar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              <CalendarDays className="h-5 w-5" />
              Explore Components
            </Link>
            <Link
              href="/brand"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              <ImageIcon className="h-5 w-5" />
              Brand Assets
            </Link>
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <HomepageHeader />

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-14">
        <div className="flex flex-col gap-16">
          {/* ========================
              HERO
              ======================== */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
                Calendar Starter Kit
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A production-ready set of calendar components, event management, and AI scheduling
                tools. Fork it, swap the branding, wire up your data, and ship.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/calendar">
                <Button size="lg" className="gap-2">
                  Explore Components
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/brand">
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <ImageIcon className="h-4 w-4" />
                  Brand Assets
                </Button>
              </Link>
            </div>
          </section>

          {/* ========================
              THUMBNAIL CAROUSEL
              ======================== */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Preview</h2>
              <p className="text-sm text-muted-foreground">
                Auto-advances every 5 seconds. Hover to pause, click a chip to jump.
              </p>
            </div>
            <HeroCarousel />
          </section>

          {/* ========================
              WHAT'S INSIDE
              ======================== */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {"What's Inside"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Every component is self-contained and ready to use in your own project.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <Link
                  key={f.label}
                  href="/calendar"
                  className="group flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/50"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <f.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{f.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                  <span className="mt-auto flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Try it live
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ========================
              TECH STACK
              ======================== */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Built With
            </h2>
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
          </section>

          {/* ========================
              EXPLORE CARDS
              ======================== */}
          <section className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/calendar"
              className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Live Demo</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                See the calendar in action -- create events, switch views, chat with the AI
                assistant, and configure the agent settings.
              </p>
              <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                Open calendar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            <Link
              href="/brand"
              className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Brand Assets</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                App icons, favicon, and OG image built from the default blue palette.
                Right-click to save, or swap the colors to match your brand.
              </p>
              <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                View assets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </section>

          {/* ========================
              FOOTER
              ======================== */}
          <footer className="border-t pt-6 pb-8 text-center text-xs text-muted-foreground">
            Built with Next.js, shadcn/ui, and the Vercel AI SDK.
          </footer>
        </div>
      </main>
    </div>
  )
}
