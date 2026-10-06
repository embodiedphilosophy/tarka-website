import type { Metadata } from "next";
import Link from "next/link";
import { getEditions } from "@/lib/content";
import { EditionCover } from "@/components/Art";
import { editionsSeries } from "@/content/editions";

export const metadata: Metadata = { title: "Tarka Editions" };

export default function EditionsPage() {
  const editions = getEditions();
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Tarka Editions</h1>
        <div className="stack" style={{ gap: 14 }}>
          <p className="dek">The press of Tarka Journal.</p>
          <p className="body-l"><b>{editionsSeries.name}.</b> {editionsSeries.description}</p>
          <p className="small">
            Editions will also open in <Link href="/vak" className="link-underline">Vāk</Link>, the Tarka Sanskrit app (spring 2027).
          </p>
        </div>
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
