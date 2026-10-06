/**
 * Annual Congress of Scholar-Practitioners — 2027 virtual pilot, 10–11 April 2027.
 * Format follows the Contemplative Consortium and Tarka Institute founding documents.
 * Dates, speakers and prices are proposals until confirmed.
 */
export const congress = {
  name: "Annual Congress of Scholar-Practitioners",
  short: "The Congress",
  edition: "First Congress · 2027",
  theme: "The Scholar-Practitioner Today",
  dates: "Saturday–Sunday, 10–11 April 2027",
  where: "Online, live and recorded",
  convenedBy: "Convened by the Contemplative Consortium with Tarka Journal. Produced by Embodied Philosophy.",
  program: [
    { day: "Saturday", title: "Opening keynote conversation", format: "Two scholar-practitioners in dialogue", minutes: 60, open: true },
    { day: "Saturday", title: "What is a scholar-practitioner now?", format: "Panel", minutes: 75, open: true },
    { day: "Saturday", title: "Decolonising contemplative studies: method, not just representation", format: "Panel and Q&A", minutes: 75, open: true },
    { day: "Saturday", title: "Founding the Contemplative Consortium", format: "Partners sign the shared principles; open discussion", minutes: 45, open: true },
    { day: "Sunday", title: "Reading a text together", format: "Workshop: close reading from The Heart of Recognition", minutes: 90, open: false },
    { day: "Sunday", title: "Practice as research", format: "Workshop on contemplative and artistic methods", minutes: 75, open: false },
    { day: "Sunday", title: "Launch: The Heart of Recognition", format: "Tarka Editions, Vol. I, with the Institute's Chairs and the in-person Congress plan", minutes: 45, open: true },
  ],
  passes: [
    { name: "Open sessions", price: "Free", body: "Watch the keynote, panels and closing session live." },
    { name: "Full Pass", price: "[PRICE]", body: "Everything, plus both workshops, all replays and the digital Congress reader.", featured: true },
    { name: "Students & Consortium members", price: "Free", body: "Full Pass for students and for staff of Consortium member institutions." },
  ],
};
