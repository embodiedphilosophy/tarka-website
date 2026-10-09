import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByTopic, getTopic, getTopics } from "@/lib/content";
import Listing from "@/components/Listing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getTopics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTopic(slug);
  return t ? { title: t.name, description: t.description } : {};
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return (
    <Listing
      eyebrow="Topic"
      title={topic.name}
      description={topic.description ?? <span className="placeholder">[Two-line topic description.]</span>}
      articles={await getArticlesByTopic(topic.slug)}
    />
  );
}
