import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEdition, getEditions } from "@/lib/content";
import { EditionCover } from "@/components/Art";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEditions().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getEdition(slug);
  return e ? { title: e.title, description: e.subtitle } : {};
}

export default async function EditionPage({ params }: Props) {
  const { slug } = await params;
  const e = getEdition(slug);
  if (!e) notFound();
  return (
    <main className="container page">
      <section className="feature-panel">
        <div className="feature-panel__cover" style={{ flexBasis: "min(260px, 100%)" }}>
          <EditionCover art={e.art} title={e.title} image={e.coverImage} />
        </div>
        <div className="feature-panel__copy">
          <span className="eyebrow">Tarka Editions</span>
          <h1 className="display-l">{e.title}</h1>
          {e.subtitle && <p className="dek">{e.subtitle}</p>}
          <p className="body-l">{e.description}</p>
          <div className="meta-row small">{e.format && <span>{e.format}</span>}{e.price && <span>{e.price}</span>}</div>
          <div className="btn-row">
            {e.status === "available" && e.buyUrl ? (
              <a href={e.buyUrl} className="btn btn--primary">Buy the book</a>
            ) : (
              <a href="/newsletter" className="btn btn--outline">Tell me when it's out</a>
            )}
          </div>
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Contents</h2>
        {e.contents?.length ? (
          <ol className="body-l" style={{ margin: 0, paddingLeft: 22 }}>{e.contents.map((c) => <li key={c}>{c}</li>)}</ol>
        ) : (
          <p className="body-l placeholder">[Contents.]</p>
        )}
      </section>

      <section className="two-col">
        <h2 className="h-section">Sample pages</h2>
        <p className="body-l placeholder">[Two or three page images, uploaded to Vercel Blob.]</p>
      </section>
    </main>
  );
}
