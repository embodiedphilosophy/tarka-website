# Design system

Source: the “Tarka Site — Sitemap & Mockup” canvas. Implemented in `app/globals.css`.

## Colour
| Token | Hex | Use |
|---|---|---|
| `--paper` | #F6F3EC | page ground |
| `--paper-2` | #EDE8DD | panels, footer, blockquotes |
| `--ink` | #1B1A17 | text, rules, dark bands |
| `--text` | #3A3832 | body copy |
| `--muted` | #5A574F | meta, bylines |
| `--indigo` | #2E3F7F | Subscribe, links, topic tags |
| `--madder` | #9C3B22 | series tags, drop caps, pull quotes |
| `--gold` | #D9A441 | eyebrow on dark, art |
| `--cream` | #F4EBDD | text and buttons on dark |

## Type
- **Newsreader** — headlines, deks, article body (21px / 1.62).
- **IBM Plex Sans** — navigation, labels, UI, captions.
- **IBM Plex Mono** — issue numbers, small labels.
- **Noto Serif Devanagari** — Sanskrit in Devanāgarī (`lang="sa"`).

## Patterns
- Section headings sit on a 3px ink rule (`.rule-top`).
- Cards: art (3:2) → tag → serif title → dek → author.
- One dark “Tarka in print” band per long page.
- Every page ends in a subscribe path (print or newsletter).
- Covers and article art are drawn yantra motifs (`components/Art.tsx`) until real Tarka art is uploaded.
