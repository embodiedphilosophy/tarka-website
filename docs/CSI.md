# Contemplative Studies Index (/csi)

- **Data:** `content/csi.ts` holds 159 entries (term, aliases, kind, traditions, language, one-line definition, related terms, full-entry flag, legacy URL).
  Source: the EP sheet "CSI Contemplative Studies Index & CYS Topics".
- **Pages:** `/csi` is the searchable index (A–Z rail, kind and tradition filters, diacritic-insensitive search, shareable `#q=…&kind=…` links).
  `/csi/<slug>` is one page per term with schema.org `DefinedTerm` markup, related entries and previous/next.
- **Editorial review needed:** definitions and kind/tradition tags were drafted by Claude. Edit them in `content/csi.ts`.

## Adding a full article

1. Put the text in `content/csi/<slug>.md` (Markdown, footnotes allowed). The slug is the page URL, e.g. `samsara`.
2. Set `fullEntry: true` on the entry in `content/csi.ts` and remove its `legacyUrl`.
3. Only then add the redirect below on the EP site, so the old post's search traffic lands on the full article, not a stub.

## Redirect map for the EP site (WordPress → Tarka)

Add each line to the EP site's redirects **once that article is migrated** (step 1 above). All permanent (308).

| Old (embodiedphilosophy.com) | New (tarkajournal.com) |
|---|---|
| /what-is-death/ | /csi/death |
| /what-is-direct-realization/ | /csi/direct-realization |
| /what-is-ecofeminism/ | /csi/ecofeminism |
| /the-four-noble-truths/ | /csi/four-noble-truths |
| /what-is-pramāṇa/ (encoded `/what-is-prama%e1%b9%87a/`) | /csi/pramana |
| /what-is-queer/ | /csi/queer |
| /what-is-queer-theory/ | /csi/queer-theory |
| /what-is-samsara/ | /csi/samsara |
| /what-is-smaraṇa/ (encoded `/what-is-smara%e1%b9%87a/`) | /csi/smarana |
| /what-is-tradition-2/ | /csi/tradition |

The other ~27 "W" entries in the sheet exist only as Google Docs drafts: import them the same way.
