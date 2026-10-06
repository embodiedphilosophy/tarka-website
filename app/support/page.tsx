import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Support Tarka" };

/** Donations go live once the 501(c)(3) is in place — until then, point to print. */
export default function SupportPage() {
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Support Tarka</h1>
        <div className="stack" style={{ gap: 20 }}>
          <p className="dek">Tarka is free to read. Readers keep it that way.</p>
          <p className="body-l placeholder">[Donations open once Tarka's 501(c)(3) status is in place.]</p>
          <div className="btn-row">
            <Link href="/print" className="btn btn--primary">Subscribe to print</Link>
            <Link href="/print#pricing" className="btn btn--outline">Give a subscription</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
