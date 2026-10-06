import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesBySeries, getSeries, getSeriesList } from "@/lib/content";
import Listing from "@/components/Listing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSeriesList().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSeries(slug);
  return s ? { title: s.name, description: s.description } : {};
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();
  return (
    <Listing eyebrow="Series" title={<i>{series.name}</i>} description={series.description} articles={getArticlesBySeries(series.slug)} />
  );
}
