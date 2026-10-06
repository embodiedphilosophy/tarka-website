import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "New essays, podcast episodes and notes from the editors of Tarka. Free.",
};

/** Single-purpose sign-up page — point newsletter ads here. */
export default function NewsletterPage() {
  return (
    <main className="container page" style={{ maxWidth: 820, paddingBlock: 112 }}>
      <span className="eyebrow">Free newsletter</span>
      <h1 className="display-l">Tarka in your inbox</h1>
      <p className="dek">New essays on yoga philosophy, Tantra and the contemplative traditions, podcast episodes, and notes from the editors.</p>
      <NewsletterForm id="newsletter-page-email" cta="Subscribe free" />
      <p className="small">
        Delivered by Substack at <a className="link-underline" href={site.substackUrl}>{site.substackUrl.replace("https://", "")}</a>. Prefer paper?{" "}
        <Link href="/print" className="link-underline">Get Tarka in print</Link>.
      </p>
    </main>
  );
}
