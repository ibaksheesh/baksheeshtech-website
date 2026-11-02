import Link from "next/link";

/* CTA banner (homepage after #work, and at the end of /portfolio).
   title may contain JSX, e.g. <>one partner for <em className="grad">your growth</em> …</> */
export default function Cta({ kicker, title, href, label }) {
  // same-page anchors and mailto/external links stay plain <a> (the site shell smooth-scrolls anchors);
  // other pages on the site go through next/link
  const button = !href.startsWith("/") ? (
    <a href={href} className="btn btn--white">{label}</a>
  ) : (
    <Link href={href} className="btn btn--white">{label}</Link>
  );

  return (
    <section className="container cta-wrap">
      <div className="cta" data-reveal>
        <div>
          <p className="cta__kicker">{kicker}</p>
          <h2 className="cta__title">{title}</h2>
        </div>
        {button}
      </div>
    </section>
  );
}
