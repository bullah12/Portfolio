# Portfolio website build prompt

You are a senior product designer and senior frontend engineer. Build a polished, production-ready personal portfolio for Abdullah Taj in the current repository. Do not stop at a plan or a mock-up: inspect the repository, implement the site, add the content system, run the quality checks, and leave the project ready to deploy.

## 1. Product goal

Create a distinctive but professional portfolio that presents Abdullah as both:

1. A senior data engineer/consultant who delivers reliable production data systems for major clients.
2. A hands-on product builder who turns practical ideas into usable web, mobile, data, mapping, and game products.

The site should feel creative and lightly interactive without looking like an experimental art project. It must be credible to hiring managers, engineering leaders, consulting clients, and technically curious collaborators.

The central story is:

> I turn messy data and practical problems into reliable systems people can use.

Use this primary identity:

- Name: Abdullah Taj
- Role: Data Engineer & Product Builder
- Supporting role: Senior Consultant
- Location: United Kingdom
- GitHub: https://github.com/bullah12
- Availability/contact text: keep this editable in the repository and do not invent availability.

Suggested hero copy:

> I design production data platforms by day and build useful digital products after hours—from live sports prediction systems and map-based games to property intelligence and mobile tools.

Write in first person, using clear British English. Keep the tone confident, precise, warm, and evidence-based. Avoid inflated claims, empty buzzwords, skill-percentage charts, and generic copy such as “passionate developer”.

## 2. Non-negotiable content architecture

There is no login, admin page, CMS, or database for this portfolio. Content must live in the repository.

Use a folder-driven, build-time content model:

```text
content/
  projects/
    world-cup-fantasy.mdx
    openguessr.mdx
    london-property-deal-finder.mdx
    ascent-ledger.mdx
    property-management-dashboard.mdx
    squared-loan-tracker.mdx
    wholesale-traders.mdx
    hr-portal.mdx
    triviaverse.mdx
    otium-ecommerce-template.mdx
  experience/
    uk-power-networks.mdx
    markaaz.mdx
    virgin-atlantic.mdx
  profile.ts
public/
  projects/
    <project-slug>/
      cover.webp
      screenshot-01.webp
      screenshot-02.webp
```

At build time, discover every file in `content/projects`. Adding one valid MDX file must automatically add it to the project index, filters, and its detail route without editing a central component. Do the same for experience entries if practical.

Use schema validation and fail the build with a useful message when required frontmatter is missing or invalid. A suitable project schema is:

```ts
type ProjectFrontmatter = {
  title: string;
  slug: string;
  shortTitle?: string;
  year: number;
  status: "live" | "built" | "prototype" | "in-progress";
  visibility: "public" | "private";
  featuredRank?: number;
  sortOrder?: number;
  summary: string;
  problem: string;
  solution: string;
  outcome?: string;
  highlights: string[];
  stack: string[];
  categories: Array<"data" | "web" | "mobile" | "games" | "mapping" | "commerce" | "automation">;
  repoUrl?: string | null;
  liveUrl?: string | null;
  cover?: string | null;
  screenshots?: string[];
  accent?: string;
};
```

Make links nullable. Hide a CTA when its URL is missing; never render a dead or `#` link. Private repositories may still be shown as projects, but do not imply that their source code is public.

Add a concise README section called “Adding a project” that explains how to duplicate an MDX file, add media, choose categories, and set links.

## 3. Information architecture

Build these routes:

- `/` — complete portfolio landing page.
- `/projects` — filterable project library.
- `/projects/[slug]` — statically generated project detail/case-study page.
- Optional `/experience` only if it improves the experience; the home page must still contain the professional timeline.
- A custom not-found page that fits the visual system.

The home page should contain, in this order:

1. Hero: identity, positioning, one clear primary CTA to projects and a secondary CTA to experience/contact.
2. “Two lanes, one craft”: a compact visual bridge between production data engineering and independent product building.
3. Featured builds: lead with World Cup Fantasy, OpenGuessr, and London Property Deal Finder; also give strong prominence to Ascent Ledger, Property Management Dashboard, and Squared.
4. All projects: a concise, filterable library sourced from the content folder.
5. Professional experience: an interactive but accessible client/workstream timeline.
6. Capabilities: grouped by what Abdullah can deliver, not as an unstructured logo cloud.
7. About/education: concise personal context and current learning.
8. Contact/footer: configurable email/social links, GitHub, and a small “built from repository content” note.

