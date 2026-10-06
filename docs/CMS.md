# Content: now and later

## Now — files in the repo
Content lives in `content/` and is read by `lib/content.ts`. Fine while one or two people edit, and Claude can add/edit essays directly.

## Later — Sanity (recommended once other editors join)
Sanity gives editors a writing interface with footnotes, IAST and image uploads, without touching GitHub. Free tier fits Tarka's volume.

Content types to create (they mirror `lib/types.ts`):

| Type | Fields |
|---|---|
| **Issue** | number, title, slug, status (published/forthcoming), date, description, editorsIntro (rich text), coverImage, printAvailable |
| **Article** | title, slug, dek, authors → Author[], issue → Issue, topics → Topic[], series → Series, date, image, devanagari, body (Portable Text with footnote annotations), substackUrl, featured |
| **Author** | name, slug, bio, affiliation, photo, links[] |
| **Topic** | name, slug, description |
| **Series** | name, slug, description |
| **Edition** | title, subtitle, slug, status, coverImage, description, contents[], format, price, buyUrl / Stripe price ID |

Switch-over: install `next-sanity`, replace the bodies of the functions in `lib/content.ts` with GROQ queries, render Portable Text in `app/articles/[slug]/page.tsx`, add a Sanity webhook → Vercel revalidation. No other page should need changes.

Lighter alternative: keep Markdown in the repo permanently and edit through Claude, as with the EP site.
