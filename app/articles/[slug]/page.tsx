import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArticle,
  getArticles,
  getArticlesByIssue,
  getArticlesBySeries,
  getArticlesByTopic,
  getAuthor,
  getIssue,
  getSeries,
  getTopic,
} from "@/lib/content";
import { ArticleCard } from "@/components/Cards";
import { NewsletterBox } from "@/components/NewsletterForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    openGraph: { type: "article", title: a.title, description: a.dek, publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const issue = article.issue ? getIssue(article.issue) : null;
  const series = article.series ? getSeries(article.series) : null;
  const topics = article.topics.map(getTopic).filter((t) => t !== null);
  const authors = article.authors.map((s) => getAuthor(s) ?? { slug: s, name: s, photo: undefined });

  // "More" row: same series, then same issue, then same first topic
  const pool = [
    ...(series ? getArticlesBySeries(series.slug) : []),
    ...(issue ? getArticlesByIssue(issue.slug) : []),
    ...(topics[0] ? getArticlesByTopic(topics[0].slug) : []),
  ];
  const seen = new Set([article.slug]);
  const more = pool.filter((a) => (seen.has(a.slug) ? false : (seen.add(a.slug), true))).slice(0, 3);
  const moreTitle = series ? <>More in <i>{series.name}</i></> : issue ? <>More from <i>{issue.title}</i></> : "Keep reading";

  return (
    <main>
      {article.sample && <div className="notice">Sample copy for layout only. Replace with the final essay.</div>}

      <article>
        <header className="article-head">
          <div className="meta-row eyebrow" style={{ justifyContent: "center" }}>
            {series && <Link href={`/series/${series.slug}`} style={{ color: "var(--madder)" }}>Series · {series.name}</Link>}
            {topics.map((t) => <Link key={t.slug} href={`/topics/${t.slug}`} style={{ color: "var(--indigo)" }}>{t.name}</Link>)}
            {issue && <Link href={`/issues/${issue.slug}`}>{issue.number != null ? `No. ${issue.number} · ` : ""}{issue.title}</Link>}
          </div>
          {article.devanagari && <span lang="sa" className="deva">{article.devanagari}</span>}
          <h1 className="display-xl">{article.title}</h1>
          {article.dek && <p className="dek">{article.dek}</p>}
          <div className="byline">
            {authors[0]?.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={authors[0].photo} alt="" className="avatar" />
            ) : (
              <span className="avatar" aria-hidden="true" />
            )}
            <span>
              By{" "}
              {authors.map((a, i) => (
                <span key={a.slug}>
                  {i > 0 && " & "}
                  <Link href={`/authors/${a.slug}`}>{a.name}</Link>
                </span>
              ))}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>
        </header>

        <div className="container-narrow article-layout">
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
          <aside className="article-aside" aria-label="About this essay">
            {issue && (
              <div className="aside-card">
                <b>{issue.status === "forthcoming" ? "Coming in print" : "In print"}{issue.number != null ? ` in No. ${issue.number}` : ""}</b>
                <span>This essay appears in <i>{issue.title}</i>.</span>
                <Link href="/print" style={{ color: "var(--indigo)", fontWeight: 600 }}>Get the print issue →</Link>
              </div>
            )}
            {article.substackUrl && (
              <a href={article.substackUrl} className="small link-underline">Also on Substack</a>
            )}
          </aside>
        </div>

        <div className="container-narrow" style={{ marginTop: 72 }}>
          <NewsletterBox
            variant="indigo"
            title={series ? `Get the next “${series.name}” by email` : "Get Tarka by email"}
            body="New essays and podcast episodes from Tarka. Free."
          />
        </div>
      </article>

      {more.length > 0 && (
        <section className="container-narrow stack" style={{ gap: 28, paddingBlock: "80px 112px" }}>
          <h2 className="h-section rule-top">{moreTitle}</h2>
          <div className="grid-cards">
            {more.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}
    </main>
  );
}
