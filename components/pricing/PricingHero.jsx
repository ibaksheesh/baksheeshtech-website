import { waLink, WA_HELLO } from "@/data/site";

/* ---------- Pricing intro (/pricing/) ----------
   Same layout as the portfolio intro: title words rise in and the [data-fade] items
   fade up (hero timeline in lib/animations.js). */
export default function PricingHero() {
  return (
    <section className="pf-hero">
      <div className="container pf-hero__inner">
        <p className="pf-hero__kicker" data-fade>pricing</p>
        <h1 className="pf-hero__title"><span className="line"><span data-split>simple, fixed pricing.</span></span></h1>
        <p className="pf-hero__text" data-fade>websites from ₹9,999, monthly care from ₹1,499 and small jobs from ₹1,499. you know the full price before we start — and your domain, website and content always belong to you.</p>
        <div className="hero__cta" data-fade>
          <a href="#packages" className="btn">see packages</a>
          <a href={waLink(WA_HELLO)} data-whatsapp="" className="btn btn--white" target="_blank" rel="noopener">ask on whatsapp</a>
        </div>
      </div>
    </section>
  );
}
