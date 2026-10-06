# Importing essays from Substack

Essays first published on read.tarkajournal.com are copied into `content/articles/*.md` by
`scripts/import-substack.mjs`. It uses Substack's public post API, so it needs no login or key.

## Run it

```bash
npm run import:substack            # fill every article still showing "Body to be imported from Substack"
npm run import:substack -- --dry   # preview what would change
npm run import:substack -- --new   # also create files for Substack posts the site doesn't have yet (~100)
npm run import:substack -- --slug inhabiting-power --force   # re-import one essay
```

Then `npm run dev`, check the essays, and commit.

It also runs every Monday as a GitHub Action (`.github/workflows/import-substack.yml`) and opens a pull
request, so new Substack posts arrive for review rather than going live on their own. For that to work,
turn on **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests**.

## What it does

- **Matching:** `substack:` in an article's frontmatter, else the same slug, else the same title.
  Three are mapped already (Lakṣmī, Bhagavad Gītā, Ardhanārīśvara).
- **Body:** Substack HTML → Markdown. Footnotes become real notes, captions stay under images,
  subscribe boxes and share buttons are dropped.
- **Frontmatter:** fields you've edited are kept. Empty or `[placeholder]` fields are filled from
  Substack (title, dek from the subtitle, date, cover image, authors from the bylines).
  It always records `substack`, `substackUrl` and `substackAudience`.
- **Authors:** bylines are matched to `content/authors.ts`. "Tarka Journal" bylines are ignored, so
  guest essays posted under the Tarka account keep the author already in the file. Names it can't
  match are listed at the end of the run: add them to `authors.ts`.
- **Paid posts:** the public API only returns a preview. Those articles get `paywall: true` and show
  the preview with a "Continue on Substack" box. If the editors decide to free an essay, change its
  audience on Substack and re-run with `--slug … --force`.

## Limits

- Images stay on Substack's CDN (substackcdn.com). Move them to Vercel Blob before leaving Substack.
- The API is undocumented and could change. If a run fails, the site is unaffected; only the import stops.
- After import, add `topics`, `issue` and `art` by hand: Substack doesn't have them.
