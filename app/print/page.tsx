import type { Metadata } from "next";
import Link from "next/link";
import { getIssues } from "@/lib/content";
import { mainNav } from "@/lib/site";
import { Cover } from "@/components/Art";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Tarka in print",
  description: "Essays on yoga philosophy, Tantra and the contemplative traditions, printed and posted to your door.",
};

const faqs = [
  { q: "Is the website still free?", a: "Yes. Every essay stays free online. A print subscription is how readers keep it that way." },
  { q: "Where do you ship?", a: "[Countries.] Each copy is printed close to you and posted directly." },
  { q: "Can I buy back issues?", a: "[Yes / which issues], from each issue's page." },
  { q: "How do I cancel?", a: "Anytime, from the link in your receipt email." },
];

function CheckoutButton({ plan, label, className }: { plan: string; label: string; className: string }) {
  return (
    <form action="/api/checkout" method="post" style={{ marginTop: "auto" }}>
      <input type="hidden" name="plan" value={plan} />
      <button type="submit" className={`${className} btn--block`}>{label}</button>
    </form>
  );
}

export default async function PrintPage({ searchParams }: { searchParams: Promise<{ soon?: string }> }) {
  const { soon } = await searchParams;
  const covers = getIssues().slice(0, 3);
  const ordered = covers.length === 3 ? [covers[1], covers[0], covers[2]] : covers;

  return (
    <main>
      <section className="print-hero">
        <div className="container site-header__main" style={{ borderBottom: "1px solid #3a3832", alignItems: "center", paddingBlock: 14 }}>
          <Link href="/" className="wordmark wordmark--m" aria-label="Tarka home"><Logo height={32} light /></Link>
          <nav aria-label="Main" className="main-nav">
            {mainNav.map((i) => <Link key={i.href} href={i.href}>{i.label}</Link>)}
            <a href="#pricing" className="btn btn--cream">Subscribe</a>
          </nav>
        </div>
        <div className="container print-hero__inner">
          <div className="print-hero__copy">
            <span className="eyebrow" style={{ color: "var(--gold)" }}>Tarka in print</span>
            <h1 className="display-xl">Philosophy you can hold.</h1>
            <p>Essays on yoga philosophy, Tantra and the contemplative traditions, printed and posted to your door. Read slowly. Underline. Keep them on the shelf.</p>
            <div className="btn-row">
              <a href="#pricing" className="btn btn--cream">Subscribe for [PRICE] / year</a>
              <a href="#pricing" className="btn btn--outline-light">Give as a gift</a>
            </div>
          </div>
          <div className="print-band__covers" style={{ flex: "1 1 420px" }}>
            {ordered.map((i) => <Cover key={i.slug} art={i.art} title={i.title} number={i.number} image={i.coverImage} />)}
          </div>
        </div>
      </section>

      {soon && (
        <div className="notice">Print subscriptions open soon. Join the newsletter and we'll tell you first.</div>
      )}

      <div className="container page" style={{ paddingTop: 88 }}>
        <section className="benefits">
          <div><b className="h-card">Every new issue</b><span className="body-l" style={{ fontSize: 16 }}>[N] issues a year, printed on demand and shipped to you.</span></div>
          <div><b className="h-card">Print-only pages</b><span className="body-l placeholder" style={{ fontSize: 16 }}>[What appears only in print.]</span></div>
          <div><b className="h-card">Evenings and the Congress</b><span className="body-l" style={{ fontSize: 16 }}>Free entry to Tarka Evenings in Seattle, New York, London and Oxford, and a free Full Pass to the Annual Congress.</span></div>
          <div><b className="h-card">Tarka Editions</b><span className="body-l" style={{ fontSize: 16 }}>A subscriber discount on every Scholar-Practitioner Edition.</span></div>
          <div><b className="h-card">Online stays free</b><span className="body-l" style={{ fontSize: 16 }}>Every essay remains free to read on the site. Print is how you support it.</span></div>
        </section>

        <section id="pricing" className="stack" style={{ gap: 32, scrollMarginTop: 24 }}>
          <h2 className="display-m" style={{ textAlign: "center" }}>Choose your subscription</h2>
          <div className="pricing">
            <div className="price-card price-card--featured">
              <span className="eyebrow" style={{ color: "var(--indigo)" }}>Most chosen</span>
              <b className="h-card" style={{ fontSize: 30 }}>Print subscription</b>
              <span className="price-card__price">[PRICE]<span> / year</span></span>
              <span className="body-l" style={{ fontSize: 16 }}>[N] issues a year, shipped worldwide. Cancel anytime.</span>
              <CheckoutButton plan="annual" label="Subscribe" className="btn btn--primary" />
            </div>
            <div className="price-card">
              <span className="eyebrow" style={{ color: "var(--madder)" }}>For a teacher or friend</span>
              <b className="h-card" style={{ fontSize: 30 }}>Gift subscription</b>
              <span className="price-card__price">[PRICE]<span> / year</span></span>
              <span className="body-l" style={{ fontSize: 16 }}>One year of Tarka with a card in your words. Choose the start date.</span>
              <CheckoutButton plan="gift" label="Give Tarka" className="btn btn--outline" />
            </div>
            <div className="price-card">
              <span className="eyebrow">Sanghas · trainings · libraries</span>
              <b className="h-card" style={{ fontSize: 30 }}>Group copies</b>
              <span className="price-card__price">[PRICE]<span> / copy</span></span>
              <span className="body-l" style={{ fontSize: 16 }}>Five or more copies of each issue for a study group, teacher training or reading room.</span>
              <a href="mailto:tarka@embodiedphilosophy.com?subject=Group%20copies" className="btn btn--outline btn--block" style={{ marginTop: "auto" }}>Ask about groups</a>
            </div>
          </div>
        </section>

        <section className="stack" style={{ gap: 24, alignItems: "center", textAlign: "center" }}>
          <span className="eyebrow">Read by people at</span>
          <div className="pills" style={{ justifyContent: "center", gap: 16 }}>
            {["[University]", "[University]", "[Sangha]", "[Teacher training]", "[Centre]"].map((l, i) => (
              <span key={i} className="logo-slot">{l}</span>
            ))}
          </div>
        </section>

        <section className="two-col">
          <h2 className="display-m">Questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