Each project detail page should have:

- A strong one-sentence summary.
- Status, year, category, repository/live CTAs when present.
- Problem, solution, and the key product/engineering decisions.
- A factual feature/highlight list.
- Stack and architecture summary.
- Screenshot gallery only when real local assets exist.
- Related projects selected by shared categories.
- A “next project” navigation link.

Do not manufacture business results, user counts, performance metrics, screenshots, testimonials, or live URLs. When a result is not documented, emphasise what was built and the engineering decisions rather than inventing impact.

## 4. Visual and interaction direction

Use the supplied profile’s editorial feel as inspiration: large serif headings, clean sans-serif body copy, warm stone/parchment surfaces, pale mineral grey, dark blue-green ink, and a restrained bright green accent. The result should feel like an editorial case-study site crossed with a well-designed engineering notebook.

Suggested tokens—refine them as needed while retaining contrast:

```css
--paper: #f3ebe3;
--mist: #edf2f0;
--ink: #173137;
--muted: #617074;
--line: #c9d3cf;
--signal: #35d07f;
--night: #0e1b1e;
```

Typography:

- Display: a refined editorial serif such as Fraunces or Newsreader.
- Body/UI: a highly legible sans-serif such as Inter or Manrope.
- Use `next/font` or locally bundled fonts; do not load blocking font files from arbitrary CDNs.

Create one recognisable visual motif: a thin “data thread” that travels through the page and connects small labelled nodes such as ingest, model, serve, and ship. In the hero, this can gently animate on first load or respond subtly to pointer movement. Use lightweight SVG/CSS, not WebGL. It must become static when reduced motion is requested and must not harm reading order.

Interactions should be purposeful:

- Project filters update instantly and preserve clear focus states.
- Featured project panels reveal a little more context on hover/focus, but remain fully usable on touch.
- The experience timeline can reveal workstream details when selected, with all content still reachable by keyboard.
- Use subtle depth, underline movement, number transitions, and accent-line motion.
- Do not hijack scrolling, hide the cursor, use excessive parallax, or turn every section into a card grid.
- Keep animation durations restrained and support `prefers-reduced-motion` everywhere.

The site should use full-width editorial compositions, generous but not wasteful spacing, and varied project layouts. Avoid a generic template, glassmorphism, neon cyberpunk styling, a dashboard aesthetic, and “card soup”.

If screenshots are absent, create tasteful abstract cover compositions from typography, project metadata, and CSS/SVG shapes. Clearly treat them as visual covers—not fabricated screenshots of the products.

## 5. Seed project content

Create one MDX entry per project below. Rewrite the supplied facts into concise portfolio copy, but preserve their meaning and status. Use the repository URLs only where listed as public. Keep all `liveUrl` values null unless an actual deployed URL already exists in the repository.

### A. Fantasy World Cup 2026

- Slug: `world-cup-fantasy`
- Year: 2026
- Status: built
- Visibility: public
- Repository: https://github.com/bullah12/world-cup-fantasy
- Feature prominently.
- Summary: a shared fantasy prediction app for the 2026 World Cup with score predictions, configurable locking, standings, history, and automated result updates.
- Engineering facts:
  - Browser-based app backed by Supabase.
  - Full 104-match tournament schedule.
  - Username/player flow and multi-device shared predictions.
  - Autosaving predictions, knockout penalty-winner picks, player history, leaderboard, five-match form, and admin scoring configuration.
  - Supabase Auth-protected results admin.
  - Cloudflare Worker polls ESPN scoreboard data, maps teams, upserts changed results, and allows Supabase Realtime to refresh standings.
  - Service-role secrets remain server-side.
- Stack: JavaScript, HTML/CSS, Supabase/Postgres, Supabase Realtime/Auth, Cloudflare Workers, ESPN scoreboard integration.
- Categories: games, web, data, automation.

### B. OpenGuessr

