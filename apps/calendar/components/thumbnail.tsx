"use client"

import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react"

export function Thumbnail() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "hsl(224 20% 6%)",
      }}
    >
      {/* Subtle radial glow behind composition */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsla(220,72%,55%,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* === Primary element: Event card === */}
      <div
        className="absolute flex flex-col gap-4"
        style={{
          width: 420,
          top: 140,
          left: 340,
          zIndex: 20,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 10,
          padding: "28px 32px",
          boxShadow:
            "0 24px 48px -12px hsla(220,72%,10%,0.5), 0 0 0 1px hsla(220,14%,20%,0.1)",
        }}
      >
        {/* Color accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 3,
            borderRadius: "0 0 3px 3px",
            backgroundColor: "hsl(220 72% 55%)",
          }}
        />

        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "hsl(210 15% 92%)",
                letterSpacing: "-0.01em",
              }}
            >
              Product Strategy Sync
            </span>
            <span
              style={{
                fontSize: 13,
                color: "hsl(220 10% 55%)",
              }}
            >
              Weekly recurring
            </span>
          </div>
          <div
            className="flex items-center gap-1.5"
            style={{
              backgroundColor: "hsla(220,72%,55%,0.12)",
              color: "hsl(220 72% 65%)",
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            <Sparkles style={{ width: 12, height: 12 }} />
            AI Scheduled
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <Clock
              style={{ width: 14, height: 14, color: "hsl(220 10% 45%)" }}
            />
            <span style={{ fontSize: 14, color: "hsl(210 15% 75%)" }}>
              10:00 AM - 11:00 AM
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <CalendarDays
              style={{ width: 14, height: 14, color: "hsl(220 10% 45%)" }}
            />
            <span style={{ fontSize: 14, color: "hsl(210 15% 75%)" }}>
              Thursday, Feb 6
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin
              style={{ width: 14, height: 14, color: "hsl(220 10% 45%)" }}
            />
            <span style={{ fontSize: 14, color: "hsl(210 15% 75%)" }}>
              Conference Room B
            </span>
          </div>
        </div>

        {/* Attendee row */}
        <div className="flex items-center gap-3" style={{ marginTop: 4 }}>
          <div className="flex -space-x-2">
            {["hsl(220 72% 55%)", "hsl(152 60% 50%)", "hsl(330 65% 60%)"].map(
              (bg, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: bg,
                    border: "2px solid hsl(224 18% 9%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {["A", "K", "J"][i]}
                </div>
              )
            )}
          </div>
          <span style={{ fontSize: 12, color: "hsl(220 10% 50%)" }}>
            +2 others
          </span>
        </div>
      </div>

      {/* === Secondary element: Mini week strip === */}
      <div
        className="absolute"
        style={{
          width: 320,
          top: 100,
          left: 100,
          zIndex: 10,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 10,
          padding: "20px 24px",
          boxShadow: "0 16px 32px -8px hsla(220,72%,10%,0.4)",
          transform: "rotate(-2deg)",
        }}
      >
        <div
          className="flex items-center gap-2"
          style={{ marginBottom: 16 }}
        >
          <CalendarDays
            style={{ width: 14, height: 14, color: "hsl(220 72% 55%)" }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "hsl(210 15% 80%)",
              letterSpacing: "-0.01em",
            }}
          >
            February 2026
          </span>
        </div>
        <div className="flex gap-1.5">
          {[
            { d: "M", n: "2" },
            { d: "T", n: "3" },
            { d: "W", n: "4" },
            { d: "T", n: "5" },
            { d: "F", n: "6", active: true },
            { d: "S", n: "7" },
            { d: "S", n: "8" },
          ].map((day, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{
                width: 36,
                padding: "6px 0",
                borderRadius: 8,
                backgroundColor: day.active
                  ? "hsl(220 72% 55%)"
                  : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: day.active
                    ? "white"
                    : "hsl(220 10% 45%)",
                  marginBottom: 2,
                }}
              >
                {day.d}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: day.active ? 700 : 500,
                  color: day.active
                    ? "white"
                    : "hsl(210 15% 75%)",
                }}
              >
                {day.n}
              </span>
              {/* Event dot indicators */}
              {(i === 1 || i === 4) && (
                <div
                  className="flex gap-0.5"
                  style={{ marginTop: 4 }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor:
                        i === 4
                          ? "white"
                          : "hsl(152 60% 50%)",
                    }}
                  />
                  {i === 4 && (
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "hsla(255,255,255,0.5)",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* === Tertiary element: Upcoming micro-list === */}
      <div
        className="absolute flex flex-col gap-2"
        style={{
          width: 220,
          bottom: 110,
          right: 160,
          zIndex: 15,
          backgroundColor: "hsl(224 18% 9%)",
          border: "1px solid hsl(220 14% 16%)",
          borderRadius: 10,
          padding: "16px 20px",
          boxShadow: "0 12px 24px -6px hsla(220,72%,10%,0.35)",
          transform: "rotate(1.5deg)",
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
          Up Next
        </span>
        {[
          { time: "11:30 AM", title: "Design Review", color: "hsl(152 60% 50%)" },
          { time: "2:00 PM", title: "1:1 with Alex", color: "hsl(25 95% 58%)" },
          { time: "4:15 PM", title: "Sprint Retro", color: "hsl(330 65% 60%)" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: item.color,
                flexShrink: 0,
              }}
            />
            <div className="flex flex-col">
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "hsl(210 15% 85%)",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </span>
              <span style={{ fontSize: 11, color: "hsl(220 10% 45%)" }}>
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
