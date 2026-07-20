# NextAdmin Pro — AI Agent Rules

> Next.js admin dashboard template · Tailwind CSS · React Aria · Recharts · TanStack Table

- [Next.js](#nextjs)
- [Conventions](#conventions)
- [Styling](#styling)
- [Components & icons](#components--icons)
- [Data fetching & state](#data-fetching--state)
- [Forms, charts, tables](#forms-charts-tables)
- [Don'ts](#donts)
- [Verification](#verification)

## Next.js

This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Conventions

- App Router with route groups under `src/app/(with-layouts)/` — groups: `(dashboard)`, `(forms)`, `(pages)`, `(support)`, plus top-level feature dirs (`calendar`, `charts`, `tables`, etc.).
- Prefer Client Components but keep `layout.tsx` SSR; add `"use client"` when necessary.
- File naming: kebab-case for files, PascalCase for component exports.

## Styling

- Never hardcode hex colors — use semantic tokens (`text-text-*`, `bg-card-*`, `border-*`, etc.). Look up the full list in `src/app/css/default.css` (light) and `src/app/css/dark.css` (dark).
- Keep both theme files aligned; map via `globals.css`.
- FullCalendar overrides belong in `src/app/css/calendars.css`.

## Components & icons

- Prefer primitives in `src/components/tailgrids/core/` over raw implementations.
- Use `react-aria` skill for component architecture.
- Icons: `@tailgrids/icons` for standard controls, feature-local `icons.tsx` otherwise. Never generate SVG icons — use letters as placeholders.

## Data fetching & state

- Always use `api-integration` skill for API integration.
- Client-side state: use React context or URL search params. Don't introduce new state libraries.

## Forms, charts, tables

- React Aria-backed primitives with composed label/error; Sonner `toast.*` for feedback (`Toaster` is mounted globally).
- Recharts are Client Components — wrap in Cards with `ChartContainer` and an explicit height; custom tooltips in `custom-tooltip.tsx`; unique gradient IDs per chart.
- TanStack Table for sorting/filtering/pagination; keep types, columns, mappings, and skeletons in separate feature files; render cells via `flexRender`; Badges for statuses.

## Don'ts

- Don't install new packages without asking.
- Don't overwrite primitives in `src/components/tailgrids/core/` without asking.
- Don't create new CSS utility classes — use existing tokens.
- Don't place pages outside the `(with-layouts)` route group unless intentional.
