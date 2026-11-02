import Link from "next/link";
import { SITE, waLink, WA_HELLO } from "@/data/site";

/* Site chrome above the page: custom cursor, grid lines, header and the
   off-canvas menu. Static markup only — open/close, hide-on-scroll and the
   cursor are driven by components/layout/SiteEffects.jsx. */
export default function Header() {
  return (
    <>
      {/* custom cursor */}
      <div className="cursor is-hidden" id="cursor" aria-hidden="true"><span className="cursor__dot"></span><span className="cursor__ring"></span></div>

      {/* vertical column lines with travelling blue light */}
      <div className="gridlines" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      {/* ===== Header ===== */}
      <header className="header" id="header">
        <div className="container header__inner">
          <Link href="/" className="logo" aria-label="Baksheesh Tech home">baksheesh<span>tech</span><i>.</i></Link>
          <button className="menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ===== Off-canvas menu (cream panel) ===== */}
      <div className="menu" id="menu" aria-hidden="true">
        <div className="menu__panel">
          <button className="menu__close" id="menu-close" aria-label="Close menu">×</button>
          <nav className="menu__nav" aria-label="Main">
            <Link href="/">home</Link>
            <Link href="/#services">services</Link>
            <Link href="/#automation">ai automation</Link>
            <Link href="/pricing/">pricing</Link>
            <Link href="/portfolio/">portfolio</Link>
            <Link href="/#about">about</Link>
            <Link href="/#contact">get a quote</Link>
          </nav>
          <div className="menu__foot">
            <p>let's talk</p>
            <a href={waLink(WA_HELLO)} data-whatsapp="" target="_blank" rel="noopener">whatsapp</a>
            <a href={`mailto:${SITE.email}`} data-email=""><span data-email-text="">{SITE.email}</span></a>
          </div>
        </div>
        <div className="menu__backdrop" id="menu-backdrop"></div>
      </div>
    </>
  );
}
