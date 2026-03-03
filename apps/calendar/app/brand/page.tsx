"use client"

import Link from "next/link"
import { ArrowLeft, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AppIcon512,
  AppIcon180,
  Favicon32,
  OgImage,
} from "@/components/marketing/brand-assets"
import { useTheme } from "next-themes"

const ASSETS = [
  { label: "App Icon", size: "512x512", component: AppIcon512 },
  { label: "Touch Icon", size: "180x180", component: AppIcon180 },
  { label: "Favicon", size: "32x32", component: Favicon32 },
]

export default function BrandPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Back to home">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="font-semibold text-foreground hover:underline">
              Chronos
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Brand Assets</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-10">
          {/* Intro */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Brand Assets</h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Starter icons and OG image built from the default blue palette. Right-click any
              asset to save, or swap the HSL values in your theme to match your own brand.
            </p>
          </div>

          {/* Icon grid */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Icons
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {ASSETS.map((a) => (
                <div key={a.label} className="flex flex-col gap-2">
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-card p-6">
                    <a.component />
                  </div>
                  <div className="flex items-center justify-between px-0.5">
                    <span className="text-xs font-medium text-foreground">{a.label}</span>
                    <span className="text-[10px] text-muted-foreground">{a.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* OG Image (full width) */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              OG Image
            </h2>
            <div className="overflow-hidden rounded-lg border bg-card">
              <div className="aspect-[1200/630] w-full">
                <OgImage />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">1200 x 630px</span>
          </section>

          {/* Usage note */}
          <section className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Customizing</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              All assets are inline SVGs that reference the Chronos blue palette. To match your
              brand, update the HSL fill values in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                components/marketing/brand-assets.tsx
              </code>{" "}
              or generate new ones from your theme tokens.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
