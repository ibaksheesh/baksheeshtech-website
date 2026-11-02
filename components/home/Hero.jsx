/* ===== 1. Hero =====
   background: a tilted "wall" of real project screenshots; columns scroll forever,
   alternating up / down (pure CSS animation, see .wall in globals.css) */

// Each column lists 5 shots — "d/<name>" = desktop screenshot (assets/work/<name>.jpg),
// "m/<name>" = mobile screenshot (assets/work/m/<name>.jpg).
// The track repeats them twice so the CSS loop has no visible seam.
const COLS = [
  { speed: "64s", shots: ["d/gruposineva", "m/autistaai", "d/ndbbuilders", "d/theshadehome", "m/ndbbuilders"] },
  { speed: "78s", down: true, shots: ["m/mypanditji", "d/futureslandcapital", "d/79bogota", "m/sinevabrokerage", "d/sinevabrokerage"] },
  { speed: "70s", shots: ["d/79bogota", "d/gruposineva", "m/79bogota", "d/theshadehome", "m/gruposineva"] },
  { speed: "84s", down: true, shots: ["m/futureslandcapital", "d/ndbbuilders", "d/sinevabrokerage", "m/theshadehome", "d/gruposineva"] },
  { speed: "74s", shots: ["d/sinevabrokerage", "m/autistaai", "d/futureslandcapital", "d/ndbbuilders", "m/mypanditji"] },
  { speed: "88s", down: true, shots: ["d/theshadehome", "m/gruposineva", "d/gruposineva", "m/79bogota", "d/79bogota"] },
  { speed: "68s", shots: ["m/sinevabrokerage", "d/futureslandcapital", "d/sinevabrokerage", "m/futureslandcapital", "d/theshadehome"] },
];

const shot = (s, i) => {
  const [kind, name] = s.split("/");
  return kind === "m" ? (
    <img key={i} className="wall__m" src={`/assets/work/m/${name}.jpg`} alt="" decoding="async" fetchPriority="low" />
  ) : (
    <img key={i} className="wall__d" src={`/assets/work/${name}.jpg`} alt="" decoding="async" fetchPriority="low" />
  );
};

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media" aria-hidden="true">
        <div className="wall">
          {COLS.map((col, c) => (
            <div key={c} className={col.down ? "wall__col wall__col--down" : "wall__col"} style={{ "--speed": col.speed }}>
              <div className="wall__track">{[...col.shots, ...col.shots].map(shot)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__shade" aria-hidden="true"></div>

      <div className="container hero__inner">
        <span className="pill" data-fade><b>web, ai automation & growth</b> agency<span className="pill__more"> · india & abroad</span></span>
        <h1 className="hero__title">
          <span className="line"><span data-split><em>websites</em> that sell,</span><i className="corner" aria-hidden="true"></i></span>{" "}
          <span className="line"><span data-split>built for real <em>growth</em></span></span>
        </h1>
        <p className="hero__sub" data-fade>baksheesh tech builds websites, whatsapp ai bots and google presence that bring local businesses more enquiries — at fixed prices.</p>
        <div className="hero__cta" data-fade>
          <a href="#contact" className="btn">get a free audit</a>
        </div>
      </div>
    </section>
  );
}
