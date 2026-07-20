# NextAdmin - Next.js Admin Dashboard Template and Components

**NextAdmin** is a Free, open-source Next.js admin dashboard toolkit featuring 200+ UI components and templates that come with pre-built elements, components, pages, high-quality design, integrations, and much more to help you create powerful admin dashboards with ease.

[![nextjs admin template](https://cdn.pimjo.com/nextadmin-2.png)](https://nextadmin.co/)

---

## Useful Links

- [Website](https://nextadmin.co/)
- [Live Demo](https://demo.nextadmin.co/)
- [Docs](https://nextadmin.co/docs)
- [Components](https://nextadmin.co/components)

## Quick start

You'll need Node.js installed. Then:

```bash
git clone https://github.com/NextAdminHQ/nextjs-admin-dashboard.git
cd nextjs-admin-dashboard
```

Install dependencies — pick your poison:

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good. **Happy coding**!

## Deploying

Works out of the box with any provider supporting Next.js, including Vercel, Netlify, and Cloudflare.

## Docs

Full docs of the project are available at [nextadmin.co/docs](https://nextadmin.co/docs).

## Community

- [Discord](https://pimjo.com/community)
- [X / Twitter](https://twitter.com/PimjoHQ)
- [GitHub](https://github.com/NextAdminHQ/)

## Update Logs

### Version 2.0.0 - [July 20, 2026]

- **Complete UI/UX Overhaul**: Redesigned the entire dashboard with a modern aesthetic and enhanced visual hierarchy.
- **Design System Integration**: Replaced raw UI components with Tailgrids UI for improved design consistency and accessibility.
- **Expanded Page & Component Library**: Added 10+ new pages and 20+ customizable component variants.
- **Functional Mock API Integration**: Made all pages interactive and connected them with mock REST APIs.
- **AI-Native Repository**: Optimized codebase architecture following deep modularity principles and added comprehensive AI guidelines in `AGENTS.md`.
- **Custom Agent Skills & Accessibility**: Integrated `/api-integration` for instant API binding and `/react-aria` to enforce WCAG best practices and accessible UI primitives.

### Version 1.3.0 - [May 14, 2026]

- Updated Next.js, Tailwind CSS, and all dependencies to their latest versions.
- Replaced `next-auth` with `better-auth`.
- Made authentication and authorization dynamic.
- Added 2 Step verification, email verification, and password reset.
- Added `Admin` plugin from `better-auth` for RBAC.
- Replaced Algolia search with `cmdk`.
- Improved ApexCharts hydration handling.
- Moved utility files from `libs` into `utils`.
- Fixed file and folder naming inconsistencies.
- Reorganized environment variables and removed unused entries.
- Renamed the unused proxy file to `example.proxy.ts` and fixed its import path.
- Fixed modal position shift issues.
- Improved responsiveness across marketing, CRM, profile, manage team, tables, and not found pages.

### Version 1.2.3 - [Mar 16, 2026]

- Update Next.js to ^16.1.6 and configure image qualities

### Version 1.2.2 - [Dec 01, 2025]

- Updated to Next.js 16
- Updated all the dependencies.

### Version 1.2.1 - Fix peer dependency issue - [Mar 19, 2025]

- Fixed peer dependency issue with React 19
- Migrated from `react-table` to `@tanstack/react-table`
- Fixed reference error in `top-countries/map.tsx` component

### Version 1.2.0 - Major Upgrade and UI Improvements - [Jan 27, 2025]

- Upgraded to Next.js v15 and updated dependencies
- API integration with loading skeleton for tables and charts.
- Improved code structure for better readability.
- Rebuilt components like dropdown, modals, and all ui-elements using accessibility practices.
- Using search-params to store dropdown selection and refetch data.
- Semantic markups, better separation of concerns and more.

### Version 1.1.0 - Initial Release - [May 13, 2024]

- Updated Dependencies
- Removed Unused Integrations
- Optimized App

### Version 1.0.0 - Initial Release - [May 13, 2024]

- Initial release
