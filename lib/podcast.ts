import "server-only";
import { XMLParser } from "fast-xml-parser";
import { site } from "./site";

export type Episode = {
  title: string;
  link: string;
  date: string;
  description?: string;
  audioUrl: string;
  image?: string;
  duration?: string;
};

/**
 * Podcast episodes come from the Substack RSS feed (read.tarkajournal.com/feed).
 * Only items with an audio enclosure are treated as episodes. Revalidates hourly.
 * If the podcast lives on its own Substack feed URL, set PODCAST_FEED_URL.
 */
export async function getEpisodes(limit = 20): Promise<Episode[]> {
  const url = process.env.PODCAST_FEED_URL ?? `${site.substackUrl}/feed`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
    const doc = parser.parse(xml);
    const items = [doc?.rss?.channel?.item ?? []].flat();
    return items
      .filter((it: Record<string, any>) => String(it?.enclosure?.type ?? "").startsWith("audio"))
      .slice(0, limit)
      .map((it: Record<string, any>) => ({
        title: String(it.title ?? ""),
        link: String(it.link ?? ""),
        date: it.pubDate ? new Date(it.pubDate).toISOString().slice(0, 10) : "",
        description: it.description ? String(it.description).replace(/<[^>]+>/g, "").slice(0, 240) : undefined,
        audioUrl: String(it.enclosure.url),
        image: it["itunes:image"]?.href,
        duration: it["itunes:duration"] ? String(it["itunes:duration"]) : undefined,
      }));
  } catch {
    return [];
  }
}
