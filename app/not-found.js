import Link from "next/link";
import PageAnimations from "@/components/PageAnimations";

// 404 page (static export writes it to out/404.html; hosts serve it for unknown URLs)
export const metadata = {
  title: { absolute: "Page not found — Baksheesh Tech" },
  robots: { index: false, follow: true }, // overrides the site-wide "index" for this page
};

// reuses the portfolio intro styles + animation (.pf-hero), so no extra CSS is needed
export default function NotFound() {
  return (
    <main id="top">
      <section className="pf-hero">
        <div className="container pf-hero__inner">
          <p className="pf-hero__kicker" data-fade>404</p>
          <h1 className="pf-hero__title"><span className="line"><span data-split>page not found.</span></span></h1>
          <p className="pf-hero__text" data-fade>this page doesn't exist or has moved. let's get you back on track.</p>
          <div data-fade><Link href="/" className="btn">back to home</Link></div>
        </div>
      </section>
      <PageAnimations />
    </main>
  );
}
