export const site = {
  name: "Tarka",
  title: "Tarka — a journal for scholar-practitioners",
  description:
    "A journal published by Embodied Philosophy that explores yoga philosophy, contemplative studies, and the world's wisdom and esoteric traditions.",
  tagline: "A journal for scholar-practitioners",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tarkajournal.com",
  substackUrl: process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "https://read.tarkajournal.com",
  email: "tarka@embodiedphilosophy.com",
  instagram: "https://www.instagram.com/tarkajournal",
  facebook: "https://www.facebook.com/tarkajournal",
};

/** Main nav: five reading paths + the Subscribe button (rendered separately). */
export const mainNav = [
  { href: "/issues", label: "Issues" },
  { href: "/topics", label: "Topics" },
  { href: "/podcast", label: "Podcast" },
  { href: "/editions", label: "Editions" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export const footerNav = [
  { href: "/congress", label: "The Congress" },
  { href: "/consortium", label: "Contemplative Consortium" },
  { href: "/editorial-board", label: "Editorial Board" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/pitch", label: "Pitch us" },
  { href: "/csi", label: "Contemplative Studies Index" },
  { href: "/institute", label: "Tarka Institute" },
  { href: "/vak", label: "Vāk app" },
  { href: "/support", label: "Support Tarka" },
  { href: "/archive", label: "Archive" },
  { href: "/search", label: "Search" },
  { href: site.instagram, label: "Instagram" },
  { href: `mailto:${site.email}`, label: "Contact" },
];
