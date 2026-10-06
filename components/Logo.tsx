import { logo } from "@/content/art";

/**
 * The Tarka wordmark (real logo artwork from content/art.ts).
 * Size it with the parent's `.wordmark--xl / --m / --s` class; `onDark` inverts it for dark grounds.
 * The parent link carries the accessible name ("Tarka home"), so the image itself is decorative there.
 */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt="Tarka"
      className={`wordmark__img${onDark ? " wordmark__img--on-dark" : ""}`}
    />
  );
}
