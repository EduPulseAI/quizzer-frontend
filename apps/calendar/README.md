# Chronos - Calendar Starter Kit

A production-ready set of calendar components and AI scheduling tools built with Next.js, shadcn/ui, and the Vercel AI SDK. Chronos is designed as a starting point -- fork it, swap the branding, wire up your own data source, and ship something new.

## What You Get

- **Month, Week & Day view components** - Three self-contained calendar views with smooth navigation and a chip-style view switcher. Drop them into any layout or use them individually.
- **Event management system** - Create, edit, and delete events with color coding, all-day support, and descriptions via modal dialogs. The event model is intentionally simple so you can extend it with your own fields.
- **AI chat panel** - A pre-wired chat component using AI SDK 6 and the Vercel AI Gateway. Swap the system prompt and tools to fit your domain.
- **Agent settings panel** - Model selector, temperature slider, and editable system prompt out of the box. A foundation for any AI-powered feature you want to add.
- **Themed design tokens** - Light and dark modes via CSS custom properties. Override the token values in `globals.css` to match your brand in minutes.
- **Mobile-first components** - Responsive header, full-screen mobile menu (hamburger on the right), and floating action buttons you can reuse across any layout.
- **Homepage showcase** - An auto-advancing thumbnail carousel, feature cards, and explore links so visitors immediately see what the kit includes.
- **Brand assets page** - App icons, favicon, and OG image at `/brand`, all inline SVGs you can customize.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **AI**: Vercel AI SDK 6 with AI Gateway (supports GPT-5, Claude, Grok, and more)
- **State**: useSyncExternalStore-based reactive store (no external state library needed)
- **Theming**: next-themes with CSS custom properties

## Architecture

```
app/
  page.tsx                    # Homepage -- thumbnail carousel, feature cards, explore links
  calendar/page.tsx           # Live demo -- renders CalendarApp
  brand/page.tsx              # Brand assets -- icons, OG image, customization notes
  thumbnail/page.tsx          # Full-size thumbnail renderer (?v=1-4)
  api/chat/route.ts           # AI chat streaming endpoint
  layout.tsx                  # Root layout with ThemeProvider

components/calendar/
  calendar-app.tsx            # Main orchestrator component
  header.tsx                  # Top bar with nav, view switcher, actions
  month-view.tsx              # Monthly grid with event indicators
  week-view.tsx               # 7-column time grid
  day-view.tsx                # Single day hour-by-hour view
  event-dialog.tsx            # Create/edit event modal
  chat-panel.tsx              # AI assistant dialog
  settings-modal.tsx          # Agent config with model/temp/prompt

components/marketing/
  brand-assets.tsx            # SVG icons and OG image
  template-listing.tsx        # Marketplace listing card

lib/
  calendar-store.ts           # Reactive state store for events, view, settings
  date-utils.ts               # Date math and formatting helpers
  types.ts                    # TypeScript types and event color constants
```

## Getting Started

Install and run using the shadcn CLI or clone from GitHub, then:

```bash
npm install
npm run dev
```

The AI assistant works out of the box via the Vercel AI Gateway when deployed to Vercel. For local development, set your `AI_GATEWAY_API_KEY` environment variable, or connect through the v0 integrations panel.

## Making It Yours

1. **Brand** - Update the color tokens in `globals.css` and the font imports in `layout.tsx`.
2. **Data** - Replace the in-memory event store in `calendar-store.ts` with your database of choice (Supabase, Neon, etc.).
3. **AI** - Edit the system prompt in the settings panel or add custom tools in `api/chat/route.ts`.
4. **Components** - Each view component is independent. Remove what you don't need or add your own alongside them.
