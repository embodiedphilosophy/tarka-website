import type { Crop } from "@/lib/types";

/**
 * Real Tarka art — every image currently on tarkajournal.com (Squarespace), in one place.
 *
 * These URLs point at Squarespace's image CDN, so they only work while the Squarespace
 * site is live. Before cancelling Squarespace, run `node scripts/localize-art.mjs`:
 * it downloads every image below into /public/art and rewrites this file to local paths.
 * (Or upload them to Vercel Blob and swap the URLs — either way, only this file changes.)
 *
 * Inventory and notes: docs/ART.md.
 */

const SQ = "https://images.squarespace-cdn.com/content/v1/6269d46844c82f0cce6dbac2/";

/** Squarespace serves resized copies via ?format=<n>w (100–2500). */
const sq = (path: string, width = 1500) => `${SQ}${path}?format=${width}w`;

/* ---------- Brand ---------- */

/** Tarka wordmark: ink on transparent PNG, 1440×354. Invert it (CSS) on dark grounds. */
export const logo = { src: sq("568e55d9-848e-4e10-8219-1e5d49e17e51/Tarka-logo.png", 1500), width: 1440, height: 354 };

/* ---------- Issue covers ---------- */

/**
 * Every issue "cover" on Squarespace is a 1362×934 photo of the printed issue on a grey
 * (#D9D2D0) ground, always in the same spot. This crop cuts out just the front cover
 * (538×708, ≈3:4) so it can sit in the site's cover slots.
 */
export const MAGAZINE_COVER_CROP: Crop = { x: 413, y: 113, w: 538, h: 708, sourceWidth: 1362, sourceHeight: 934 };

/** Wide (uncropped) cover photos, keyed by issue number. */
export const issueCovers: Record<number, string> = {
  0: sq("29569527-e142-4709-a03c-afb662a39e09/Tarka_00_SP_cover.jpg"),
  1: sq("95b206ab-71d3-4264-8a1e-4d07647ac92b/Tarka_01_Bhakti_cover.jpg"),
  2: sq("1481d9e5-220b-4137-a9f5-76386dd3d7fa/Tarka_02_Illusion_cover.jpg"),
  3: sq("14a05cdd-1946-4fe7-a78d-a53015582832/Tarka_03_Ecology_cover.jpg"),
  4: sq("1651103349559-S2Q0VH9UBPTU129VJ6SK/Tarka_04_Death_cover.jpg"),
  5: sq("1651103108151-YON6CFJT8VYNPP5DSBOH/Tarka_05_QueerDharma_cover.jpg"),
  6: sq("1651104261152-VMBPI0EBO6UUCHRU6BND/Tarka_06_SC_cover.jpg"),
  7: sq("1679235497096-EYYD5CJQJBU2KG2H8TBG/Tarka_07_Tantra_wide.jpg"),
  8: sq("1699726655062-L31RSBJUGHAUJOW39JQS/Tarka-OnTeaching-Cover.jpg"),
  9: sq("1784741518935-QRITG3QGY6ZHTU3U3BVW/Tarka-09-Power-Wide-Cover.jpg"),
};

