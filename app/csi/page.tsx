import type { Metadata } from "next";
import CsiBrowser from "@/components/CsiBrowser";
import { NewsletterBox } from "@/components/NewsletterForm";
import { csiKinds, csiTraditions } from "@/content/csi";
import { getCsi } from "@/lib/csi";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contemplative Studies Index",
  description:
    "A working lexicon of the concepts, practices, texts and figures of the contemplative traditions, defined by scholar-practitioners.",
  alternates: { canonical: "/csi" },
};

export default function CsiIndexPage() {
  const all = getCsi();
  const full = all.filter((e) => e.fullEntry).length;
  const entries = all.map(({ term, slug, aliases, kind, traditions, language, definition, fullEntry, letter }) => ({
    term, slug, aliases, kind, traditions, language, definition, fullEntry, letter,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Contemplative Studies Index",
    url: `${site.url}/csi`,
    publisher: { "@type": "Organization", name: "Tarka Journal" },
    hasDefinedTerm: all.map((e) => ({ "@type": "DefinedTerm", name: e.term, url: `${site.url}/csi/${e.slug}` })),
  };

  return (
    <main className="container page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="two-col" style={{ alignItems: "end" }}>
        <div className="stack" style={{ gap: 10 }}>
          <span className="eyebrow">Tarka reference</span>
          <h1 className="display-l">Contemplative Studies Index</h1>
        </div>
        <div className="stack" style={{ gap: 12 }}>
          <p className="dek">
            A working lexicon of the concepts, practices, texts and figures of the contemplative traditions, defined by scholar-practitioners.
          </p>
          <p className="small">{all.length} entries · {full} full entries · new entries added with each issue</p>
        </div>
      </section>

      <CsiBrowser entries={entries} kinds={csiKinds} traditions={csiTraditions} />

      <section className="newsletter-box newsletter-box--paper">
        <div className="newsletter-box__copy">
          <h2 className="h-section">Missing a term?</h2>
          <p className="body-l" style={{ fontSize: 16 }}>The index grows from readers' questions. Suggest an entry or a correction.</p>
        </div>
        <a href={`mailto:${site.email}?subject=Contemplative%20Studies%20Index%20suggestion`} className="btn btn--ink">Suggest an entry</a>
      </section>

      <NewsletterBox title="A new term every week" body="New Index entries and essays from Tarka, by email. Free." />
    </main>
  );
}
