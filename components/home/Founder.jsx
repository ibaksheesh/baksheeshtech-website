// 10. Founder — photo, bio and stats.
// The stats are rendered with their real numbers so search engines and no-JS visitors see them;
// lib/animations.js resets each [data-count] to 0 and counts up when it scrolls into view.
export default function Founder() {
  return (
    <section className="section founder" id="about">
      <div className="container">
        <div className="founder__card" data-reveal>
          <span className="founder__pattern" aria-hidden="true"></span>
          <div className="founder__photo">
            {/* photo: public/assets/baksheesh.jpg (the "bb" placeholder only shows if the img is removed — see .founder__img + .founder__placeholder in CSS) */}
            <img src="/assets/baksheesh.jpg" alt="Baksheesh Bhardwaj, web developer and designer" className="founder__img" width="720" height="720" loading="lazy" />
            <div className="founder__placeholder">bb</div>
          </div>
          <div className="founder__text">
            <h2 className="founder__name">Baksheesh Bhardwaj</h2>
            <p className="founder__role">founder & lead developer · baksheesh tech</p>
            <p className="founder__bio">baksheesh started baksheesh tech after building websites since 2020 for software companies, branding agencies and businesses in india and abroad. every project is planned as one connected system — website, app, seo, design, video and ai automation — and you always talk directly to the founder, never a middle-man.</p>
            <ul className="founder__stats">
              <li><strong><span data-count="100">100</span><sup>+</sup></strong><span>projects delivered</span></li>
              <li><strong><span data-count="5">5</span><sup>+</sup></strong><span>years of experience</span></li>
              <li><strong><span data-count="5">5</span></strong><span>companies</span></li>
              <li><strong><span data-count="24">24</span><sup>h</sup></strong><span>reply time</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
