import { site } from "@/lib/site";

/**
 * Free newsletter sign-up → Substack (read.tarkajournal.com).
 * Uses the same plain form post that Substack's own embed form uses, so no API key is needed.
 * TODO: test once on production; if Substack blocks it, swap for their iframe embed at `${site.substackUrl}/embed`.
 */
export default function NewsletterForm({ id = "newsletter-email", cta = "Sign up" }: { id?: string; cta?: string }) {
  return (
    <form className="newsletter" action={`${site.substackUrl}/api/v1/free?nojs=true`} method="post">
      <label className="field" htmlFor={id}>
        Email address
        <input id={id} className="input" type="email" name="email" placeholder="you@example.com" required autoComplete="email" />
      </label>
      <button type="submit" className="btn btn--ink">{cta}</button>
    </form>
  );
}

export function NewsletterBox({
  title = "Tarka in your inbox",
  body = "New essays, podcast episodes and notes from the editors. Free.",
  variant = "paper",
}: {
  title?: string;
  body?: string;
  variant?: "paper" | "indigo";
}) {
  return (
    <section className={`newsletter-box newsletter-box--${variant}`}>
      <div className="newsletter-box__copy">
        <h2 className="h-section">{title}</h2>
        <p className="body-l" style={variant === "indigo" ? { color: "var(--indigo-tint)" } : undefined}>{body}</p>
      </div>
      <div style={{ flex: "1 1 420px" }}>
        <NewsletterForm id={`nl-${variant}`} />
      </div>
    </section>
  );
}
