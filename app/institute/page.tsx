import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tarka Institute",
  description: "A centre for contemplative scholarship and public inquiry.",
};

const chairs = [
  {
    name: "South Asian Philosophy and Contemplative Practice",
    sub: "Pramāṇa, Pratyabhijñā, and the Epistemology of Recognition",
  },
  {
    name: "Contemplative Ethics and Social Thought",
    sub: "Dharma, Responsibility, and the Scholar-Practitioner in Public Life",
  },
  {
    name: "Contemplative Aesthetics and the Theory of Rasa",
    sub: "Beauty, Embodied Knowledge, and the Epistemology of Aesthetic Experience",
  },
];

const programs = [
  { name: "Scholarly Chairs", body: "Three rotating chairs who think in public from their current research: nine free monthly lectures each, live and archived, plus one annual seminar.", href: undefined },
  { name: "Fellows", body: "One fellowship a year for each chair, supporting an emerging scholar-practitioner.", href: undefined },
  { name: "The Contemplative Consortium", body: "A network of universities, research centres, journals and lineage schools that convenes the Annual Congress.", href: "/consortium" },
  { name: "The Āmnāya Alliance", body: "A network of Tantric lineage schools hosted by the Institute, with its own track at the Congress.", href: undefined },
];

export default function InstitutePage() {
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Tarka Institute</h1>
        <div className="stack" style={{ gap: 18 }}>
          <p className="dek">A centre for contemplative scholarship and public inquiry.</p>
          <p className="body-l">
            The Institute takes its name from <i>tarka</i>, perfected reasoning, the highest limb of Abhinavagupta's six-fold yoga: the
            discernment that arises only when scholarly rigour and contemplative practice are sustained together over time. It holds open,
            free and rigorous space for that work through public lectures, seminars, fellowships and the{" "}
            <Link href="/congress" className="link-underline">Annual Congress of Scholar-Practitioners</Link>.
          </p>
          <p className="small">
            An independent non-profit (US 501(c)(3) application in preparation), founded in partnership with Embodied Philosophy. Tarka
            Journal and Tarka Editions remain publications of Embodied Philosophy.
          </p>
        </div>
      </section>

      <section className="benefits">
        {programs.map((p) => (
          <div key={p.name}>
            <b className="h-card">{p.href ? <Link href={p.href}>{p.name}</Link> : p.name}</b>
            <span className="body-l" style={{ fontSize: 16 }}>{p.body}</span>
          </div>
        ))}
      </section>

      <section className="stack" style={{ gap: 20 }}>
        <div className="section-head rule-top">
          <h2 className="h-section">Inaugural Chairs, 2026–27</h2>
          <span className="small">Chair-holders to be announced</span>
        </div>
        <div className="grid-cards">
          {chairs.map((c, i) => (
            <div key={c.name} className="price-card">
              <span className="mono small">Chair {["I", "II", "III"].at(i)}</span>
              <b className="h-card">{c.name}</b>
              <i className="body-l" style={{ fontSize: 16 }}>{c.sub}</i>
            </div>
          ))}
        </div>
        <p className="small">Lectures are free to watch, live and in the archive. No paywall, ever.</p>
      </section>

      <section className="newsletter-box newsletter-box--paper">
        <div className="newsletter-box__copy">
          <h2 className="h-section">Support the Institute</h2>
          <p className="body-l" style={{ fontSize: 16 }}>
            Named chairs and fellowships, and gifts toward free public lectures. Donations open once the 501(c)(3) is in place.
          </p>
        </div>
        <a href={`mailto:${site.email}?subject=Supporting%20the%20Tarka%20Institute`} className="btn btn--ink">Talk to us</a>
      </section>
    </main>
  );
}
