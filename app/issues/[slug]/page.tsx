import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authorNames, getArticlesByIssue, getIssue, getIssues } from "@/lib/content";
import { Cover } from "@/components/Art";
import { kicker } from "@/components/Cards";
import { NewsletterBox } from "@/components/NewsletterForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getIssues().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = getIssue(slug);
  return i ? { title: `${i.number != null ? `No. ${i.number}: ` : ""}${i.title}`, description: i.description } : {};
}

export default async function IssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();
  const articles = getArticlesByIssue(issue.slug);
  const all = getIssues();
  const idx = all.findIndex((i) => i.slug === issue.slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main className="container page">
      <section className="feature-panel">
        <div className="feature-panel__cover">
          <Cover art={issue.art} title={issue.title} number={issue.number} image={issue.coverImage} crop={issue.coverCrop} />
        </div>
        <div className="feature-panel__copy">
          <span className="eyebrow" style={{ color: "var(--madder)" }}>
            {issue.status === "forthcoming" ? "Forthcoming" : "Issue"}{issue.number != null ? ` · No. ${issue.number}` : ""}
          </span>
          <h1 className="display-l"><i>{issue.title}</i></h1>
          {issue.description && <p className="body-l">{issue.description}</p>}
          {issue.printAvailable && (
            <div className="btn-row">
              <Link href="/print" className="btn btn--primary">
                {issue.status === "forthcoming" ? "Pre-order in print" : "Buy this issue in print"}
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">From the editor</h2>
        <p className="body-l placeholder">{issue.editorsIntro ?? "[Editor's introduction.]"}</p>
      </section>

      <section className="stack" style={{ gap: 20 }}>
        <h2 className="h-section rule-top">Contents</h2>
        {articles.length === 0 ? (
          <p className="placeholder">[Articles for this issue will appear here once imported.]</p>
        ) : (
          <div className="toc">
            {articles.map((a) => {
              const k = kicker(a);
              return (
                <Link key={a.slug} href={`/articles/${a.slug}`}>
                  <span className={`tag ${k?.madder ? "tag--madder" : ""}`}>{k?.label}</span>
                  <span className="stack" style={{ gap: 6 }}>
                    <span className="serif" style={{ fontSize: 28, lineHeight: 1.2 }}>{a.title}</span>
                    {a.dek && <span className="body-l" style={{ fontSize: 16 }}>{a.dek}</span>}
                    <span className="small">{authorNames(a.authors)}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {issue.spreads && issue.spreads.length > 0 && (
        <section className="stack" style={{ gap: 20 }}>
          <h2 className="h-section rule-top">Inside the issue</h2>
          <div className="spreads">
            {issue.spreads.map((src, n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`${issue.title}, spread ${n + 1}`} loading="lazy" />
            ))}
          </div>
        </section>
      )}

      <nav aria-label="More issues" className="section-head">
        {older ? <Link href={`/issues/${older.slug}`} className="link-underline">← {older.title}</Link> : <span />}
        {newer ? <Link href={`/issues/${newer.slug}`} className="link-underline">{newer.title} →</Link> : <span />}
      </nav>

      <NewsletterBox />
    </main>
  );
}
