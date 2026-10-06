import type { Metadata } from "next";
import Link from "next/link";
import { getEditions } from "@/lib/content";
import { EditionCover } from "@/components/Art";

export const metadata: Metadata = { title: "Tarka Editions" };

export default function EditionsPage() {
  const editions = getEditions();
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Tarka Editions</h1>
        <p className="dek placeholder">[One line on the press: scholar-practitioner editions of key texts.]</p>
      </section>
      <section className="grid-covers" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {editions.map((e) => (
          <Link key={e.slug} href={`/editions/${e.slug}`} className="cover-link">
            <EditionCover art={e.art} title={e.title} image={e.coverImage} />
            <span className="serif" style={{ fontSize: 24, lineHeight: 1.2 }}>{e.title}</span>
            {e.subtitle && <span className="small">{e.subtitle}</span>}
            <span className="tag">{e.status === "available" ? "Available" : "Forthcoming"}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
