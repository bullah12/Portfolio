"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("portfolio-theme", next);
    } catch {
      // The theme still switches when storage is unavailable.
    }
    setTheme(next);
  }

  return (
    <header className="site-header">
      <Link className="wordmark" href="/#top" aria-label="Abdullah Taj — home">
        abdullah<span>.taj</span> <i>~/</i>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">work</Link>
        <Link href="/#builds">builds</Link>
        <Link href="/#skills">stack</Link>
        <Link className="nav-contact" href="/#contact">contact</Link>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          <span aria-hidden="true" />{theme}
        </button>
      </nav>
    </header>
  );
}
