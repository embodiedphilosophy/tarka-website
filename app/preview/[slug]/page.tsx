import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchDeskDraft, toArticle } from "@/lib/desk";
import { ArticleView } from "@/components/ArticleView";

// The hidden draft page behind Tarka Desk's "Private preview link". Shows the unpublished working copy
// in the site's real design. Needs the Desk's signed token, never cached, never indexed.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Preview", robots: { index: false, follow: false } };

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ token?: string }> };

export default async function PreviewPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { token } = await searchParams;
  if (!token) notFound();
  const draft = await fetchDeskDraft(slug, token);
  if (!draft) notFound();
  return <ArticleView article={toArticle(draft)} preview />;
}
