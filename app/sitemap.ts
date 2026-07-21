import type { MetadataRoute } from "next";
import { profile, projects } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!profile.siteUrl) return [];
  return ["", "/projects", ...projects.map((project) => `/projects/${project.slug}`)].map((path) => ({ url: `${profile.siteUrl}${path}`, changeFrequency: path === "" ? "monthly" : "yearly", priority: path === "" ? 1 : 0.8 }));
}
