import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { profile } from "../content/profile";
import { getSiteUrl } from "../lib/site-url";
import "./globals.css";

export function generateMetadata(): Metadata {
  const base = new URL(getSiteUrl());
  const title = "Abdullah Taj — Data Engineer & Product Builder";
  const description = "Senior data engineer and hands-on product builder turning messy data and practical problems into reliable systems people can use.";
  return {
    metadataBase: base,
    title: { default: title, template: "%s — Abdullah Taj" },
    description,
    authors: [{ name: profile.name }],
    creator: profile.name,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { type: "website", title, description, siteName: "Abdullah Taj", images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "Abdullah Taj — Data Engineer & Product Builder" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
    alternates: base.hostname === "localhost" ? undefined : { canonical: "/" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
