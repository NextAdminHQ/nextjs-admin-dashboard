# NextAdmin - Next.js Admin Dashboard Template and Components

**NextAdmin** is a Free, open-source Next.js admin dashboard toolkit featuring 200+ UI components and templates that come with pre-built elements, components, pages, high-quality design, integrations, and much more to help you create powerful admin dashboards with ease.

[![nextjs admin template](https://cdn.pimjo.com/nextadmin-2.png)](https://nextadmin.co/)

---
## Useful Links
- [Website](https://nextadmin.co/)
- [Live Demo](https://demo.nextadmin.co/)
- [Docs](https://nextadmin.co/docs)
- [Components](https://nextadmin.co/components)

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/) (v14 or later)
- A running PostgreSQL database instance

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NextAdminHQ/nextjs-admin-dashboard.git
cd nextjs-admin-dashboard
```

### 2. Install dependencies

```bash
npm install
# or: yarn / pnpm install / bun install
```

### 3. Set up environment variables

Copy the example environment file and update it with your own values:

```bash
cp .env.example .env.local
```

### 4. Set up the database

This project uses [Prisma](https://www.prisma.io/) as its ORM. You **must** run the database migration to create the required tables before starting the application:

```bash
npm run db:migrate
```

Then generate the Prisma client:

```bash
npm run db:generate
```

> **Tip:** You can inspect your database using Prisma Studio:
> ```bash
> npm run db:studio
> ```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and you're all set!

## Deploying

Works out of the box on Vercel and Netlify.

## Docs & components

Full docs at [nextadmin.co/docs](https://nextadmin.co/docs). Component-level docs (props, examples, code) live under [/docs/components](https://nextadmin.co/docs) — accordions, charts, tables, form layouts, maps, modals, and everything else.

## Community

- [Discord](https://pimjo.com/community)
- [X / Twitter](https://twitter.com/PimjoHQ)
- [GitHub](https://github.com/NextAdminHQ/)


## Update Logs
### Version 1.3.0 - [May 03, 2026]
- Updated to Next.js Latest
- Updated dependencies

### Version 1.3.0 - [April 30, 2026]

- Update Tailwind CSS to v4 and update dependencies.
- Added new authentication pages.
- Updated to latest Next.js
- Implemented authentication with BetterAuth and Prisma.
- Configured Role-Based Access Control (RBAC).
- Added user profile data mutations and queries in profile and settings pages.

### Version 1.2.3 - [Mar 16, 2026]

- Update Next.js to ^16.1.6 and configure image qualities

### Version 1.2.2 - [December 01, 2025]

- Updated to Next.js 16
- Updated dependencies.

### Version 1.2.1 - [Mar 20, 2025]

- Fix Peer dependency issues and NextConfig warning.
- Updated apexcharts and react-apexhcarts to the latest version.

### Version 1.2.0 - Major Upgrade and UI Improvements - [Jan 27, 2025]

- Upgraded to Next.js v15 and updated dependencies
- API integration with loading skeleton for tables and charts.
- Improved code structure for better readability.
- Rebuilt components like dropdown, sidebar, and all ui-elements using accessibility practices.
- Using search-params to store dropdown selection and refetch data.
- Semantic markups, better separation of concerns and more.

### Version 1.1.0

- Updated Dependencies
- Removed Unused Integrations
- Optimized App

### Version 1.0

- Initial Release - [May 13, 2024]
