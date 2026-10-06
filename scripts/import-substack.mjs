#!/usr/bin/env node
/**
 * Import post bodies from Substack (read.tarkajournal.com) into content/articles/*.md.
 *
 *   npm run import:substack                      # fill every article whose body is still the placeholder
 *   npm run import:substack -- --slug inhabiting-power
 *   npm run import:substack -- --new             # also create files for Substack posts the site doesn't have yet
 *   npm run import:substack -- --force           # re-import bodies even if they were already imported
 *   npm run import:substack -- --dry             # show what would change, write nothing
 *
 * How articles are matched to Substack posts:
 *   1. `substack:` in the article's frontmatter (the Substack slug, e.g. two-approaches-to-truth-168)
 *   2. otherwise the same slug
 *   3. otherwise the same title
 *
 * Paid posts: Substack only returns a preview to the public API, and the new site is free to read.
 * So paid ("only_paid") posts are imported as a preview plus a "Continue on Substack" link
 * (`paywall: true` in frontmatter). Change that per article if the editors decide to free a piece.
 *
 * Frontmatter you have already edited is kept. The importer only fills fields that are empty
 * or still a [placeholder], and always records substack / substackUrl / substackAudience.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const SUBSTACK = (process.env.NEXT_PUBLIC_SUBSTACK_URL || "https://read.tarkajournal.com").replace(/\/$/, "");
const DIR = path.join(process.cwd(), "content", "articles");
const AUTHORS_FILE = path.join(process.cwd(), "content", "authors.ts");
const PLACEHOLDER = /Body to be imported from Substack/i;

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined);
const DRY = flag("--dry");
const FORCE = flag("--force");
const CREATE_NEW = flag("--new");
const ONLY = opt("--slug");

/* ---------- Substack API (public, unauthenticated) ---------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getJSON(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { "user-agent": "tarka-website-importer" } });
    if (res.ok) return res.json();
    if (res.status === 429 || res.status >= 500) { await sleep(1500 * (i + 1)); continue; }
    throw new Error(`${res.status} ${url}`);
  }
  throw new Error(`gave up on ${url}`);
}
async function listPosts() {
  const all = [];
  for (let offset = 0; ; offset += 50) {
    const page = await getJSON(`${SUBSTACK}/api/v1/archive?sort=new&offset=${offset}&limit=50`);
    if (!page.length) break;
    all.push(...page);
    await sleep(300);
  }
  return all;
}
const getPost = (slug) => getJSON(`${SUBSTACK}/api/v1/posts/${encodeURIComponent(slug)}`);

/* ---------- HTML → Markdown ---------- */
const td = new TurndownService({ headingStyle: "atx", hr: "---", bulletListMarker: "-", codeBlockStyle: "fenced", emDelimiter: "*" });
td.use(gfm);
// Substack chrome we never want on the site
td.remove(["form", "button", "script", "style", "svg", "source"]);
td.addRule("dropWidgets", {
  filter: (n) => /subscription-widget|button-wrapper|image-link-expand|share-dialog|digest-post-embed|captioned-button/.test(n.getAttribute?.("class") || ""),
  replacement: () => "",
});
// Images with captions → plain image + italic caption line
td.addRule("figure", {
  filter: "figure",
  replacement: (_c, n) => {
    const img = n.querySelector("img");
    if (!img) return "";
    const src = (img.getAttribute("src") || "").trim();
    const alt = (img.getAttribute("alt") || "").replace(/\n/g, " ").trim();
    const cap = n.querySelector("figcaption")?.textContent?.trim();
    return `\n\n![${alt}](${src})${cap ? `\n*${cap}*` : ""}\n\n`;
  },
});
td.addRule("pullquote", {
  filter: (n) => n.nodeName === "DIV" && /pullquote/.test(n.getAttribute("class") || ""),
  replacement: (c) => "\n\n" + c.trim().split("\n").map((l) => `> ${l}`).join("\n") + "\n\n",
});
// Footnotes: <a class="footnote-anchor">1</a> → [^1]; <div class="footnote"> → [^1]: text
td.addRule("footnoteAnchor", {
  filter: (n) => n.nodeName === "A" && /footnote-anchor/.test(n.getAttribute("class") || ""),
  replacement: (c) => `[^${c.trim()}]`,
});
let notes = [];
td.addRule("footnote", {
  filter: (n) => n.nodeName === "DIV" && (n.getAttribute("class") || "") === "footnote",
  replacement: (_c, n) => {
    const num = n.querySelector(".footnote-number")?.textContent?.trim() || "?";
    const inner = new TurndownService({ emDelimiter: "*" }).turndown(n.querySelector(".footnote-content")?.innerHTML || "");
    notes.push(`[^${num}]: ${inner.trim().replace(/\n\n+/g, "\n\n    ")}`);
    return "";
  },
});

function toMarkdown(html) {
  notes = [];
  // footnote definitions are collected by the "footnote" rule and appended after the text
  const md = td.turndown(html || "").replace(/\n{3,}/g, "\n\n").trim();
  return notes.length ? `${md}\n\n${notes.join("\n\n")}\n` : `${md}\n`;
}

