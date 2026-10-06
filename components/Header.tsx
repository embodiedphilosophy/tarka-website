"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, site } from "@/lib/site";

/** Full masthead on the homepage; compact bar everywhere else. Print page uses its own dark header. */
export default function Header() {
  const pathname = usePathname();
  if (pathname === "/print") return null;
  const isHome = pathname === "/";

  const nav = (
    <nav aria-label="Main" className="main-nav">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
      <Link href="/subscribe" className="btn btn--primary">
        Subscribe
      </Link>
    </nav>
  );

  if (isHome) {
    return (
      <header className="site-header">
        <div className="container site-header__top">
          <span className="site-header__tagline">{site.tagline}</span>
          <div className="site-header__util">
            <Link href="/search">Search</Link>
            <Link href="/newsletter">Newsletter</Link>
          </div>
        </div>
        <div className="container site-header__main">
          <Link href="/" className="wordmark wordmark--xl" aria-label="Tarka home">
            TARKA
          </Link>
          {nav}
        </div>
      </header>
    );
  }

  return (
    <header className="site-header site-header--compact">
      <div className="container site-header__main">
        <Link href="/" className="wordmark wordmark--m" aria-label="Tarka home">
          TARKA
        </Link>
        {nav}
      </div>
    </header>
  );
}
