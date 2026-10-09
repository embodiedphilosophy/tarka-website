import type { MetadataRoute } from "next";
import { getArticles, getAuthors, getEditions, getIssues, getSeriesList, getTopics } from "@/lib/content";
import { site } from "@/lib/site";
import { getCsi } from "@/lib/csi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (p: string) => `${site.url}${p}`;
  const fixed = ["", "/issues", "/topics", "/podcast", "/editions", "/about", "/print", "/subscribe", "/newsletter", "/pitch", "/institute", "/vak", "/csi", "/events", "/congress", "/consortium", "/editorial-board", "/support", "/archive"];
  return [
    ...fixed.map((p) => ({ url: u(p) })),
    ...getIssues().map((i) => ({ url: u(`/issues/${i.slug}`) })),
    ...(await getArticles()).map((a) => ({ url: u(`/articles/${a.slug}`), lastModified: a.date })),
    ...getTopics().map((t) => ({ url: u(`/topics/${t.slug}`) })),
    ...getSeriesList().map((s) => ({ url: u(`/series/${s.slug}`) })),
    ...getAuthors().map((a) => ({ url: u(`/authors/${a.slug}`) })),
    ...getEditions().map((e) => ({ url: u(`/editions/${e.slug}`) })),
    ...getCsi().map((e) => ({ url: u(`/csi/${e.slug}`) })),
  ];
}
