"use client"

import { Clock, Users, Zap, CalendarDays } from "lucide-react"

/**
 * Variant 3 -- "Week Grid Hero"
 * Shows a stylised mini week-view grid as the dominant element,
 * with event blocks placed inside time slots to emphasise the
 * calendar-first nature of the app.
 */
export function ThumbnailV3() {
  const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"]
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "hsl(224 20% 6%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 700,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, hsla(220,72%,55%,0.06) 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* === App title & tagline top-left === */}
      <div
        className="absolute flex items-center gap-3"
        style={{ top: 40, left: 56, zIndex: 30 }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            backgroundColor: "hsl(220 72% 50%)",
          }}
        >
          <CalendarDays style={{ width: 18, height: 18, color: "white" }} />
        </div>
        <div className="flex flex-col">
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "hsl(210 15% 92%)",
              letterSpacing: "-0.02em",
            }}
          >
            Chronos
          </span>
          <span style={{ fontSize: 12, color: "hsl(220 10% 50%)" }}>
            Calendar Starter Kit
          </span>
        </div>
      </div>

      {/* === Feature pills top-right === */}
      <div
        className="absolute flex gap-2"
        style={{ top: 44, right: 56, zIndex: 30 }}
      >
        {[
          { icon: Zap, label: "AI SDK 6" },
          { icon: Users, label: "shadcn/ui" },
          { icon: Clock, label: "Next.js 16" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "hsl(210 15% 75%)",
              backgroundColor: "hsla(220,14%,16%,0.6)",
              border: "1px solid hsl(220 14% 18%)",
              borderRadius: 20,
              padding: "5px 12px",
            }}
          >
            <f.icon style={{ width: 12, height: 12, color: "hsl(220 72% 60%)" }} />
            {f.label}
          </div>
        ))}
      </div>

      {/* === Week grid === */}
      <div
        className="absolute"
        style={{
          top: 110,
          left: 56,
          right: 56,
          bottom: 40,
          zIndex: 20,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "0 24px 48px -12px hsla(220,72%,10%,0.5)",
        }}
      >
        {/* Day header row */}
        <div
          className="flex"
          style={{
            borderBottom: "1px solid hsl(220 14% 16%)",
          }}
        >
          {/* Time gutter spacer */}
          <div style={{ width: 60, flexShrink: 0 }} />
          {days.map((d, i) => (
            <div
              key={d}
              className="flex flex-1 items-center justify-center"
              style={{
                padding: "10px 0",
                borderLeft: i > 0 ? "1px solid hsl(220 14% 14%)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: d === "Thu" ? "hsl(220 72% 55%)" : "hsl(220 10% 50%)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* Time rows */}
        <div className="relative flex" style={{ height: "calc(100% - 38px)" }}>
          {/* Time gutter */}
          <div
            className="flex flex-col justify-between"
            style={{
              width: 60,
              flexShrink: 0,
              padding: "8px 8px 8px 12px",
              borderRight: "1px solid hsl(220 14% 14%)",
            }}
          >
            {hours.map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 10,
                  color: "hsl(220 10% 40%)",
                  fontWeight: 500,
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Day columns with events */}
          <div className="relative flex flex-1">
            {days.map((d, dayIdx) => (
              <div
                key={d}
                className="relative flex-1"
                style={{
                  borderLeft: dayIdx > 0 ? "1px solid hsl(220 14% 12%)" : "none",
                }}
              >
                {/* Horizontal grid lines */}
                {hours.map((_, hi) => (
                  <div
                    key={hi}
                    className="absolute w-full"
                    style={{
                      top: `${(hi / (hours.length - 1)) * 100}%`,
                      height: 1,
                      backgroundColor: "hsl(220 14% 10%)",
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Event blocks -- positioned absolutely */}
            {/* Monday 9-10:30 */}
            <EventBlock
              dayIdx={0}
              totalDays={5}
              topPct={0}
              heightPct={25}
              color="hsl(220 72% 50%)"
              title="Standup"
              time="9 - 10:30"
            />
            {/* Tuesday 11-12 */}
            <EventBlock
              dayIdx={1}
              totalDays={5}
              topPct={33}
              heightPct={17}
              color="hsl(152 60% 45%)"
              title="Design Review"
              time="11 - 12"
            />
            {/* Wednesday 10-11:30 */}
            <EventBlock
              dayIdx={2}
              totalDays={5}
              topPct={17}
              heightPct={25}
              color="hsl(25 95% 55%)"
              title="Sprint Planning"
              time="10 - 11:30"
            />
            {/* Thursday 9-10 */}
            <EventBlock
              dayIdx={3}
              totalDays={5}
              topPct={0}
              heightPct={17}
              color="hsl(220 72% 50%)"
              title="1:1 w/ Alex"
              time="9 - 10"
            />
            {/* Thursday 1-3 */}
            <EventBlock
              dayIdx={3}
              totalDays={5}
              topPct={55}
              heightPct={33}
              color="hsl(330 65% 55%)"
              title="Workshop"
              time="1 - 3"
            />
            {/* Friday 12-1 */}
            <EventBlock
              dayIdx={4}
              totalDays={5}
              topPct={48}
              heightPct={17}
              color="hsl(0 72% 52%)"
              title="Lunch & Learn"
              time="12 - 1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function EventBlock({
  dayIdx,
  totalDays,
  topPct,
  heightPct,
  color,
  title,
  time,
}: {
  dayIdx: number
  totalDays: number
  topPct: number
  heightPct: number
  color: string
  title: string
  time: string
}) {
  const leftPct = (dayIdx / totalDays) * 100
  const widthPct = 100 / totalDays

  return (
    <div
      className="absolute flex flex-col justify-start overflow-hidden"
      style={{
        left: `${leftPct + 0.5}%`,
        width: `${widthPct - 1}%`,
        top: `${topPct + 2}%`,
        height: `${heightPct - 2}%`,
        backgroundColor: color,
        opacity: 0.9,
        borderRadius: 6,
        padding: "6px 8px",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "white",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontSize: 10,
          color: "hsla(0,0%,100%,0.7)",
          lineHeight: 1.3,
        }}
      >
        {time}
      </span>
    </div>
  )
}
