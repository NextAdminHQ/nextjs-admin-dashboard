# Task

You are helping rebrand this Next.js project. Follow these steps **in order** — do not skip ahead or start editing early.

## Step 1 — Ask for the branding inputs

Before touching any files, ask me for the following. Ask everything in a single message so I can answer it all at once.

1. **Product name** — short brand name shown in the sidebar logo area and on auth pages (e.g. "Acme"). Current value: `NextAdmin`.
2. **Site title** — shown in the browser tab and as the default `<title>`. Used both as the page-title default and as the suffix in the title template (`%s | <site title>`). Current value: `NextAdmin - Next.js Dashboard Kit`.
3. **Meta description** — roughly 150 characters, used for SEO in `layout.tsx`. Current value: `Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.`
4. **AGENTS.md headline** — the H1 title at the top of `AGENTS.md`. Current value: `NextAdmin Pro — AI Agent Rules`.
5. **AGENTS.md sub-heading** — the blockquote descriptor line under the headline in `AGENTS.md`. Current value: `Next.js admin dashboard template · Tailwind CSS · React Aria · Recharts · TanStack Table`.

Do **not** ask me for logo files, SVGs, or images — those are handled manually at the very end, not by you.

Do not make any file edits until I've given you all five answers.

## Step 2 — Confirm before applying

Once I've answered, show me a summary table of exactly what will change:

```
Product name       : <new value>
Site title         : <new value>
Meta description   : <new value>
AGENTS.md headline : <new value>
AGENTS.md sub-line : <new value>
```

Then ask: **"Shall I apply all of these changes?"** Wait for my explicit approval before touching any files.

## Step 3 — Apply the changes

Once I approve, apply the edits below using targeted find-and-replace — never rewrite a whole file when a precise replacement will do.

### `AGENTS.md`

| Find                                                                                         | Replace with                    |
| -------------------------------------------------------------------------------------------- | ------------------------------- |
| `# NextAdmin Pro — AI Agent Rules`                                                           | `# <new AGENTS.md headline>`    |
| `> Next.js admin dashboard template · Tailwind CSS · React Aria · Recharts · TanStack Table` | `> <new AGENTS.md sub-heading>` |

### `src/app/layout.tsx`

Replace the `metadata` export with:

```tsx
export const metadata: Metadata = {
  title: {
    template: "%s | <new site title>",
    default: "<new site title>",
  },
  description: "<new meta description>",
};
```

### Auth brand sidebars (same product-name edit in all four files)

- `src/app/(with-layouts)/auth/sign-in/_components/sign-in-form/brand-sidebar.tsx`
- `src/app/(with-layouts)/auth/sign-up/_components/sign-up-form/brand-sidebar.tsx`
- `src/app/(with-layouts)/auth/reset-password/_components/reset-password-form/brand-sidebar.tsx`
- `src/app/(with-layouts)/auth/two-step-verification/_components/two-step-verification-form/brand-sidebar.tsx`

```tsx
{/* Before */}
<span className="text-[34px] font-bold tracking-tight">NextAdmin</span>

{/* After */}
<span className="text-[34px] font-bold tracking-tight"><new product name></span>
```

## Step 4 — Verify

- Confirm the dev server (`npm run dev`) hasn't reported any TypeScript or compilation errors.
- Summarize every file you changed and exactly what was updated in each.

## Step 5 — Remind me about the logo (do this last, after everything else)

Do not edit any logo/icon files yourself. As your final step, tell me where to update them by hand:

| Location          | File path                                                                                                                                                                                   | What to update                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Main sidebar logo | `src/utils/icon.tsx` — exports `Logo` (icon-only) and `LogoWithText` (logo + wordmark), used in `src/components/common/sidebar/index.tsx` (`{isSidebarOpen ? <LogoWithText /> : <Logo />}`) | Replace the SVG markup inside `Logo` and `LogoWithText` with the new logo. |

Also remind me to:

- Check the browser tab title on any page to confirm the metadata change is live.
- Visit the main dashboard (`/`) to confirm the sidebar logo area looks right both expanded (`LogoWithText`) and collapsed (`Logo`).
