import type { CSSProperties } from "react";
import type { Project } from "../lib/content";

export function AbstractCover({ project, index = 0 }: { project: Project; index?: number }) {
  const initials = (project.shortTitle ?? project.title)
    .split(/\s+/)
    .filter((word) => !["the", "and"].includes(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  const style = { "--cover-accent": project.accent ?? "#35d07f" } as CSSProperties;

  return (
    <div className={`abstract-cover cover-variant-${index % 3}`} style={style} aria-hidden="true">
      <div className="cover-grid" />
      <span className="cover-year">{project.year}</span>
      <span className="cover-index">/{String(index + 1).padStart(2, "0")}</span>
      <strong>{initials}</strong>
      <span className="cover-signal" />
      <p>{project.categories.join(" / ")}</p>
    </div>
  );
}
