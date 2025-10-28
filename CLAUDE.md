# sa-akrogoniaios - Project Configuration

> This document summarizes the configuration of this project, generated for easy reference and maintenance.

## Project Overview

A modern TypeScript + React web application with TanStack Router, styled with Tailwind CSS v4, and built with Vite.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | 7.1.7 | Build tool and dev server |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **React** | 19.2.0 | UI framework |
| **TanStack Router** | 1.133.32 | Client-side routing |
| **Tailwind CSS** | 4.1.16 | Utility-first CSS framework |
| **Playwright** | 1.56.1 | End-to-end testing |
| **Bun** | - | Package manager & runtime |

---

## Configuration Details

### 1. Vite Configuration

**File:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Tailwind v4 Vite plugin
  ],
  server: {
    host: true,      // Accessible from network
    port: 4567,      // Custom port
  },
})
```

**Key Points:**
- Uses the official Tailwind CSS v4 Vite plugin (`@tailwindcss/vite`)
- Dev server runs on port **4567**
- Accessible from network (not just localhost)

---

### 2. TypeScript Configuration

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src"]
}
```

**Key Points:**
- Strict mode enabled
- Target: ES2022
- Module resolution: "bundler" (optimized for Vite)
- No emit (Vite handles compilation)

---

### 3. Tailwind CSS v4 Setup

**Installation:**
```bash
bun add -D tailwindcss @tailwindcss/vite
```

**CSS Import:** `src/style.css`
```css
@import "tailwindcss";
```

**Configuration:**
- **No `tailwind.config.js` needed** - Tailwind v4 uses CSS-based configuration
- **No PostCSS config needed** - Handled by `@tailwindcss/vite` plugin
- Tailwind classes automatically scoped to `src/**/*.{js,ts,jsx,tsx}` and `index.html`

**Migration from v3:**
- ❌ OLD: `@tailwind base; @tailwind components; @tailwind utilities;`
- ✅ NEW: `@import "tailwindcss";`

---

### 4. TanStack Router Setup

**Installation:**
```bash
bun add @tanstack/react-router
```

**Route Structure:**
```
src/routes/
├── __root.tsx    # Root layout with navigation
├── index.tsx     # Home page (/)
└── hello.tsx     # Hello page (/hello)
```

**Router Configuration:** `src/main.tsx`

```typescript
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { helloRoute } from './routes/hello'

const routeTree = rootRoute.addChildren([indexRoute, helloRoute])
const router = createRouter({ routeTree })
```

**Key Points:**
- Manual route tree setup (not file-based routing)
- Each route uses `createRoute` with `getParentRoute`
- Type-safe navigation with TypeScript

---

### 5. Bun Package Manager

**Installation:**
```bash
bun add <package>      # Add dependency
bun add -D <package>   # Add dev dependency
bun remove <package>   # Remove package
```

**Scripts:**
```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
```

**Lockfile:** `bun.lock` (binary format, managed by Bun)

---

### 6. Playwright Testing

**Installation:**
```bash
bun add -D playwright @playwright/test
bunx playwright install chromium
sudo npx playwright install-deps chromium  # System dependencies
```

**Test Files:**
- `test-pages.spec.ts` - Main page tests
- `debug-test.spec.ts` - Debug helper tests

**Running Tests:**
```bash
bunx playwright test                        # Run all tests
bunx playwright test test-pages.spec.ts    # Run specific test
bunx playwright test --reporter=line       # Minimal output
```

**Key Points:**
- Chromium browser installed
- Tests verify both routes (/ and /hello)
- Includes navigation tests

---

### 7. Git Configuration

**User:**
- Name: Chris Desrochers
- Email: 5728227+chrisdesrochers@users.noreply.github.com

**Repository:**
- GitHub: https://github.com/superabundant-builds/sa-akrogoniaios
- Default Branch: **master** (not main)
- Organization: superabundant-builds

**GitHub CLI:**
```bash
gh auth login              # Authenticate
gh auth setup-git          # Configure git to use gh for auth
gh repo create org/name    # Create repository
```

**Gitignore Highlights:**
```
node_modules/
dist/
*.local
test-results/
*.png
```

---

## Project Structure

```
sa-akrogoniaios/
├── public/
│   └── vite.svg
├── src/
│   ├── routes/
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Home route
│   │   └── hello.tsx       # Hello route
│   ├── main.tsx            # App entry point
│   ├── style.css           # Global styles + Tailwind
│   ├── counter.ts          # Counter component logic
│   └── typescript.svg
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
├── bun.lock                # Lockfile
├── .gitignore
├── test-pages.spec.ts      # Playwright tests
└── CLAUDE.md               # This file
```

---

## Development Workflow

### Starting Development Server
```bash
bun run dev
```
Server runs at: http://localhost:4567/

### Running Tests
```bash
bunx playwright test test-pages.spec.ts --reporter=line
```

### Making Changes
1. Edit files in `src/`
2. Vite hot-reloads automatically
3. Tailwind utility classes are processed on-the-fly
4. TypeScript errors show in terminal

### Adding New Routes
1. Create new file in `src/routes/` (e.g., `about.tsx`)
2. Export route using `createRoute`:
   ```typescript
   import { createRoute } from '@tanstack/react-router'
   import { rootRoute } from './__root'

   export const aboutRoute = createRoute({
     getParentRoute: () => rootRoute,
     path: '/about',
     component: About,
   })

   function About() {
     return <div><h1>About</h1></div>
   }
   ```
3. Add route to tree in `src/main.tsx`:
   ```typescript
   const routeTree = rootRoute.addChildren([
     indexRoute,
     helloRoute,
     aboutRoute,  // Add here
   ])
   ```

### Using Tailwind Utilities
Tailwind v4 works the same as v3 for utility classes:
```tsx
<div className="flex items-center gap-4 p-4">
  <h1 className="text-3xl font-bold underline">Hello</h1>
</div>
```

---

## Common Commands

```bash
# Development
bun run dev                    # Start dev server
bun run build                  # Build for production
bun run preview                # Preview production build

# Testing
bunx playwright test           # Run all tests
bunx playwright test --ui      # Interactive test UI

# Git
git add .                      # Stage changes
git commit -m "message"        # Commit
git push                       # Push to GitHub

# GitHub CLI
gh repo view                   # View repo details
gh pr create                   # Create pull request
gh issue list                  # List issues
```

---

## Notes

- **Tailwind v4** requires the `@tailwindcss/vite` plugin - do not use PostCSS
- **Router** uses manual route tree, not file-based routing
- **Tests** require dev server to be running
- **Git** default branch is `master` per project requirements
- **Port 4567** is used instead of default 5173

---

Generated with Claude Code
