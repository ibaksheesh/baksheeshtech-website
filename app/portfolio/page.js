import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import FigmaDesigns from "@/components/portfolio/FigmaDesigns";
import Reviews from "@/components/Reviews";
import Cta from "@/components/Cta";
import PageAnimations from "@/components/PageAnimations";
import { pageMetadata, portfolioJsonLd, ldJson } from "@/lib/seo";

// <head> values from the old portfolio.html
export const metadata = pageMetadata({
  title: "Portfolio — Baksheesh Tech",
  description: "Websites and apps built by Baksheesh Tech for real businesses — AI products, real estate, construction, brokerage and luxury stays.",
  path: "/portfolio/",
  shareDescription: "Live websites and apps for real businesses — AI products, real estate, construction, brokerage and luxury stays.",
});

// /portfolio/ — same layout as the old portfolio.html
export default function PortfolioPage() {
  return (
    <>
      {/* structured data: every project + figma file as a list of creative works */}
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(portfolioJsonLd())} />

      <main id="top" className="page-portfolio">
        <PortfolioHero />

        <section className="section pf-page" id="projects">
          <div className="container">
            <h2 className="visually-hidden">projects</h2>
            <PortfolioGrid />
          </div>
        </section>

        <FigmaDesigns />
        <Reviews />
        <Cta
          kicker="like what you see?"
          title={<>let's build <em className="grad">your website</em> next — free audit first.</>}
          href="/#contact"
          label="get a quote"
        />
        {/* scroll animations for this page (cleaned up on navigation) */}
        <PageAnimations />
      </main>
    </>
  );
}
