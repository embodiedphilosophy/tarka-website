import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { NewsletterBox } from "@/components/NewsletterForm";
import { fold, getCsi, getCsiEntry } from "@/lib/csi";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCsi().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const e = getCsiEntry(slug);
  if (!e) return {};
  return {
    title: `What is ${e.term}? · Contemplative Studies Index`,
    description: e.definition,
    alternates: { canonical: `/csi/${e.slug}` },
  };
}

async function readArticle(slug: string) {
  const file = path.join(process.cwd(), "content", "csi", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const html = String(
    await unified().use(remarkParse).use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true, footnoteLabel: "Notes" }).use(rehypeStringify, { allowDangerousHtml: true }).process(content),
  );
  return { html, data };
}

export default async function CsiEntryPage({ params }: Params) {
  const { slug } = await params;
  const e = getCsiEntry(slug);
  if (!e) notFound();
  const all = getCsi();
  const i = all.findIndex((x) => x.slug === e.slug);
  const prev = all[i - 1];
  const next = all[i + 1];
  const article = await readArticle(e.slug);
  const aliases = e.aliases
    .split(" ")
    .filter(Boolean)
    .filter((a) => fold(a) !== fold(e.term));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: e.term,
    description: e.definition,
    url: `${site.url}/csi/${e.slug}`,
    inDefinedTermSet: `${site.url}/csi`,
  };

  return (
    <main className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="small" aria-label="Breadcrumb">
        <Link href="/csi" className="link-underline">Contemplative Studies Index</Link> / {e.letter}
      </nav>

      <section className="two-col">
        <div className="stack" style={{ gap: 10 }}>
          <span className="eyebrow">{e.kindLabel}</span>
          <h1 className="display-l">{e.term}</h1>
          <span className="small"><i>{e.language}</i></span>
        </div>
        <div className="stack" style={{ gap: 20 }}>
          <p className="dek">{e.definition}</p>
          <dl className="csi-dl">
            <dt>Tradition</dt>
            <dd>
              {e.traditions.map((t, k) => (
                <span key={t}>{k > 0 && ", "}<Link href={`/csi#trad=${t}`} className="link-underline">{e.traditionLabels[k]}</Link></span>
              ))}
            </dd>
            <dt>Kind</dt>
            <dd><Link href={`/csi#kind=${e.kind}`} className="link-underline">{e.kindLabel}</Link></dd>
            {aliases.length > 0 && (<><dt>Also found as</dt><dd>{aliases.join(", ")}</dd></>)}
          </dl>
        </div>
      </section>

      {article ? (
        <article className="container-narrow" style={{ paddingInline: 0 }}>
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>
      ) : (
        <section className="feature-panel" style={{ gap: 24 }}>
          <div className="feature-panel__copy">
            <b className="h-card">{e.fullEntry ? "The full entry is moving to Tarka" : "Full entry in preparation"}</b>
            <p className="body-l" style={{ fontSize: 16 }}>
              {e.fullEntry
                ? "A longer article on this term is being edited for the Index."
                : "This is a working definition. A longer article will follow."}{" "}
              {e.legacyUrl && "Until then, the earlier version is on Embodied Philosophy."}
            </p>
            {e.legacyUrl && (
              <div className="btn-row"><a href={e.legacyUrl} className="btn btn--outline">Read the earlier version</a></div>
            )}
          </div>
        </section>
      )}

      {e.relatedItems.length > 0 && (
        <section className="stack" style={{ gap: 14 }}>
          <h2 className="h-section rule-top" style={{ paddingTop: 16 }}>Related entries</h2>
          <ul className="csi-chips">
            {e.relatedItems.map((r) => (
              <li key={r.slug}><Link href={`/csi/${r.slug}`}>{r.term}</Link></li>
            ))}
          </ul>
        </section>
      )}

      <nav className="csi-pager" aria-label="Neighbouring entries">
        {prev ? <Link href={`/csi/${prev.slug}`}>← {prev.term}</Link> : <span />}
        <Link href="/csi" className="small">All entries</Link>
        {next ? <Link href={`/csi/${next.slug}`}>{next.term} →</Link> : <span />}
      </nav>

      <NewsletterBox title="A new term every week" body="New Index entries and essays from Tarka, by email. Free." />
    </main>
  );
}
