# Print: Stripe + Lulu

**Decide first:** print subscription (2–4 issues a year) or one annual Tarka volume. That sets the Stripe products and copy on `/print` (search for `[PRICE]` and `[N]`).

## Payments (Stripe) — mostly built
1. In Stripe, create a product “Tarka in print” with:
   - a recurring yearly price → `STRIPE_PRICE_PRINT_ANNUAL`
   - a one-off gift price → `STRIPE_PRICE_PRINT_GIFT`
2. Add `STRIPE_SECRET_KEY` and both price IDs in Vercel env vars.
3. `/print` buttons post to `/api/checkout`, which opens Stripe Checkout (collects shipping address) and returns to `/print/thanks`.
4. Without keys, the buttons send people back to `/print?soon=1` with a “coming soon” note — safe to ship before print is ready.

## Fulfilment (Lulu) — to build
- Upload each issue as a Lulu print-ready PDF (interior + cover).
- Add `app/api/stripe-webhook/route.ts`: on `checkout.session.completed`, store the subscriber + shipping address.
- When a new issue is ready, a script (or admin route) creates one Lulu Print Job per active subscriber via the Lulu Print API.
- Single back issues and Tarka Editions can use the same flow with one-off Stripe prices.

## Ads
Point print ads at `/print` and newsletter ads at `/newsletter`. Add the Meta and Google tags on those two pages only (and Vercel Analytics site-wide) so each ad's results can be measured.
