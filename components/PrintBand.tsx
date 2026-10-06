import Link from "next/link";
import { getIssues } from "@/lib/content";
import { Cover } from "./Art";

/** Dark "Tarka in print" promo used on Home, Issue and Topic pages. */
export default function PrintBand() {
  // newest three issues that have real cover art (falls back to drawn covers if fewer than three)
  const withArt = getIssues().filter((i) => i.coverImage);
  const covers = (withArt.length >= 3 ? withArt : getIssues()).slice(0, 3);
  // middle cover = newest
  const ordered = covers.length === 3 ? [covers[1], covers[0], covers[2]] : covers;
  return (
    <section className="band-dark print-band" aria-labelledby="print-band-title">
      <div className="print-band__covers">
        {ordered.map((i) => (
          <Cover key={i.slug} art={i.art} title={i.title} number={i.number} image={i.coverImage} crop={i.coverCrop} />
        ))}
      </div>
      <div className="print-band__copy">
        <span className="eyebrow" style={{ color: "var(--gold)" }}>Tarka in print</span>
        <h2 id="print-band-title" className="display-m">Philosophy you can hold.</h2>
        <p>Every new issue, printed and posted to your door. [N] issues a year for [PRICE]. Reading online stays free.</p>
        <div className="btn-row">
          <Link href="/print" className="btn btn--cream">Subscribe to print</Link>
          <Link href="/print#pricing" className="btn btn--outline-light">Give a subscription</Link>
        </div>
      </div>
    </section>
  );
}
