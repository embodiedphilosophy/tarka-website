import type { Series, Topic } from "@/lib/types";

/** DRAFT topic list — settle 8–10 before tagging issues 1–9. */
export const topics: Topic[] = [
  { slug: "tantra", name: "Tantra" },
  { slug: "yoga-philosophy", name: "Yoga Philosophy" },
  { slug: "kashmir-shaivism", name: "Kashmir Śaivism" },
  { slug: "politics", name: "Politics" },
  { slug: "teaching", name: "Teaching" },
  { slug: "death-and-dying", name: "Death & Dying" },
  { slug: "queer-dharma", name: "Queer Dharma" },
  { slug: "goddess", name: "Goddess" },
  { slug: "jainism", name: "Jainism" },
  { slug: "art-and-image", name: "Art & Image" },
  { slug: "texts", name: "Sanskrit & Texts" },
  { slug: "spiritual-citizenship", name: "Spiritual Citizenship" },
];

export const series: Series[] = [
  {
    slug: "who-is",
    name: "Who is…?",
    description: "Short portraits of the thinkers, deities and figures behind the traditions Tarka studies.",
  },
];
