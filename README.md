# tarka-website

The new **tarkajournal.com**: a Works in Progress–style magazine site for Tarka Journal, built the same way as the new EP site (Next.js on Vercel, own GitHub repo). Substack stays at `read.tarkajournal.com` for the newsletter and podcast.

Design source: the **“Tarka Site — Sitemap & Mockup”** canvas (Sitemap, Tech setup, Page templates, and the Home / Article / Issues / Print mockups).

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Put it on GitHub + Vercel

1. Create an empty repo, e.g. `embodiedphilosophy/tarka-website`, then from this folder:
   ```bash
   git init && git add . && git commit -m "Tarka website: initial build"
   git branch -M main
   git remote add origin git@github.com:embodiedphilosophy/tarka-website.git
   git push -u origin main
   ```
2. In Vercel (Embodied Philosophy team) → **Add New → Project** → import the repo. Framework is detected as Next.js; no build settings to change.
3. Add the environment variables from `.env.example` (Stripe keys can wait).
4. Every push to `main` deploys; every branch/PR gets a preview URL.
5. When ready to launch, follow `docs/LAUNCH.md` (redirects, then point `tarkajournal.com` at Vercel; leave `read.` on Substack).

## How it's organised

```
app/                  routes (one folder per page in the sitemap)
  page.tsx            Home
  issues/             /issues and /issues/[slug]
  articles/[slug]/    every essay lives at one flat address
  topics/ series/ authors/ podcast/ editions/
  print/              the ad landing page (+ /print/thanks)
  subscribe/ newsletter/ about/ pitch/ institute/ support/ archive/ search/
  congress/ consortium/ events/ editorial-board/   growth-strategy pages (Oct 2026)
  vak/                Vāk, the Tarka Sanskrit app (waitlist page)
  api/checkout/       Stripe Checkout (inactive until keys are set)
components/           Header, Footer, cards, covers/art, newsletter form, print band
content/              ← all content lives here for now
  issues.ts authors.ts topics.ts editions.ts redirects.json
  events.ts congress.ts   Congress programme + the four city Evenings
  institute.ts vak.ts     Institute programs/timeline; Vāk app copy (placeholders in [brackets])
  articles/*.md       one Markdown file per essay (frontmatter = metadata)
lib/
  content.ts          the ONLY place pages read content from (swap to Sanity later)
  types.ts            content model
  podcast.ts          reads episodes from the Substack RSS feed
  site.ts             nav, footer links, URLs
docs/                 DESIGN, CMS, PRINT, LAUNCH notes
```

## Adding content

**An essay:** add `content/articles/<slug>.md`:

```md
---
title: Who is Utpaladeva?
dek: The tenth-century Kashmiri philosopher who turned recognition into an argument.
authors: [jacob-kyle]
issue: 10-on-yoga-philosophy
topics: [kashmir-shaivism, yoga-philosophy]
series: who-is
date: 2026-10-01
art: green            # drawn artwork until real art exists (see components/Art.tsx)
image:                # optional: Vercel Blob URL for real art
devanagari: उत्पलदेव   # optional ornament above the title
---

Body in Markdown. Footnotes use [^1] and render as notes. IAST works as-is.
```

**An issue / author / topic / edition:** add an entry to the matching file in `content/`.

Placeholders in square brackets — `[PRICE]`, `[Author]`, `[Dek.]` — mark copy still to write. Search the repo for `[` and `TODO` to find them.

## What's live vs. stubbed

| Feature | Status |
|---|---|
| All pages in the sitemap | Built, with seed content |
| Newsletter sign-up | Posts to Substack (test once in production) |
| Podcast | Reads the Substack RSS feed; shows a fallback if empty |
| Search | Client-side, diacritic-insensitive |
| Print checkout | Stripe route ready; inactive until keys + price IDs are set |
| Lulu fulfilment | Not built — see `docs/PRINT.md` |
| CMS | Markdown files for now — see `docs/CMS.md` for the Sanity plan |
