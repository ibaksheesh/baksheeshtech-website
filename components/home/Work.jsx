import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";

/* ===== 6. Portfolio ===== */
export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="center-text">
          <h2 className="heading" data-reveal>portfolio</h2>
          <p className="subheading" data-reveal>crafting websites and apps that bring real customers</p>
          <p className="description description--center" data-reveal>each project shows how a clear goal, clean design and solid code come together for a real business — from ai products to builders, brokers and luxury stays.</p>
        </div>

        {/* project cards come from data/projects.js */}
        <PortfolioGrid />

        <div className="center" data-reveal><Link href="/portfolio/" className="btn">view portfolio</Link></div>
      </div>
    </section>
  );
}
