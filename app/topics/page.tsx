import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByTopic, getSeriesList, getTopics } from "@/lib/content";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsPage() {
  return (
    <main className="container page">
      <div className="stack" style={{ gap: 16 }}>
        <h1 className="display-l">Topics</h1>
        <p className="body-l" style={{ maxWidth: 620 }}>Read Tarka by subject, across every issue.</p>
      </div>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0 40px" }}>
        {getTopics().map((t) => {
          const n = getArticlesByTopic(t.slug).length;
          return (
            <Link key={t.slug} href={`/topics/${t.slug}`} className="list-item">
              <span className="list-item__title" style={{ fontSize: 26 }}>{t.name}</span>
              <span className="small">{n} {n === 1 ? "essay" : "essays"}</span>
            </Link>
          );
        })}
      </section>
      <section className="stack" style={{ gap: 16 }}>
        <h2 className="h-section rule-top">Series</h2>
        {getSeriesList().map((s) => (
          <Link key={s.slug} href={`/series/${s.slug}`} className="list-item">
            <span className="list-item__title">{s.name}</span>
            {s.description && <span className="small">{s.description}</span>}
          </Link>
        ))}
      </section>
    </main>
  );
}
