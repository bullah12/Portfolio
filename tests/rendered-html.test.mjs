import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const root = new URL("../", import.meta.url);
const statuses = new Set(["live", "built", "prototype", "in-progress"]);
const categories = new Set(["data", "web", "mobile", "games", "mapping", "commerce", "automation"]);

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, "MDX content must start with frontmatter");
  return Object.fromEntries(
    match[1].split(/\r?\n/).filter(Boolean).map((line) => {
      const separator = line.indexOf(":");
      const key = line.slice(0, separator).trim();
      const raw = line.slice(separator + 1).trim();
      if (raw === "null") return [key, null];
      if (/^\d+$/.test(raw)) return [key, Number(raw)];
      if (raw.startsWith("[") || raw.startsWith('"')) return [key, JSON.parse(raw)];
      return [key, raw];
    }),
  );
}

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const originalCwd = process.cwd();
  const isolatedCwd = await mkdtemp(join(tmpdir(), "portfolio-worker-"));
  let worker;
  try {
    process.chdir(isolatedCwd);
    ({ default: worker } = await import(workerUrl.href));
  } finally {
    process.chdir(originalCwd);
    await rm(isolatedCwd, { recursive: true, force: true });
  }
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html", host: "localhost" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Abdullah Taj/);
  assert.match(html, /I turn messy data and practical problems/);
  assert.match(html, /Fantasy World Cup 2026/);
  assert.match(html, /Professional experience/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
  assert.doesNotMatch(html, /href=["']#["']/i);
});

test("discovers the complete project library and required frontmatter", async () => {
  const directory = new URL("../content/projects/", import.meta.url);
  const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"));
  assert.equal(files.length, 10);
  for (const file of files) {
    const source = await readFile(new URL(file, directory), "utf8");
    for (const field of ["title", "slug", "year", "status", "visibility", "summary", "problem", "solution", "highlights", "stack", "categories"]) {
      assert.match(source, new RegExp(`^${field}:`, "m"), `${file} is missing ${field}`);
    }
    assert.doesNotMatch(source, /(?:repoUrl|liveUrl):\s*["']?#["']?$/m);
    const data = frontmatter(source);
    assert.equal(data.slug, file.replace(/\.mdx$/, ""));
    assert.equal(typeof data.year, "number");
    assert.ok(statuses.has(data.status), `${file} has an invalid status`);
    assert.ok(["public", "private"].includes(data.visibility));
    assert.ok(Array.isArray(data.highlights) && data.highlights.length > 0);
    assert.ok(Array.isArray(data.stack) && data.stack.length > 0);
    assert.ok(Array.isArray(data.categories) && data.categories.every((item) => categories.has(item)));
    for (const field of ["repoUrl", "liveUrl"]) {
      if (data[field]) assert.doesNotThrow(() => new URL(data[field]));
    }
  }
});

test("removes starter preview code and dead-link placeholders", async () => {
  const [appFiles, packageJson] = await Promise.all([
    readdir(new URL("../app/", import.meta.url)),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.ok(!appFiles.includes("_sites-preview"));
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(page, /href=["']#["']/);
});

test("renders a statically discovered project route", async () => {
  const response = await render("/projects/world-cup-fantasy");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Full 104-match tournament schedule/);
  assert.match(html, /View source/);
});
