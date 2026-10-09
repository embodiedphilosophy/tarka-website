import type { Metadata } from "next";
import { authorNames, getArticles, getTopic } from "@/lib/content";
import SearchClient from "./SearchClient";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage() {
  const index = (await getArticles()).map((a) => ({
    slug: a.slug,
    title: a.title,
    dek: a.dek ?? "",
    authors: authorNames(a.authors),
    topics: a.topics.map((t) => getTopic(t)?.name ?? t).join(" "),
  }));
  return (
    <main className="container page" style={{ maxWidth: 900 }}>
      <h1 className="display-l">Search</h1>
      <SearchClient index={index} />
    </main>
  );
}
