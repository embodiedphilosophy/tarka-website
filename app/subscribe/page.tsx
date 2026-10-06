import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "Subscribe" };

/** Where the header's Subscribe button goes: choose print or the free newsletter. */
export default function SubscribePage() {
  return (
    <main className="container page">
      <h1 className="display-l" style={{ textAlign: "center" }}>Read Tarka your way</h1>
      <div className="pricing">
        <div className="price-card price-card--featured">
          <span className="eyebrow" style={{ color: "var(--indigo)" }}>Print</span>
          <b className="h-card" style={{ fontSize: 32 }}>Tarka in print</b>
          <p className="body-l" style={{ fontSize: 16 }}>Every new issue printed and posted to your door. [N] issues a year for [PRICE].</p>
          <Link href="/print" className="btn btn--primary btn--block" style={{ marginTop: "auto" }}>See print options</Link>
        </div>
        <div className="price-card">
          <span className="eyebrow">Free</span>
          <b className="h-card" style={{ fontSize: 32 }}>The newsletter</b>
          <p className="body-l" style={{ fontSize: 16 }}>New essays, podcast episodes and notes from the editors, by email.</p>
          <div style={{ marginTop: "auto" }}><NewsletterForm id="subscribe-email" /></div>
        </div>
      </div>
    </main>
  );
}
