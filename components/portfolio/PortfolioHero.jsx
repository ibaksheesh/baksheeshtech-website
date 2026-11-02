/* ---------- Portfolio intro (/portfolio/) ----------
   Title words rise in and the [data-fade] items fade up (hero timeline in lib/animations.js). */
export default function PortfolioHero() {
  return (
    <section className="pf-hero">
      <div className="container pf-hero__inner">
        <p className="pf-hero__kicker" data-fade>portfolio</p>
        <h1 className="pf-hero__title"><span className="line"><span data-split>build. design. grow.</span></span></h1>
        <p className="pf-hero__text" data-fade>our portfolio shows our work in web development, web design, apps and seo. each project reflects clear strategy, clean code and a commitment to bringing each business real customers.</p>
        <div data-fade><a href="#projects" className="btn">explore our work</a></div>
      </div>
    </section>
  );
}
