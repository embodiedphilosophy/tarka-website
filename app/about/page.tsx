import type { Metadata } from "next";
import Link from "next/link";
import { getAuthors } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const contributors = getAuthors().filter((a) => a.slug !== "tarka-editors");
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">About Tarka</h1>
        <div className="stack" style={{ gap: 20 }}>
          <p className="dek">{site.description}</p>
          <p className="body-l placeholder">[Mission: why Tarka exists, what “tarka” means, and who the scholar-practitioner is.]</p>
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Masthead</h2>
        <div className="stack">
          <div className="list-item"><span className="list-item__title">Jacob Kyle</span><span className="small">Editor</span></div>
          <div className="list-item"><span className="list-item__title placeholder">[Name]</span><span className="small">[Role]</span></div>
          <div className="list-item"><span className="list-item__title placeholder">[Name]</span><span className="small">[Role]</span></div>
        </div>
      </section>

      <section className="two-col" id="authors">
        <h2 className="h-section">Contributors</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0 32px" }}>
          {contributors.map((a) => (
            <Link key={a.slug} href={`/authors/${a.slug}`} className="list-item">
              <span className="list-item__title">{a.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Contact</h2>
        <div className="stack" style={{ gap: 10 }}>
          <a className="body-l link-underline" href={`mailto:${site.email}`}>{site.email}</a>
          <span className="small">Writing for Tarka? See <Link href="/pitch" className="link-underline">how to pitch</Link>.</span>
        </div>
      </section>
    </main>
  );
}
