import type { Issue } from "@/lib/types";
import { MAGAZINE_COVER_CROP, issueCovers, issueSpreads } from "./art";

/** Real cover + spreads for a numbered back issue (photos from tarkajournal.com). */
const realArt = (n: number) => ({
  coverImage: issueCovers[n],
  coverCrop: MAGAZINE_COVER_CROP,
  spreads: issueSpreads[n],
});

/**
 * Issues, newest first is computed — order here doesn't matter.
 * Numbers 0–8 come from the print files' names on Squarespace (Tarka_00_SP … Tarka_07_Tantra;
 * On Teaching sits between 07 and 09). TODO: confirm, then rename slugs to "[n]-[title]".
 * `art` is the drawn fallback, only used where an issue has no coverImage.
 */
export const issues: Issue[] = [
  {
    slug: "10-on-yoga-philosophy",
    number: 10,
    title: "On Yoga Philosophy",
    status: "forthcoming",
    art: "indigo", // no cover art yet — drawn cover until it's ready
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
    ...realArt(9),
  },
  { slug: "on-teaching", number: 8, title: "On Teaching", status: "published", art: "teaching", printAvailable: true, ...realArt(8) },
  { slug: "on-tantra", number: 7, title: "On Tantra", status: "published", art: "tantra", printAvailable: true, ...realArt(7) },
  { slug: "on-spiritual-citizenship", number: 6, title: "On Spiritual Citizenship", status: "published", art: "citizenship", printAvailable: true, ...realArt(6) },
  { slug: "on-queer-dharma", number: 5, title: "On Queer Dharma", status: "published", art: "queer", printAvailable: true, ...realArt(5) },
  { slug: "on-death", number: 4, title: "On Death", status: "published", art: "death", printAvailable: true, ...realArt(4) },
  // Back issues sold on the Squarespace store but missing from the first build of this site:
  { slug: "on-ecology", number: 3, title: "On Ecology", status: "published", art: "green", printAvailable: true, ...realArt(3) },
  { slug: "on-illusion", number: 2, title: "On Illusion", status: "published", art: "split", printAvailable: true, ...realArt(2) },
  { slug: "on-bhakti", number: 1, title: "On Bhakti", status: "published", art: "madder", printAvailable: true, ...realArt(1) },
  { slug: "on-the-scholar-practitioner", number: 0, title: "On the Scholar-Practitioner", status: "published", art: "gold", printAvailable: true, ...realArt(0) },
];
