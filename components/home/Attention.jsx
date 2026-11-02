/* ===== 3. Quote =====
   the [data-fill] paragraph is split into words by lib/animations.js and lit up on scroll,
   so keep it as ONE plain text node (no {expressions} inside it) */
export default function Attention() {
  return (
    <section className="section attention" id="intro">
      <div className="container attention__inner">
        <span className="quote-mark" aria-hidden="true">”</span>
        <p className="attention__text" data-fill>
          no website. no visibility. no customers. nothing sells today unless people can find it online. in crowded markets, the business that shows up first — on google, inside ai, on social media — gets the call. a smart, design-driven website makes sure that business is you.
        </p>
        <div className="center" data-reveal><a href="#work" className="btn">let's have a tour!</a></div>
      </div>
    </section>
  );
}
