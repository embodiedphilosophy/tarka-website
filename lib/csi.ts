import { csiEntries, csiKinds, csiTraditions, type CsiEntry } from "@/content/csi";

/** Diacritic- and spelling-insensitive key: "Śakti", "shakti" and "sakti" all fold to "sakti". */
export const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/sh/g, "s")
    .replace(/ch/g, "c")
    .replace(/ri/g, "r")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const csiSlug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export type CsiItem = CsiEntry & { slug: string; letter: string; kindLabel: string; traditionLabels: string[]; relatedItems: { term: string; slug: string }[] };

let cache: CsiItem[] | null = null;
export function getCsi(): CsiItem[] {
  if (cache) return cache;
  const byFold = new Map(csiEntries.map((e) => [fold(e.term), e]));
  // relations are made symmetric: if A lists B, B also shows A
  const rel = new Map<string, Set<string>>(csiEntries.map((e) => [e.term, new Set(e.related.filter((r) => byFold.has(fold(r))).map((r) => byFold.get(fold(r))!.term))]));
  for (const e of csiEntries) for (const r of rel.get(e.term)!) rel.get(r)?.add(e.term);
  cache = csiEntries
    .map((e) => ({
      ...e,
      slug: csiSlug(e.term),
      letter: e.term.normalize("NFD").replace(/[̀-ͯ]/g, "")[0].toUpperCase(),
      kindLabel: csiKinds[e.kind],
      traditionLabels: e.traditions.map((t) => csiTraditions[t]),
      relatedItems: [...rel.get(e.term)!].map((t) => ({ term: t, slug: csiSlug(t) })),
    }))
    .sort((a, b) => fold(a.term).localeCompare(fold(b.term)));
  return cache;
}

export const getCsiEntry = (slug: string) => getCsi().find((e) => e.slug === slug);
