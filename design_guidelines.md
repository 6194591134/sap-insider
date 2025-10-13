# The SAP Insider - Design Guidelines

## Design Approach & Philosophy

**Selected Approach**: Professional Information Architecture with Axios-inspired minimalism
**Justification**: As a trusted compliance and regulatory resource platform serving SAPs and DOT professionals, the design prioritizes clarity, credibility, and efficient information delivery. Drawing inspiration from Axios's clean newsroom aesthetic and Transport Topics' industry authority, while maintaining accessibility and professional polish.

**Core Design Principles**:
- Credibility First: Visual design establishes authority and trustworthiness
- Information Clarity: Content hierarchy enables rapid scanning and comprehension
- Professional Restraint: Minimal decoration, maximum utility
- Accessible Always: WCAG AA compliance across all interactions

## Color Palette

**Light Mode**:
- Primary Brand: 215 70% 25% (Deep professional blue - headers, CTAs, key actions)
- Secondary: 215 25% 45% (Muted blue-gray - supporting text, borders)
- Accent: 142 45% 45% (Trust green - verified badges, positive indicators)
- Background: 210 20% 98% (Off-white for reduced eye strain)
- Surface: 0 0% 100% (Pure white cards and containers)
- Text Primary: 215 25% 20% (Dark blue-gray for body text)
- Text Secondary: 215 15% 50% (Lighter for metadata, timestamps)

**Dark Mode**:
- Primary Brand: 215 65% 60% (Brightened blue for contrast)
- Secondary: 215 20% 55% (Adjusted gray-blue)
- Accent: 142 40% 55% (Softened green for dark backgrounds)
- Background: 215 25% 12% (Deep blue-black)
- Surface: 215 20% 16% (Elevated cards)
- Text Primary: 210 15% 92% (Off-white text)
- Text Secondary: 215 12% 65% (Dimmed metadata)

## Typography

**Font Families**:
- Headlines & UI: 'Inter' (Google Fonts) - Clean, professional, excellent readability
- Body Text: 'Inter' (consistent system-wide)
- Code/Data: 'JetBrains Mono' (for regulatory codes, API responses)

**Type Scale**:
- Hero Headlines: 3xl to 5xl font-weight 700
- Section Headers: 2xl to 3xl font-weight 600
- Card Titles: lg to xl font-weight 600
- Body Text: base (16px) font-weight 400
- Metadata/Labels: sm font-weight 500
- Captions: xs font-weight 400

## Layout System

**Spacing Primitives**: Using Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Micro spacing (2-4): Icon-text gaps, button padding, input fields
- Component spacing (6-8): Card padding, section gaps, list items
- Macro spacing (12-20): Section margins, container padding, hero spacing
- Major breaks (24+): Page sections, feature divisions

**Grid Structure**:
- Container: max-w-7xl with px-4 to px-8 responsive padding
- News Feed: Single column with max-w-4xl for optimal readability
- Provider Cards: 3-column grid on desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single on mobile
- Content-Sidebar Layout: 2/3 main + 1/3 sidebar split for resource pages

## Component Library

**Navigation**:
- Top bar: Fixed header with logo left, primary navigation center, search/profile right
- Breadcrumbs: Always visible on internal pages for context
- Sidebar navigation: Collapsible category filters for regulation updates and resources

**Content Cards**:
- News/Update Cards: Elevated surface with 2px left border accent, timestamp, category tag, excerpt preview
- Provider Review Cards: Star rating prominent, key metrics badges, comparison checkbox
- Organization Spotlights: Featured image, organization logo, quick stats, read more CTA

**Data Display**:
- Rating System: 5-star visual with numerical score and review count
- Comparison Tables: Sticky headers, alternating row colors, highlight differences
- Regulation Timeline: Vertical timeline with date markers, status indicators, expandable details
- Statistics Dashboard: Card-based metrics with icon, large number, trend indicator

**Forms & Inputs**:
- Search Bar: Prominent with filter dropdown, autocomplete suggestions
- Filter Controls: Checkbox groups, tag-style selections, clear filters option
- Review Submission: Multi-step form with progress indicator, validation feedback

**Interactive Elements**:
- Primary Buttons: Filled with primary color, medium size, rounded corners
- Secondary Buttons: Outline style with secondary color
- Text Links: Underline on hover, primary color
- Tags/Badges: Small rounded pills with subtle backgrounds, various semantic colors

**Feedback & Status**:
- Verified Badge: Green checkmark icon with "DOT Verified" text
- Update Alerts: Top banner for critical regulatory changes (dismissible)
- Loading States: Skeleton screens for content, spinner for actions
- Empty States: Helpful messaging with suggested actions

## Page-Specific Layouts

**Home Page**:
- Hero: Clean header with tagline, latest critical update callout, primary search/filter access
- Featured Article: Large card with image, category, headline, excerpt, read time
- Latest Updates Feed: Chronological list with filtering sidebar
- Top Providers Sidebar: Compact cards with ratings, quick comparison

**Regulation Updates**:
- Filter Panel: Left sidebar with agency checkboxes, date range, search
- Update Feed: Card-based with agency badge, date, title, plain language summary toggle
- Detail View: Full regulation text with highlighting, related updates, export options

**Provider Reviews**:
- Comparison Mode: Side-by-side table with expandable criteria rows
- Provider Cards Grid: Filterable by rating, DOT/Non-DOT, features, language
- Individual Profile: Header with key stats, tabbed content (overview, reviews, resources, contact)

**RTD Process Guide**:
- Interactive Flowchart: Visual decision tree with expandable step details
- Progress Tracker: Step-by-step checklist format
- Resource Downloads: Linked templates and forms at each stage

**Resources Hub**:
- Category Grid: Large cards for template types, webinars, guides
- Document Library: Searchable table with file type, date, download count
- Webinar Archive: Video thumbnails with duration, speaker, topic tags

## Images

**Hero Section**: Clean professional imagery NOT required - instead use bold typography with regulatory update callout panel featuring latest critical DOT notice

**Content Images**:
- Organization logos for spotlights (100x100 to 200x200)
- Provider brand marks on review cards (80x80)
- Infographic placeholders for RTD process flowchart (full-width instructional diagrams)
- Author/contributor headshots for blog-style articles (circular 64x64)
- Webinar thumbnails for resource archive (16:9 aspect ratio, 400x225)

**Implementation**: Use icon libraries (Heroicons) for UI elements. Placeholder images for provider logos and organization brands with fallback to initials.

## Accessibility & Dark Mode

- Full dark mode support with WCAG AA contrast ratios maintained
- Focus indicators: 2px outline with offset for all interactive elements
- Form inputs: Consistent styling across light/dark with proper label associations
- Skip navigation links for keyboard users
- Semantic HTML structure with proper heading hierarchy
- Color is never the sole indicator of meaning (icons/text accompany color coding)

## Animation & Transitions

**Minimal Motion Philosophy** - animations used only for:
- Page transitions: 200ms fade for content swaps
- Dropdown/Modal: 150ms slide-fade for overlays
- Hover states: Subtle color shifts (100ms)
- Loading: Simple spinner, no elaborate animations
- Filter application: Smooth 250ms content reflow

No scroll-triggered animations, parallax, or decorative motion effects.