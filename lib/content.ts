import { profile } from "../content/profile";

export const projectStatuses = [
  "live",
  "built",
  "prototype",
  "in-progress",
] as const;
export const projectCategories = [
  "data",
  "web",
  "mobile",
  "games",
  "mapping",
  "commerce",
  "automation",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  title: string;
  slug: string;
  shortTitle?: string;
  year: number;
  status: ProjectStatus;
  visibility: "public" | "private";
  featuredRank?: number;
  sortOrder?: number;
  summary: string;
  problem: string;
  solution: string;
  outcome?: string;
  highlights: string[];
  stack: string[];
  categories: ProjectCategory[];
  repoUrl?: string | null;
  liveUrl?: string | null;
  cover?: string | null;
  screenshots?: string[];
  accent?: string;
  body: string;
};

export type Experience = {
  client: string;
  role: string;
  dates: string;
  startDate: string;
  summary: string;
  sortOrder: number;
  body: string;
  workstreams: Array<{ title: string; details: string[] }>;
};

declare global {
  interface ImportMeta {
    glob: <T = unknown>(
      pattern: string,
      options: { eager: true; query: string; import: string },
    ) => Record<string, T>;
  }
}

const projectFiles = import.meta.glob<string>("../content/projects/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const experienceFiles = import.meta.glob<string>("../content/experience/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseValue(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "null") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      throw new Error(`Invalid JSON-style frontmatter value: ${trimmed}. ${String(error)}`);
    }
  }
  return trimmed;
}

function parseFrontmatter(raw: string, file: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`[content] ${file}: expected frontmatter wrapped in --- lines.`);
  }

  const data: Record<string, unknown> = {};
  for (const [index, line] of match[1].split(/\r?\n/).entries()) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator < 1) {
      throw new Error(`[content] ${file}:${index + 2}: expected "key: value".`);
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1);
    try {
      data[key] = parseValue(value);
    } catch (error) {
      throw new Error(`[content] ${file}:${index + 2}: ${String(error)}`);
    }
  }

  return { data, body: match[2].trim() };
}

function assertString(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`[content] ${file}: required field "${key}" must be a non-empty string.`);
  }
  return value;
}

function assertStringArray(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (!Array.isArray(value) || !value.length || value.some((item) => typeof item !== "string")) {
    throw new Error(`[content] ${file}: required field "${key}" must be a non-empty string array.`);
  }
  return value as string[];
}

function optionalString(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (value === undefined || value === null) return value as undefined | null;
  if (typeof value !== "string") {
    throw new Error(`[content] ${file}: optional field "${key}" must be a string or null.`);
  }
  return value;
}

function optionalNumber(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`[content] ${file}: optional field "${key}" must be a number.`);
  }
  return value;
}

function validateUrl(value: string | null | undefined, key: string, file: string) {
  if (!value) return value;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
  } catch {
    throw new Error(`[content] ${file}: "${key}" must be a complete http(s) URL or null.`);
  }
  return value;
}

function validateProject(raw: string, file: string): Project {
  const { data, body } = parseFrontmatter(raw, file);
  const year = data.year;
  if (typeof year !== "number" || !Number.isInteger(year)) {
    throw new Error(`[content] ${file}: required field "year" must be an integer.`);
  }

  const status = assertString(data, "status", file);
  if (!projectStatuses.includes(status as ProjectStatus)) {
    throw new Error(`[content] ${file}: "status" must be one of ${projectStatuses.join(", ")}.`);
  }

  const visibility = assertString(data, "visibility", file);
  if (visibility !== "public" && visibility !== "private") {
    throw new Error(`[content] ${file}: "visibility" must be public or private.`);
  }

  const categories = assertStringArray(data, "categories", file);
  const invalidCategory = categories.find(
    (category) => !projectCategories.includes(category as ProjectCategory),
  );
  if (invalidCategory) {
    throw new Error(
      `[content] ${file}: unknown category "${invalidCategory}". Use ${projectCategories.join(", ")}.`,
    );
  }

  const slug = assertString(data, "slug", file);
  const fileSlug = file.split("/").pop()?.replace(/\.mdx$/, "");
  if (slug !== fileSlug) {
    throw new Error(`[content] ${file}: slug "${slug}" must match filename "${fileSlug}.mdx".`);
  }

  const screenshots = data.screenshots;
  if (
    screenshots !== undefined &&
    (!Array.isArray(screenshots) || screenshots.some((item) => typeof item !== "string"))
  ) {
    throw new Error(`[content] ${file}: "screenshots" must be a string array.`);
  }

  return {
    title: assertString(data, "title", file),
    slug,
    shortTitle: optionalString(data, "shortTitle", file) ?? undefined,
    year,
    status: status as ProjectStatus,
    visibility,
    featuredRank: optionalNumber(data, "featuredRank", file),
    sortOrder: optionalNumber(data, "sortOrder", file),
    summary: assertString(data, "summary", file),
    problem: assertString(data, "problem", file),
    solution: assertString(data, "solution", file),
    outcome: optionalString(data, "outcome", file) ?? undefined,
    highlights: assertStringArray(data, "highlights", file),
    stack: assertStringArray(data, "stack", file),
    categories: categories as ProjectCategory[],
    repoUrl: validateUrl(optionalString(data, "repoUrl", file), "repoUrl", file),
    liveUrl: validateUrl(optionalString(data, "liveUrl", file), "liveUrl", file),
    cover: optionalString(data, "cover", file),
    screenshots: screenshots as string[] | undefined,
    accent: optionalString(data, "accent", file) ?? undefined,
    body,
  };
}

function parseWorkstreams(body: string) {
  const sections = body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const [heading, ...lines] = section.split(/\r?\n/);
      return {
        title: heading.trim(),
        details: lines
          .map((line) => line.trim())
          .filter((line) => line.startsWith("- "))
          .map((line) => line.slice(2)),
      };
    });
  return sections;
}

function validateExperience(raw: string, file: string): Experience {
  const { data, body } = parseFrontmatter(raw, file);
  const sortOrder = data.sortOrder;
  if (typeof sortOrder !== "number") {
    throw new Error(`[content] ${file}: required field "sortOrder" must be a number.`);
  }
  const workstreams = parseWorkstreams(body);
  if (!workstreams.length || workstreams.some((workstream) => !workstream.details.length)) {
    throw new Error(`[content] ${file}: add at least one ## workstream with bullet-point details.`);
  }
  return {
    client: assertString(data, "client", file),
    role: assertString(data, "role", file),
    dates: assertString(data, "dates", file),
    startDate: assertString(data, "startDate", file),
    summary: assertString(data, "summary", file),
    sortOrder,
    body,
    workstreams,
  };
}

export const projects = Object.entries(projectFiles)
  .map(([file, raw]) => validateProject(raw, file))
  .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999) || b.year - a.year);

export const experiences = Object.entries(experienceFiles)
  .map(([file, raw]) => validateExperience(raw, file))
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const featuredProjects = projects
  .filter((project) => project.featuredRank !== undefined)
  .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3) {
  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.categories.filter((category) => project.categories.includes(category)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || (a.candidate.sortOrder ?? 999) - (b.candidate.sortOrder ?? 999))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export { profile };
