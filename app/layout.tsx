import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { profile } from "../content/profile";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "localhost:3000";
  const protocol = headerStore.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = profile.siteUrl ? new URL(profile.siteUrl) : new URL(`${protocol}://${host}`);
  const title = "Abdullah Taj — Data Engineer & Product Builder";
  const description = "Senior data engineer and hands-on product builder turning messy data and practical problems into reliable systems people can use.";
  return {
    metadataBase: base,
    title: { default: title, template: "%s — Abdullah Taj" },
    description,
    authors: [{ name: profile.name }],
    creator: profile.name,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { type: "website", title, description, siteName: "Abdullah Taj", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Abdullah Taj — Data Engineer & Product Builder" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    alternates: profile.siteUrl ? { canonical: "/" } : undefined,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
