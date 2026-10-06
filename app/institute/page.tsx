import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tarka Institute" };

const programs = [
  { name: "Tarka Fellowship", body: "[One line on the Fellowship.]" },
  { name: "Anusandhāna Program", body: "[One line on Anusandhāna.]" },
  { name: "Tarka Editions", body: "Scholar-practitioner editions of key texts.", href: "/editions" },
  { name: "Vāk", body: "[One line on the Vāk Sanskrit app.]" },
];

export default function InstitutePage() {
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Tarka Institute</h1>
        <p className="dek placeholder">[What the Institute is and how it relates to the journal.]</p>
      </section>
      <section className="benefits">
        {programs.map((p) => (
          <div key={p.name}>
            <b className="h-card">{p.href ? <a href={p.href}>{p.name}</a> : p.name}</b>
            <span className="body-l" style={{ fontSize: 16 }}>{p.body}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
