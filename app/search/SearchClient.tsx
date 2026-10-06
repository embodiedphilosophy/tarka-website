"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Entry = { slug: string; title: string; dek: string; authors: string; topics: string };

/** Strip diacritics so "pratyabhijna" finds "pratyabhijñā" and "seva" finds "Sevā". */
const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ṃ|ṁ/g, "m").toLowerCase();

export default function SearchClient({ index }: { index: Entry[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const terms = fold(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.filter((e) => {
      const hay = fold(`${e.title} ${e.dek} ${e.authors} ${e.topics}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [q, index]);

  return (
    <div className="stack" style={{ gap: 24 }}>
      <label htmlFor="q" className="sr-only">Search Tarka</label>
      <input
        id="q"
        className="search-input"
        type="search"
        placeholder="Try “Utpaladeva”, “seva” or “Foucault”"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />
      <div className="stack" aria-live="polite">
        {q && results.length === 0 && <p className="small">No results.</p>}
        {results.map((r) => (
          <Link key={r.slug} href={`/articles/${r.slug}`} className="list-item">
            <span className="list-item__title">{r.title}</span>
            {r.dek && <span className="body-l" style={{ fontSize: 15 }}>{r.dek}</span>}
            <span className="small">{r.authors}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
