# Working on tarka-website with Claude

- Next.js 16 App Router, TypeScript, plain CSS (no Tailwind). Route params are Promises: `const { slug } = await params`.
- Design tokens and every component style live in `app/globals.css`. Reuse existing classes (`display-l`, `h-section`, `eyebrow`, `tag`, `btn btn--primary`, `grid-cards`, `two-col`, `feature-panel`…) before adding new ones.
- Pages never read files directly — always go through `lib/content.ts`. When Sanity arrives, only that file changes.
- Content: `content/*.ts` for issues/authors/topics/editions, `content/articles/*.md` for essays.
- Colours: paper `#F6F3EC`, ink `#1B1A17`, indigo `#2E3F7F` (actions/links), madder `#9C3B22` (series, highlights), gold `#D9A441`. Type: Newsreader (serif), IBM Plex Sans (UI), IBM Plex Mono (labels), Noto Serif Devanagari.
- Every page should end in a way to subscribe (print or newsletter). The header's Subscribe button goes to `/subscribe`; ads go to `/print` or `/newsletter`.
- Don't invent content. Use `[bracketed placeholders]` for anything not supplied.
- Images: all real Tarka art (logo, issue covers + spreads, article art, edition covers) is listed in `content/art.ts` — reference it from there, never hard-code image URLs in pages. See `docs/ART.md`. Drawn art in `components/Art.tsx` is only a fallback.
- The art currently loads from Squarespace's CDN; run `node scripts/localize-art.mjs` before Squarespace is cancelled.
- Check `npm run build` passes before pushing.
