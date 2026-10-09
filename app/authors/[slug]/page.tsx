import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByAuthor, getAuthor, getAuthors } from "@/lib/content";
import Listing from "@/components/Listing";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  return a ? { title: a.name, description: a.bio } : {};
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  return (
    <Listing
      eyebrow="Contributor"
      title={author.name}
      description={
        <div className="stack" style={{ gap: 10 }}>
          {author.affiliation && <span style={{ fontWeight: 600, color: "var(--ink)" }}>{author.affiliation}</span>}
          <span className={author.bio ? undefined : "placeholder"}>{author.bio ?? "[Short bio.]"}</span>
          {author.links && (
            <span className="meta-row">
              {author.links.map((l) => <a key={l.href} href={l.href} className="link-underline">{l.label}</a>)}
            </span>
          )}
        </div>
      }
      aside={
        author.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.photo} alt={author.name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }} />
        ) : undefined
      }
      articles={await getArticlesByAuthor(author.slug)}
    />
  );
}
