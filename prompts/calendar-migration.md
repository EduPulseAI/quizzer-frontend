You are acting as a senior Nx monorepo migration engineer specializing in Next.js (App Router) and Tailwind CSS.

Your task is to migrate the calendar UI from a standalone app into the Nx monorepo feature structure, preserving styling and following workspace conventions.

# Mission

Migrate calendar UI from:

- source: ./apps/calendar/app/calendar/page.tsx

Into:

- feature: ./features/calendar/{components|hooks|utils|types|etc}

Then expose it in:

- target app: ./apps/career-forge (admin calendar route)

Final result:
- Career Forge renders the calendar UI via feature/calendar
- visual output matches the original calendar app as closely as possible
- minimal to no changes to Career Forge beyond adding the route/page
- all code follows Nx monorepo conventions

# Critical Constraints

1. This is a Tailwind/CSS migration task first.
2. Use ONLY:
   - ./apps/calendar/app/calendar/page.tsx
3. Do NOT migrate the entire calendar app.
4. Extract only what is required to render the page.
5. Output MUST live under:
   - ./features/calendar/*
6. Follow conventions from:
   - ./apps/career-forge
7. Tailwind must be adapted to the Nx workspace config.
8. Prefer reuse of existing workspace utilities/components.
9. Keep Career Forge changes minimal (route + import only).
10. Root workspace conventions override source app conventions.

# React / Next.js Rendering Rules (CRITICAL)

1. Prefer **Server Components by default**.
2. Only use `"use client"` when strictly required.

## Use Server Components when:
- rendering UI/layout
- static or derived data rendering
- no browser APIs are required
- no client-side interactivity is needed

## Use Client Components ONLY when:
- state (useState/useReducer) is required
- effects (useEffect) are required
- browser APIs (window, document) are used
- event handlers (onClick, etc.) are needed
- third-party libraries require client execution

## Additional Rules:
- push client boundaries as LOW as possible in the tree
- keep top-level feature components server-first
- isolate interactivity into small client components
- do NOT mark entire feature as client unnecessarily

# Primary Objective

Recreate the calendar page UI as a reusable feature module, preserving styling and behavior while adapting to Nx Tailwind and Career Forge conventions.

# Success Criteria

- Calendar UI matches source visually
- Tailwind works under workspace config
- Feature is reusable and cleanly structured
- Career Forge integration is minimal
- Server Components are used wherever possible
- Client Components are minimal and isolated

# Source of Truth

1. Visual/UI:
   - ./apps/calendar/app/calendar/page.tsx

2. Structure/conventions:
   - ./apps/career-forge

3. Styling system:
   - Nx workspace Tailwind config

4. Shared utilities:
   - existing monorepo code

---

# Phase 1: Analysis (DO NOT EDIT FILES)

## A. Source Analysis
Analyze:
- page structure
- UI sections
- imports
- dependencies
- hooks/utilities
- assets
- styling usage
- interactivity points

## B. Rendering Classification (NEW REQUIRED STEP)

For each part of the page, classify:

- Server Component
- Client Component (required)

Identify:
- where state is used
- where event handlers exist
- where browser APIs are used

Output:
- clear server vs client boundary map

## C. Tailwind/CSS Analysis
Identify:
- standard Tailwind classes
- custom theme dependencies
- unsupported utilities
- CSS modules/global styles
- layout dependencies

## D. Career Forge Conventions
Inspect:
- page structure patterns
- feature usage patterns
- styling conventions
- admin route patterns

## E. Reuse Opportunities
Check:
- shared UI
- utilities
- hooks
- class helpers
- icons
- layout components

## F. Feature Boundary Design
Determine:
- components
- hooks
- utils
- types

---

# Phase 1 Output

1. ANALYSIS SUMMARY
2. EXTRACTION MAP
3. RENDERING MAP (Server vs Client)  ← REQUIRED
4. TAILWIND MIGRATION NOTES
5. PROPOSED TARGET STRUCTURE

---

# Phase 2: Implementation Plan

## A. Extraction Plan
- component breakdown
- hook extraction
- utils/types

## B. Rendering Plan (NEW)
Define:
- which components are server
- which components are client
- where "use client" will exist
- justification for each client boundary

## C. Tailwind Migration Plan
- what stays
- what adapts
- token replacements
- layout fixes

## D. Career Forge Integration Plan
- route path
- page composition
- imports

## E. File Actions
- create
- modify
- untouched files

---

# Phase 2 Output

1. IMPLEMENTATION PLAN
2. RENDERING STRATEGY
3. FILE ACTIONS
4. INTEGRATION PLAN
5. MINIMAL DIFF STRATEGY

---

# Phase 3: Implementation

Order:

1. create feature/calendar structure
2. extract server components first
3. isolate client components only where needed
4. migrate Tailwind styles
5. reuse workspace utilities where safe
6. create Career Forge admin calendar page
7. integrate feature

---

# Implementation Rules

- default to server components
- isolate client logic
- do not over-split components
- preserve visual structure
- do not refactor unrelated code
- do not migrate unused files
- adapt Tailwind, don’t blindly copy

---

# Recommended Structure

Example (adapt as needed):

- features/calendar/components/CalendarFeature.tsx (server)
- features/calendar/components/CalendarGrid.tsx (server)
- features/calendar/components/CalendarHeader.tsx (server)
- features/calendar/components/InteractiveControls.tsx (client, if needed)
- features/calendar/hooks/useCalendarState.ts
- features/calendar/utils/calendar.ts
- features/calendar/types/calendar.ts
- features/calendar/index.ts

---

# Phase 4: Validation

## Structure
- correct feature placement
- clean separation

## Rendering
- server-first architecture respected
- minimal client usage

## Styling
- matches original layout
- Tailwind works correctly

## Scope
- no unrelated changes
- no full app migration

## Integration
- Career Forge route works
- feature renders correctly

---

# Final Output Format

1. ANALYSIS SUMMARY
2. EXTRACTION MAP
3. RENDERING MAP
4. TAILWIND MIGRATION NOTES
5. TARGET STRUCTURE
6. IMPLEMENTATION PLAN
7. RENDERING STRATEGY
8. FILE ACTIONS
9. EXECUTION
10. FINAL VALIDATION
11. UNRESOLVED ISSUES

---

# Additional Rules

## Monorepo
- reuse before copying
- follow naming conventions
- no new libs unless justified

## Tailwind
- preserve utilities
- adapt custom config
- avoid hidden dependencies

## Career Forge
- thin route layer
- feature owns logic
- minimal changes

## Change Minimization
- no broad refactors
- no config churn
- no unrelated edits

---

Begin with Phase 1 only:
Analyze ./apps/calendar/app/calendar/page.tsx and conventions in ./apps/career-forge.
Do NOT edit files until analysis and planning are complete.