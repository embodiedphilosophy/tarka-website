import { media } from "@/lib/media";

/** The Tarka logo (from the current Squarespace site). `light` inverts it for dark backgrounds. */
export default function Logo({ height = 40, light = false }: { height?: number; light?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.logo}
      alt="Tarka"
      width={Math.round(height * (1440 / 354))}
      height={height}
      className="logo"
      style={{ height, width: "auto", maxWidth: "100%", objectFit: "contain", alignSelf: "flex-start", flex: "none", display: "block", filter: light ? "invert(1)" : undefined }}
    />
  );
}
