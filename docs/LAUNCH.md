# Launch checklist

1. **Build on preview.** Work on the Vercel preview URL until the main templates are signed off.
2. **Settle topics** (8–10) in `content/topics.ts`.
3. **Import issues 1–9.** For each issue: add it to `content/issues.ts` (number, date, cover). For each essay: a Markdown file in `content/articles/` tagged with issue, topics and authors. Upload images to Vercel Blob.
4. **Authors.** Bios and photos in `content/authors.ts`.
5. **Redirects.** List every old Squarespace URL (Squarespace → Settings → export, or crawl the sitemap at `tarkajournal.com/sitemap.xml`) and map each to its new address in `content/redirects.json`. These are permanent (301) redirects so search rankings carry over.
6. **Newsletter.** Test the sign-up form against Substack in production.
7. **DNS.** In Vercel → Project → Domains, add `tarkajournal.com` and `www.tarkajournal.com`; update DNS at the registrar as Vercel instructs. Leave `read.tarkajournal.com` pointing at Substack.
8. **Cancel Squarespace** after a week of the new site running cleanly (keep an export).
9. **Launch with Issue 10**, *On Yoga Philosophy*, as the first issue built natively.
10. **Print + ads** once the print format is decided (`docs/PRINT.md`).

Quick wins if launch slips: on Squarespace, fix article slugs, add a homepage newsletter box and an Issues page.
