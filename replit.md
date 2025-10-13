# The SAP Insider

## Overview

The SAP Insider is a professional compliance and regulatory resource platform serving Substance Abuse Professionals (SAPs), Employee Assistance Professionals (EAPs), and DOT compliance officers. The platform provides regulatory updates from multiple DOT agencies (FMCSA, PHMSA, FAA, FTA, FRA, USCG), educational content on the Return-to-Duty (RTD) process, independent provider reviews, and curated resources. The design emphasizes credibility, information clarity, and professional restraint to establish trust with compliance professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with `wouter`, a lightweight alternative to React Router. Routes include Home, Updates, Reviews, Provider Profiles, RTD Guide, Resources, Organizations, and About pages.

**UI Component Library**: Shadcn UI (New York style variant) with Radix UI primitives for accessible, unstyled components. The component system uses:
- Tailwind CSS for styling with custom CSS variables for theming
- Class Variance Authority (CVA) for component variants
- Custom design tokens matching the professional blue color palette outlined in design guidelines

**State Management**: 
- TanStack Query (React Query) v5 for server state management, data fetching, and caching
- React Context API for theme management (light/dark mode)
- Local component state with React hooks

**Styling System**:
- Tailwind CSS with custom configuration extending the base theme
- CSS custom properties for dynamic theming (light/dark modes)
- Inter font family for UI consistency (Google Fonts)
- JetBrains Mono for code/data display
- Custom utility classes for elevation effects (`hover-elevate`, `active-elevate-2`)

**Design Philosophy**: Professional Information Architecture with Axios-inspired minimalism. Prioritizes credibility through visual restraint, clear content hierarchy, and WCAG AA compliance.

### Backend Architecture

**Runtime**: Node.js with Express.js framework for API routing and middleware.

**API Structure**: RESTful API design with resource-based endpoints:
- `/api/updates` - Regulatory updates (with featured and detail views)
- `/api/providers` - Course provider information and top-rated providers
- `/api/reviews` - Provider reviews by provider ID
- `/api/resources` - Educational resources, templates, webinars
- `/api/organizations` - SAP organizations and partners

**Data Storage**: 
- Current implementation uses in-memory storage (`MemStorage` class) implementing the `IStorage` interface
- Architecture designed for PostgreSQL migration via Drizzle ORM
- Schema defined in `shared/schema.ts` with full type safety

**Development Server**: Custom Vite integration for HMR (Hot Module Replacement) in development mode, with Express serving the built static files in production.

**Error Handling**: Centralized error middleware catching and formatting errors with appropriate HTTP status codes.

**Logging**: Custom logging utility with timestamp formatting for API requests, including duration tracking and response logging (truncated to 80 characters).

### Data Schema Design

**Database ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless adapter.

**Core Entities**:

1. **Regulatory Updates**: Title, content, agency classification (FMCSA/PHMSA/FAA/FTA/FRA/USCG), category, summary, optional plain-language summary, publication date, and featured flag.

2. **Providers**: Course provider information including name, logo, star rating (1-5), review count, DOT/non-DOT compliance flags, feature arrays (languages, capabilities), description, contact details, and verification status.

3. **Reviews**: User reviews linked to providers with rating, title, content, reviewer name, date, and verification status.

4. **Resources**: Educational materials with type categorization (template, webinar, guide, checklist), title, description, author, publication date, and download URL.

5. **Organizations**: SAP professional organizations with name, logo, description, website, member count, founding year, and featured status.

**Type Safety**: Zod schemas generated from Drizzle tables using `drizzle-zod` for runtime validation. Shared types between client and server via `@shared` path alias.

### Build and Deployment

**Build Process**: 
- Client: Vite builds React application to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js` with ESM format
- TypeScript compilation checking via `tsc` without emission

**Module System**: ES Modules throughout (both client and server use `"type": "module"`).

**Path Aliases**:
- `@/*` maps to `client/src/*`
- `@shared/*` maps to `shared/*`
- `@assets/*` maps to `attached_assets/*`

**Environment Configuration**: Database URL required via `DATABASE_URL` environment variable for Drizzle configuration.

## External Dependencies

**Database**: Neon serverless PostgreSQL (`@neondatabase/serverless`) configured for use with Drizzle ORM. Connection pooling and serverless-optimized queries.

**UI Component Primitives**: Extensive Radix UI library usage for accessible headless components (accordions, dialogs, dropdowns, navigation, tooltips, etc.).

**Styling**: 
- Tailwind CSS with PostCSS for processing
- Google Fonts API for Inter and JetBrains Mono font families

**Development Tools** (Replit-specific):
- `@replit/vite-plugin-runtime-error-modal` for error overlays
- `@replit/vite-plugin-cartographer` for code navigation
- `@replit/vite-plugin-dev-banner` for development indicators

**Session Management**: `connect-pg-simple` for PostgreSQL-backed session storage (prepared for future authentication implementation).

**Data Validation**: Zod for schema validation integrated with React Hook Form via `@hookform/resolvers`.

**Date Handling**: `date-fns` library for date formatting and manipulation.

**Carousel/Interactive Elements**: `embla-carousel-react` for content carousels, `cmdk` for command palette patterns.