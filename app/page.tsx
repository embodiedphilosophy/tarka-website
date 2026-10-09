import Link from "next/link";
import {
  authorNames,
  getArticles,
  getArticlesByIssue,
  getCurrentIssue,
  getEditions,
  getLeadArticle,
  getTopics,
  getIssue,
} from "@/lib/content";
import { ArticleArt, EditionCover } from "@/components/Art";
import { ArticleCard, ArticleListItem, kicker } from "@/components/Cards";
import PrintBand from "@/components/PrintBand";
import NewsletterForm from "@/components/NewsletterForm";
import { congress } from "@/content/congress";

export default async function HomePage() {
  const lead = await getLeadArticle();
  const current = getCurrentIssue();
  const inIssue = current ? (await getArticlesByIssue(current.slug)).filter((a) => a.slug !== lead?.slug) : [];
  const shownSlugs = new Set([lead?.slug, ...inIssue.map((a) => a.slug)]);
  const rest = (await getArticles()).filter((a) => !shownSlugs.has(a.slug));
  const thisIssueCards = [...inIssue, ...rest].slice(0, 3);
  const archive = rest.filter((a) => !thisIssueCards.some((c) => c.slug === a.slug)).slice(0, 5);
  const leadIssue = lead?.issue ? getIssue(lead.issue) : null;
  const leadKicker = lead ? kicker(lead) : null;
  const edition = getEditions()[0];

  return (
    <main className="container page" style={{ paddingTop: 40 }}>
      <Link href="/congress" className="section-head" style={{ background: "var(--indigo)", color: "var(--white)", padding: "16px 24px", borderRadius: "var(--radius)", alignItems: "center" }}>
        <span><b>{congress.name}</b> · <i>{congress.theme}</i> · {congress.dates}, online</span>
        <span style={{ fontWeight: 600 }}>See the programme →</span>
      </Link>
      {lead && (
        <section className="lead">
          <div className="lead__main">
            <Link href={`/articles/${lead.slug}`} className="lead__art" aria-hidden="true" tabIndex={-1}>
              <ArticleArt art={lead.art} title={lead.title} image={lead.image} wide />
            </Link>
            <div className="meta-row eyebrow">
              {leadKicker && <Link href={leadKicker.href} style={{ color: "var(--madder)" }}>{leadKicker.label}</Link>}
              {leadIssue && <Link href={`/issues/${leadIssue.slug}`}>{leadIssue.number != null ? `No. ${leadIssue.number} · ` : ""}{leadIssue.title}</Link>}
            </div>
            <Link href={`/articles/${lead.slug}`} className="stack" style={{ gap: 18 }}>
              <h1 className="display-l">{lead.title}</h1>
              {lead.dek && <p className="dek" style={{ maxWidth: 640 }}>{lead.dek}</p>}
            </Link>
            <span className="small" style={{ fontSize: 15 }}>By {authorNames(lead.authors)} · {lead.readingMinutes} min read</span>
          </div>

          <aside className="lead__rail" aria-labelledby="archive-rail">
            <h2 id="archive-rail" className="eyebrow" style={{ color: "var(--ink)", padding: "14px 0" }}>From the archive</h2>
            {archive.map((a) => <ArticleListItem key={a.slug} article={a} />)}
          </aside>
        </section>
      )}

      {current && thisIssueCards.length > 0 && (
        <section className="stack" style={{ gap: 28 }}>
          <div className="section-head rule-top">
            <h2 className="h-section">In this issue · <i>{current.title}</i></h2>
            <Link href={`/issues/${current.slug}`} className="link-underline">Full contents{current.number != null ? ` of No. ${current.number}` : ""}</Link>
          </div>
          <div className="grid-cards">
            {thisIssueCards.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      <section className="stack" style={{ gap: 18 }} aria-labelledby="topics-head">
        <h2 id="topics-head" className="eyebrow">Read by topic</h2>
        <div className="pills">
          {getTopics().map((t) => <Link key={t.slug} href={`/topics/${t.slug}`} className="pill">{t.name}</Link>)}
        </div>
      </section>

      <PrintBand />

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
        {edition && (
          <div className="stack rule-top" style={{ gap: 18 }}>
            <h2 className="h-section">Tarka Editions</h2>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
              <Link href={`/editions/${edition.slug}`} style={{ width: 130, flex: "none" }}>
                <EditionCover art={edition.art} title={edition.title} image={edition.coverImage} />
              </Link>
              <div className="stack" style={{ gap: 8 }}>
                <b className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{edition.title}</b>
                {edition.subtitle && <span className="body-l" style={{ fontSize: 15 }}>{edition.subtitle}</span>}
                <Link href={`/editions/${edition.slug}`} style={{ color: "var(--indigo)", fontWeight: 600, marginTop: 6 }}>See the book →</Link>
              </div>
            </div>
          </div>
        )}
        <div className="stack rule-top" style={{ gap: 18 }}>
          <h2 className="h-section">Tarka in your inbox</h2>
          <p className="body-l" style={{ fontSize: 16 }}>New essays, podcast episodes and notes from the editors. Free.</p>
          <NewsletterForm id="home-email" />
        </div>
      </section>
    </main>
  );
}
