import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticle,
  getArticles,
  getArticlesByIssue,
  getArticlesBySeries,
  getArticlesByTopic,
  getIssue,
  getSeries,
  getTopic,
} from "@/lib/content";
import { ArticleView } from "@/components/ArticleView";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    openGraph: { type: "article", title: a.title, description: a.dek, publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const issue = article.issue ? getIssue(article.issue) : null;
  const series = article.series ? getSeries(article.series) : null;
  const topics = article.topics.map(getTopic).filter((t) => t !== null);

  // "More" row: same series, then same issue, then same first topic
  const pool = [
    ...(series ? await getArticlesBySeries(series.slug) : []),
    ...(issue ? await getArticlesByIssue(issue.slug) : []),
    ...(topics[0] ? await getArticlesByTopic(topics[0].slug) : []),
  ];
  const seen = new Set([article.slug]);
  const more = pool.filter((a) => (seen.has(a.slug) ? false : (seen.add(a.slug), true))).slice(0, 3);

  return <ArticleView article={article} more={more} />;
}
