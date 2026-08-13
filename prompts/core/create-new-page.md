# Task: Add a new blank page

Create a **blank** page (heading + breadcrumbs only, no other content) and wire it into the sidebar. Follow `AGENTS.md` strictly. Three steps — do them in order.

---

## Step 0 — Gather inputs (ask before doing anything)

Ask for all five; do NOT proceed until answered:

1. **Page label** — sidebar text (e.g. `Reports`)
2. **Page path** — kebab-case URL (e.g. `/reports`)
3. **Sidebar section** — `MAIN MENU` | `SUPPORT` | `OTHERS` | new (if new, ask position)
4. **Nav group** — existing group or NEW standalone:

   | Section   | Existing groups                                                              |
   | --------- | ---------------------------------------------------------------------------- |
   | MAIN MENU | Dashboard · Calendar · Profile · Manage Team · Task · Forms · Tables · Pages |
   | SUPPORT   | Chats · Email · Invoice                                                      |
   | OTHERS    | Charts · Authentication · UI Elements                                        |

   Child of existing group → sub-item. NEW standalone → top-level item with its own icon.

5. **New icon needed?** YES (new top-level item) or NO (child item / reuses existing icon from `sidebar/icon.tsx`)

---

## Step 1 — Create `page.tsx`

Route placement inside `(with-layouts)`:

| Group                   | Folder                                          |
| ----------------------- | ----------------------------------------------- |
| MAIN MENU → Dashboard   | `src/app/(with-layouts)/(dashboard)/<route>/`   |
| MAIN MENU → Forms       | `src/app/(with-layouts)/(forms)/<route>/`       |
| MAIN MENU → Pages       | `src/app/(with-layouts)/(pages)/<route>/`       |
| MAIN MENU → standalone  | `src/app/(with-layouts)/<route>/`               |
| SUPPORT                 | `src/app/(with-layouts)/(support)/<route>/`     |
| OTHERS → Charts         | `src/app/(with-layouts)/charts/<route>/`        |
| OTHERS → Authentication | `src/app/(with-layouts)/auth/<route>/`          |
| OTHERS → UI Elements    | `src/app/(with-layouts)/ui-elements/<route>/`   |

`(dashboard)`, `(forms)`, `(pages)`, `(support)` are route groups — they don't appear in the URL. `<route>` = `[PAGE_PATH]` without the leading slash.

**Template** (matches `calendar/page.tsx`):

```tsx
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "[PAGE_LABEL] Page",
};

export default function [PageName]Page() {
  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-col-reverse items-start justify-between gap-3 px-2 sm:flex-row sm:items-center lg:px-6">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">[PAGE_LABEL]</h1>
        <Breadcrumbs
          dividerType="chevron"
          items={[
            { href: "/", label: "Home" },
            { href: "[PAGE_PATH]", label: "[PAGE_LABEL]" },
          ]}
        />
      </div>
    </div>
  );
}
```

Rules: Server Component only (no `"use client"`, no hooks). `[PageName]` = `[PAGE_LABEL]` in PascalCase (e.g. `Reports` → `ReportsPage`). Semantic tokens only — no hex colors, no new CSS classes, no new packages. Do NOT touch the sidebar here.

---

## Step 2 — Wire the sidebar

Edit `src/components/common/sidebar/data.tsx` (`NAV_DATA`):

- **Child of existing group** (new icon: NO): add `{ title: "[PAGE_LABEL]", url: "[PAGE_PATH]" }` to that group's `items` in alphabetical order. No icon on child items.
- **New top-level item** (new icon: YES): add `{ title: "[PAGE_LABEL]", url: "[PAGE_PATH]", icon: <[NewIcon] />, items: [] }` to the correct section. Define `[NewIcon]` in `sidebar/icon.tsx` — named export, 18×18 SVG, `viewBox="0 0 18 18"`, `stroke="currentColor"`, `strokeWidth={1.5}`. Reuse an existing icon if one fits; create a new one only if none does.

`url` must match `[PAGE_PATH]` exactly — active highlighting (`isPathActive`) and group auto-expansion (`findActiveGroupKey`) are driven by it automatically.

---

## Step 3 — Verify

1. `npm run lint` and `npm run build` pass with no errors.
2. `npm run dev`: page renders at `[PAGE_PATH]` showing only the heading and breadcrumbs; sidebar shows `[PAGE_LABEL]` under the correct section/group; active state highlights; parent group auto-expands.
3. Top-level items: icon shows correctly in both expanded and collapsed sidebar modes (collapsed shows it with a tooltip).
