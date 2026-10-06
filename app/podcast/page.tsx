import type { Metadata } from "next";
import { getEpisodes } from "@/lib/podcast";
import { site } from "@/lib/site";
import { NewsletterBox } from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "Podcast" };
export const revalidate = 3600;

export default async function PodcastPage() {
  const episodes = await getEpisodes();
  return (
    <main className="container page">
      <section className="two-col">
        <h1 className="display-l">Podcast</h1>
        <div className="stack" style={{ gap: 16 }}>
          <p className="dek placeholder">[One line on the podcast: who's talking, about what.]</p>
          <div className="btn-row">
            <a href={site.substackUrl} className="btn btn--outline">Listen on Substack</a>
            <a href="#" className="btn btn--outline">Apple Podcasts</a>
            <a href="#" className="btn btn--outline">Spotify</a>
          </div>
        </div>
      </section>

      <section className="stack">
        <h2 className="h-section rule-top" style={{ marginBottom: 8 }}>Episodes</h2>
        {episodes.length === 0 ? (
          <p className="placeholder" style={{ paddingBlock: 20 }}>
            Episodes load from the Substack feed. None found right now — <a className="link-underline" href={site.substackUrl}>listen on Substack</a>.
          </p>
        ) : (
          episodes.map((ep) => (
            <article key={ep.link} className="episode">
              {ep.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ep.image} alt="" className="episode__art" />
              ) : (
                <span className="episode__art" aria-hidden="true" />
              )}
              <div className="stack" style={{ gap: 6, flex: 1, minWidth: 0 }}>
                <span className="small">{ep.date}{ep.duration ? ` · ${ep.duration}` : ""}</span>
                <a href={ep.link} className="list-item__title">{ep.title}</a>
                {ep.description && <p className="small" style={{ lineHeight: 1.5 }}>{ep.description}…</p>}
                <audio controls preload="none" src={ep.audioUrl}>
                  <a href={ep.audioUrl}>Download audio</a>
                </audio>
              </div>
            </article>
          ))
        )}
      </section>

      <NewsletterBox title="New episodes by email" />
    </main>
  );
}
