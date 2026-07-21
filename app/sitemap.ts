import type { MetadataRoute } from "next";
import { projects } from "../lib/content";
import { getSiteUrl } from "../lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return ["", "/projects", ...projects.map((project) => `/projects/${project.slug}`)].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === "" ? "monthly" : "yearly", priority: path === "" ? 1 : 0.8 }));
}