- Slug: `openguessr`
- Year: 2026
- Status: in-progress
- Visibility: private; leave `repoUrl` null unless the user later makes it public.
- Feature prominently.
- Summary: a browser-based geography game that places the player in a random Google Street View panorama and scores a guess placed on a world map.
- Engineering facts:
  - Google Maps JavaScript API and Street View.
  - Solo rounds with scoring and distance feedback.
  - Broad-region sampling plus fallback locations with known coverage.
  - Responsive mobile guess-map toggle and accessible menus.
  - Cloudflare Pages runtime configuration so API values are not hard-coded in source.
  - Supabase schema/realtime foundations for rooms, players, shared rounds, guesses, countdowns, private codes, and online play.
  - Be honest: friends/online multiplayer is still being completed; do not present roadmap items as finished.
- Stack: JavaScript, Google Maps/Street View, Supabase/Postgres/Realtime, Cloudflare Pages.
- Categories: games, mapping, web.

### C. London Property Deal Finder

- Source repository: `house_scraper`
- Slug: `london-property-deal-finder`
- Year: 2025–2026; represent this as 2026 in numeric frontmatter and mention the longer build period in the body.
- Status: in-progress.
- Visibility: private; leave `repoUrl` null.
- Feature prominently.
- Summary: a Streamlit property-intelligence dashboard that gathers London sale and auction listings from multiple sources and surfaces potential value-add opportunities.
- Engineering facts:
  - Search focused on selected London postcodes and signals such as probate, auction, modernisation, and cash-buyer language.
  - Rightmove full-availability and three-day ingestion modes.
  - Multi-source ingestion adapters for property portals and auction houses, with pagination, source preservation, filtering, and browser-rendering fallback where needed.
  - Streamlit views for recent and all listings, filters, source search, and date-aware sorting.
  - Supabase upserts keyed by listing identity and freshness timestamps.
  - Scheduled GitHub Actions refresh plus safe same-day skip/force-reingestion controls.
  - Password-protected dashboard and correct treatment of service-role credentials.
- Stack: Python, Streamlit, Pandas, Requests, Beautiful Soup, Selenium, Supabase, GitHub Actions.
- Categories: data, automation, web.

### D. Ascent Ledger

- Slug: `ascent-ledger`
- Year: 2026
- Status: in-progress.
- Visibility: public.
- Repository: https://github.com/bullah12/ascent-ledger
- Summary: a private-by-default climbing logbook, BMG progress tracker, open-route catalogue, and preference-driven recommendation engine.
- Engineering facts:
  - Next.js App Router, TypeScript, Prisma/Postgres, Supabase Auth, Vercel.
  - Climb logging, onboarding, BMG gap recommendations, route discovery, community reviews/tags, and a separate “For you” ranking model.
  - GPX/KML ingestion and route geometry.
  - MapLibre/Terra Draw route editor with trail following through OpenRouteService and safe off-trail fallbacks.
  - Bounded route import adapters for OpenStreetMap/Overpass and open/licensed trail sources, retaining source IDs, licences, and attribution.
  - Private climbs by default, explicit per-climb public opt-in, Row Level Security, and careful anonymous projections.
  - CI, type checking, linting, unit tests, data seeds, and backfill/sync tooling.
- Stack: Next.js, React, TypeScript, Tailwind, Prisma, PostgreSQL, Supabase, MapLibre, OpenRouteService, Vitest.
- Categories: web, data, mapping.

### E. Property Management Dashboard

- Slug: `property-management-dashboard`
- Source repository/project title: `property-manager`
- Year: 2026
- Status: in-progress.
- Visibility: public.
- Repository: https://github.com/bullah12/property-manager
- Summary: a private workspace for landlords and property teams covering properties, tenants, tenancies, documents, finances, compliance, ownership, and investment performance.
- Engineering facts:
  - Account and portfolio/workspace isolation throughout the data model.
  - Lease-contract upload and generated PDFs.
  - Income/expense tracking, deadlines, reminders, contractors, notifications, and background jobs.
  - Effective-dated, immutable ownership event ledger with reversal/corrective events rather than destructive history edits.
  - Separate accounting treatment for private ownership payments and property-fund capital/distributions.
  - Investment performance dashboards and tests for workspace isolation, ownership, income, leases, and portfolio performance.
- Stack: Next.js, TypeScript, Tailwind, Prisma/Postgres, Supabase, TanStack Query/Table, Recharts, Zod.
- Categories: web, data.

### F. Squared — Loan & IOU Tracker

