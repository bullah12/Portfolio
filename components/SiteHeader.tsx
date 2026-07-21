import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Abdullah Taj — home">
        <span aria-hidden="true">AT</span>
        <span className="wordmark-copy">Abdullah Taj</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
