import type { ArticleMeta } from "@/lib/types";
import { ArticleCard } from "./Cards";
import { NewsletterBox } from "./NewsletterForm";

/** Shared layout for Topic, Series and Author pages: header + essay grid + newsletter. */
export default function Listing({
  eyebrow,
  title,
  description,
  articles,
  aside,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  articles: ArticleMeta[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <main className="container page">
      <header className="stack" style={{ gap: 16, maxWidth: 820 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-l">{title}</h1>
        {description && <div className="body-l">{description}</div>}
        {aside}
      </header>
      <section className="stack" style={{ gap: 28 }}>
        <h2 className="h-section rule-top">{articles.length} {articles.length === 1 ? "essay" : "essays"}</h2>
        {articles.length === 0 ? (
          <p className="placeholder">Nothing here yet.</p>
        ) : (
          <div className="grid-cards">{articles.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        )}
      </section>
      {children}
      <NewsletterBox />
    </main>
  );
}
