import type { ArtKey } from "@/lib/types";

/**
 * Drawn yantra-style covers and article art — stand-ins until real Tarka art is uploaded.
 * Each issue/article picks an ArtKey; an `image` URL on the content overrides these.
 */
type Palette = { bg: string; fg: string; accent: string; motif: "yantra" | "arch" | "circles" | "split" | "horizon" | "lotus" };

export const palettes: Record<ArtKey, Palette> = {
  madder: { bg: "#9C3B22", fg: "#F4EBDD", accent: "#D9A441", motif: "arch" },
  indigo: { bg: "#2E3F7F", fg: "#F4EBDD", accent: "#C9A24A", motif: "yantra" },
  teaching: { bg: "#E7DFCC", fg: "#1B1A17", accent: "#2E6B5E", motif: "circles" },
  tantra: { bg: "#1B1A17", fg: "#E9DFC9", accent: "#9C3B22", motif: "yantra" },
  citizenship: { bg: "#3E6B5A", fg: "#F4EBDD", accent: "#E3C27A", motif: "lotus" },
  queer: { bg: "#6E4A7E", fg: "#F7EFE3", accent: "#E8A87C", motif: "circles" },
  death: { bg: "#D9D2C3", fg: "#1B1A17", accent: "#4A463E", motif: "horizon" },
  gold: { bg: "#D9A441", fg: "#1B1A17", accent: "#9C3B22", motif: "arch" },
  split: { bg: "#1B1A17", fg: "#E9DFC9", accent: "#9C3B22", motif: "split" },
  green: { bg: "#3E6B5A", fg: "#F4EBDD", accent: "#E3C27A", motif: "yantra" },
};

function Motif({ p, cx, cy, s }: { p: Palette; cx: number; cy: number; s: number }) {
  switch (p.motif) {
    case "yantra":
      return (
        <g>
          <circle cx={cx} cy={cy} r={s} fill="none" stroke={p.fg} strokeWidth={3} />
          <polygon points={`${cx},${cy - s * 0.92} ${cx + s * 0.88},${cy + s * 0.5} ${cx - s * 0.88},${cy + s * 0.5}`} fill={p.accent} />
          <polygon points={`${cx},${cy + s * 0.92} ${cx + s * 0.88},${cy - s * 0.5} ${cx - s * 0.88},${cy - s * 0.5}`} fill="none" stroke={p.fg} strokeWidth={3} />
          <circle cx={cx} cy={cy} r={s * 0.09} fill={p.fg} />
        </g>
      );
    case "arch":
      return (
        <g>
          <circle cx={cx} cy={cy} r={s * 0.96} fill={p.accent} />
          <rect x={cx - s * 0.46} y={cy - s * 0.8} width={s * 0.92} height={s * 1.6} rx={s * 0.46} fill={p.fg} />
          <circle cx={cx} cy={cy - s * 0.3} r={s * 0.09} fill="#1B1A17" />
        </g>
      );
    case "circles":
      return (
        <g>
          <circle cx={cx - s * 0.32} cy={cy} r={s * 0.7} fill={p.accent} />
          <circle cx={cx + s * 0.32} cy={cy} r={s * 0.7} fill="none" stroke={p.fg} strokeWidth={3} />
          <circle cx={cx} cy={cy} r={s * 0.09} fill={p.fg} />
        </g>
      );
    case "lotus":
      return (
        <g>
          <circle cx={cx} cy={cy} r={s * 0.96} fill="none" stroke={p.fg} strokeWidth={3} />
          <polygon points={`${cx},${cy - s * 0.88} ${cx + s * 0.84},${cy + s * 0.5} ${cx - s * 0.84},${cy + s * 0.5}`} fill={p.accent} />
          <circle cx={cx} cy={cy} r={s * 0.09} fill={p.fg} />
        </g>
      );
    case "horizon":
      return (
        <g>
          <path d={`M${cx - s * 0.9} ${cy + s * 0.7} A${s * 0.9} ${s * 0.9} 0 0 1 ${cx + s * 0.9} ${cy + s * 0.7} Z`} fill={p.accent} />
          <line x1={cx - s * 1.1} y1={cy + s * 0.7} x2={cx + s * 1.1} y2={cy + s * 0.7} stroke={p.fg} strokeWidth={3} />
          <circle cx={cx} cy={cy - s * 0.6} r={s * 0.09} fill={p.fg} />
        </g>
      );
    case "split":
      return (
        <g>
          <path d={`M${cx} ${cy - s * 0.7} A${s * 0.7} ${s * 0.7} 0 0 0 ${cx} ${cy + s * 0.7} Z`} fill="#E9DFC9" />
          <path d={`M${cx} ${cy - s * 0.7} A${s * 0.7} ${s * 0.7} 0 0 1 ${cx} ${cy + s * 0.7} Z`} fill={p.accent} />
          <circle cx={cx} cy={cy} r={s * 0.08} fill="#D9A441" />
        </g>
      );
  }
}

