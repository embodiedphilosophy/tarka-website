import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Pitch us" };

export default function PitchPage() {
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Pitch us</h1>
        <div className="stack" style={{ gap: 20 }}>
          <p className="dek">Tarka publishes scholar-practitioners: writers who bring rigorous study and lived practice to the same page.</p>
          <p className="body-l placeholder">[What we publish: long essays, “Who is…?” portraits, reviews. Lengths, style, citation and diacritics conventions, fees.]</p>
          <p className="body-l placeholder">[Upcoming issue themes and deadlines.]</p>
          <div className="btn-row">
            <a className="btn btn--primary" href={`mailto:${site.email}?subject=Pitch%20for%20Tarka`}>Send a pitch</a>
          </div>
          <p className="small">Send a 200-word outline, a short bio and one writing sample. [Or swap this for a form — e.g. Tally embedded here.]</p>
        </div>
      </section>
    </main>
  );
}
