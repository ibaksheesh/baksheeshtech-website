import { waLink } from "@/data/site";
import { PACKAGES, CARE, OFFERS, BUNDLE } from "@/data/packages";

// /pricing/ — website packages, monthly care plans, the launch bundle and small
// fixed-price jobs (all from data/packages.js). Each button opens WhatsApp with the plan named.
const ask = (name, price) => waLink(`Hi Baksheesh Tech, I'm interested in the ${name} (${price}). Please share the details.`);
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const separately = BUNDLE.parts.reduce((sum, [, n]) => sum + n, 0);

export default function Packages() {
  return (
    <section className="section" id="packages">
      <div className="container">
        <h2 className="heading" data-reveal>website packages</h2>
        <p className="subheading" data-reveal>one-time price, live in 7–30 working days</p>
        <p className="description" data-reveal>pick a website, keep it running with a care plan, or start small with a quick job.</p>

        <div className="plans">
          {PACKAGES.map((p) => (
            <article className={p.featured ? "plan plan--featured" : "plan"} data-card key={p.name}>
              {p.featured && <span className="plan__badge">most popular</span>}
              <h3 className="plan__name">{p.name}</h3>
              <p className="plan__for">for {p.for}</p>
              <p className="plan__price">{p.from && <small>from </small>}{p.price}</p>
              <p className="plan__note">{p.note} · {p.time}</p>
              <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href={ask(p.name, p.price)} data-whatsapp="" className={p.featured ? "btn" : "btn btn--white"} target="_blank" rel="noopener">get started</a>
            </article>
          ))}
        </div>

        <h3 className="plans__title" data-reveal>care plans <em>after launch</em></h3>
        <p className="plans__sub" data-reveal>a website left alone goes out of date. we keep it safe, updated and active on google, every month.</p>
        <div className="plans plans--care">
          {CARE.map((c) => (
            <article className={c.featured ? "plan plan--care plan--featured" : "plan plan--care"} data-card key={c.name}>
              {c.featured && <span className="plan__badge">most popular</span>}
              <h3 className="plan__name">{c.name}</h3>
              <p className="plan__price">{c.price}<small>/month</small></p>
              <p className="plan__note">{c.prepaid}</p>
              <ul className="ticks">{c.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href={ask(c.name, `${c.price}/month`)} data-whatsapp="" className="plan__link" target="_blank" rel="noopener">choose {c.name.toLowerCase()} →</a>
            </article>
          ))}
        </div>

        <div className="bundle" data-reveal>
          <div>
            <p className="bundle__kicker">launch bundle</p>
            <p className="bundle__text">starter website + google business profile + 6 months of care growth</p>
            <p className="bundle__math">separately: {BUNDLE.parts.map(([label, n]) => `${label} ${inr(n)}`).join(" + ")} = {inr(separately)}</p>
          </div>
          <p className="bundle__price"><s>{inr(separately)}</s> {inr(BUNDLE.price)}</p>
          <a href={ask("Launch Bundle", inr(BUNDLE.price))} data-whatsapp="" className="btn" target="_blank" rel="noopener">get the bundle</a>
        </div>

        <h3 className="plans__title" data-reveal>quick start <em>jobs</em></h3>
        <p className="plans__sub" data-reveal>not ready for a full website? start with one small fixed-price job.</p>
        <ul className="offers">
          {OFFERS.map((o) => (
            <li className="offer" data-card key={o.name}>
              <a href={ask(o.name, o.price)} data-whatsapp="" target="_blank" rel="noopener">
                <span className="offer__name">{o.name}</span>
                <span className="offer__price">{o.price}{o.extra && <small> {o.extra}</small>}</span>
                <span className="offer__text">{o.text}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="plans__fine" data-reveal>gst extra if applicable. domain, hosting without a care plan, app fees and ad spend are billed at actual cost. no honest agency can guarantee google rankings — on care growth and care pro we report the real calls, whatsapp clicks and direction requests every month.</p>
      </div>
    </section>
  );
}
