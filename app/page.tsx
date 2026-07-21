import Link from "next/link";
import { AbstractCover } from "../components/AbstractCover";
import { DataThread } from "../components/DataThread";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { ProjectLibrary } from "../components/ProjectLibrary";
import { featuredProjects, projects, experiences, profile } from "../lib/content";

const capabilities = [
  {
    number: "01",
    title: "Data platforms",
    promise: "Reliable paths from source to decision.",
    skills: ["Python, Pandas, PySpark & SQL", "Databricks, Delta Lake & Asset Bundles", "Snowflake, Cortex Search & dbt", "Azure Data Factory, Azure & AWS", "Data modelling, ingestion & orchestration"],
  },
  {
    number: "02",
    title: "Quality, ML & analytics",
    promise: "Evidence people can inspect and trust.",
    skills: ["Data quality & DQX", "Explainable models, embeddings & clustering", "MLflow, Scikit-learn & governance", "Streamlit, Plotly & Power BI", "Resilient APIs, PII controls & schema handling"],
  },
  {
    number: "03",
    title: "Product engineering",
    promise: "Useful interfaces around difficult systems.",
    skills: ["Next.js, React & TypeScript", "PostgreSQL, Prisma & Supabase", "Workers, Pages, Vercel & GitHub Actions", "Kotlin, Compose, Room & Firebase", "Mapping and geospatial products"],
  },
  {
    number: "04",
    title: "Delivery",
    promise: "Calm, maintainable progress in real teams.",
    skills: ["CI/CD, Git & Azure Repos", "Agile delivery & requirements", "Stakeholder engagement", "Technical leadership", "Automation & prompt engineering"],
  },
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
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-kicker"><span>Senior Consultant</span><span>United Kingdom</span></div>
          <div className="hero-copy">
            <p className="eyebrow">Data Engineer & Product Builder</p>
            <h1 id="hero-title">I turn messy data and practical problems into <em>reliable systems</em> people can use.</h1>
            <p className="hero-intro">I design production data platforms by day and build useful digital products after hours—from live sports prediction systems and map-based games to property intelligence and mobile tools.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
              <Link className="text-link" href="#experience">Professional experience <span aria-hidden="true">↓</span></Link>
            </div>
          </div>
          <DataThread />
          <p className="hero-note">Production discipline.<br />Product curiosity.</p>
        </section>

        <section className="lanes section-shell" aria-labelledby="lanes-title">
          <div className="section-heading split-heading"><p className="eyebrow">Two lanes, one craft</p><h2 id="lanes-title">Different outputs.<br /><em>The same standard.</em></h2></div>
          <div className="lane-comparison">
            <article><span>01 / Client delivery</span><h3>Production data engineering</h3><p>I design governed pipelines, data quality systems and analytical products that survive real operational pressure.</p><ul><li>Reliable by design</li><li>Explainable decisions</li><li>Repeatable delivery</li></ul></article>
            <div className="lane-bridge" aria-hidden="true"><span>messy input</span><i /><strong>→</strong><i /><span>useful outcome</span></div>
            <article><span>02 / Independent builds</span><h3>Hands-on product making</h3><p>I take a practical need from rough idea to a working interface, shaping the data model and user experience together.</p><ul><li>Problem-led</li><li>Full-stack thinking</li><li>Shipped to learn</li></ul></article>
          </div>
        </section>

        <section className="featured section-shell" aria-labelledby="featured-title">
          <div className="section-heading"><p className="eyebrow">Selected builds / 2025—2026</p><h2 id="featured-title">Systems with a<br /><em>human-sized purpose.</em></h2></div>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <article className={`featured-project featured-project-${index + 1}`} key={project.slug}>
                <Link className="featured-cover-link" href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}><AbstractCover project={project} index={index} /></Link>
                <div className="featured-copy"><p className="project-meta">{String(index + 1).padStart(2, "0")} · {project.status.replace("-", " ")}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p><div className="featured-reveal"><span>{project.categories.join(" · ")}</span><Link className="text-link" href={`/projects/${project.slug}`}>Case study ↗</Link></div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="all-projects section-shell" aria-labelledby="all-projects-title">
          <div className="section-heading heading-with-count"><div><p className="eyebrow">Complete index</p><h2 id="all-projects-title">All projects</h2></div><span>{String(projects.length).padStart(2, "0")} builds</span></div>
          <ProjectLibrary projects={projects} compact />
          <div className="section-cta"><Link className="button button-outline" href="/projects">Open the full project library <span aria-hidden="true">→</span></Link></div>
        </section>

        <section className="experience section-shell" id="experience" aria-labelledby="experience-title">
          <div className="section-heading split-heading"><p className="eyebrow">Professional experience</p><h2 id="experience-title">Production work,<br /><em>clearly delivered.</em></h2></div>
          <ExperienceTimeline experiences={experiences} />
        </section>

        <section className="capabilities section-shell" aria-labelledby="capabilities-title">
          <div className="section-heading"><p className="eyebrow">What I deliver</p><h2 id="capabilities-title">Capabilities, grouped<br /><em>around outcomes.</em></h2></div>
          <div className="capability-list">{capabilities.map((group) => <article key={group.title}><span>{group.number}</span><div><h3>{group.title}</h3><p>{group.promise}</p></div><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="about-index" aria-hidden="true">A/T</div>
          <div className="about-copy"><p className="eyebrow">About / Education</p><h2 id="about-title">Engineering instincts,<br /><em>product energy.</em></h2><p className="about-lede">My background is in chemical engineering, which taught me to think in systems: inputs, constraints, feedback loops and failure modes. Today I apply that mindset to data platforms—and to products I want to exist.</p></div>
          <div className="about-facts"><div><span>Education</span><strong>{profile.education.award}</strong><p>{profile.education.institution}<br />{profile.education.dates}</p></div><div><span>Now learning</span><strong>Deeper Databricks practice</strong><p>{profile.learning}</p></div></div>
        </section>
      </main>
    </>
  );
}
