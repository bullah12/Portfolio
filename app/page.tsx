import Link from "next/link";
import { AbstractCover } from "../components/AbstractCover";
import { experiences, featuredProjects, profile, projects } from "../lib/content";

export const dynamic = "force-static";

const stack = [
  { title: "Platforms", items: ["Databricks", "Snowflake", "Azure & AWS"] },
  { title: "Pipelines", items: ["PySpark", "Delta Lake", "dbt · ADF"] },
  { title: "Languages", items: ["Python", "SQL", "TypeScript"] },
  { title: "Practices", items: ["Asset Bundles", "CI/CD", "Data governance"] },
];

const ticker = [
  "Databricks",
  "Delta Lake",
  "PySpark",
  "Snowflake",
  "dbt",
  "Azure Data Factory",
  "Asset Bundles",
  "Python",
  "SQL",
];

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    homeLocation: { "@type": "Country", name: profile.location },
    sameAs: [profile.github],
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.institution },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <main id="main-content">
        <section className="hero section-shell" id="top" aria-labelledby="hero-title">
          <p className="status-line">
            <span aria-hidden="true" />
            Status: production pipelines green · {profile.availability?.toLowerCase()}
          </p>
          <div className="hero-copy">
            <p className="eyebrow">Senior data engineer / product builder</p>
            <h1 id="hero-title">
              I build the data platforms that <em>survive production.</em>
            </h1>
            <p className="hero-intro">
              Senior data engineer shipping governed pipelines on Databricks and Delta Lake by day — and useful, full-stack products by night.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#work">$ view work →</Link>
              <Link className="button button-outline" href="#contact">get in touch</Link>
            </div>
          </div>
          <div className="pipeline" aria-label="Data pipeline: ingest, model, serve, ship">
            {[
              ["ingest", "pulse"],
              ["model", ""],
              ["serve", ""],
              ["ship", "pulse delay"],
            ].map(([label, state], index) => (
              <div className="pipeline-stage" key={label}>
                <span className={`pipeline-node ${state}`} aria-hidden="true" />
                <span>{label}</span>
                {index < 3 ? <i aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </section>

        <div className="tech-ticker" aria-label={`Core technologies: ${ticker.join(", ")}`}>
          <div>
            {[...ticker, ...ticker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<b aria-hidden="true">·</b></span>
            ))}
          </div>
        </div>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="terminal-heading">
            <p className="eyebrow" id="work-title">// production data engineering</p>
            <span>01 / client delivery</span>
          </div>
          <div className="work-grid">
            {experiences.map((experience) => (
              <article className="work-card" key={experience.client}>
                <p>{experience.dates} · {experience.role}</p>
                <h2>{experience.client}</h2>
                <p>{experience.summary}</p>
                <div className="card-status"><span aria-hidden="true" /> delivered</div>
              </article>
            ))}
          </div>
        </section>

        <section className="featured section-shell" id="builds" aria-labelledby="builds-title">
          <div className="terminal-heading">
            <p className="eyebrow" id="builds-title">// selected builds</p>
            <Link href="/projects">{String(projects.length).padStart(2, "0")} shipped →</Link>
          </div>
          <div className="featured-grid">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <article className="featured-project" key={project.slug}>
                <Link className="featured-cover-link" href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
                  <AbstractCover project={project} index={index} />
                </Link>
                <div className="featured-copy">
                  <p className="project-meta">{project.year} · {project.status.replace("-", " ")}</p>
                  <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
                  <p>{project.summary}</p>
                  <div className="featured-reveal">
                    <span>{project.categories.join(" · ")}</span>
                  </div>
                  <div className="project-card-actions">
                    {project.liveUrl ? (
                      <a className="project-live-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        View Live Product ↗
                      </a>
                    ) : null}
                    <Link className="project-case-link" href={`/projects/${project.slug}`}>
                      View Case Study →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link className="button button-outline" href="/projects">open the full project index →</Link>
          </div>
        </section>

        <section className="capabilities section-shell" id="skills" aria-labelledby="skills-title">
          <div className="terminal-heading">
            <p className="eyebrow" id="skills-title">// the stack</p>
            <span>03 / tools that ship</span>
          </div>
          <div className="capability-list">
            {stack.map((group) => (
              <article key={group.title}>
                <h2>{group.title}</h2>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <p className="eyebrow">// about the engineer</p>
          <div className="about-copy">
            <h2 id="about-title">Systems thinking,<br /><em>product energy.</em></h2>
            <p className="about-lede">
              Chemical engineering taught me to think in inputs, constraints, feedback loops and failure modes. I now apply that mindset to production data platforms — and to products I want to exist.
            </p>
          </div>
          <div className="about-facts">
            <div><span>Education</span><strong>{profile.education.award}</strong><p>{profile.education.institution} · {profile.education.dates}</p></div>
            <div><span>Currently</span><strong>Deepening Databricks practice</strong><p>{profile.learning}</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
