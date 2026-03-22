# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **EduPulse frontend** - an NX monorepo containing multiple Next.js 15 applications with React 19 and TypeScript. It uses the `next-feature` plugin for code generation and follows a feature-based architecture.

**Package Manager:** pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Serve applications
npx nx serve coding-quizzer      # Main quiz app (port 4200)
npx nx serve career-forge        # Career forge app
npx nx serve session-app         # Session app

# Build
npx nx build coding-quizzer
npx nx build career-forge

# Test (Jest)
npx nx test coding-quizzer                              # All tests for app
npx nx test quiz                                        # Test a feature library
npx nx test coding-quizzer --testFile="path/to/test"   # Single test file
npx nx test coding-quizzer -- --watch                  # Watch mode

# Lint
npx nx lint coding-quizzer
npx nx lint coding-quizzer -- --fix

# Format
npx nx format:write

# Clear NX cache
npx nx reset

# Run affected tests/builds
npx nx affected:test
npx nx affected:build
```

## Architecture

### Monorepo Structure

```
apps/                  # Next.js applications
├── career-forge/      # Career platform app (standalone package.json)
├── coding-quizzer/    # Main quiz application (port 4200)
├── calendar/          # Calendar app
├── logistics/         # Logistics app
└── perplexity/        # Perplexity-clone app

features/              # Shared feature libraries
├── auth/              # Authentication (@edupulse/auth)
├── base/              # Base utilities (@feature/base)
├── calendar/          # Calendar feature (@edupulse/calendar)
├── profile/           # User profile (@edupulse/profile)
├── quiz/              # Quiz feature (@edupulse/quiz)
├── session/           # Session management (@edupulse/session)
├── sidebar/           # Sidebar navigation (@edupulse/sidebar)
├── sse/               # Server-sent events (@edupulse/sse)
└── ui/                # UI components (@feature/ui) - shadcn/Radix based

clients/               # API client libraries
└── api-client/        # @edupulse/api-client - axios-based API client
```

### Import Aliases (tsconfig.base.json)

```typescript
// App-specific imports
import { Component } from '@app/coding-quizzer/components/Component';
import { Component } from '@app/career-forge/components/Component';

// Feature imports
import { Component } from '@feature/ui';           // @feature/* for ui, base
import { useQuiz } from '@edupulse/quiz';          // @edupulse/* for quiz, session, auth, etc.
import { auth } from '@edupulse/auth';
import { getProfile } from '@edupulse/profile/server';
import { SidebarNav } from '@edupulse/sidebar';
import { CalendarView } from '@edupulse/calendar';

// Server-only exports (each feature has a /server entry point)
import { serverAction } from '@edupulse/quiz/server';

// API client
import { ApiClient, ApiError } from '@edupulse/api-client';
```

### Feature Library Structure

Each feature library follows this pattern:
```
features/<name>/src/
├── index.ts           # Client exports
├── server.ts          # Server-only exports (actions, server utilities)
└── lib/
    ├── actions/       # Server actions
    ├── components/    # React components
    ├── config/        # Configuration
    ├── constants/     # Constants and enums
    ├── stores/        # Zustand stores
    ├── types/         # TypeScript types
    └── utils/         # Utility functions
```

### Key Technologies

- **UI Components:** Radix UI primitives + shadcn/ui patterns (in `@feature/ui`)
- **Styling:** Tailwind CSS v4 with `tailwindcss-animate`
- **State:** Zustand for client state, TanStack Query for server state
- **Forms:** react-hook-form + zod validation
- **API:** axios via `@edupulse/api-client`
- **Auth:** next-auth v5 beta with JWT credentials provider + token refresh
- **Database (career-forge):** Prisma with PostgreSQL (schema at `apps/career-forge/prisma/schema.prisma`)

## Application-Specific Notes

### career-forge
- Has its own `package.json` and `pnpm-lock.yaml` (standalone dependencies)
- Uses Next.js App Router with route groups: `(app)`, `(auth)`, `admin`
- Has `middleware.ts` that re-exports `auth` from `@edupulse/auth` for route protection
- Prisma client generated to `apps/career-forge/prisma/generated/prisma/`
- Environment: `.env` file in app directory

### Auth (`@edupulse/auth`)
- NextAuth v5 with CredentialsProvider; calls backend `submitLogin` / `submitRefresh`
- JWT callbacks store `roles`, `jwtToken`, `refreshToken`, and `expiration` on the token
- Auto-refreshes JWT before expiration using `TOKEN_EXPIRATION_SKEW` config
- `auth.config.ts` in the auth feature holds route matchers used by middleware

### coding-quizzer
- Main quiz application
- Uses turbo mode for dev server
- Source in `src/` directory (different from career-forge)

## Code Generation (next-feature plugin)

The monorepo uses `next-feature` generators. Default project in `nx.json` is set to `calendar`.

```bash
# Generate component
npx nx g next-feature:component --name=UserCard --projectName=career-forge

# Generate server action
npx nx g next-feature:action --name=getUser --actionType=api --projectName=quiz

# Generate Zustand store
npx nx g next-feature:store --name=userStore --projectName=quiz

# Generate feature library
npx nx g next-feature:feature --name=payments

# Generate types/constants
npx nx g next-feature:data-type --name=User --projectName=quiz
npx nx g next-feature:constant --name=endpoints --projectName=quiz
```

## Testing

- Jest is the default test runner
- Feature libraries may use Vitest (check individual `project.json`)
- Test files: `*.spec.ts` or `*.spec.tsx`
- Coverage: `npx nx test <project> -- --coverage`

## Build Outputs

- Apps build to: `dist/apps/<app-name>/`
- Libraries build to: `dist/features/<lib-name>/`
