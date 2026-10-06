import type { Metadata } from "next";
import Link from "next/link";
import { congress } from "@/content/congress";
import NewsletterForm from "@/components/NewsletterForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Annual Congress of Scholar-Practitioners",
  description: `${congress.theme}. ${congress.dates}, ${congress.where.toLowerCase()}.`,
};

export default function CongressPage() {
  const days = ["Saturday", "Sunday"] as const;
  return (
    <main>
      <section className="print-hero">
        <div className="container print-hero__inner" style={{ paddingBlock: "88px 96px" }}>
          <div className="print-hero__copy" style={{ flexBasis: 640 }}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>{congress.edition}</span>
            <h1 className="display-xl">Annual Congress of Scholar-Practitioners</h1>
            <p>
              <i>{congress.theme}.</i> A weekend for everyone who studies the contemplative traditions and practises them, and refuses to choose
              between the two.
            </p>
            <div className="meta-row" style={{ fontSize: 17, color: "var(--cream)" }}>
              <b>{congress.dates}</b>
              <span>{congress.where}</span>
            </div>
            <div className="btn-row">
              <a href="#register" className="btn btn--cream">Register</a>
              <a href="#programme" className="btn btn--outline-light">See the programme</a>
            </div>
          </div>
        </div>
      </section>

      <div className="container page" style={{ paddingTop: 88 }}>
        <section className="two-col">
          <h2 className="display-m">Why a Congress</h2>
          <div className="stack" style={{ gap: 18 }}>
            <p className="dek">
              Scholar-practitioners work between the university and the practice hall, and usually alone. The Congress gathers them once a
              year to think in public about what that work is for.
            </p>
            <p className="body-l">
              It is the annual meeting of the <Link href="/consortium" className="link-underline">Contemplative Consortium</Link>, a network of
              universities, research centres, journals, lineage schools and independent scholars. This first Congress is online, and its
              founding session is where partner institutions sign the Consortium's shared principles.
            </p>
            <p className="small">{congress.convenedBy}</p>
          </div>
        </section>

        <section id="programme" className="stack" style={{ gap: 24, scrollMarginTop: 24 }}>
          <div className="section-head rule-top">
            <h2 className="h-section">Programme</h2>
            <span className="small">Times and speakers announced as confirmed</span>
          </div>
          {days.map((day) => (
            <div key={day} className="two-col">
              <h3 className="h-card">{day}</h3>
              <div className="toc">
                {congress.program
                  .filter((s) => s.day === day)
                  .map((s) => (
                    <div key={s.title} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "6px 24px", paddingBlock: 18, borderTop: "1px solid var(--rule)" }}>
                      <span className={`tag ${s.open ? "" : "tag--madder"}`}>{s.open ? "Open session" : "Full Pass"}</span>
                      <span className="stack" style={{ gap: 4 }}>
                        <span className="serif" style={{ fontSize: 24, lineHeight: 1.25 }}>{s.title}</span>
                        <span className="small">{s.format} · {s.minutes} min</span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>

        <section id="register" className="stack" style={{ gap: 32, scrollMarginTop: 24 }}>
          <h2 className="display-m" style={{ textAlign: "center" }}>Passes</h2>
          <div className="pricing">
            {congress.passes.map((p) => (
              <div key={p.name} className={`price-card ${p.featured ? "price-card--featured" : ""}`}>
                <b className="h-card" style={{ fontSize: 28 }}>{p.name}</b>
                <span className="price-card__price">{p.price}</span>
                <span className="body-l" style={{ fontSize: 16 }}>{p.body}</span>
              </div>
            ))}
          </div>
          <div className="newsletter-box newsletter-box--paper">
            <div className="newsletter-box__copy">
              <h3 className="h-section">Get the registration link</h3>
              <p className="body-l" style={{ fontSize: 16 }}>
                Registration opens soon. Leave your email and we'll send the link, the programme and the speakers as they're confirmed.
              </p>
            </div>
            <div style={{ flex: "1 1 420px" }}>
              <NewsletterForm id="congress-email" cta="Notify me" />
            </div>
          </div>
          <p className="small" style={{ textAlign: "center" }}>
            Print subscribers get the Full Pass free. <Link href="/print" className="link-underline">Subscribe to print</Link>.
          </p>
        </section>

        <section className="two-col">
          <h2 className="h-section">Join as an institution</h2>
          <div className="stack" style={{ gap: 16 }}>
            <p className="body-l">
              Universities, research centres, journals, lineage schools and retreat centres can join the Consortium as founding members, host a
              session, and give their students and staff free Full Passes.
            </p>
            <div className="btn-row">
              <Link href="/consortium" className="btn btn--primary">About the Consortium</Link>
              <a href={`mailto:${site.email}?subject=Contemplative%20Consortium`} className="btn btn--outline">Write to us</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
