"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "../lib/content";

type ProjectSummary = Pick<
  Project,
  "title" | "slug" | "year" | "status" | "visibility" | "summary" | "categories" | "accent"
>;

const filterLabels: Record<"all" | ProjectCategory, string> = {
  all: "All",
  data: "Data",
  web: "Web",
  mobile: "Mobile",
  games: "Games",
  mapping: "Mapping",
  commerce: "Commerce",
  automation: "Automation",
};

export function ProjectLibrary({ projects, compact = false }: { projects: ProjectSummary[]; compact?: boolean }) {
  const categories = useMemo(
    () =>
      Object.keys(filterLabels).filter(
        (category) => category === "all" || projects.some((project) => project.categories.includes(category as ProjectCategory)),
      ) as Array<"all" | ProjectCategory>,
    [projects],
  );
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const visible = filter === "all" ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <div className="project-library">
      <div className="filter-row" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            aria-pressed={filter === category}
            className={filter === category ? "active" : undefined}
            key={category}
            onClick={() => setFilter(category)}
            type="button"
          >
            {filterLabels[category]}
            <span>{category === "all" ? projects.length : projects.filter((project) => project.categories.includes(category)).length}</span>
          </button>
        ))}
      </div>
      <p className="filter-status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {visible.length ? (
        <div className={`project-list ${compact ? "project-list-compact" : ""}`}>
          {visible.map((project, index) => (
            <article className="project-row" key={project.slug} style={{ "--row-accent": project.accent ?? "#35d07f" } as React.CSSProperties}>
              <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="project-row-main">
                <p className="project-meta">
                  {project.year} · {project.status.replace("-", " ")}
                  {project.visibility === "private" ? " · private build" : ""}
                </p>
                <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                <p>{project.summary}</p>
              </div>
              <div className="project-categories" aria-label={`Categories: ${project.categories.join(", ")}`}>
                {project.categories.map((category) => <span key={category}>{category}</span>)}
              </div>
              <Link className="row-arrow" href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>↗</Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No projects match this filter yet.</p>
          <button type="button" onClick={() => setFilter("all")}>Show every project</button>
        </div>
      )}
    </div>
  );
}