/** Interior spreads (1362×934 photos), keyed by issue number — shown as "Inside the issue". */
export const issueSpreads: Record<number, string[]> = {
  0: [
    "db12717d-3e67-40ee-aedd-ce6b2b7f9824/Tarka_00_SP_spread_1.jpg",
    "ed383536-f897-4b42-9fb2-81ca5f03ebc2/Tarka_00_SP_spread_2.jpg",
    "ba2b294a-8456-4f6d-bd61-28a1d92389d2/Tarka_00_SP_spread_3.jpg",
    "1651435553220-6UHIDVJ9GPM98AJRC1R6/Tarka_00_SP_spread_4.jpg",
    "a4973614-7fd3-4cf3-b8fd-3c67876b4c85/Tarka_00_SP_spread_5.jpg",
    "1651435571481-WW40FEQGA72432YNVR0B/Tarka_00_SP_spread_6.jpg",
  ].map((p) => sq(p, 1000)),
  1: [
    "f0e3e2c4-c8fb-41af-bddc-ed8d426193e1/Tarka_01_Bhakti_spread_1.jpg",
    "5f852f11-5673-4ff9-a6df-80a2eed8485d/Tarka_01_Bhakti_spread_2.jpg",
    "eb0b7cec-1667-4101-8ccf-b8a98bdac5ce/Tarka_01_Bhakti_spread_3.jpg",
    "a9aa6efa-ef26-459c-b99f-b76610aa52c9/Tarka_01_Bhakti_spread_4.jpg",
    "45cdc9ac-1936-4892-96ca-ae8cba13e525/Tarka_01_Bhakti_spread_5.jpg",
    "e0c46fee-bce2-4677-9f13-574b09f99c35/Tarka_01_Bhakti_spread_6.jpg",
  ].map((p) => sq(p, 1000)),
  2: [
    "6815cf74-c096-4a48-a68b-325fdf679de7/Tarka_02_Illusion_spread_1.jpg",
    "3cf4cd97-8929-441d-bc84-a3928213f7c7/Tarka_02_Illusion_spread_2.jpg",
    "1651436159969-I9XHBQUPFWYMD0M8CYS6/Tarka_02_Illusion_spread_3.jpg",
    "1651436165403-30BT6G6SD7JGFEX3ZB96/Tarka_02_Illusion_spread_4.jpg",
    "8a8835af-e24e-4e2a-9f31-17d1e62f76a4/Tarka_02_Illusion_spread_5.jpg",
    "2b999106-39d6-4654-a153-c19706e2fb72/Tarka_02_Illusion_spread_6.jpg",
  ].map((p) => sq(p, 1000)),
  3: [
    "ca73b78c-06a9-41ae-8c49-21bd403873de/Tarka_03_Ecology_spread_1.jpg",
    "86cc636b-d5e9-419f-920a-7011dc03d384/Tarka_03_Ecology_spread_2.jpg",
    "4b9b0d9f-0c42-42ed-b47e-76a7152c732c/Tarka_03_Ecology_spread_3.jpg",
    "62c8cd03-8bd2-4864-b516-4c037a081112/Tarka_03_Ecology_spread_4.jpg",
    "1651436461551-X0A07UK0828LD65B2TUU/Tarka_03_Ecology_spread_5.jpg",
    "1651436466728-CFM1KBEDNOT6E12T62A1/Tarka_03_Ecology_spread_6.jpg",
  ].map((p) => sq(p, 1000)),
  4: [
    "fcea650e-7d6f-445b-b321-5ad1dc0ff391/Tarka_04_Death_spread_1.jpg",
    "915bd004-2459-4a35-8ecc-5fc94ca088cd/Tarka_04_Death_spread_2.jpg",
    "652391eb-b5d2-4467-a9ec-5ef335e438aa/Tarka_04_Death_spread_3.jpg",
    "ed6fc74a-5a7a-41cd-8595-b6b13f051664/Tarka_04_Death_spread_4.jpg",
    "115aee13-9908-4d19-8621-5e56e43d1f08/Tarka_04_Death_spread_5.jpg",
  ].map((p) => sq(p, 1000)),
  5: [
    "38533b05-a366-4833-b70c-118395ecf0ca/Tarka_05_QueerDharma_spread_1.jpg",
    "3ffbc0b4-ec42-4eb3-b909-3c0ddc96b0e4/Tarka_05_QueerDharma_spread_2.jpg",
    "2c14768a-3b12-4ee4-991f-c2bac65fed0d/Tarka_05_QueerDharma_spread_3.jpg",
    "e17d6343-323e-4445-9cf3-da913d42dca0/Tarka_05_QueerDharma_spread_5.jpg",
    "c1e5ec33-0441-4781-bec7-e74718511fb4/Tarka_05_QueerDharma_spread_65.jpg",
  ].map((p) => sq(p, 1000)),
  6: [
    "1651104737832-VLC8I70CVS4BH68X1AS2/Tarka_06_SC_spread_1.jpg",
    "1651104737837-TTRYUUSKEOG1MR3UUZAS/Tarka_06_SC_spread_2.jpg",
    "1651104737777-W0L8UWMB0XR9JOEI9VU0/Tarka_06_SC_spread_3.jpg",
    "1651104737857-2T30WGMUUJ8W1V2BLHMO/Tarka_06_SC_spread_4.jpg",
    "1651104737833-ZN0NDMJ5G8VLE9BYO9S0/Tarka_06_SC_spread_5.jpg",
    "1651104737850-3S6Q590JSM76ZFL0H1LZ/Tarka_06_SC_spread_6.jpg",
    "1651104737852-WCKFM9LSM2M23E0U0G7Q/Tarka_06_SC_spread_7.jpg",
  ].map((p) => sq(p, 1000)),
  7: [
    "a13e5dfb-c9b7-494f-b7ad-810c31e9a300/tarka-double.jpg",
    "1679083458013-PS177TG9WB5G85VF3IKT/tarka-web.jpg",
    "1679238708502-CUIRT34JHHXJ1DXG3SX3/tarka-web-2.jpg",
    "1679238690101-MJK3P99CL7BCDVXTM5VZ/tarka-web-3.jpg",
  ].map((p) => sq(p, 1000)),
  8: [
    "1699728253920-Z23DZ0AIPJ7CNANJFH50/Tarka-OnTeaching-Spread-0.jpg",
    "1699728254461-48ZDAZ8C7751K6Z6IVHA/Tarka-OnTeaching-Spread-1.jpg",
    "1699728254288-W3ZGT2EHQBDFD6FV6I9A/Tarka-OnTeaching-Spread-2.jpg",
  ].map((p) => sq(p, 1000)),
  9: [
    "1784837069515-C4CL4WJ8WLBMDLA6SN17/Tarka-09-Power-Wide-Spreads-1.jpg",
    "4bf089e3-2dc6-46a0-b268-67ab29d4ffd7/Tarka-09-Power-Wide-Spreads-2.jpg",
    "1784837162334-2QYUNJ15QNU2TU3NL0X5/Tarka-09-Power-Wide-Spreads-3.jpg",
    "1784836809495-KFR7GN9Q7Q2WYB4PUZIL/Tarka-09-Power-Wide-Spreads-4.jpg",
  ].map((p) => sq(p, 1000)),
};

