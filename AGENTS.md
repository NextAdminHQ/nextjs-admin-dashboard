# NextAdmin Pro — AI Agent Rules

> Next.js admin dashboard template · Tailwind CSS · React Aria · Recharts · TanStack Table

## Project structure

```
src/
  app/
    (with-layouts)/   # route groups sharing a layout
      (dashboard)/ (forms)/ (pages)/ (support)/   # grouped routes
      calendar/ charts/ tables/ ui-elements/        # top-level feature routes
      manage-team/ profile/ task/                   # misc top-level routes
    (without-layouts)/                              # routes without the shell
    css/                                             # global + calendar overrides
    globals.css  layout.tsx  providers.tsx
  components/
    tailgrids/core/                                  # design-system primitives (Button, Card, …)
    common/                                          # shared app chrome (sidebar, header, previews)
  services/api/                                      # one folder per feature (ai,    analytics, crm, …)
  hooks/                                             # cross-cutting client hooks
  utils/                                             # cn, formatters, icon map
  types/                                             # ambient module declarations
```

Drill into a specific folder to discover its files — naming is kebab-case for files, PascalCase for component exports.

## Next.js

This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Conventions

- App Router with route groups under `src/app/(with-layouts)/` — groups: `(dashboard)`, `(forms)`, `(pages)`, `(support)`, plus top-level feature dirs (`calendar`, `charts`, `tables`, etc.).
- Prefer Client Components but keep `layout.tsx` SSR; add `"use client"` when necessary.
- File naming: kebab-case for files, PascalCase for component exports.

## Styling rules

- Use **Tailwind CSS** with the project's **semantic tokens** (`text-text-*`, `bg-card-*`, `border-*`, etc.).
- Never hardcode hex colors — always reference tokens from `src/app/globals.css`.
- Do NOT create new CSS utility classes.
- FullCalendar overrides belong in `src/app/css/calendars.css`.

## Component rules

- **Modular sub-components**: Never place all code into a single monolithic file. Split complex UI into focused, single-responsibility sub-components in separate files (e.g. `header.tsx`, `filter-bar.tsx`, `card-item.tsx`).
- **Follow React composition best practices**:
    - **Single Responsibility**: Keep sub-components focused on one concern—separate container/state logic from presentational rendering.
    - **Composition over prop drilling**: Prefer passing `children` or using compound component patterns over passing deeply nested props through intermediate layers.
    - **Avoid inline render helpers**: Extract repeated or section-level JSX into dedicated sub-component files rather than helper functions like `renderHeader()` inside `index.tsx`.
    - **Typed prop contracts**: Define explicit, strongly typed interfaces for each sub-component in `types.ts` or co-located with the sub-component.
- Prefer primitives from `src/components/tailgrids/core/` (Button, Card, Badge, Select, Tabs, Dialog, etc.) over raw HTML or third-party equivalents.
- Use `react-aria` skill for accessible component architecture when building interactive primitives.
- Icons: use `@tailgrids/icons` for standard controls. For feature-local icons, place them in `icons.tsx`. Never generate SVG icons — use letter placeholders if no icon is available.
- Add `"use client"` directive when the component uses hooks, event handlers, or browser APIs.

## Data fetching & state

- Always use `api-integration` skill for API integration.
- Client-side state: use React context or URL search params. Don't introduce new state libraries.

## Forms, charts, tables

- React Aria-backed primitives with composed label/error; Sonner `toast.*` for feedback (`Toaster` is mounted globally).
- Recharts are Client Components — wrap in Cards with `ChartContainer` and an explicit height; custom tooltips in `custom-tooltip.tsx`; unique gradient IDs per chart.
- TanStack Table for sorting/filtering/pagination; keep types, columns, mappings, and skeletons in separate feature files; render cells via `flexRender`; Badges for statuses.

## Don'ts

- Don't install new packages without asking the user.
- Don't overwrite primitives in `src/components/tailgrids/core/` without asking.
- Don't create new CSS utility classes — use existing tokens.
- Don't place pages outside the `(with-layouts)` route group unless intentional.
