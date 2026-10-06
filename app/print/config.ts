// Content + settings for the /print landing page.
// Everything editorial lives here so the page component never needs touching
// to change a price, a checkout link, an image or an FAQ answer.

const CDN = "https://images.squarespace-cdn.com/content/v1/6269d46844c82f0cce6dbac2";

export const LOGO = `${CDN}/568e55d9-848e-4e10-8219-1e5d49e17e51/Tarka-logo.png?format=1500w`;

export const OFFER = {
  issuesPerYear: 2,
  nextIssue: "No. 10, On Yoga Philosophy",
  plans: [
    {
      id: "us",
      label: "United States",
      price: "$50",
      // TODO: replace with the Stripe Payment Link / checkout URL for the US plan
      href: "/subscribe/checkout?plan=print-us",
    },
    {
      id: "intl",
      label: "International",
      // TODO: confirm international price (shipping outside the US costs more)
      price: "$65",
      href: "/subscribe/checkout?plan=print-intl",
    },
  ],
  giftHref: "/subscribe/checkout?plan=print-gift", // TODO
  groupHref: "mailto:tarka@embodiedphilosophy.com?subject=Group%20subscription",
};

export const TOPICS = [
  "Yoga Philosophy",
  "Tantra",
  "Dharma",
  "Sanskrit",
  "Contemplative Studies",
];

// Squarespace mockups are 1000×686 with the cover centred on a grey ground.
// The page crops them to the cover itself (see .cover in print.module.css).
export const COVERS = {
  power: { src: `${CDN}/95587cfb-a202-48b2-a3cc-cd98accf2f9f/Tarka-09-Power-Wide-Cover.jpg`, alt: "Tarka No. 9, On Power" },
  teaching: { src: `${CDN}/1699726751027-FFX2L6FBFD6H50L5VY3O/Tarka-OnTeaching-Cover.jpg`, alt: "Tarka, On Teaching" },
  tantra: { src: `${CDN}/1679240100578-XUU2ZL6DL7YDGMDYHWK7/Tarka_07_Tantra_wide.jpg`, alt: "Tarka, On Tantra" },
  queerDharma: { src: `${CDN}/65212197-fa69-434a-a727-10dd871d7171/Tarka_05_QueerDharma_cover.jpg`, alt: "Tarka, On Queer Dharma" },
  citizenship: { src: `${CDN}/1651104261152-VMBPI0EBO6UUCHRU6BND/Tarka_06_SC_cover.jpg`, alt: "Tarka, On Spiritual Citizenship" },
};

export const SPREADS = [
  `${CDN}/977eda52-c78b-4ba2-90bf-75635cc328a0/Tarka-09-Power-Wide-Spreads-1.jpg`,
  `${CDN}/1699728254461-48ZDAZ8C7751K6Z6IVHA/Tarka-OnTeaching-Spread-1.jpg`,
  `${CDN}/4bf089e3-2dc6-46a0-b268-67ab29d4ffd7/Tarka-09-Power-Wide-Spreads-2.jpg`,
  `${CDN}/1651104737777-W0L8UWMB0XR9JOEI9VU0/Tarka_06_SC_spread_3.jpg`,
  `${CDN}/1474d804-0104-425c-bbe9-480a936e97d7/Tarka-09-Power-Wide-Spreads-3.jpg`,
  `${CDN}/1699728254288-W3ZGT2EHQBDFD6FV6I9A/Tarka-OnTeaching-Spread-2.jpg`,
  `${CDN}/c7b90d91-5230-4ccd-8622-808716f047d0/Tarka-09-Power-Wide-Spreads-4.jpg`,
  `${CDN}/1651104737832-VLC8I70CVS4BH68X1AS2/Tarka_06_SC_spread_1.jpg`,
];

export const BENEFITS = [
  {
    img: `${CDN}/87f37f0b-7a57-4665-a24c-fca2be2f4d62/Tarka-09-Power-Stack.jpg`,
    text: "Two themed issues a year, printed and posted to your door",
  },
  {
    img: `${CDN}/0d254a38-35af-4f62-8059-9e338932203c/Tarka-09-Power-Cover-Spreads-Combo.jpg`,
    text: "Long-form essays, translations, interviews and artwork",
  },
  {
    img: `${CDN}/1651104737852-WCKFM9LSM2M23E0U0G7Q/Tarka_06_SC_spread_7.jpg`,
    // TODO: confirm subscriber perks for events
    text: "Invitations to Tarka gatherings and the Annual Congress",
  },
  {
    img: `${CDN}/1699728253942-WCEDLPOIGZGRI6I46PMQ/Tarka-OnTeaching-Stack.jpg`,
    text: "Direct support for independent, practice-informed scholarship",
  },
];

// Real contributors from recent issues — stands in for WiP's logo wall.
export const CONTRIBUTORS = [
  "Christopher Key Chapple",
  "Zoë Slatoff",
  "Marcy Braverman Goldstein",
  "Christopher Jain Miller",
  "Katy Jane",
  "Jacob Kyle",
];

// Reader testimonials. Leave empty until you have real, attributable quotes —
// the section hides itself when this list is empty.
export const TESTIMONIALS: { quote: string; name: string; role?: string }[] = [];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Which issue will I receive first?",
    a: `If you subscribe today, your first issue will be ${OFFER.nextIssue}.`,
  },
  {
    q: "How often does Tarka come out?",
    a: "Twice a year. Each issue is organised around a single theme and posted as soon as it comes off press.",
  },
  {
    q: "Is the print issue the same as what's online?",
    a: "Some essays appear on the website, but the print issue is the complete, designed volume — every essay, translation and artwork in one place.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We ship worldwide. International subscriptions cost a little more to cover postage.",
  },
  {
    q: "Can I buy a subscription as a gift?",
    a: "Yes. Choose the gift option and we'll send the first issue to your recipient with a note from you.",
  },
  {
    q: "Can I buy subscriptions for a school, studio or library?",
    a: "Yes. Write to tarka@embodiedphilosophy.com and we'll set up a group subscription.",
  },
  {
    q: "Can I order back issues?",
    a: "Back issues are available individually in print and PDF from the Tarka bookstore while stock lasts.",
  },
  {
    q: "Does my subscription renew automatically?",
    a: "Yes, once a year. You can cancel at any time before your renewal date and you won't be charged again.",
  },
  {
    q: "How do I change my address or cancel?",
    a: "Email tarka@embodiedphilosophy.com and we'll take care of it.",
  },
];
