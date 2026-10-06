import type { Edition } from "@/lib/types";

/**
 * Tarka Editions. Vols. I–II of the Scholar-Practitioner Editions are drafted in Drive;
 * prices, formats and dates are still to be set.
 */
export const editions: Edition[] = [
  {
    slug: "the-heart-of-recognition",
    title: "The Heart of Recognition",
    subtitle: "Kṣemarāja's Pratyabhijñāhṛdaya · Scholar-Practitioner Editions, Vol. I",
    status: "forthcoming",
    art: "indigo",
    description:
      "The complete text of Kṣemarāja's twenty sūtras with his own commentary (vṛtti), with translation, lexical notes and a running unfolding, prepared for the reader who comes to the text to study it and to live by it.",
    format: "[Format · pages]",
    price: "[PRICE]",
    contents: [
      "Part One · The Metaphysical Foundation (sūtras 1–4)",
      "Part Two · The Analysis of Contraction (sūtras 5–8)",
      "Part Three · The Conditions of Recognition (sūtras 9–14)",
      "Part Four · The Realized State (sūtras 15–20)",
    ],
  },
  {
    slug: "parapravesika",
    title: "Parāprāveśikā",
    subtitle: "An Entrance into the Supreme · Scholar-Practitioner Editions, Vol. II",
    status: "forthcoming",
    art: "madder",
    description: "[Book description.]",
    format: "[Format · pages]",
    price: "[PRICE]",
  },
  {
    slug: "song-of-sadhana",
    title: "Song of Sādhana",
    subtitle: "Chants & mantras, curated by Jacob Kyle",
    status: "available",
    art: "gold",
    description: "[Book description.]",
    format: "[Format · pages]",
    price: "[PRICE]",
    buyUrl: "https://www.tarkajournal.com/",
  },
];

export const editionsSeries = {
  name: "Scholar-Practitioner Editions",
  description:
    "Classic texts of the contemplative traditions in full, with translation and commentary, set for readers who study and practise them.",
};