- Slug: `squared-loan-tracker`
- Source repository: `loan-tracker`
- Year: 2026
- Status: prototype.
- Visibility: public.
- Repository: https://github.com/bullah12/loan-tracker
- Summary: an offline-first Android app for recording informal loans and IOUs in seconds, with balances computed from an immutable transaction history.
- Engineering facts:
  - Kotlin, Jetpack Compose/Material 3, Room, Hilt, MVVM, and StateFlow.
  - Contact-level running net balance derived live from transactions so stored totals cannot drift.
  - Quick add/edit, settle-up, activity, undo, archive, category tags, widget, and quick-settings tile.
  - Optional Firebase/Firestore share links publish a live read-only ledger snapshot; recipients can confirm or dispute without editing the source ledger.
  - Revoking a link removes the shared document; the local app remains fully functional without Firebase.
- Categories: mobile, data.

### G. Wholesale Traders

- Slug: `wholesale-traders`
- Year: 2026
- Status: prototype.
- Visibility: public.
- Repository: https://github.com/bullah12/wholesale-traders
- Summary: a B2B wholesale storefront built around case, crate, and pallet buying rather than retail assumptions.
- Engineering facts:
  - Case/unit pricing, ex-VAT/inc-VAT toggle, VAT line items, volume breaks, MOQ, order increments, and pallet shortcuts.
  - Bulk order pad with SKU autocomplete and validation.
  - Saved reorder lists, mock trade account/credit terms, and reorder flows.
  - Browser-side admin catalogue with add/edit/delete, CSV/Excel import preview and validation, and round-trip export.
  - Be explicit that the current build is a static React SPA with client-side persistence and mock account/checkout flows, not a production commerce backend.
- Stack: React, Vite, React Router, JavaScript, CSS, SheetJS, localStorage, Vercel.
- Categories: commerce, web.

### H. HR Portal

- Slug: `hr-portal`
- Year: 2026
- Status: prototype.
- Visibility: public.
- Repository: https://github.com/bullah12/HR-portal
- Summary: an internal recruitment-to-onboarding platform with deterministic ATS scoring, human decision gates, GDPR consent tracking, and an append-only audit trail.
- Engineering facts:
  - Job requisitions, applications, CV parsing, interviews, scorecards, sequential offer approvals, PDFs/e-signing flow, and onboarding checklists.
  - Six staff roles plus tokenised candidate/offer/onboarding links rather than candidate accounts.
  - Deterministic weighted CV scoring by must-have skills, nice-to-have skills, experience, and eligibility; missing must-haves cap the score, and stage changes remain human-controlled.
  - Next.js API routes, PostgreSQL/Prisma, JWT cookie auth, RBAC middleware, Zod validation, PDF/DOCX parsing, and audit records.
  - Provider integrations have local fallback modes; do not state that Broadbean, Zinc, DocuSign, Microsoft Graph, Slack, or email delivery are production-verified.
- Categories: web, data, automation.

### I. TriviaVerse

- Slug: `triviaverse`
- Year: 2026
- Status: prototype.
- Visibility: private; leave `repoUrl` null.
- Summary: a dark-mode-first social trivia product exploring live hosted games, couch play, competitive category ladders, daily streaks, and user-created content.
- Engineering facts:
  - Expo/React Native/TypeScript application scaffold.
  - UI foundations for home, 1v1 versus lobby, and host-online play.
  - Supabase data layer and documented contracts for rooms, real-time play, profiles, progression, and leaderboards.
  - Be honest that it is UI-first and that backend capabilities are being wired up.
- Categories: mobile, games.

### J. OTIUM E-commerce Template

- Slug: `otium-ecommerce-template`
- Source repository: `Ecommerce-template`
- Year: 2026
- Status: prototype.
- Visibility: public.
- Repository: https://github.com/bullah12/Ecommerce-template
- Summary: a responsive luxury storefront template built around a reusable editorial design system and a complete client-side shopping journey.
- Engineering facts:
  - Thirty-product catalogue across five collections.
  - URL-driven search, sorting, collection, price, and stock filters.
  - Product pages, cart, wishlist, mock checkout, confirmation, mock account/orders/addresses, and supporting content pages.
  - Fraunces/Inter design system, reusable tokens/components, micro-animation, and accessibility polish.
  - Be explicit that auth, checkout, orders, and addresses are client-side mocks and that there is no payment or backend integration.
