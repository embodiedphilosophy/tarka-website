import type { NextConfig } from "next";
import legacyRedirects from "./content/redirects.json";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob (like EP's ep-media store) for covers and Tarka art
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Current Tarka art on Squarespace's CDN (content/art.ts) — remove once localized
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      // Substack-hosted images (podcast artwork)
      { protocol: "https", hostname: "substackcdn.com" },
    ],
  },
  async redirects() {
    // Old Squarespace URLs → new addresses. Add every old URL to content/redirects.json before DNS cutover.
    return (legacyRedirects as { source: string; destination: string }[]).map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
