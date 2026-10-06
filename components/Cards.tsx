import Link from "next/link";
import type { ArticleMeta, Issue } from "@/lib/types";
import { authorNames, getSeries, getTopic, issueLabel } from "@/lib/content";
import { ArticleArt, Cover } from "./Art";

/** The first label shown on a card: series beats topic. */
export function kicker(a: ArticleMeta): { label: string; href: string; madder: boolean } | null {
  if (a.series) {
    const s = getSeries(a.series);
    if (s) return { label: `Series · ${s.name}`, href: `/series/${s.slug}`, madder: true };
  }
  const t = a.topics[0] ? getTopic(a.topics[0]) : null;
  return t ? { label: t.name, href: `/topics/${t.slug}`, madder: false } : null;
}

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const k = kicker(article);
  return (
    <article className="card">
      <Link href={`/articles/${article.slug}`} className="card__art" tabIndex={-1} aria-hidden="true">
        <ArticleArt art={article.art} title={article.title} image={article.image} />
      </Link>
      {k && (
        <Link href={k.href} className={`tag ${k.madder ? "tag--madder" : ""}`}>{k.label}</Link>
      )}
      <Link href={`/articles/${article.slug}`} className="stack" style={{ gap: 10 }}>
        <h3 className="h-card">{article.title}</h3>
        {article.dek && <p className="card__dek">{article.dek}</p>}
      </Link>
      <span className="small">{authorNames(article.authors)}</span>
    </article>
  );
}

export function ArticleListItem({ article }: { article: ArticleMeta }) {
  const k = kicker(article);
  return (
    <Link href={`/articles/${article.slug}`} className="list-item">
      {k && <span className={`tag ${k.madder ? "tag--madder" : ""}`}>{k.label}</span>}
      <span className="list-item__title">{article.title}</span>
      <span className="small">{authorNames(article.authors)}</span>
    </Link>
  );
}

export function IssueCover({ issue }: { issue: Issue }) {
  return (
    <Link href={`/issues/${issue.slug}`} className="cover-link">
      <Cover art={issue.art} title={issue.title} number={issue.number} image={issue.coverImage} crop={issue.coverCrop} />
      <span className="mono small">{issue.number != null ? `No. ${issue.number}` : issue.status === "forthcoming" ? "Forthcoming" : ""}</span>
      <span className="serif" style={{ fontSize: 24, lineHeight: 1.2, marginTop: -4 }}>{issue.title}</span>
      <span className="sr-only">{issueLabel(issue)}</span>
    </Link>
  );
}
