import type { Edition } from "@/lib/types";
import { editionCovers } from "./art";

/** Tarka Editions. Add further titles here as they're confirmed. */
export const editions: Edition[] = [
  {
    slug: "song-of-sadhana",
    title: "Song of Sādhana",
    subtitle: "Chants & mantras, curated by Jacob Kyle",
    status: "available",
    art: "gold",
    coverImage: editionCovers.songOfSadhana.src,
    coverCrop: editionCovers.songOfSadhana.crop,
    description: "[Book description.]",
    format: "[Format · pages]",
    price: "[PRICE]",
    buyUrl: "https://www.tarkajournal.com/",
  },
];