/* ---------- authors: Substack bylines → content/authors.ts slugs ---------- */
const authorSrc = fs.readFileSync(AUTHORS_FILE, "utf8");
const authorBySlugName = [...authorSrc.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)].map(([, slug, name]) => ({ slug, name }));
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function mapBylines(bylines = []) {
  const people = bylines.map((b) => b.name).filter((n) => n && !/^tarka( journal)?$/i.test(n));
  const slugs = [], unknown = [];
  for (const n of people) {
    const hit = authorBySlugName.find((a) => norm(a.name) === norm(n));
    hit ? slugs.push(hit.slug) : unknown.push(n);
  }
  return { slugs, unknown };
}

/* ---------- helpers ---------- */
const isBlank = (v) => v == null || v === "" || (Array.isArray(v) && v.length === 0) || /^\[.*\]$/.test(String(v).trim());
const isoDay = (d) => (d ? String(d).slice(0, 10) : undefined);
function coverUrl(post) {
  const u = post.cover_image;
  if (!u || /unsplash/.test(u)) return undefined; // keep Tarka art rather than stock photos
  return u;
}
function paywallPreview(post) {
  // Substack already truncates paid bodies for the public API; keep what it gives, minus the subscribe widget.
  return toMarkdown(post.body_html || `<p>${post.truncated_body_text || post.description || ""}</p>`);
}

/* ---------- main ---------- */
const posts = await listPosts();
console.log(`Substack: ${posts.length} posts at ${SUBSTACK}`);
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const byTitle = new Map(posts.map((p) => [norm(p.title), p]));

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
const used = new Set();
const report = { imported: [], preview: [], skipped: [], unmatched: [], created: [], unknownAuthors: new Set() };

async function writeArticle(file, existing, post) {
  const full = await getPost(post.slug);
  await sleep(250);
  const paid = full.audience === "only_paid";
  const body = paid ? paywallPreview(full) : toMarkdown(full.body_html);
  const data = { ...(existing?.data ?? {}) };
  const { slugs, unknown } = mapBylines(full.publishedBylines);
  unknown.forEach((n) => report.unknownAuthors.add(n));

  if (isBlank(data.title)) data.title = full.title;
  // Tarka's Substack subtitles are often just the byline ("By Katy Jane"); the page already shows the
  // author, so only use a subtitle as the dek when it isn't one.
  const isByline = (t) => /^\s*by\s/i.test(t || "");
  if (isBlank(data.dek) && full.subtitle && !isByline(full.subtitle)) data.dek = full.subtitle;
  if (isByline(data.dek)) data.dek = "[Dek.]"; // undo bylines written by earlier imports
  const onlyEditors = Array.isArray(data.authors) && data.authors.length === 1 && data.authors[0] === "tarka-editors";
  if (isBlank(data.authors) || (onlyEditors && slugs.length)) data.authors = slugs.length ? slugs : ["tarka-editors"];
  if (isBlank(data.date)) data.date = isoDay(full.post_date);
  if (isBlank(data.topics)) data.topics = [];
  if (isBlank(data.art)) data.art = "indigo";
  if (isBlank(data.image) && coverUrl(full)) data.image = coverUrl(full);
  data.substack = full.slug;
  data.substackUrl = full.canonical_url || `${SUBSTACK}/p/${full.slug}`;
  data.substackAudience = full.audience;
  if (paid) data.paywall = true; else delete data.paywall;

  for (const k of Object.keys(data)) if (data[k] instanceof Date) data[k] = data[k].toISOString().slice(0, 10);
  const out = matter.stringify(`\n${body}`, data);
  (paid ? report.preview : report.imported).push(file.replace(/\.md$/, ""));
  if (!DRY) fs.writeFileSync(path.join(DIR, file), out);
}

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  if (ONLY && slug !== ONLY) continue;
  const existing = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const post = bySlug.get(existing.data.substack) || bySlug.get(slug) || byTitle.get(norm(String(existing.data.title || "")));
  if (!post) { report.unmatched.push(slug); continue; }
  used.add(post.slug);
  const needs = FORCE || PLACEHOLDER.test(existing.content) || existing.content.trim().length < 40;
  if (!needs) { report.skipped.push(slug); continue; }
  await writeArticle(file, existing, post);
}

if (CREATE_NEW && !ONLY) {
  for (const post of posts) {
    if (used.has(post.slug) || post.type !== "newsletter") continue;
    const file = `${post.slug}.md`;
    if (fs.existsSync(path.join(DIR, file))) continue;
    report.created.push(post.slug);
    await writeArticle(file, null, post);
  }
}

console.log(`\n${DRY ? "[dry run] " : ""}Imported in full: ${report.imported.length}${report.imported.length ? "\n  " + report.imported.join("\n  ") : ""}`);
console.log(`Paid → preview + Substack link: ${report.preview.length}${report.preview.length ? "\n  " + report.preview.join("\n  ") : ""}`);
if (report.created.length) console.log(`New files created: ${report.created.length}`);
if (report.skipped.length) console.log(`Already had a body (use --force to overwrite): ${report.skipped.join(", ")}`);
if (report.unmatched.length) console.log(`No Substack match (add \`substack: <slug>\` to frontmatter): ${report.unmatched.join(", ")}`);
if (report.unknownAuthors.size) console.log(`Bylines not in content/authors.ts (add them, then fix those articles): ${[...report.unknownAuthors].join(", ")}`);
