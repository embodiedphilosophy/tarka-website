import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/lib/site";

/**
 * POST /api/checkout  (form field: plan = "annual" | "gift")
 * Creates a Stripe Checkout Session and redirects to it.
 * Until STRIPE_SECRET_KEY and the price IDs are set, it sends people back to /print?soon=1.
 *
 * After payment: a Stripe webhook (not built yet) should create the Lulu print order
 * for each new issue. See docs/PRINT.md.
 */
const PRICES: Record<string, { env: string; mode: "subscription" | "payment" }> = {
  annual: { env: "STRIPE_PRICE_PRINT_ANNUAL", mode: "subscription" },
  gift: { env: "STRIPE_PRICE_PRINT_GIFT", mode: "payment" },
};

export async function POST(req: Request) {
  const form = await req.formData();
  const plan = String(form.get("plan") ?? "annual");
  const config = PRICES[plan];
  const key = process.env.STRIPE_SECRET_KEY;
  const price = config ? process.env[config.env] : undefined;
  const origin = new URL(req.url).origin || site.url;

  if (!key || !price || !config) {
    return NextResponse.redirect(`${origin}/print?soon=1#pricing`, 303);
  }

  const stripe = new Stripe(key);
  const session = await stripe.checkout.sessions.create({
    mode: config.mode,
    line_items: [{ price, quantity: 1 }],
    shipping_address_collection: { allowed_countries: ["US", "GB", "CA", "AU", "NZ", "IE", "DE", "FR", "NL", "IN"] },
    allow_promotion_codes: true,
    success_url: `${origin}/print/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/print#pricing`,
    metadata: { plan },
  });

  return NextResponse.redirect(session.url!, 303);
}