- Stack: React, Vite, React Router, JavaScript, CSS, React Context, Vercel.
- Categories: commerce, web.

Do not feature obvious forks, tutorial/reference repositories, archived experiments, duplicate scaffolds, or old coding-course exercises. In particular, exclude `awesome-python`, `bootstrap`, `coding-interview-university`, `developer-roadmap`, `free-programming-books`, `freeCodeCamp`, `tensorflow`, `You-Dont-Know-JS`, the archived `bmg-climb-tracker`, and the duplicate early `Project-templates` scaffold. Do not pad the portfolio with weak projects simply to increase the count.

## 6. Professional experience content

Create an experience timeline from the following facts. Keep client delivery separate from personal projects, and avoid disclosing anything beyond these supplied details.

### UK Power Networks — Senior Data Engineer

- Dates: April 2026 to May 2026.
- Workstream: DSO migration to Azure Databricks.
- Migrated a legacy DSO data platform to Azure Databricks.
- Delivered two production ingestion pipelines and developed two additional pipelines through testing for production deployment.
- Built reusable parameterised notebooks using Databricks Secrets, environment-aware configuration, and Delta Lake practices.
- Applied Databricks Asset Bundles for repeatable, maintainable deployments.
- Acted as deputy technical lead and collaborated directly with client stakeholders.

### Markaaz — Data Engineer

- Dates: October 2025 to February 2026.
- Workstream: client data matching and enrichment using Snowflake Cortex Search.
- Led the end-to-end matching solution: harvested the client universe, generated candidates, developed a match-score algorithm, validated matches, enriched the core table, and produced a client-ready extract.
- Designed scalable Snowflake task graphs for batch processing, deterministic reruns, and repeatable quality-control gates.
- Improved performance and cost through warehouse right-sizing, concurrency tuning, query optimisation, and execution strategy.
- Worked with Snowflake support/engineering to stabilise bottlenecks during critical delivery periods involving a private-preview capability.

### Virgin Atlantic — Data Engineer

- Dates: December 2024 to September 2025.
- Show three connected workstreams under this client.

#### Fuel optimisation

- Built an explainable arrival-delay fuel-optimisation solution end to end.
- Implemented silver and gold medallion layers in an AWS Databricks sandbox.
- Trained and registered a hurdle model in MLflow and created a serving endpoint for flight-delay inference.
- Built a Power BI drill-through experience for planner decision-making.
- Engineered resilient Meteostat and AviationWeather API ingestion with schema-variability handling.

#### AMIE — Aircraft Maintenance Insights Engine

- Served as data lead for an MVP that ingested aircraft defect data, grouped semantically similar issues, and highlighted recurring/chronic defects.
- Built Databricks medallion pipelines with multi-source ingestion, schema standardisation, de-duplication, cleaning, and PII masking.
- Applied embeddings and K-Means clustering, with simple cluster labels and trend summaries.
- Delivered a Streamlit exploration dashboard with a feedback loop to improve clusters and labels over time.
- Operationalised parameterised jobs, scheduled refresh, Azure Repos CI/CD, data-quality checks, and governance documentation.

#### Enterprise Data Quality / DQX

- Led integration of Databricks Labs DQX into enterprise pipelines as a repeatable data-quality process.
- Designed a reusable Silver Layer standard.
- Built and optimised Azure Data Factory validation workflows and used Azure Repos/notebooks for CI/CD and collaboration.
- Raised issues with the open-source project and promoted automated data-quality and governance practices.

For the experience UI, show the client, role, dates, short outcome, and selectable workstreams. Long details can appear in an accessible disclosure or adjacent panel. Avoid a cramped CV layout.

## 7. Capabilities and education

Group capabilities by delivery outcome:

### Data platforms

- Python, Pandas, PySpark, SQL
- Databricks, Delta Lake, Databricks Asset Bundles
- Snowflake, Cortex Search, dbt
- Azure Data Factory, Azure, AWS
- Medallion architecture, data modelling, ingestion, transformation, batch orchestration

### Quality, ML, and analytics

- Data quality and DQX
- Scikit-learn, embeddings, clustering, explainable models, MLflow
- Plotly, Streamlit, Power BI
- API ingestion, schema-variability handling, PII controls, governance

