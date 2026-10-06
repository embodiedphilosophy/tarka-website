import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container page" style={{ alignItems: "flex-start", paddingBlock: 140 }}>
      <span className="eyebrow">404</span>
      <h1 className="display-l">This page has gone into retreat.</h1>
      <p className="dek">It may have moved when Tarka got its new home.</p>
      <div className="btn-row">
        <Link href="/issues" className="btn btn--ink">Browse issues</Link>
        <Link href="/search" className="btn btn--outline">Search</Link>
      </div>
    </main>
  );
}
