"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type CsiLite = {
  term: string;
  slug: string;
  aliases: string;
  kind: string;
  traditions: string[];
  language: string;
  definition: string;
  fullEntry: boolean;
  letter: string;
};

const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/sh/g, "s").replace(/ch/g, "c").replace(/ri/g, "r")
    .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type State = { q: string; letter: string; kinds: string[]; trads: string[]; full: boolean };
const EMPTY: State = { q: "", letter: "", kinds: [], trads: [], full: false };

function readHash(): State {
  if (typeof window === "undefined") return EMPTY;
  const p = new URLSearchParams(window.location.hash.slice(1));
  const list = (k: string) => (p.get(k) || "").split(",").filter(Boolean);
  return { q: p.get("q") || "", letter: p.get("l") || "", kinds: list("kind"), trads: list("trad"), full: p.get("full") === "1" };
}
function writeHash(s: State) {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.letter) p.set("l", s.letter);
  if (s.kinds.length) p.set("kind", s.kinds.join(","));
  if (s.trads.length) p.set("trad", s.trads.join(","));
  if (s.full) p.set("full", "1");
  const h = p.toString();
  history.replaceState(null, "", h ? `#${h}` : window.location.pathname);
}

export default function CsiBrowser({
  entries,
  kinds,
  traditions,
}: {
  entries: CsiLite[];
  kinds: Record<string, string>;
  traditions: Record<string, string>;
}) {
  const [s, setS] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);
  useEffect(() => { setS(readHash()); setReady(true); }, []);
  useEffect(() => { if (ready) writeHash(s); }, [s, ready]);

  const indexed = useMemo(() => entries.map((e) => ({ e, h: fold(e.term), a: fold(e.aliases), d: fold(e.definition) })), [entries]);

  const score = (x: (typeof indexed)[number], q: string) => {
    if (!q) return 1;
    let total = 0;
    for (const w of q.split(" ")) {
      if (x.h === q) total += 100;
      else if (x.h.startsWith(w)) total += 40;
      else if (x.h.includes(w)) total += 25;
      else if ((" " + x.a + " ").includes(" " + w)) total += 20;
      else if (x.a.includes(w)) total += 12;
      else if (x.d.includes(w)) total += 4;
      else return 0;
    }
    return total;
  };

  const q = fold(s.q);
  const pass = (x: (typeof indexed)[number], skip?: "kind" | "trad" | "letter") =>
    (skip === "kind" || !s.kinds.length || s.kinds.includes(x.e.kind)) &&
    (skip === "trad" || !s.trads.length || x.e.traditions.some((t) => s.trads.includes(t))) &&
    (!s.full || x.e.fullEntry) &&
    (skip === "letter" || !s.letter || x.e.letter === s.letter) &&
    score(x, q) > 0;

  const results = indexed.filter((x) => pass(x));
  if (q) results.sort((a, b) => score(b, q) - score(a, q) || a.h.localeCompare(b.h));

  const count = (skip: "kind" | "trad" | "letter", key: (e: CsiLite) => string[]) => {
    const c: Record<string, number> = {};
    for (const x of indexed) if (pass(x, skip)) for (const k of key(x.e)) c[k] = (c[k] || 0) + 1;
    return c;
  };
  const letterCounts = count("letter", (e) => [e.letter]);
  const kindCounts = count("kind", (e) => [e.kind]);
  const tradCounts = count("trad", (e) => e.traditions);

  const toggle = (key: "kinds" | "trads", v: string) =>
    setS((o) => ({ ...o, [key]: o[key].includes(v) ? o[key].filter((x) => x !== v) : [...o[key], v] }));

  const grouped = !q;
  const groups: { letter: string; items: CsiLite[] }[] = [];
  for (const { e } of results) {
    const g = grouped ? e.letter : "";
    if (!groups.length || groups[groups.length - 1].letter !== g) groups.push({ letter: g, items: [] });
    groups[groups.length - 1].items.push(e);
  }
  const active = s.q || s.letter || s.kinds.length || s.trads.length || s.full;

  return (
    <div className="csi">
      <div className="csi-rail" role="toolbar" aria-label="Browse by first letter">
        <button type="button" className="csi-rail__all" aria-pressed={!s.letter} onClick={() => setS((o) => ({ ...o, letter: "" }))}>All</button>
        {LETTERS.map((L) => (
          <button
            key={L}
            type="button"
            aria-pressed={s.letter === L}
            disabled={!letterCounts[L] && s.letter !== L}
            aria-label={`${L}, ${letterCounts[L] || 0} entries`}
            onClick={() => setS((o) => ({ ...o, letter: o.letter === L ? "" : L }))}
          >
            {L}
          </button>
        ))}
      </div>

      <label className="csi-search">
        <span className="visually-hidden">Search the index</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
        <input
          type="search"
          value={s.q}
          onChange={(ev) => setS((o) => ({ ...o, q: ev.target.value }))}
          placeholder="Search terms, spellings, definitions"
          autoComplete="off"
          spellCheck={false}
        />
      </label>
      <p className="small">Diacritics are optional: <i>kundalini</i> finds Kuṇḍalinī and <i>shakti</i> finds Śakti.</p>

      <div className="csi-body">
        <aside className="csi-filters" aria-label="Filters">
          <fieldset>
            <legend>Kind of entry</legend>
            {Object.entries(kinds).map(([k, label]) => (
              <button key={k} type="button" className="csi-opt" aria-pressed={s.kinds.includes(k)} disabled={!kindCounts[k] && !s.kinds.includes(k)} onClick={() => toggle("kinds", k)}>
                <span>{label}</span><span className="csi-opt__n">{kindCounts[k] || 0}</span>
              </button>
            ))}
          </fieldset>
          <fieldset>
            <legend>Tradition</legend>
            {Object.entries(traditions).map(([k, label]) => (
              <button key={k} type="button" className="csi-opt" aria-pressed={s.trads.includes(k)} disabled={!tradCounts[k] && !s.trads.includes(k)} onClick={() => toggle("trads", k)}>
                <span>{label}</span><span className="csi-opt__n">{tradCounts[k] || 0}</span>
              </button>
            ))}
          </fieldset>
          <label className="csi-toggle">
            <input type="checkbox" checked={s.full} onChange={(ev) => setS((o) => ({ ...o, full: ev.target.checked }))} /> Full entries only
          </label>
        </aside>

        <div>
          <div className="csi-toolbar">
            <span className="serif" style={{ fontSize: 20 }} aria-live="polite">
              <b>{results.length}</b> {results.length === 1 ? "entry" : "entries"}{s.q ? ` for “${s.q}”` : ""}
            </span>
            {active ? <button type="button" className="link-underline small" onClick={() => setS(EMPTY)}>Clear all</button> : null}
          </div>

          {!results.length && (
            <p className="body-l" style={{ paddingBlock: 40 }}>
              Nothing in the index matches{s.q ? ` “${s.q}”` : ""} with these filters. Clear the filters, or suggest the term below.
            </p>
          )}

          {groups.map((g) => (
            <section key={g.letter || "results"} className="csi-group" id={g.letter ? `letter-${g.letter}` : undefined}>
              {g.letter && (
                <div className="csi-letter">
                  <h2>{g.letter}</h2>
                  <span className="small">{g.items.length} {g.items.length === 1 ? "entry" : "entries"}</span>
                </div>
              )}
              <ul className="csi-list">
                {g.items.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/csi/${e.slug}`} className="csi-item">
                      <span className="csi-item__term">{e.term}<span className="csi-item__lang">{e.language}</span></span>
                      <span className="csi-item__meta">{e.fullEntry && <span className="tag tag--madder">Full entry</span>} {kinds[e.kind]}</span>
                      <span className="csi-item__def">{e.definition}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
