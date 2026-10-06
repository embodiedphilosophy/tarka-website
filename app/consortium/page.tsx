import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Contemplative Consortium",
  description: "A network for the future of contemplative scholarship and practice.",
};

const principles = [
  { name: "Interdisciplinary scholarship", body: "Rigorous inquiry that brings together philosophy, practice and diverse knowledge traditions." },
  { name: "Ethical and decolonial awareness", body: "Critical engagement with historical narratives, cultural appropriation and the politics of knowledge." },
  { name: "Contemplative practice as knowledge", body: "Recognising the epistemic value of lived experience, embodied wisdom and contemplative methods." },
  { name: "Public engagement", body: "Taking contemplative scholarship beyond the academy, into social, ecological and ethical questions." },
  { name: "Collaborative, inclusive work", body: "Supporting diverse voices, methods and perspectives in contemplative studies." },
];

const who = [
  "Universities and research institutions with contemplative studies programmes",
  "Independent scholars and public intellectuals",
  "Academic and practice-oriented journals",
  "Educational organisations and retreat centres",
  "Think tanks and interdisciplinary research hubs",
  "Artist-scholars and practitioners engaged in contemplative inquiry",
];

export default function ConsortiumPage() {
  return (
    <main className="container page">
      <section className="two-col">
        <div className="stack" style={{ gap: 12 }}>
          <span className="eyebrow">Tarka Institute</span>
          <h1 className="display-l">The Contemplative Consortium</h1>
        </div>
        <div className="stack" style={{ gap: 18 }}>
          <p className="dek">A network for the future of contemplative scholarship and practice.</p>
          <p className="body-l">
            Academic inquiry and lived practice keep drifting apart. The Consortium brings together institutions, research centres, journals
            and independent scholars who want to hold them together, and to reimagine the role of the scholar-practitioner in the twenty-first
            century. Members sign five shared principles and meet each year at the{" "}
            <Link href="/congress" className="link-underline">Annual Congress of Scholar-Practitioners</Link>.
          </p>
        </div>
      </section>

      <section className="stack" style={{ gap: 28 }}>
        <h2 className="h-section rule-top">Shared principles</h2>
        <ol className="benefits" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {principles.map((p, i) => (
            <li key={p.name} className="stack" style={{ gap: 10, borderTop: "3px solid var(--ink)", paddingTop: 16 }}>
              <span className="mono small">{String(i + 1).padStart(2, "0")}</span>
              <b className="h-card" style={{ fontSize: 22 }}>{p.name}</b>
              <span className="body-l" style={{ fontSize: 16 }}>{p.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="two-col">
        <h2 className="h-section">Who can join</h2>
        <ul className="body-l" style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
          {who.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </section>

      <section className="two-col">
        <h2 className="h-section">Founding members</h2>
        <div className="stack" style={{ gap: 14 }}>
          <div className="pills">
            {["[Institution]", "[Institution]", "[Institution]", "[Institution]", "[Institution]"].map((l, i) => (
              <span key={i} className="logo-slot">{l}</span>
            ))}
          </div>
          <p className="small">Founding members are announced at the first Congress.</p>
        </div>
      </section>

      <section className="newsletter-box newsletter-box--indigo">
        <div className="newsletter-box__copy">
          <h2 className="h-section">Become a founding member</h2>
          <p className="body-l" style={{ color: "var(--indigo-tint)" }}>
            Host a session at the Congress, give your students free passes, and help shape the network from the start.
          </p>
        </div>
        <a href={`mailto:${site.email}?subject=Contemplative%20Consortium%20membership`} className="btn btn--cream">Write to us</a>
      </section>
    </main>
  );
}
