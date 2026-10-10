/**
 * Content model. These types match the content types planned for the CMS
 * (Issue, Article, Author, Topic, Series, Edition) — see docs/CMS.md.
 * Today they're filled from /content; later lib/content.ts can read Sanity instead.
 */

/** Colour + motif used to draw a cover or article artwork until real Tarka art exists. */
export type ArtKey =
  | "madder"
  | "indigo"
  | "teaching"
  | "tantra"
  | "citizenship"
  | "queer"
  | "death"
  | "gold"
  | "split"
  | "green";

export type Issue = {
  slug: string; // e.g. "9-on-power" → /issues/9-on-power
  number?: number; // leave undefined until confirmed
  title: string; // "On Power"
  status: "published" | "forthcoming";
  date?: string; // ISO date of publication
  description?: string;
  editorsIntro?: string; // Markdown allowed
  art: ArtKey;
  coverImage?: string; // URL (Vercel Blob) — overrides the drawn cover
  printAvailable?: boolean;
};

export type Author = {
  slug: string;
  name: string;
  bio?: string;
  affiliation?: string;
  photo?: string;
  links?: { label: string; href: string }[];
};

export type Topic = { slug: string; name: string; description?: string };

export type Series = { slug: string; name: string; description?: string };

export type Edition = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  status: "available" | "forthcoming";
  coverImage?: string;
  art: ArtKey;
  format?: string;
  price?: string;
  buyUrl?: string; // until Stripe is wired, can point to the existing store
  contents?: string[];
};

export type ArticleMeta = {
  slug: string;
  title: string;
  dek?: string;
  authors: string[]; // author slugs
  issue?: string; // issue slug
  topics: string[]; // topic slugs
  series?: string; // series slug
  date: string; // ISO
  art: ArtKey;
  image?: string;
  devanagari?: string; // ornament above the title, e.g. "उत्पलदेव"
  sample?: boolean; // shows the "sample copy" notice
  substackUrl?: string; // where the piece is also published
  paywall?: boolean; // paid on Substack: the site shows a preview and links there
  featured?: boolean; // candidate for the homepage lead
  readingMinutes: number;
  fromDesk?: boolean; // published on Tarka Desk
};

export type Article = ArticleMeta & { html: string };
