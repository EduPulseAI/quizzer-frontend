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
├── coding-quizzer/    # Main quiz application (port 4200)
├── career-forge/      # Career forge app (standalone with own package.json)
└── session-app/       # Session management app

features/              # Shared feature libraries (@edupulse/* or @feature/*)
├── quiz/              # Quiz feature (@edupulse/quiz)
├── ui/                # UI components (@feature/ui) - shadcn/Radix based
├── base/              # Base utilities (@feature/base)
├── auth/              # Authentication (@feature/auth)
├── session/           # Session management (@edupulse/session)
├── question/          # Question handling (@edupulse/question)
├── sse/               # Server-sent events (@edupulse/sse)
└── topic/             # Topic management (@feature/topic)

clients/               # API client libraries
└── api-client/        # @edupulse/api-client - axios-based API client
```

### Import Aliases (tsconfig.base.json)

```typescript
// App imports
import { Component } from '@app/coding-quizzer/components/Component';

// Feature imports (two naming conventions)
import { Component } from '@feature/ui';           // @feature/* for ui, base, topic, auth
import { useQuiz } from '@edupulse/quiz';          // @edupulse/* for quiz, session, question, sse

// Server-only exports
import { serverAction } from '@edupulse/quiz/server';

// API client
import { ApiClient, ApiError } from '@edupulse/api-client';
```

### Feature Library Structure

Each feature library follows this pattern:
```
features/<name>/src/
├── index.ts           # Client exports
├── server.ts          # Server-only exports
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
- **Auth:** next-auth v5 beta

## Code Generation (next-feature plugin)

The monorepo uses `next-feature` generators. Default project is configured in `nx.json`.

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

## Application-Specific Notes

### career-forge
- Has its own `package.json` and `pnpm-lock.yaml` (standalone dependencies)
- Uses Next.js App Router with route groups: `(app)`, `(auth)`, `admin`
- Has middleware.ts for auth protection
- Environment: `.env` file in app directory

### coding-quizzer
- Main quiz application
- Uses turbo mode for dev server
- Source in `src/` directory (different from career-forge)

## Testing

- Jest is the default test runner
- Feature libraries may use Vitest (check individual `project.json`)
- Test files: `*.spec.ts` or `*.spec.tsx`
- Coverage: `npx nx test <project> -- --coverage`

## Build Outputs

- Apps build to: `dist/apps/<app-name>/`
- Libraries build to: `dist/features/<lib-name>/`
