/** Tarka events: the Annual Congress and the four city Evenings. Dates marked [TBC] are proposals. */

export type TarkaEvent = {
  slug: string;
  kind: "congress" | "evening";
  title: string;
  city?: "Seattle" | "New York" | "London" | "Oxford";
  when: string; // display string; ISO in `date` once confirmed
  date?: string;
  format: string;
  partner?: string; // a likely Consortium partner — not confirmed
  tiedTo?: string;
  registerUrl?: string;
};

export const events: TarkaEvent[] = [
  {
    slug: "congress-2027",
    kind: "congress",
    title: "Annual Congress of Scholar-Practitioners",
    when: "10–11 April 2027 · Online",
    date: "2027-04-10",
    format: "A weekend of keynote conversations, panels and workshops, online.",
    registerUrl: "/congress#register",
  },
  {
    slug: "london",
    kind: "evening",
    title: "Tarka Evening · London",
    city: "London",
    when: "Issue 10 launch [date TBC]",
    format: "Two contributors in conversation, a reading, books on sale.",
    partner: "[Partner TBC]",
    tiedTo: "Issue 10, On Yoga Philosophy",
  },
  {
    slug: "oxford",
    kind: "evening",
    title: "Tarka Evening · Oxford",
    city: "Oxford",
    when: "Issue 10 launch week [date TBC]",
    format: "A colloquium: one paper, a response, open discussion.",
    partner: "[Partner TBC]",
    tiedTo: "Issue 10, On Yoga Philosophy",
  },
  {
    slug: "new-york",
    kind: "evening",
    title: "Tarka Evening · New York",
    city: "New York",
    when: "15 April 2027 [TBC], after the Congress",
    format: "A reading from The Heart of Recognition, a short practice, a signing.",
    partner: "[Partner TBC]",
    tiedTo: "Tarka Editions, Vol. I",
  },
  {
    slug: "seattle",
    kind: "evening",
    title: "Tarka Evening · Seattle",
    city: "Seattle",
    when: "Summer 2027 [TBC]",
    format: "A summer salon: a long conversation and a shared meal.",
    partner: "[Venue TBC]",
    tiedTo: "Issue 11 preview",
  },
];
