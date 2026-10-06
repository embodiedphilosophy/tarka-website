import type { Metadata } from "next";
import Link from "next/link";
import { authorNames, getArticles } from "@/lib/content";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  const byYear = new Map<string, ReturnType<typeof getArticles>>();
  for (const a of getArticles()) {
    const y = a.date.slice(0, 4) || "Undated";
    byYear.set(y, [...(byYear.get(y) ?? []), a]);
  }
  return (
    <main className="container page">
      <h1 className="display-l">Archive</h1>
      {[...byYear.entries()].map(([year, list]) => (
        <section key={year} className="two-col">
          <h2 className="h-section">{year}</h2>
          <div className="stack">
            {list.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="list-item">
                <span className="list-item__title">{a.title}</span>
                <span className="small">{authorNames(a.authors)} · {a.date}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
