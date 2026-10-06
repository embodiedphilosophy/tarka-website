import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__about">
          <span className="wordmark" style={{ fontSize: 28, color: "var(--ink)" }}>TARKA</span>
          <span>{site.description}</span>
          <span className="small">© {new Date().getFullYear()} Embodied Philosophy</span>
        </div>
        <nav aria-label="Footer" className="site-footer__nav">
          {footerNav.map((item) =>
            item.href.startsWith("/") ? (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ) : (
              <a key={item.href} href={item.href}>{item.label}</a>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}
