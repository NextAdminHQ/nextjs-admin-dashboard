## [📖 Docs](https://docs.nextadmin.co/)

## Installation

1. Download/fork/clone the repo. Once you're in the correct directory, it's time to install all the necessary dependencies. You can do this by typing the following command:

```
npm install
```

1. Okay, you're almost there. Now all you need to do is start the development server. If you're using **npm**, the command is:

```
npm run dev
```

And if you're using **Yarn**, it's:

```
yarn dev
```

And voila! You're now ready to start developing. **Happy coding**!

## Update Logs

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
