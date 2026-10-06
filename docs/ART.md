# Tarka art

All real Tarka art lives in **`content/art.ts`** — one manifest, so swapping hosts later touches one file.
Collected from tarkajournal.com (Squarespace) on 6 Oct 2026.

## What's in use

| Where | Art | Notes |
|---|---|---|
| Header, footer, print header | **Logo** — `Tarka-logo.png`, 1440×354, ink on transparent | `components/Logo.tsx`; inverted to cream on dark grounds (`onDark`) |
| Issue covers, Nos. 0–9 | `Tarka_0n_*_cover.jpg` / `*-Wide-Cover.jpg`, 1362×934 | Each is a photo of the printed issue on grey. `MAGAZINE_COVER_CROP` (x 413, y 113, 538×708) cuts out the front cover, so it fills the 3:4 cover slots. Same position in all ten photos. |
| Issue pages — "Inside the issue" | 3–7 interior spreads per issue | `Issue.spreads` |
| Article cards, No. 9 | `Tarka-09-Power-Wide-Spreads-1/3/4.jpg` | From Arhat to Siddha, Representing Power, Inhabiting Power (`image:` in front matter) |
| Edition cover — Song of Sādhana | product photo, 1429×1100 | cropped to the notebook |

**Still drawn (no real art yet):** No. 10 *On Yoga Philosophy* cover, and every article without an `image`
(the Substack-era essays and *Who is Utpaladeva?*). These fall back to the yantra motifs in `components/Art.tsx`.

## Collected but not placed yet

- **Stacks** of printed copies (Nos. 6, 7, 8, 9), 1500×900 — good for `/print` and the print band.
- **Promo:** No. 9 cover + spreads composite; devices mock-up (phone/tablet/laptop); wide grey site banner;
  Song of Sādhana homepage hero; podcast square art (1200×1200).
- **Editions:** three more Song of Sādhana product shots; *The Sādhaka's Sourcebook* cover (print pre-order on
  the old store — add it to `content/editions.ts` when its details are confirmed).
- **No. 7 article art** for *A Meditation on Expanded Awareness*, *Is the West Ready for Tantra?*,
  *Tantra: A Visual History* — use when those articles are imported.

## Before cancelling Squarespace

The URLs point at `images.squarespace-cdn.com`, which goes away with the Squarespace site. Run

```
node scripts/localize-art.mjs
```

It downloads every image into `public/art/`, points `content/art.ts` at `/art/`, and rewrites article front matter.
Then build, check, commit `public/art/`, and remove `images.squarespace-cdn.com` from `next.config.ts`.
(Alternatively upload the same files to Vercel Blob and change the `SQ` base in `content/art.ts`.)

## Adding new art

- **Flat cover art (preferred for new issues):** 3:4, ≥1200px wide. Set `coverImage`, no `coverCrop`.
- **Product photo of a cover:** set `coverImage` + `coverCrop` (pixel box of the cover inside the photo).
- **Article art:** 3:2, ≥1200px wide, in the article's `image:` front matter.
