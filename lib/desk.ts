import "server-only";
import { authors as authorData } from "@/content/authors";
import { topics as topicData, series as seriesData } from "@/content/topics";
import { issues as issueData } from "@/content/issues";
import type { Article, ArticleMeta } from "./types";

/**
 * Articles written and published on Tarka Desk (desk.tarkajournal.com).
 * The Desk owns them; this site reads the frozen, published copy through the Desk's read-only API.
 * If DESK_URL or DESK_API_KEY is missing, or the Desk is unreachable, this returns nothing and
 * the site carries on with the Markdown essays in /content/articles. It never breaks a build.
 */

export const DESK_TAG = "desk-articles";

type Inline =
  | { t: "text"; v: string } | { t: "em"; v: string } | { t: "strong"; v: string }
  | { t: "note"; n: number; key: string };
type Block = { type: "p" | "h2" | "h3" | "quote" | "verse"; inlines: Inline[] } | { type: "promo" };
type Promo = { kind: string; headline: string; text: string; button: string; url: string; placement: "end" | "side" };
export type DeskArticle = {
  slug: string; title: string; standfirst: string | null; kind: string; authors: string | null; topics: string[];
  series: string | null; issue: number | null; description: string | null; publishedAt: string | null;
  readingMinutes: number; blocks: Block[]; notes: { n: number; key: string; text: string }[]; promo: Promo | null;
  draft?: boolean;
};

const base = () => (process.env.DESK_URL ?? "").replace(/\/$/, "");
const configured = () => !!base() && !!process.env.DESK_API_KEY;

async function deskFetch<T>(path: string, init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {}): Promise<T | null> {
  try {
    const res = await fetch(`${base()}${path}`, { ...init, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (e) {
    console.error("[desk-fetch-failed]", path, e instanceof Error ? e.message : e);
    return null;
  }
}

const keyHeaders = () => ({ authorization: `Bearer ${process.env.DESK_API_KEY}` });

export async function fetchDeskArticleList(): Promise<DeskArticle[]> {
  if (!configured()) return [];
  const list = await deskFetch<{ articles: { slug: string }[] }>("/api/articles", {
    headers: keyHeaders(), next: { revalidate: 300, tags: [DESK_TAG] },
  });
  if (!list) return [];
  const full = await Promise.all(list.articles.map((a) => fetchDeskArticle(a.slug)));
  return full.filter((a): a is DeskArticle => !!a);
}

export async function fetchDeskArticle(slug: string): Promise<DeskArticle | null> {
  if (!configured()) return null;
  return deskFetch<DeskArticle>(`/api/articles/${encodeURIComponent(slug)}`, {
    headers: keyHeaders(), next: { revalidate: 300, tags: [DESK_TAG, `${DESK_TAG}:${slug}`] },
  });
}

/** The unpublished working copy, for the hidden preview page. Needs the Desk's signed token. */
export async function fetchDeskDraft(slug: string, token: string): Promise<DeskArticle | null> {
  if (!base()) return null;
  return deskFetch<DeskArticle>(`/api/articles/${encodeURIComponent(slug)}/draft?token=${encodeURIComponent(token)}`, { cache: "no-store" });
}

// ---------- Mapping onto the site's content model ----------

const norm = (s: string) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function matchSlug(value: string, items: { slug: string; name: string }[]) {
  const n = norm(value);
  return items.find((i) => i.slug === n || norm(i.name) === n)?.slug;
}

export function toArticle(d: DeskArticle): Article {
  const authorNames = (d.authors ?? "").split(/,|&|\band\b/).map((s) => s.trim()).filter(Boolean);
  // A known author links to their page; an unknown one keeps their name and shows without a link.
  const authors = authorNames.map((n) => matchSlug(n, authorData) ?? n);
  const topics = d.topics.map((t) => matchSlug(t, topicData)).filter((s): s is string => !!s);
  const series = d.series ? matchSlug(d.series, seriesData as { slug: string; name: string }[]) : undefined;
  const issue = d.issue != null ? issueData.find((i) => i.number === d.issue)?.slug : undefined;
  return {
    slug: d.slug, title: d.title, dek: d.standfirst ?? d.description ?? undefined,
    authors, issue, topics, series,
    date: (d.publishedAt ?? new Date().toISOString()).slice(0, 10), art: "indigo",
    readingMinutes: d.readingMinutes, featured: false,
    html: renderDeskHtml(d),
  };
}

// ---------- Rendering: everything is escaped, nothing from the Desk is trusted as HTML ----------

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const safeUrl = (u: string) => (/^(https?:\/\/|\/)/.test(u) ? u : "#");

function inline(items: Inline[]) {
  return items.map((i) =>
    i.t === "text" ? esc(i.v)
    : i.t === "em" ? `<em>${esc(i.v)}</em>`
    : i.t === "strong" ? `<strong>${esc(i.v)}</strong>`
    : `<sup><a href="#user-content-fn-${i.n}" id="user-content-fnref-${i.n}" data-footnote-ref aria-describedby="footnote-label">${i.n}</a></sup>`,
  ).join("");
}

function promoHtml(p: Promo) {
  return `<aside class="aside-card" aria-label="Promotion"><b>${esc(p.headline)}</b>${p.text ? `<span>${esc(p.text)}</span>` : ""}<a href="${esc(safeUrl(p.url))}" class="btn btn--primary">${esc(p.button)}</a></aside>`;
}

export function renderDeskHtml(d: DeskArticle): string {
  const inlinePromo = d.blocks.some((b) => b.type === "promo");
  const out = d.blocks.map((b) => {
    if (b.type === "promo") return d.promo ? promoHtml(d.promo) : "";
    const h = inline(b.inlines);
    return b.type === "h2" ? `<h2>${h}</h2>` : b.type === "h3" ? `<h3>${h}</h3>`
      : b.type === "quote" ? `<blockquote><p>${h}</p></blockquote>`
      : b.type === "verse" ? `<p style="white-space:pre-line;padding-left:1.5em"><em>${h}</em></p>`
      : `<p>${h}</p>`;
  });
  if (d.promo && !inlinePromo) out.push(promoHtml(d.promo));
  if (d.notes.length) {
    out.push(`<section data-footnotes class="footnotes"><h2 id="footnote-label">Notes</h2><ol>${d.notes.map((n) =>
      `<li id="user-content-fn-${n.n}"><p>${esc(n.text)} <a href="#user-content-fnref-${n.n}" data-footnote-backref aria-label="Back to text">↩</a></p></li>`).join("")}</ol></section>`);
  }
  return out.join("\n");
}
