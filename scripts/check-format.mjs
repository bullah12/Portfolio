import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";

const roots = ["app", "components", "content", "lib", "tests"];
const extensions = new Set([".css", ".js", ".mjs", ".mdx", ".ts", ".tsx"]);
const failures = [];

async function inspect(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) await inspect(child);
    if (!entry.isFile() || !extensions.has(extname(entry.name))) continue;
    const source = await readFile(child, "utf8");
    if (/\t/.test(source)) failures.push(`${child}: contains tab indentation`);
    if (/ +$/m.test(source)) failures.push(`${child}: contains trailing whitespace`);
    if (!source.endsWith("\n")) failures.push(`${child}: must end with a newline`);
  }
}

for (const root of roots) await inspect(root);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Formatting hygiene checks passed.");
}
