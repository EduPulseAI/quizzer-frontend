"use client"

import { CalendarDays, Sparkles, Check, Bell } from "lucide-react"

/**
 * Variant 2 -- "AI Focus"
 * Large centered AI assistant chat bubble with calendar context cards floating around it.
 * Emphasises the AI scheduling assistant as the hero.
 */
export function ThumbnailV2() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "hsl(224 20% 6%)",
      }}
    >
      {/* Gradient glow behind center */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsla(220,72%,55%,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsla(220,14%,20%,0.15) 1px, transparent 1px), linear-gradient(90deg, hsla(220,14%,20%,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* === Hero: AI Chat Bubble === */}
      <div
        className="absolute flex flex-col gap-5"
        style={{
          width: 440,
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 12,
          padding: "28px 32px",
          boxShadow:
            "0 24px 60px -12px hsla(220,72%,10%,0.6), 0 0 0 1px hsla(220,14%,20%,0.1)",
        }}
      >
        {/* AI Sparkle header */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: "hsla(220,72%,55%,0.15)",
            }}
          >
            <Sparkles style={{ width: 16, height: 16, color: "hsl(220 72% 65%)" }} />
          </div>
          <div className="flex flex-col">
            <span style={{ fontSize: 15, fontWeight: 600, color: "hsl(210 15% 92%)" }}>
              Chronos AI
            </span>
            <span style={{ fontSize: 11, color: "hsl(220 10% 50%)" }}>
              Scheduling Assistant
            </span>
          </div>
        </div>

        {/* User message */}
        <div
          className="self-end"
          style={{
            backgroundColor: "hsl(220 72% 50%)",
            color: "white",
            fontSize: 14,
            padding: "10px 16px",
            borderRadius: "12px 12px 4px 12px",
            maxWidth: 280,
            lineHeight: 1.4,
          }}
        >
          Schedule a design review with the team next Tuesday at 2pm
        </div>

        {/* AI response */}
        <div
          className="flex flex-col gap-3 self-start"
          style={{
            backgroundColor: "hsl(224 18% 12%)",
            padding: "14px 18px",
            borderRadius: "12px 12px 12px 4px",
            maxWidth: 340,
          }}
        >
          <span style={{ fontSize: 14, color: "hsl(210 15% 82%)", lineHeight: 1.5 }}>
            Done! I scheduled <span style={{ fontWeight: 600, color: "hsl(210 15% 92%)" }}>Design Review</span> for
            Tue, Feb 10 at 2:00 PM with 4 attendees.
          </span>
          <div
            className="flex items-center gap-1.5"
            style={{
              fontSize: 12,
              color: "hsl(152 60% 55%)",
              fontWeight: 500,
            }}
          >
            <Check style={{ width: 14, height: 14 }} />
            Event created
          </div>
        </div>
      </div>

      {/* === Floating card: Notification === */}
      <div
        className="absolute flex items-center gap-3"
        style={{
          top: 80,
          left: 80,
          zIndex: 15,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 10,
          padding: "12px 16px",
          boxShadow: "0 12px 24px -6px hsla(220,72%,10%,0.35)",
          transform: "rotate(-3deg)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "hsla(25,95%,55%,0.15)",
          }}
        >
          <Bell style={{ width: 13, height: 13, color: "hsl(25 95% 58%)" }} />
        </div>
        <div className="flex flex-col">
          <span style={{ fontSize: 12, fontWeight: 600, color: "hsl(210 15% 88%)" }}>
            Reminder
          </span>
          <span style={{ fontSize: 11, color: "hsl(220 10% 50%)" }}>
            Team standup in 15 min
          </span>
        </div>
      </div>

      {/* === Floating card: Quick stats === */}
      <div
        className="absolute flex flex-col gap-2"
        style={{
          bottom: 90,
          right: 80,
          zIndex: 15,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 10,
          padding: "16px 20px",
          boxShadow: "0 12px 24px -6px hsla(220,72%,10%,0.35)",
          transform: "rotate(2deg)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "hsl(220 10% 50%)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Today
        </span>
        <div className="flex items-baseline gap-2">
          <span style={{ fontSize: 28, fontWeight: 700, color: "hsl(220 72% 55%)" }}>
            6
          </span>
          <span style={{ fontSize: 13, color: "hsl(220 10% 50%)" }}>events</span>
        </div>
        <div className="flex gap-1">
          {["hsl(220 72% 55%)", "hsl(152 60% 50%)", "hsl(0 72% 55%)", "hsl(25 95% 58%)", "hsl(330 65% 60%)", "hsl(220 72% 55%)"].map(
            (c, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: c,
                }}
              />
            ),
          )}
        </div>
      </div>

      {/* === Floating card: mini calendar === */}
      <div
        className="absolute flex items-center gap-2"
        style={{
          bottom: 110,
          left: 100,
          zIndex: 10,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 10,
          padding: "12px 16px",
          boxShadow: "0 12px 24px -6px hsla(220,72%,10%,0.35)",
          transform: "rotate(-1deg)",
        }}
      >
        <CalendarDays
          style={{ width: 14, height: 14, color: "hsl(220 72% 55%)" }}
        />
        <span style={{ fontSize: 13, fontWeight: 500, color: "hsl(210 15% 80%)" }}>
          Feb 6, 2026
        </span>
      </div>
    </div>
  )
}
