import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { profile } from "../content/profile";
import { getSiteUrl } from "../lib/site-url";
import "./globals.css";

export function generateMetadata(): Metadata {
  const base = new URL(getSiteUrl());
  const title = "Abdullah Taj — Data Engineer & Product Builder";
  const description = "Senior data engineer building governed data platforms that survive production — and useful products after hours.";
  return {
    metadataBase: base,
    title: { default: title, template: "%s — Abdullah Taj" },
    description,
    authors: [{ name: profile.name }],
    creator: profile.name,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { type: "website", title, description, siteName: "Abdullah Taj", images: [{ url: new URL("/og-terminal.png", base).toString(), width: 1200, height: 630, alt: "Data platforms that survive production — Abdullah Taj" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og-terminal.png", base).toString()] },
    alternates: base.hostname === "localhost" ? undefined : { canonical: "/" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body><script dangerouslySetInnerHTML={{ __html: themeScript }} /><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
