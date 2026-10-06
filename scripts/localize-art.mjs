#!/usr/bin/env node
/**
 * Copy all Tarka art off Squarespace and into this repo, so the site no longer depends on
 * Squarespace's image CDN. Run this BEFORE cancelling Squarespace:
 *
 *   node scripts/localize-art.mjs          # download + rewrite
 *   node scripts/localize-art.mjs --dry    # just list what it would do
 *
 * What it does:
 *  1. Finds every images.squarespace-cdn.com URL / path in content/art.ts and content/articles/*.md
 *  2. Downloads the original of each into public/art/<folder>/<file>
 *  3. Points content/art.ts's SQ base at "/art/" and rewrites full URLs in the Markdown files
 * Then: `npm run build`, check the pages, commit public/art and the changed content files.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BASE = "https://images.squarespace-cdn.com/content/v1/6269d46844c82f0cce6dbac2/";
const OUT = path.join(ROOT, "public", "art");
const dry = process.argv.includes("--dry");

const artFile = path.join(ROOT, "content", "art.ts");
const mdDir = path.join(ROOT, "content", "articles");
const mdFiles = fs.readdirSync(mdDir).filter((f) => f.endsWith(".md")).map((f) => path.join(mdDir, f));

// "<folder>/<file>.<ext>" paths, as written in art.ts (sq("…")) or inside full URLs.
const PATH_RE = /([A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\.(?:jpe?g|png|gif|webp))/g;
const paths = new Set();
const artSrc = fs.readFileSync(artFile, "utf8");
for (const m of artSrc.matchAll(/sq\("([^"]+)"/g)) paths.add(m[1]);
for (const m of artSrc.matchAll(/"([^"]+\.(?:jpe?g|png|gif|webp))"/g)) if (!m[1].startsWith("http")) paths.add(m[1]);
for (const f of mdFiles) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(new RegExp(BASE.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + PATH_RE.source, "g"))) paths.add(m[1]);
}

console.log(`${paths.size} images`);
let failed = 0;
for (const p of paths) {
  const dest = path.join(OUT, p);
  if (fs.existsSync(dest)) { console.log(`  have  ${p}`); continue; }
  if (dry) { console.log(`  would ${p}`); continue; }
  const res = await fetch(BASE + p);
  if (!res.ok) { console.error(`  FAIL  ${p} (${res.status})`); failed++; continue; }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`  got   ${p}`);
}
if (dry) process.exit(0);
if (failed) { console.error(`${failed} downloads failed — nothing rewritten. Re-run to retry.`); process.exit(1); }

// Rewrite: art.ts base → local; markdown full URLs → local paths.
fs.writeFileSync(
  artFile,
  artSrc
    .replace(`const SQ = "${BASE}";`, `const SQ = "/art/";`)
    .replace("const sq = (path: string, width = 1500) => `${SQ}${path}?format=${width}w`;", "const sq = (path: string, _width = 1500) => `${SQ}${path}`;"),
);
for (const f of mdFiles) {
  const s = fs.readFileSync(f, "utf8");
  const t = s.replace(new RegExp(BASE.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + PATH_RE.source + "(\\?format=\\d+w)?", "g"), "/art/$1");
  if (t !== s) fs.writeFileSync(f, t);
}
console.log("Done. Images are in public/art/; content now points there. Remove images.squarespace-cdn.com from next.config.ts.");
