import { FIGMA } from "@/data/figma";

/* ---------- UI / UX designs in Figma (/portfolio/) ----------
   Cards come from data/figma.js; each opens the original (public) Figma file in a new tab. */

// Figma logo, shown in front of each card's tag
function FigmaLogo() {
  return (
    <svg viewBox="0 0 38 57" aria-hidden="true"><path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0a9.5 9.5 0 0 1-19 0z" /><path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" /><path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19z" /><path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" /><path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" /></svg>
  );
}

export default function FigmaDesigns() {
  return (
    <section className="section figma" id="designs">
      <div className="container">
        <div className="center-text">
          <h2 className="heading" data-reveal>ui / ux designs</h2>
          <p className="subheading" data-reveal>open the original figma files</p>
          <p className="description description--center" data-reveal>for ui / ux work we plan the screens in figma first — layouts, user flows and components — so the design is clear and approved before development starts.</p>
        </div>
        <div className="figma__grid">
          {FIGMA.map((d) => (
            <a key={d.url} href={d.url} target="_blank" rel="noopener" className="fg" data-card>
              <div className="fg__media"><img src={d.img} alt={d.alt} width={d.w} height={d.h} loading="lazy" /></div>
              <div className="fg__body">
                <span className="fg__tag"><FigmaLogo />{d.tag}</span>
                <h3 className="fg__name">{d.name}</h3>
                <p className="fg__text">{d.text}</p>
                <span className="fg__link">open in figma <span aria-hidden="true">↗</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