/** Issue cover, 3:4. */
export function Cover({
  art,
  title,
  number,
  image,
  className = "cover",
}: {
  art: ArtKey;
  title: string;
  number?: number;
  image?: string;
  className?: string;
}) {
  const label = `Cover of ${number != null ? `No. ${number}, ` : ""}${title}`;
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={label} className={className} style={{ aspectRatio: "3 / 4", objectFit: "cover", display: "block" }} />;
  }
  const p = palettes[art];
  const long = title.length > 18;
  const words = title.split(" ");
  const half = Math.ceil(words.length / 2);
  return (
    <svg viewBox="0 0 300 400" role="img" aria-label={label} className={className}>
      <rect width="300" height="400" fill={p.bg} />
      {p.motif === "split" && <rect x="150" width="150" height="400" fill="#E9DFC9" />}
      <Motif p={p} cx={150} cy={200} s={100} />
      <text x="26" y="48" fontFamily="var(--font-newsreader), serif" fontSize="24" letterSpacing="7" fill={p.fg}>TARKA</text>
      {number != null && (
        <text x="274" y="48" textAnchor="end" fontFamily="var(--font-plex-mono), monospace" fontSize="14" fill={p.fg}>No. {number}</text>
      )}
      {long ? (
        <>
          <text x="26" y="356" fontFamily="var(--font-newsreader), serif" fontStyle="italic" fontSize="22" fill={p.fg}>{words.slice(0, half).join(" ")}</text>
          <text x="26" y="382" fontFamily="var(--font-newsreader), serif" fontStyle="italic" fontSize="22" fill={p.fg}>{words.slice(half).join(" ")}</text>
        </>
      ) : (
        <text x="26" y="370" fontFamily="var(--font-newsreader), serif" fontStyle="italic" fontSize="26" fill={p.fg}>{title}</text>
      )}
    </svg>
  );
}

/** Article artwork, 3:2 (or wider via viewBox). */
export function ArticleArt({ art, title, image, wide = false }: { art: ArtKey; title: string; image?: string; wide?: boolean }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" style={{ width: "100%", aspectRatio: wide ? "640 / 420" : "3 / 2", objectFit: "cover", display: "block" }} />;
  }
  const p = palettes[art];
  const w = wide ? 640 : 300;
  const h = wide ? 420 : 200;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Artwork for ${title}`} preserveAspectRatio="xMidYMid slice">
      <rect width={w} height={h} fill={p.bg} />
      {p.motif === "split" && <rect x={w / 2} width={w / 2} height={h} fill="#E9DFC9" />}
      <Motif p={p} cx={wide ? w * 0.62 : w / 2} cy={h / 2} s={h * 0.36} />
      {wide && <line x1="0" y1={h * 0.8} x2={w} y2={h * 0.8} stroke={p.fg} strokeWidth={2} />}
    </svg>
  );
}

/** Book cover for Tarka Editions, 2:3. */
export function EditionCover({ art, title, image }: { art: ArtKey; title: string; image?: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt={`Cover of ${title}`}
        className="cover"
        style={{ aspectRatio: "2 / 3", objectFit: "contain", background: "#E9DFC9", width: "100%" }}
      />
    );
  }
  const p = palettes[art];
  return (
    <svg viewBox="0 0 200 300" role="img" aria-label={`Cover of ${title}`} className="cover">
      <rect width="200" height="300" fill="#E9DFC9" />
      <rect x="14" y="14" width="172" height="272" fill="none" stroke={p.accent} strokeWidth="2" />
      <circle cx="100" cy="140" r="44" fill={p.accent} />
      <circle cx="100" cy="140" r="20" fill="#E9DFC9" />
      {title.length > 16 ? (
        <>
          <text x="100" y="232" textAnchor="middle" fontFamily="var(--font-newsreader), serif" fontStyle="italic" fontSize="18" fill="#1B1A17">{title.split(" ").slice(0, Math.ceil(title.split(" ").length / 2)).join(" ")}</text>
          <text x="100" y="256" textAnchor="middle" fontFamily="var(--font-newsreader), serif" fontStyle="italic" fontSize="18" fill="#1B1A17">{title.split(" ").slice(Math.ceil(title.split(" ").length / 2)).join(" ")}</text>
        </>
      ) : (
        <text x="100" y="244" textAnchor="middle" fontFamily="var(--font-newsreader), serif" fontStyle="italic" fontSize="19" fill="#1B1A17">{title}</text>
      )}
    </svg>
  );
}
