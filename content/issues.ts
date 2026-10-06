import type { Issue } from "@/lib/types";

/**
 * Issues, newest first is computed — order here doesn't matter.
 * TODO: confirm numbers and dates for the back issues, then rename slugs to "[n]-[title]".
 */
export const issues: Issue[] = [
  {
    slug: "10-on-yoga-philosophy",
    number: 10,
    title: "On Yoga Philosophy",
    status: "forthcoming",
    art: "indigo",
    printAvailable: true,
    description:
      "[Two-line description of the issue's question.] Including “Who is Utpaladeva?”, an essay on pramāṇa theory, and a review of Sthaneshwar Timalsina's new book.",
  },
  {
    slug: "9-on-power",
    number: 9,
    title: "On Power",
    status: "published",
    date: "2026-07-22", // TODO: verify
    art: "madder",
    printAvailable: true,
    description:
      "The concept of power from multiple socio-political and contemplative angles.",
  },
  { slug: "on-teaching", title: "On Teaching", status: "published", art: "teaching" },
  { slug: "on-tantra", title: "On Tantra", status: "published", art: "tantra" },
  { slug: "on-spiritual-citizenship", title: "On Spiritual Citizenship", status: "published", art: "citizenship" },
  { slug: "on-queer-dharma", title: "On Queer Dharma", status: "published", art: "queer" },
  { slug: "on-death", title: "On Death", status: "published", art: "death" },
];
