// 8. Services — ten cards; the description slides in on hover (mobile: always visible, see CSS).
// Cards carry data-card so lib/animations.js pops them in per row.
export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <h2 className="heading" data-reveal>services for business growth</h2>
        <p className="subheading" data-reveal>everything you need to grow online, under one roof</p>
        <p className="description" data-reveal>we are a web, ai automation and growth agency. we build your website, put you on google, and automate your enquiries on whatsapp and email — planned as one system, so every part brings you customers.</p>

        <div className="services">
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01" /></svg></span><h3>web development</h3><p>fast business websites, built and maintained</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M12 2v3 M7 7h10v10H7z M10 11h.01 M14 11h.01 M10 14h4 M4 11v3 M20 11v3 M9 20h6" /></svg></span><h3>ai automation</h3><p>ai chatbots, lead follow-up and crm on autopilot</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M4 20l1.4-3.8A8 8 0 1 1 8 18.6z M9 9.5q.5 3.5 5 5" /></svg></span><h3>whatsapp automation</h3><p>auto-replies, broadcasts and reminders on whatsapp</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z M3 7l9 6 9-6" /></svg></span><h3>email marketing</h3><p>newsletters, offers and automatic follow-up emails</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M11 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14z M16 16l5 5" /></svg></span><h3>seo & google maps</h3><p>rank on google, google maps and ai answers</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M6 6h15l-2 9H8z M6 6L5 3H2 M9 20h.01 M18 20h.01" /></svg></span><h3>e-commerce</h3><p>shopify & wordpress stores that sell</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M7 2h10v20H7z M11 18h2" /></svg></span><h3>app development</h3><p>mobile apps, dashboards</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4z" /></svg></span><h3>social media & video</h3><p>posts, reels and promo videos every month</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5z M3 13l9 5 9-5" /></svg></span><h3>digital branding</h3><p>logo, brand kit and a clear, lasting identity</p></article>
          <article className="svc" data-card><span className="svc__icon"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M9 10h.01 M15 10h.01 M8 15q4 3 8 0" /></svg></span><h3>ui / ux</h3><p>figma designs people enjoy using</p></article>
        </div>
      </div>
    </section>
  );
}
