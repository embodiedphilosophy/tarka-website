/* eslint-disable @next/next/no-img-element -- matches the rest of the site, which serves Squarespace CDN images directly */
import type { Metadata } from "next";
import Link from "next/link";
import s from "./print.module.css";
import {
  BENEFITS,
  CONTRIBUTORS,
  COVERS,
  FAQS,
  LOGO,
  OFFER,
  SPREADS,
  TESTIMONIALS,
  TOPICS,
} from "./config";

export const metadata: Metadata = {
  title: "Tarka in print",
  description:
    "Subscribe to Tarka, a journal for scholar-practitioners. Two themed issues a year of yoga philosophy, contemplative studies and the world's wisdom traditions.",
};

function Cover({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`${s.cover} ${className}`}>
      <img src={`${src}?format=750w`} alt={alt} loading="eager" />
    </div>
  );
}

function SubscribeBlock({ id }: { id?: string }) {
  return (
    <section className={s.subscribe} id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <h2 className={s.subscribeTitle} id={id ? `${id}-h` : undefined}>
        Choose your region to subscribe
      </h2>
      <div className={s.plans}>
        {OFFER.plans.map((p) => (
          <Link key={p.id} href={p.href} className={s.plan}>
            <span>{p.label}</span>
            <span>
              {p.price}
              <small>/yr</small>
            </span>
          </Link>
        ))}
      </div>
      <p className={s.subscribeNote}>
        Looking for a <Link href={OFFER.giftHref}>gift</Link> or{" "}
        <a href={OFFER.groupHref}>group</a> subscription?
      </p>
    </section>
  );
}

export default function PrintPage() {
  const marquee = [...SPREADS, ...SPREADS];

  return (
    <main className={s.page}>
      {/* ——— Hero ——— */}
      <section className={s.hero}>
        <p className={s.topics}>
          {TOPICS.map((t, i) => (
            <span key={t}>
              {i > 0 && <span aria-hidden className={s.dot}>·</span>}
              {t}
            </span>
          ))}
        </p>
        <h1 className={s.masthead}>
          <img src={LOGO} alt="Tarka" width={1440} height={354} />
        </h1>
        <p className={s.tagline}>
          A journal for scholar-practitioners — yoga philosophy, contemplative
          studies and the world&rsquo;s wisdom traditions, in print.
        </p>
      </section>

      <div className={s.fan} aria-hidden>
        <Cover {...COVERS.queerDharma} className={s.fanLeft} />
        <Cover {...COVERS.tantra} className={s.fanRight} />
        <Cover {...COVERS.power} className={s.fanCenter} />
      </div>

      <SubscribeBlock id="subscribe" />

      {/* ——— Benefits ——— */}
      <section className={s.benefits}>
        <h2 className={s.sectionTitle}>Included with your print subscription</h2>
        <ul className={s.benefitGrid}>
          {BENEFITS.map((b) => (
            <li key={b.text} className={s.benefit}>
              <img src={`${b.img}?format=500w`} alt="" loading="lazy" />
              <p>{b.text}</p>
            </li>
          ))}
          <li className={`${s.benefit} ${s.benefitWide}`}>
            <img src={`${COVERS.power.src}?format=500w`} alt="" loading="lazy" />
            <p>
              Subscribe today and your first issue will be {OFFER.nextIssue}.
              <br />
              For full details, read the <a href="#faq">FAQ</a> below.
            </p>
          </li>
        </ul>
      </section>

      {/* ——— Contributors (WiP's logo wall) ——— */}
      <section className={s.contributors}>
        <p className={s.eyebrow}>Recent contributors include</p>
        <ul>
          {CONTRIBUTORS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {/* ——— Spreads marquee ——— */}
      <section className={s.spreads} aria-label="Pages from recent issues">
        <div className={s.track}>
          {marquee.map((src, i) => (
            <img
              key={i}
              src={`${src}?format=1000w`}
              alt=""
              loading="lazy"
              aria-hidden={i >= SPREADS.length}
            />
          ))}
        </div>
      </section>

      {/* ——— Testimonials (hidden until populated) ——— */}
      {TESTIMONIALS.length > 0 && (
        <section className={s.testimonials}>
          <h2 className={s.sectionTitle}>What our readers say</h2>
          <ul>
            {TESTIMONIALS.map((t) => (
              <li key={t.name}>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <p>
                  {t.name}
                  {t.role && <span> · {t.role}</span>}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ——— Closing CTA ——— */}
      <section className={s.closer}>
        <h2 className={s.closerTitle}>
          <span className={s.underline}>Tarka</span> means inquiry.
          <br />
          Some inquiries need paper.
        </h2>
        <div className={s.row}>
          <Cover {...COVERS.teaching} />
          <Cover {...COVERS.power} />
          <Cover {...COVERS.citizenship} />
        </div>
      </section>

      <SubscribeBlock />

      {/* ——— FAQ ——— */}
      <section className={s.faq} id="faq">
        <h2 className={s.sectionTitle}>FAQs</h2>
        {FAQS.map((f) => (
          <details key={f.q} className={s.faqItem}>
            <summary>
              {f.q}
              <span aria-hidden className={s.plus} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
