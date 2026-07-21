# Abdullah Taj — Portfolio

A content-driven portfolio for a senior data engineer and product builder. It uses the Next.js App Router with TypeScript, React Server Components and a small set of client components for project filtering and the accessible experience timeline.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The main quality checks are:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run build` creates the standard `.next` output expected by Vercel. The
Cloudflare/Sites-compatible build remains available as `npm run build:sites`.

## Content model

- `content/profile.ts` contains the editable name, role, education, contact, social and domain values.
- `content/projects/*.mdx` contains project frontmatter and case-study copy.
- `content/experience/*.mdx` contains client engagements and workstreams.
- `public/projects/<project-slug>/` is reserved for real project media.

Project and experience files are discovered automatically at build time. The content loader validates required fields, accepted statuses/categories, URLs, value types and filename/slug consistency. A useful, file-specific error stops the build when content is invalid.

## Adding a project

1. Duplicate any file in `content/projects/` and rename it to the new slug, such as `my-project.mdx`.
2. Update every frontmatter value. The `slug` must match the filename. Choose one or more categories from `data`, `web`, `mobile`, `games`, `mapping`, `commerce` and `automation`.
3. Use `null` for unavailable repository, live and cover links. Never use `#`. Set `visibility` to `private` when source is not public.
4. Put genuine media in `public/projects/my-project/`, then list paths such as `"/projects/my-project/screenshot-01.webp"` in `screenshots`.
5. Run `npm run build`. The new file automatically appears in the project index, filters and a statically generated `/projects/my-project` route.

Abstract covers are generated from project metadata and CSS when real media is absent; they are not product screenshots.

## Deployment and configuration

Vercel uses the standard Next.js build through `vercel.json`. The repository also
retains the Sites-compatible vinext and Cloudflare Worker build through the
`:sites` scripts.

Before using a custom domain, edit `content/profile.ts`:

- set `email` to enable the contact button;
- set `linkedin` if wanted;
- set `availability` only when there is a factual message to show;
- set `siteUrl` to enable canonical URLs and a populated sitemap.

Add real live URLs and screenshots only when those assets exist. The public repository links in project content are the supplied, verified links.
