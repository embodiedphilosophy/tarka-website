import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { institute } from "@/content/institute";
import { NewsletterBox } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Tarka Institute",
  description: institute.dek,
};

export default function InstitutePage() {
  const { launch } = institute;
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">{institute.name}</h1>
        <div className="stack" style={{ gap: 18 }}>
          <p className="dek">{institute.dek}</p>
          <p className="body-l">
            The Institute takes its name from <i>tarka</i>, perfected reasoning, the highest limb of Abhinavagupta's six-fold yoga: the
            discernment that arises only when scholarly rigour and contemplative practice are sustained together over time. It holds open,
            free and rigorous space for that work through public lectures, seminars, fellowships and the{" "}
            <Link href="/congress" className="link-underline">Annual Congress of Scholar-Practitioners</Link>.
          </p>
          <p className="small">{institute.status} Tarka Journal and Tarka Editions remain publications of Embodied Philosophy.</p>
        </div>
      </section>

      <section className="band-dark print-band" aria-labelledby="launch-head">
        <div className="print-band__copy" style={{ flexBasis: 680 }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>{launch.eyebrow} · {launch.when}</span>
          <h2 id="launch-head" className="display-m">{launch.title}</h2>
          <p>{launch.body}</p>
          <p className="small" style={{ color: "inherit", opacity: 0.8 }}>{launch.chairHolder}</p>
          <div className="btn-row">
            <a href="#lectures" className="btn btn--cream">Get lecture alerts</a>
            <Link href="/congress" className="btn btn--outline-light">The Congress</Link>
          </div>
        </div>
      </section>

      <section className="benefits">
        {institute.programs.map((p) => (
          <div key={p.name}>
            <b className="h-card">{p.href ? <Link href={p.href}>{p.name}</Link> : p.name}</b>
            <span className="body-l" style={{ fontSize: 16 }}>{p.body}</span>
          </div>
        ))}
      </section>

      <section className="stack" style={{ gap: 20 }}>
        <div className="section-head rule-top">
          <h2 className="h-section">The three Chairs</h2>
          <span className="small">One appointed in 2026–27; all three by 2028–29</span>
        </div>
        <div className="grid-cards">
          {institute.chairs.map((c, i) => (
            <div key={c.name} className="price-card">
              <span className="mono small">Chair {["I", "II", "III"].at(i)}</span>
              <b className="h-card">{c.name}</b>
              <i className="body-l" style={{ fontSize: 16 }}>{c.sub}</i>
            </div>
          ))}
        </div>
        <p className="small">Lectures are free to watch, live and in the archive. No paywall, ever.</p>
      </section>

      <section className="stack" style={{ gap: 20 }}>
        <div className="section-head rule-top">
          <h2 className="h-section">Three years</h2>
        </div>
        <ol className="grid-cards" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {institute.timeline.map((t) => (
            <li key={t.year} className="stack" style={{ gap: 8, borderTop: "3px solid var(--ink)", paddingTop: 16 }}>
              <span className="mono small">{t.year}</span>
              <b className="h-card">{t.title}</b>
              <span className="body-l" style={{ fontSize: 16 }}>{t.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="two-col">
        <h2 className="h-section">Governance</h2>
        <ul className="stack body-l" style={{ gap: 12, fontSize: 17, paddingLeft: 20, margin: 0 }}>
          {institute.governance.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </section>

      <section className="newsletter-box newsletter-box--paper">
        <div className="newsletter-box__copy">
          <h2 className="h-section">{institute.support.title}</h2>
          <p className="body-l" style={{ fontSize: 16 }}>{institute.support.body}</p>
        </div>
        <a href={`mailto:${site.email}?subject=Supporting%20the%20Tarka%20Institute`} className="btn btn--ink">Talk to us</a>
      </section>

      <div id="lectures" style={{ scrollMarginTop: 24 }}>
        <NewsletterBox title="Hear about each lecture" body="Dates, streaming links and recordings from the Institute's free public lectures." />
      </div>
    </main>
  );
}
