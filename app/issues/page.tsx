import type { Metadata } from "next";
import Link from "next/link";
import { getForthcomingIssue, getIssues } from "@/lib/content";
import { Cover } from "@/components/Art";
import { IssueCover } from "@/components/Cards";

export const metadata: Metadata = { title: "Issues" };

export default function IssuesPage() {
  const next = getForthcomingIssue();
  const back = getIssues().filter((i) => i.status === "published");

  return (
    <main className="container page">
      <div className="section-head" style={{ alignItems: "flex-end" }}>
        <h1 className="display-l">Issues</h1>
        <p className="body-l" style={{ maxWidth: 520, fontSize: 17 }}>
          Each issue of Tarka gathers scholars and practitioners around one question. Every one is free to read online.
        </p>
      </div>

      {next && (
        <section className="feature-panel" aria-labelledby="next-issue">
          <Link href={`/issues/${next.slug}`} className="feature-panel__cover">
            <Cover art={next.art} title={next.title} number={next.number} image={next.coverImage} />
          </Link>
          <div className="feature-panel__copy">
            <span className="eyebrow" style={{ color: "var(--madder)" }}>
              Forthcoming{next.number != null ? ` · No. ${next.number}` : ""}
            </span>
            <h2 id="next-issue" className="display-m"><i>{next.title}</i></h2>
            {next.description && <p className="body-l" style={{ fontSize: 17 }}>{next.description}</p>}
            <div className="btn-row">
              <Link href="/print" className="btn btn--ink">Pre-order in print</Link>
              <Link href="/newsletter" className="btn btn--outline">Get it by email</Link>
            </div>
          </div>
        </section>
      )}

      <section className="stack" style={{ gap: 28 }}>
        <h2 className="h-section rule-top">Back issues</h2>
        <div className="grid-covers">
          {back.map((i) => <IssueCover key={i.slug} issue={i} />)}
        </div>
      </section>

      <section className="section-head" style={{ borderBlock: "1px solid var(--ink)", paddingBlock: 28, alignItems: "center" }}>
        <p className="serif" style={{ fontSize: 28, lineHeight: 1.3 }}>Every new issue, printed and posted to your door.</p>
        <Link href="/print" className="btn btn--primary">Subscribe to print</Link>
      </section>
    </main>
  );
}
