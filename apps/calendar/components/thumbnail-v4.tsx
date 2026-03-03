"use client"

import { Sparkles, CalendarDays, ArrowRight } from "lucide-react"

/**
 * Variant 4 -- "Split Hero"
 * Left side: bold typography with tagline and CTA.
 * Right side: a stacked trio of event cards fanning outward.
 * Clean, marketable, hero-banner feel.
 */
export function ThumbnailV4() {
  return (
    <div
      className="relative flex overflow-hidden"
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "hsl(224 20% 6%)",
      }}
    >
      {/* Gradient accent line at top */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, hsl(220 72% 50%), hsl(220 72% 60%), hsl(152 60% 50%))",
        }}
      />

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsla(220,14%,25%,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* === LEFT: Typography === */}
      <div
        className="relative flex flex-1 flex-col justify-center"
        style={{
          paddingLeft: 72,
          paddingRight: 40,
          zIndex: 20,
        }}
      >
        {/* Logo badge */}
        <div
          className="flex items-center gap-2.5"
          style={{ marginBottom: 28 }}
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
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "hsl(220 72% 60%)",
              letterSpacing: "0.02em",
            }}
          >
            Chronos
          </span>
        </div>

        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "hsl(210 15% 95%)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          Ship your
          <br />
          <span style={{ color: "hsl(220 72% 55%)" }}>calendar app</span>
          <br />
          faster.
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "hsl(220 10% 55%)",
            lineHeight: 1.6,
            maxWidth: 360,
            marginBottom: 32,
          }}
        >
          Production-ready calendar components, AI scheduling tools, and event management. Fork it, brand it, ship it.
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2"
            style={{
              backgroundColor: "hsl(220 72% 50%)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: 8,
            }}
          >
            Use this template
            <ArrowRight style={{ width: 14, height: 14 }} />
          </div>
          <div
            className="flex items-center gap-1.5"
            style={{
              fontSize: 13,
              color: "hsl(220 10% 50%)",
              fontWeight: 500,
            }}
          >
            <Sparkles style={{ width: 13, height: 13, color: "hsl(220 72% 60%)" }} />
            Next.js + AI SDK
          </div>
        </div>
      </div>

      {/* === RIGHT: Stacked event cards === */}
      <div
        className="relative flex flex-1 items-center justify-center"
        style={{ zIndex: 20 }}
      >
        {/* Glow behind cards */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, hsla(220,72%,55%,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Card 3 (back) */}
        <div
          className="absolute flex flex-col gap-2"
          style={{
            width: 340,
            top: 120,
            right: 40,
            backgroundColor: "hsl(224 18% 9%)",
            border: "1px solid hsl(220 14% 16%)",
            borderRadius: 10,
            padding: "18px 22px",
            boxShadow: "0 12px 24px -6px hsla(220,72%,10%,0.3)",
            transform: "rotate(6deg) translateY(24px)",
            zIndex: 1,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "hsl(330 65% 58%)",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 600, color: "hsl(210 15% 85%)" }}>
              Sprint Retrospective
            </span>
          </div>
          <span style={{ fontSize: 12, color: "hsl(220 10% 45%)" }}>
            4:00 PM - 5:00 PM
          </span>
        </div>

        {/* Card 2 (middle) */}
        <div
          className="absolute flex flex-col gap-2"
          style={{
            width: 360,
            top: 200,
            right: 70,
            backgroundColor: "hsl(224 18% 9%)",
            border: "1px solid hsl(220 14% 16%)",
            borderRadius: 10,
            padding: "18px 22px",
            boxShadow: "0 16px 32px -8px hsla(220,72%,10%,0.4)",
            transform: "rotate(2deg)",
            zIndex: 2,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "hsl(152 60% 50%)",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 600, color: "hsl(210 15% 88%)" }}>
              Design Review
            </span>
          </div>
          <span style={{ fontSize: 12, color: "hsl(220 10% 45%)" }}>
            2:00 PM - 3:00 PM
          </span>
          <div className="flex gap-1 mt-1">
            {["hsl(220 72% 55%)", "hsl(25 95% 55%)", "hsl(152 60% 50%)"].map(
              (bg, i) => (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: bg,
                    border: "2px solid hsl(224 18% 9%)",
                    marginLeft: i > 0 ? -6 : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {["S", "M", "L"][i]}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Card 1 (front) */}
        <div
          className="absolute flex flex-col gap-3"
          style={{
            width: 380,
            top: 300,
            right: 55,
            backgroundColor: "hsl(224 18% 9%)",
            border: "1px solid hsl(220 14% 16%)",
            borderRadius: 10,
            padding: "22px 26px",
            boxShadow:
              "0 24px 48px -12px hsla(220,72%,10%,0.5), 0 0 0 1px hsla(220,14%,20%,0.1)",
            transform: "rotate(-2deg)",
            zIndex: 3,
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 20,
              right: 20,
              height: 3,
              borderRadius: "0 0 3px 3px",
              backgroundColor: "hsl(220 72% 55%)",
            }}
          />
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <span style={{ fontSize: 16, fontWeight: 600, color: "hsl(210 15% 92%)" }}>
                Product Strategy Sync
              </span>
              <span style={{ fontSize: 12, color: "hsl(220 10% 45%)" }}>
                10:00 AM - 11:00 AM
              </span>
            </div>
            <div
              className="flex items-center gap-1.5"
              style={{
                backgroundColor: "hsla(220,72%,55%,0.12)",
                color: "hsl(220 72% 65%)",
                fontSize: 11,
                fontWeight: 500,
                padding: "3px 8px",
                borderRadius: 5,
              }}
            >
              <Sparkles style={{ width: 10, height: 10 }} />
              AI
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