### Product engineering

- Next.js, React, TypeScript, JavaScript
- PostgreSQL, Prisma, Supabase, Realtime/Auth/RLS
- Cloudflare Workers/Pages, Vercel, GitHub Actions
- Kotlin, Jetpack Compose, Room, Firebase
- Mapping and geospatial product work

### Delivery

- CI/CD, Git, Azure Repos
- Agile delivery, stakeholder engagement, requirements gathering
- Technical leadership, automation, prompt engineering

Education:

- MEng (Hons) Chemical Engineering, including industrial year.
- University of Birmingham, 2017–2022.

Current learning note:

- Working towards the Databricks Data Engineer Professional certification, with the aim of becoming a Databricks Champion.

Do not render capabilities as proficiency bars or assign arbitrary numeric ratings.

## 8. Technical implementation

Use a modern, maintainable stack suitable for Vercel:

- Next.js App Router with TypeScript in strict mode.
- Tailwind CSS for styling; keep design tokens centralised with CSS custom properties.
- React Server Components by default. Limit client components to genuine interaction.
- Static generation for project pages and metadata.
- MDX plus frontmatter parsing and schema validation. Use a small, well-supported library set.
- Use `next/image` with explicit dimensions/aspect ratios for real media.
- Use semantic HTML landmarks and heading hierarchy.

Do not add authentication, a CMS, a contact-message backend, analytics, a database, or a runtime GitHub API dependency. The portfolio must remain deployable as a content-driven static site. If a contact email is configured, a mailto CTA is enough.

Include:

- Responsive behaviour from small mobile screens through large desktop.
- A visible skip link.
- Keyboard-operable navigation, filters, disclosures, and project controls.
- Strong focus styles and WCAG AA colour contrast.
- Reduced-motion support.
- Descriptive page titles, metadata, Open Graph/Twitter metadata, canonical URLs when a base URL is configured, sitemap, and robots file.
- JSON-LD for `Person` and, where appropriate, `CreativeWork`/`SoftwareApplication`, but only with factual data.
- A sensible favicon/wordmark built from Abdullah’s initials.
- An optional theme switch only if both themes are equally considered; do not add a weak dark mode just to tick a box.

Performance targets:

- No heavy canvas/WebGL scene.
- Avoid unnecessary client-side JavaScript.
- No layout shifts from images or font loading.
- Aim for Lighthouse 90+ across performance, accessibility, best practices, and SEO on production build.

## 9. Content and privacy rules

- Never include credentials, Supabase project identifiers, API keys, service-role keys, internal filesystem paths, private repository URLs, or proprietary client data.
- Do not claim that a prototype is production-ready or that an unverified integration works in production.
- Do not turn private client work into downloadable source-code cards.
- Do not create fake testimonials, employers, dates, metrics, customer logos, app-store badges, or awards.
- Treat project descriptions as editable content, not hard-coded JSX.
- Put all profile/contact/social values in one easy-to-edit file.
- Use real public repository links listed above; leave everything else null or clearly configurable.

## 10. Quality bar and definition of done

Before finishing:

1. Inspect the repository and preserve any pre-existing user work.
2. Implement the full site and seed all content above.
3. Ensure a new project MDX file is automatically discovered and receives a route.
4. Ensure invalid frontmatter produces an actionable validation error.
5. Ensure filters work with mouse, keyboard, touch, and the empty-result state.
6. Ensure missing repository/live/media fields degrade cleanly.
7. Check mobile widths around 320, 375, and 430 px, plus tablet and desktop.
8. Check reduced motion and visible focus states.
9. Run formatting, lint, type checking, tests if present, and the production build; fix every error and warning caused by the implementation.
10. Verify there is no placeholder lorem ipsum, broken internal route, `#` CTA, fabricated screenshot, or horizontal overflow.
11. Update the README with setup, scripts, deployment guidance, content editing, and “Adding a project”.
12. Finish with a concise implementation summary, the exact checks run, and any fields the user still needs to populate, such as live URLs, screenshots, contact email, or domain.

Make thoughtful product decisions without repeatedly asking for clarification. If the repository already uses a compatible framework, adapt to it rather than replacing it unnecessarily. The finished result should be cohesive, factual, accessible, fast, and memorable.
