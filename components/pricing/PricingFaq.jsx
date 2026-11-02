import { FAQ } from "@/data/packages";

// Pricing questions (data/packages.js) — plain <details>, so it opens and closes without JS.
export default function PricingFaq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <h2 className="heading" data-reveal>common questions</h2>
        <p className="subheading" data-reveal>payments, ownership and care plans</p>

        <div className="faq" data-reveal>
          {FAQ.map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
