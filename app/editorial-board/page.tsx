import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Board & Peer Review",
  description: "How Tarka is edited, and how peer-reviewed articles are reviewed.",
};

const steps = [
  { name: "Submission", body: "Authors send a full manuscript of 6,000–8,000 words with an abstract." },
  { name: "Initial review", body: "The Editor-in-Chief and a Board member check fit with Tarka's scope and baseline standards." },
  { name: "Double-blind review", body: "Two independent scholars review the article; neither they nor the author know each other's names." },
  { name: "Revision", body: "Authors receive structured comments on argument, method and engagement with the literature, and time to revise." },
  { name: "Decision", body: "The Editor-in-Chief and a Board representative accept, request further revision, or decline." },
];

export default function EditorialBoardPage() {
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Editorial Board</h1>
        <div className="stack" style={{ gap: 18 }}>
          <p className="dek">
            Tarka publishes invited essays, interviews and practice-oriented pieces alongside a selection of peer-reviewed articles.
          </p>
          <p className="body-l">
            The Editorial Board guides the journal's themes and calls for papers, advises on peer review, and recommends reviewers and
            contributors. It meets twice a year.
          </p>
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Editors</h2>
        <div className="stack">
          <div className="list-item"><span className="list-item__title">Jacob Kyle</span><span className="small">Founding Editor</span></div>
          <div className="list-item"><span className="list-item__title">Stephanie Corigliano</span><span className="small">Editor-in-Chief</span></div>
        </div>
      </section>

      <section className="two-col">
        <h2 className="h-section">Board</h2>
        <div className="stack" style={{ gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0 32px" }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="list-item">
                <span className="list-item__title placeholder">[Name]</span>
                <span className="small">[Affiliation · field]</span>
              </div>
            ))}
          </div>
          <p className="small">Eight members on staggered four-year terms. Members announced as they accept.</p>
        </div>
      </section>

      <section className="stack" style={{ gap: 24 }}>
        <h2 className="h-section rule-top">How peer review works</h2>
        <ol className="benefits" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map((s, i) => (
            <li key={s.name} className="stack" style={{ gap: 10, borderTop: "3px solid var(--ink)", paddingTop: 16 }}>
              <span className="mono small">Step {i + 1}</span>
              <b className="h-card" style={{ fontSize: 22 }}>{s.name}</b>
              <span className="body-l" style={{ fontSize: 16 }}>{s.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="two-col">
        <h2 className="h-section">Submit</h2>
        <div className="stack" style={{ gap: 16 }}>
          <p className="body-l">
            For invited essays and pitches, see <Link href="/pitch" className="link-underline">Pitch us</Link>. For peer review, send your
            manuscript and abstract to the editors.
          </p>
          <div className="btn-row">
            <a href={`mailto:${site.email}?subject=Peer-review%20submission`} className="btn btn--primary">Submit for peer review</a>
            <a href={`mailto:${site.email}?subject=Editorial%20Board`} className="btn btn--outline">Interested in the Board?</a>
          </div>
        </div>
      </section>
    </main>
  );
}
