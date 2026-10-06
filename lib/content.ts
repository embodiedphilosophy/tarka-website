import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { issues as issueData } from "@/content/issues";
import { authors as authorData } from "@/content/authors";
import { topics as topicData, series as seriesData } from "@/content/topics";
import { editions as editionData } from "@/content/editions";
import type { Article, ArticleMeta, ArtKey, Author, Edition, Issue, Series, Topic } from "./types";

/**
 * The ONE place pages get content from.
 * Today: TypeScript files + Markdown in /content.
 * Later: swap these function bodies for Sanity queries (docs/CMS.md) — pages don't change.
 */

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const toISO = (d: unknown): string =>
  d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? "");

const toList = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : v ? [String(v)] : []);

function readArticleFile(file: string): { meta: ArticleMeta; body: string } {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    body: content,
    meta: {
      slug,
      title: String(data.title ?? slug),
      dek: data.dek ? String(data.dek) : undefined,
      authors: toList(data.authors),
      issue: data.issue ? String(data.issue) : undefined,
      topics: toList(data.topics),
      series: data.series ? String(data.series) : undefined,
      date: toISO(data.date),
      art: (data.art as ArtKey) ?? "indigo",
      image: data.image ? String(data.image) : undefined,
      devanagari: data.devanagari ? String(data.devanagari) : undefined,
      sample: Boolean(data.sample),
      substackUrl: data.substackUrl ? String(data.substackUrl) : undefined,
      featured: Boolean(data.featured),
      readingMinutes: Math.max(1, Math.round(words / 230)),
    },
  };
}

let cache: { meta: ArticleMeta; body: string }[] | null = null;
function allArticleFiles() {
  if (!cache) {
    cache = fs
      .readdirSync(ARTICLES_DIR)
      .filter((f) => f.endsWith(".md"))
      .map(readArticleFile)
      .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
  }
  return cache;
}

async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true, footnoteLabel: "Notes" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

/* ---------- Articles ---------- */
export function getArticles(): ArticleMeta[] {
  return allArticleFiles().map((a) => a.meta);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const found = allArticleFiles().find((a) => a.meta.slug === slug);
  if (!found) return null;
  return { ...found.meta, html: await renderMarkdown(found.body) };
}

export const getArticlesByIssue = (issue: string) => getArticles().filter((a) => a.issue === issue);
export const getArticlesByTopic = (topic: string) => getArticles().filter((a) => a.topics.includes(topic));
export const getArticlesBySeries = (s: string) => getArticles().filter((a) => a.series === s);
export const getArticlesByAuthor = (author: string) => getArticles().filter((a) => a.authors.includes(author));

export function getLeadArticle(): ArticleMeta | undefined {
  const all = getArticles();
  return all.find((a) => a.featured) ?? all[0];
}

/* ---------- Issues ---------- */
export function getIssues(): Issue[] {
  // forthcoming first, then by number (desc), then by date (desc)
  return [...issueData].sort((a, b) => {
    if (a.status !== b.status) return a.status === "forthcoming" ? -1 : 1;
    if ((b.number ?? -1) !== (a.number ?? -1)) return (b.number ?? -1) - (a.number ?? -1);
    return (b.date ?? "").localeCompare(a.date ?? "");
  });
}
export const getIssue = (slug: string) => issueData.find((i) => i.slug === slug) ?? null;
export const getForthcomingIssue = () => getIssues().find((i) => i.status === "forthcoming");
export const getCurrentIssue = () => getIssues().find((i) => i.status === "published");

/* ---------- Authors, topics, series, editions ---------- */
export const getAuthors = (): Author[] => [...authorData].sort((a, b) => a.name.localeCompare(b.name));
export const getAuthor = (slug: string) => authorData.find((a) => a.slug === slug) ?? null;
export const getTopics = (): Topic[] => topicData;
export const getTopic = (slug: string) => topicData.find((t) => t.slug === slug) ?? null;
export const getSeriesList = (): Series[] => seriesData;
export const getSeries = (slug: string) => seriesData.find((s) => s.slug === slug) ?? null;
export const getEditions = (): Edition[] => editionData;
export const getEdition = (slug: string) => editionData.find((e) => e.slug === slug) ?? null;

/** Display helpers */
export const authorNames = (slugs: string[]) =>
  slugs.map((s) => getAuthor(s)?.name ?? s).join(" & ");

export const issueLabel = (i: Issue) => (i.number != null ? `No. ${i.number} · ${i.title}` : i.title);
