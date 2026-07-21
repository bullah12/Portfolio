import { profile } from "../content/profile";

export function getSiteUrl() {
  const configured =
    profile.siteUrl ??
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return new URL(configured).origin;

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return new URL(`https://${vercelHost}`).origin;

  return "http://localhost:3000";
}
