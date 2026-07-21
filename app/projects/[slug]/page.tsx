import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AbstractCover } from "../../../components/AbstractCover";
import { RichBody } from "../../../components/RichBody";
import { getProject, getRelatedProjects, projects } from "../../../lib/content";

export const dynamic = "force-static";
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((candidate) => candidate.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const related = getRelatedProjects(project);
  const jsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: project.title, description: project.summary, dateCreated: String(project.year), applicationCategory: project.categories.join(", "), codeRepository: project.repoUrl ?? undefined, url: project.liveUrl ?? undefined, author: { "@type": "Person", name: "Abdullah Taj" } };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><main id="main-content"><article className="case-study"><header className="case-hero section-shell"><Link className="back-link" href="/projects">← Project index</Link><div className="case-heading"><p className="eyebrow">{project.categories.join(" / ")}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p></div><AbstractCover project={project} index={currentIndex} /><dl className="case-meta"><div><dt>Status</dt><dd>{project.status.replace("-", " ")}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Visibility</dt><dd>{project.visibility} {project.visibility === "private" ? "build" : "repository"}</dd></div></dl><div className="case-actions">{project.liveUrl ? <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live product ↗</a> : null}{project.repoUrl ? <a className="button button-outline" href={project.repoUrl} target="_blank" rel="noreferrer">View source ↗</a> : null}{!project.liveUrl && !project.repoUrl ? <span className="private-note">Private build · no public links</span> : null}</div></header><section className="case-overview section-shell"><div><p className="eyebrow">01 / Problem</p><h2>{project.problem}</h2></div><div><p className="eyebrow">02 / Approach</p><p>{project.solution}</p>{project.outcome ? <p>{project.outcome}</p> : null}</div></section><section className="case-details section-shell"><RichBody body={project.body} /><aside><p className="eyebrow">Built into the product</p><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="stack-block"><p className="eyebrow">Stack</p><div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div></aside></section>{project.screenshots?.length ? <section className="section-shell screenshot-gallery" aria-label="Project screenshots">{project.screenshots.map((screenshot) => <Image alt={`${project.title} product screenshot`} height={900} key={screenshot} src={screenshot} width={1440} />)}</section> : <section className="no-screenshots section-shell"><p className="eyebrow">Visuals</p><p>No public product screenshots are included. The cover above is an editorial composition, not a fabricated interface.</p></section>}<section className="related section-shell"><div className="section-heading"><p className="eyebrow">Related work</p><h2>Similar systems,<br /><em>different constraints.</em></h2></div><div className="related-grid">{related.map((item) => <article key={item.slug}><p>{item.categories.join(" · ")}</p><h3><Link href={`/projects/${item.slug}`}>{item.title}</Link></h3><Link className="text-link" href={`/projects/${item.slug}`}>Read case study ↗</Link></article>)}</div></section><Link className="next-project section-shell" href={`/projects/${nextProject.slug}`}><span>Next project</span><strong>{nextProject.title}</strong><i aria-hidden="true">→</i></Link></article></main></>;
}
