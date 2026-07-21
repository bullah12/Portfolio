import Link from "next/link";
import { profile } from "../lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div>
        <p className="eyebrow">Let’s make the useful thing</p>
        <h2>Have a data problem or product idea?</h2>
      </div>
      <div className="footer-actions">
        {profile.email ? (
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
        ) : (
          <p className="config-note">Contact email is being configured.</p>
        )}
        <a className="text-link" href={profile.github} rel="noreferrer" target="_blank">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        {profile.linkedin ? (
          <a className="text-link" href={profile.linkedin} rel="noreferrer" target="_blank">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
      <div className="footer-base">
        <p>© {new Date().getFullYear()} Abdullah Taj</p>
        <p>Built from repository content in the United Kingdom.</p>
        <Link href="/projects">Project index</Link>
      </div>
    </footer>
  );
}
