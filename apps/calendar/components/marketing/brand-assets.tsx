"use client"

/**
 * SVG-based brand assets for Chronos.
 * Generated from: app name "Chronos", brand color hsl(220 72% 50%), calendar icon motif.
 * All rendered via inline SVG so they are right-click saveable.
 */

export function AppIcon512() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chronos App Icon 512x512"
    >
      <rect width="512" height="512" rx="112" fill="hsl(220 72% 50%)" />
      {/* Calendar body */}
      <rect
        x="116"
        y="156"
        width="280"
        height="240"
        rx="24"
        fill="white"
        fillOpacity="0.15"
      />
      {/* Calendar header bar */}
      <rect
        x="116"
        y="156"
        width="280"
        height="56"
        rx="24"
        fill="white"
        fillOpacity="0.25"
      />
      <rect x="116" y="188" width="280" height="24" fill="white" fillOpacity="0.25" />
      {/* Calendar holes */}
      <rect x="188" y="132" width="16" height="48" rx="8" fill="white" fillOpacity="0.9" />
      <rect x="308" y="132" width="16" height="48" rx="8" fill="white" fillOpacity="0.9" />
      {/* Grid dots representing days */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={156 + col * 34}
            cy={240 + row * 30}
            r={row === 2 && col === 3 ? 10 : 4}
            fill="white"
            fillOpacity={row === 2 && col === 3 ? 0.9 : 0.35}
          />
        ))
      )}
      {/* Clock hand overlay (the "smart" part) */}
      <circle cx="354" cy="354" r="60" fill="hsl(224 20% 6%)" />
      <circle cx="354" cy="354" r="52" fill="none" stroke="white" strokeWidth="3" strokeOpacity="0.8" />
      <line x1="354" y1="354" x2="354" y2="318" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <line x1="354" y1="354" x2="378" y2="354" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <circle cx="354" cy="354" r="4" fill="white" />
    </svg>
  )
}

export function AppIcon180() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chronos Apple Touch Icon 180x180"
    >
      <rect width="512" height="512" rx="112" fill="hsl(220 72% 50%)" />
      <rect x="116" y="156" width="280" height="240" rx="24" fill="white" fillOpacity="0.15" />
      <rect x="116" y="156" width="280" height="56" rx="24" fill="white" fillOpacity="0.25" />
      <rect x="116" y="188" width="280" height="24" fill="white" fillOpacity="0.25" />
      <rect x="188" y="132" width="16" height="48" rx="8" fill="white" fillOpacity="0.9" />
      <rect x="308" y="132" width="16" height="48" rx="8" fill="white" fillOpacity="0.9" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={156 + col * 34}
            cy={240 + row * 30}
            r={row === 2 && col === 3 ? 10 : 4}
            fill="white"
            fillOpacity={row === 2 && col === 3 ? 0.9 : 0.35}
          />
        ))
      )}
      <circle cx="354" cy="354" r="60" fill="hsl(224 20% 6%)" />
      <circle cx="354" cy="354" r="52" fill="none" stroke="white" strokeWidth="3" strokeOpacity="0.8" />
      <line x1="354" y1="354" x2="354" y2="318" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <line x1="354" y1="354" x2="378" y2="354" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <circle cx="354" cy="354" r="4" fill="white" />
    </svg>
  )
}

export function Favicon32() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chronos Favicon 32x32"
    >
      <rect width="512" height="512" rx="112" fill="hsl(220 72% 50%)" />
      {/* Simplified: just calendar + "C" letterform for small sizes */}
      <rect x="120" y="160" width="272" height="232" rx="28" fill="white" fillOpacity="0.2" />
      <rect x="120" y="160" width="272" height="56" rx="28" fill="white" fillOpacity="0.3" />
      <rect x="120" y="196" width="272" height="20" fill="white" fillOpacity="0.3" />
      <text
        x="256"
        y="340"
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontFamily="system-ui, sans-serif"
        fontSize="140"
        fontWeight="700"
      >
        C
      </text>
    </svg>
  )
}

export function OgImage() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 630"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chronos OG Image 1200x630"
    >
      <rect width="1200" height="630" fill="hsl(224 20% 6%)" />
      {/* Brand glow */}
      <circle cx="600" cy="315" r="300" fill="hsl(220 72% 50%)" fillOpacity="0.06" />
      {/* Icon */}
      <g transform="translate(440, 140) scale(0.68)">
        <rect width="512" height="512" rx="112" fill="hsl(220 72% 50%)" />
        <rect x="116" y="156" width="280" height="240" rx="24" fill="white" fillOpacity="0.15" />
        <rect x="116" y="156" width="280" height="56" rx="24" fill="white" fillOpacity="0.25" />
        <rect x="116" y="188" width="280" height="24" fill="white" fillOpacity="0.25" />
        <rect x="188" y="132" width="16" height="48" rx="8" fill="white" fillOpacity="0.9" />
        <rect x="308" y="132" width="16" height="48" rx="8" fill="white" fillOpacity="0.9" />
        <circle cx="354" cy="354" r="60" fill="hsl(224 20% 6%)" />
        <circle cx="354" cy="354" r="52" fill="none" stroke="white" strokeWidth="3" strokeOpacity="0.8" />
        <line x1="354" y1="354" x2="354" y2="318" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="354" y1="354" x2="378" y2="354" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
        <circle cx="354" cy="354" r="4" fill="white" />
      </g>
      {/* App name */}
      <text
        x="600"
        y="540"
        textAnchor="middle"
        fill="hsl(210 15% 92%)"
        fontFamily="system-ui, sans-serif"
        fontSize="32"
        fontWeight="600"
        letterSpacing="-0.01em"
      >
        Chronos
      </text>
      <text
        x="600"
        y="575"
        textAnchor="middle"
        fill="hsl(220 10% 50%)"
        fontFamily="system-ui, sans-serif"
        fontSize="16"
        fontWeight="400"
      >
        Calendar Starter Kit
      </text>
    </svg>
  )
}
