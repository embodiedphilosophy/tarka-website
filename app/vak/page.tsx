import type { Metadata } from "next";
import Link from "next/link";
import { vak } from "@/content/vak";
import { NewsletterBox } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Vāk · the Tarka Sanskrit app",
  description: vak.dek,
};

const isPlaceholder = (s: string) => s.trim().startsWith("[");

export default function VakPage() {
  const features = vak.features.filter((f) => !isPlaceholder(f.name));
  return (
    <main className="container page">
      <section className="two-col">
        <div className="stack" style={{ gap: 10 }}>
          <span className="deva" lang="sa">{vak.devanagari}</span>
          <h1 className="display-l">{vak.name}</h1>
          <span className="tag tag--madder">{vak.status}</span>
        </div>
        <div className="stack" style={{ gap: 18 }}>
          <p className="dek">{vak.dek}</p>
          <p className="body-l">{vak.intro}</p>
          <p className="small">{vak.launchNote}</p>
          <div className="btn-row">
            <a href="#waitlist" className="btn btn--primary">Join the waitlist</a>
            <Link href="/editions" className="btn btn--outline">Tarka Editions</Link>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="benefits">
          {features.map((f) => (
            <div key={f.name}>
              <b className="h-card">{f.name}</b>
              <span className="body-l" style={{ fontSize: 16 }}>{f.body}</span>
            </div>
          ))}
        </section>
      )}

      <section className="stack" style={{ gap: 20 }}>
        <div className="section-head rule-top">
          <h2 className="h-section">The first texts</h2>
          <span className="small">Six texts at launch</span>
        </div>
        <div className="grid-cards">
          {vak.launchTexts.map((t) => (
            <div key={t.title} className="price-card">
              <b className="serif" style={{ fontSize: 26, lineHeight: 1.2 }}><i>{t.title}</i></b>
              <span className="small">{t.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Access</h2>
        <p className="body-l">{vak.access}</p>
      </section>

      <div id="waitlist" style={{ scrollMarginTop: 24 }}>
        <NewsletterBox variant="indigo" title="Be first to read in Vāk" body="We'll write when the beta opens, then again at launch. Free." />
      </div>
    </main>
  );
}
