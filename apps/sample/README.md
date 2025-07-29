# 📘 Frontend Documentation

This document provides technical and code documentation for the
frontend component of the project, built using **NextJs**.
It includes architecture details, setup instructions, coding practices,
and troubleshooting guidance.

---

## 🧱 1. Technical Documentation

### 🧭 Architecture Overview

The frontend is a monorepo repo consisting of **single-page applications (SPA)** built with **NextJS** and optional **feature** libraries.

#### Key Components:

- **Apps** – Top-level route components.
- **Features** – Reusable UI building blocks.
- **Services** – API interaction logic (using `axios`).
- **State Management** – React Context API or external libraries (`Zustand`).

```txt
[ Pages ] → [ Components ] → [ Hooks/State ]
     ↓
[ Services (API) ] → [ Backend (Spring Boot) ]
```

### 🗂 Folder Structure

```
apps/
├── app1/                 # React/NextJs/Angular app
└── app2/
│
features/
├── base/
│  ├── src/
│  │  ├── components/     # UI components
│  │  ├── hooks/          # Custom hooks
│  │  └── lib/            # Route pages
│  │     ├── auth/        # Auth setup
│  │     ├── api/         # API calls
│  │     ├── axios/       # Axios configuration
│  │     ├── config/      # Other configurations
│  │     ├── types/       # Type declarations
│  │     └── utils/       # Contants and utility functions
│  └── .env               # Environment variables
├── package.json
├── nx.json
└── tsconfig.base.json
```

## 🧾 2. Code Documentation

### 🧠 Best Practices

- Use server components.
- Keep components small and reusable.
- Create page components directly in the app
- Place reusable components in the base feature

### 📝 Inline Comments Example

```tsx
// Fetch user data after component mounts
useEffect(() => {
  fetchUserData();
}, []);
```

### 📄 Component JSDoc Example

```tsx
/**
 * Renders the login form for users.
 */
export const LoginForm = () => { ... }
```

## ⚙️ Setup Guide

### 🧰 Prerequisites

- Node.js 18+
- `npm` or `yarn` or `pnpm`
- Code Editor (VSCode recommended)

### 🔧 Local Development

```bash
pnpm install
npx nx serve frontend
```

Visit [`http://localhost:4200`](http://localhost:5173) (NX Next) in your browser.

### 🌍 Environment Variables

Create a `.env`:

## 🔁 API Integration

Use axios or fetch to connect to backend APIs.

```ts
import axios from 'axios';
import { auth } from '../auth';
import { BACKEND_API_URL } from '../config';

export const api = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await auth();
    // configure Authorization
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (config) => {
    // configure response headers
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

## 🔬 Testing & Linting

- **Testing**: Jest + NextJS Testing Library
- **Linting**: ESLint, Prettier

```bash
npx nx test
npx nx lint
```

## 🚑 Troubleshooting

_*Todo*_

| Problem             | Solution                                   |
| ------------------- | ------------------------------------------ |
| API not working     | Check `.env` and CORS config on backend    |
| Styling not applied | Verify Tailwind/SCSS setup                 |
| NextJS build fails  | Check TypeScript errors or missing imports |

## 🔄 Change Log

Track changes in [`./CHANGELOG.md`](frontend/CHANGELOG.md). Example:

```markdown
## [1.0.0] - 2025-04-20

### Added

- Home, Login, and Dashboard pages
- Axios service layer

### Fixed

- Routing issue on refresh
```

## 📎 Related Links

- [NX Docs]()
- [NextJS Docs]()
- [Jest Testing]()
