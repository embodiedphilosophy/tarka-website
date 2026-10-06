import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function ThanksPage() {
  return (
    <main className="container page" style={{ textAlign: "center", alignItems: "center", paddingBlock: 140 }}>
      <span className="eyebrow">Tarka in print</span>
      <h1 className="display-l">Thank you.</h1>
      <p className="dek" style={{ maxWidth: 620 }}>Your subscription is in. You'll get a receipt by email, and your first issue ships when it's printed.</p>
      <Link href="/" className="btn btn--ink">Back to Tarka</Link>
    </main>
  );
}