/** Article art: the spread photo Squarespace used for each article's card. */
export const articleArt = {
  fromArhatToSiddha: sq("1784837069515-C4CL4WJ8WLBMDLA6SN17/Tarka-09-Power-Wide-Spreads-1.jpg", 1000),
  representingPower: sq("1784837162334-2QYUNJ15QNU2TU3NL0X5/Tarka-09-Power-Wide-Spreads-3.jpg", 1000),
  inhabitingPower: sq("1784836809495-KFR7GN9Q7Q2WYB4PUZIL/Tarka-09-Power-Wide-Spreads-4.jpg", 1000),
  // No. 7 article cards on Squarespace (articles not yet imported here):
  aMeditationOnExpandedAwareness: sq("1679083458013-PS177TG9WB5G85VF3IKT/tarka-web.jpg", 1000),
  isTheWestReadyForTantra: sq("1679238708502-CUIRT34JHHXJ1DXG3SX3/tarka-web-2.jpg", 1000),
  tantraAVisualHistory: sq("1679238690101-MJK3P99CL7BCDVXTM5VZ/tarka-web-3.jpg", 1000),
};

/* ---------- Product & promo photography (not yet placed on the new site) ---------- */

/** Stacks of printed copies, 1500×900 — good for print/subscribe promos. */
export const stacks = {
  power: sq("52a01d42-2844-4d39-b1cc-77af2121099a/Tarka-09-Power-Stack.jpg"),
  teaching: sq("1699726772208-BXFWV4NXJ0O89BT0FQD6/Tarka-OnTeaching-Stack.jpg"),
  tantra: sq("412ae12a-9646-434b-b35f-1955b7f58e40/Tarka-stack.jpg"),
  spiritualCitizenship: sq("1651104737781-8RAECI2G4VAABRKFRPVM/Tarka_06_SC_stack.jpg"),
};

export const promo = {
  /** No. 9 cover + spreads composite, 1362×934. */
  powerCoverSpreads: sq("0d254a38-35af-4f62-8059-9e338932203c/Tarka-09-Power-Cover-Spreads-Combo.jpg"),
  /** Tarka on phone / tablet / laptop, 2229×1645, white ground. */
  devices: sq("efb0c876-64e7-4421-8d5f-6737f7f12319/Tarka-Devices.jpg", 2000),
  /** Wide grey site banner, 2500×976. */
  banner: sq("882c8af9-f9f8-4b03-9f01-23d971692169/banner-tarka.png", 2500),
  /** Song of Sādhana homepage hero (notebook on a ledge), 1774×887. */
  songOfSadhanaHero: sq("8092e89a-99bf-4c28-b114-768778aae242/B0C403AD-2ED4-4FDA-AA08-DAF34B3F854D.png", 2000),
  /** Podcast square art, 1200×1200. */
  podcast: sq("1652471010925-SDE935NMBEF0VGJJ4K2E/tarkapodcastart.jpg", 1200),
};

/* ---------- Tarka Editions ---------- */

export const editionCovers = {
  /** Spiral-bound notebook photo, 1429×1100; crop isolates the book. */
  songOfSadhana: {
    src: sq("c698a01e-65d0-4d3b-a650-c691ab2b8ee2/729FB794-B994-4E7D-AA99-DE6FDD1E36C9.png"),
    crop: { x: 472, y: 188, w: 492, h: 708, sourceWidth: 1429, sourceHeight: 1100 } satisfies Crop,
  },
  /** Further Song of Sādhana product shots. */
  songOfSadhanaGallery: [
    sq("615754c3-0032-4370-b9aa-6bb581475398/0CC01209-B362-4B57-BA86-2D9ACB136096.png"),
    sq("30ccedae-9144-4f40-8715-c83eaf69baa9/D46B687D-788F-4513-80A7-FA82ED5D2568.png"),
    sq("9e5acae6-f0f5-4847-a0a9-ac510c226d02/516446C8-2197-4D7C-B97B-A9A66E33DFC7.png"),
  ],
  /** The Sādhaka's Sourcebook (print pre-order on Squarespace), 1514×1039; crop isolates the book. */
  sadhakasSourcebook: {
    src: sq("0e2c5da4-cbac-47fb-acc4-77ff3e7531b2/370824d5-4ccb-464f-89a8-61ecde0ea9b1.png"),
    crop: { x: 482, y: 124, w: 534, h: 810, sourceWidth: 1514, sourceHeight: 1039 } satisfies Crop,
  },
};
