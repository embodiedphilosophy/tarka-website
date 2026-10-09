# Articles from Tarka Desk

Staff write, preview and publish web articles on Tarka Desk (desk.tarkajournal.com). This site reads the
published copy through the Desk's read-only API, through `lib/desk.ts` and `lib/content.ts`. Markdown essays
in `content/articles` keep working; if a Desk article and an essay share a slug, the Desk one is shown.

## Environment variables (Vercel, tarka-website project)

| Variable | Value |
|---|---|
| `DESK_URL` | `https://desk.tarkajournal.com` |
| `DESK_API_KEY` | Same value as `SITE_API_KEY` on the Desk project |
| `REVALIDATE_SECRET` | Any long random string. Set the same value as `SITE_REVALIDATE_SECRET` on the Desk project |

On the Desk project also set `SITE_URL` (`https://tarkajournal.com`) and
`SITE_REVALIDATE_URL` (`https://tarkajournal.com/api/revalidate`).

With `DESK_URL` or `DESK_API_KEY` missing, or the Desk unreachable, the site shows only the Markdown essays.
It never fails a build because of the Desk.

## How it behaves
- Published articles are cached for 5 minutes. When someone publishes or takes one down, the Desk calls
  `POST /api/revalidate` so the change shows at once. Scheduled articles appear within 5 minutes of their time.
- `/preview/[slug]?token=…` is the hidden draft page behind the Desk's "Private preview link". It shows the
  unpublished working copy in the site's design, needs the Desk's signed token (valid 72 hours), is never cached
  and is marked noindex.
- Authors are matched to `content/authors.ts` by name; an unknown author is shown by name without a link.
  Topics, series and issue are matched by name or number; ones that don't match are left out.
- Text from the Desk is escaped, never inserted as raw HTML.
