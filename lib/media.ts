/**
 * Tarka's real logo and art, currently served from the Squarespace CDN (tarkajournal.com).
 * Before the Squarespace site is switched off, copy these files to Vercel Blob (or /public)
 * and change the URLs here — every page reads them from this one file.
 */
const SQ = "https://images.squarespace-cdn.com/content/v1/6269d46844c82f0cce6dbac2";
const w = (path: string, width = 1000) => `${SQ}/${path}?format=${width}w`;

export const media = {
  logo: w("568e55d9-848e-4e10-8219-1e5d49e17e51/Tarka-logo.png", 1500),

  covers: {
    power: w("1784741518935-QRITG3QGY6ZHTU3U3BVW/Tarka-09-Power-Wide-Cover.jpg"),
    teaching: w("1699726655062-L31RSBJUGHAUJOW39JQS/Tarka-OnTeaching-Cover.jpg"),
    tantra: w("1679235497096-EYYD5CJQJBU2KG2H8TBG/Tarka_07_Tantra_wide.jpg"),
    citizenship: w("1651104261152-VMBPI0EBO6UUCHRU6BND/Tarka_06_SC_cover.jpg"),
    queer: w("1651103108151-YON6CFJT8VYNPP5DSBOH/Tarka_05_QueerDharma_cover.jpg"),
    death: w("1651103349559-S2Q0VH9UBPTU129VJ6SK/Tarka_04_Death_cover.jpg"),
  },

  spreads: {
    power1: w("1784837069515-C4CL4WJ8WLBMDLA6SN17/Tarka-09-Power-Wide-Spreads-1.jpg"),
    power3: w("1784837162334-2QYUNJ15QNU2TU3NL0X5/Tarka-09-Power-Wide-Spreads-3.jpg"),
    power4: w("1784836809495-KFR7GN9Q7Q2WYB4PUZIL/Tarka-09-Power-Wide-Spreads-4.jpg"),
    citizenship2: w("1651104737837-TTRYUUSKEOG1MR3UUZAS/Tarka_06_SC_spread_2.jpg"),
  },

  editions: {
    songOfSadhana: w("c698a01e-65d0-4d3b-a650-c691ab2b8ee2/729FB794-B994-4E7D-AA99-DE6FDD1E36C9.png"),
  },
};
