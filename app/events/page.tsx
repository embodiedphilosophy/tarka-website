import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/content/events";
import { site } from "@/lib/site";
import { NewsletterBox } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Events",
  description: "The Annual Congress of Scholar-Practitioners and Tarka Evenings in Seattle, New York, London and Oxford.",
};

export default function EventsPage() {
  const congress = events.find((e) => e.kind === "congress");
  const evenings = events.filter((e) => e.kind === "evening");

  return (
    <main className="container page">
      <div className="section-head" style={{ alignItems: "flex-end" }}>
        <h1 className="display-l">Events</h1>
        <p className="body-l" style={{ maxWidth: 520, fontSize: 17 }}>
          Tarka gathers its readers twice over: once a year online at the Congress, and in person in four cities.
        </p>
      </div>

      {congress && (
        <section className="band-dark print-band" aria-labelledby="congress-head">
          <div className="print-band__copy" style={{ flexBasis: 640 }}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{congress.when}</span>
            <h2 id="congress-head" className="display-m">{congress.title}</h2>
            <p>{congress.format}</p>
            <div className="btn-row">
              <Link href="/congress" className="btn btn--cream">See the programme</Link>
              <Link href="/congress#register" className="btn btn--outline-light">Register</Link>
            </div>
          </div>
        </section>
      )}

      <section className="stack" style={{ gap: 28 }}>
        <div className="section-head rule-top">
          <h2 className="h-section">Tarka Evenings</h2>
          <span className="small">Free for print subscribers</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 32 }}>
          {evenings.map((e) => (
            <article key={e.slug} id={e.slug} className="price-card" style={{ scrollMarginTop: 24 }}>
              <span className="eyebrow" style={{ color: "var(--madder)" }}>{e.tiedTo}</span>
              <h3 className="display-m" style={{ fontSize: 40 }}>{e.city}</h3>
              <span style={{ fontWeight: 600 }}>{e.when}</span>
              <p className="body-l" style={{ fontSize: 16 }}>{e.format}</p>
              {e.partner && <span className="small">With {e.partner}</span>}
              <a href="/newsletter" className="btn btn--outline btn--block" style={{ marginTop: "auto" }}>Get notified</a>
            </article>
          ))}
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Host an Evening</h2>
        <div className="stack" style={{ gap: 16 }}>
          <p className="body-l">
            Each Evening has a local host who looks after the room on the night. If you'd like to host in one of our cities, or bring an Evening
            to yours, write to us.
          </p>
          <div className="btn-row">
            <a href={`mailto:${site.email}?subject=Host%20a%20Tarka%20Evening`} className="btn btn--outline">Write to us</a>
            <Link href="/print" className="btn btn--primary">Subscribe to print</Link>
          </div>
        </div>
      </section>

      <NewsletterBox title="Hear about events first" body="Dates, tickets and recordings from the Congress and the Evenings. Free." />
    </main>
  );
}
