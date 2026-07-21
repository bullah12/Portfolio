import Link from "next/link";
import { profile } from "../lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell" id="contact">
      <div className="contact-card">
        <p className="availability"><span aria-hidden="true" />{profile.availability?.toLowerCase()}</p>
        <h2>Let&apos;s build something that ships.</h2>
        <p>Whether it&apos;s a production platform or a useful independent product, I&apos;d love to hear about it.</p>
        <div className="footer-actions">
          {profile.email ? <a className="button button-primary" href={`mailto:${profile.email}`}>email me</a> : null}
          <a className="button button-outline" href={profile.github} rel="noreferrer" target="_blank">github ↗</a>
          {profile.linkedin ? <a className="button button-outline" href={profile.linkedin} rel="noreferrer" target="_blank">linkedin ↗</a> : null}
        </div>
      </div>
      <div className="footer-base">
        <p>© {new Date().getFullYear()} Abdullah Taj</p>
        <p>Data engineer & product builder · United Kingdom</p>
        <Link href="/projects">project index →</Link>
      </div>
    </footer>
  );
}
