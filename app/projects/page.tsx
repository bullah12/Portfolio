import type { Metadata } from "next";
import Link from "next/link";
import { ProjectLibrary } from "../../components/ProjectLibrary";
import { projects } from "../../lib/content";

export const metadata: Metadata = { title: "Projects", description: "A filterable library of Abdullah Taj’s data, web, mobile, mapping, game and commerce builds." };

export default function ProjectsPage() {
  return <main id="main-content"><section className="page-hero section-shell"><p className="eyebrow">Project library / {projects.length} builds</p><h1>Practical systems,<br /><em>built end to end.</em></h1><div className="page-hero-copy"><p>Products spanning live data, mapping, property intelligence, mobile tools, internal platforms and games. Every status and link is stated plainly.</p><Link className="text-link" href="/#experience">See client delivery <span aria-hidden="true">↓</span></Link></div></section><section className="project-index section-shell" aria-labelledby="project-index-title"><h2 className="sr-only" id="project-index-title">All projects</h2><ProjectLibrary projects={projects} /></section></main>;
}
