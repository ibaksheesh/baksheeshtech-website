/* ===== 5. Blue scrolling band =====
   #band is moved sideways and skewed with scroll by lib/animations.js */
export default function Band() {
  return (
    <section className="band" aria-label="Services">
      <div className="band__track" id="band">
        <span>web development</span><i className="corner corner--yellow" aria-hidden="true"></i>
        <span>seo & ai ranking</span><i className="corner" aria-hidden="true"></i>
        <span>digital branding</span><i className="corner corner--yellow" aria-hidden="true"></i>
        <span>social media</span><i className="corner" aria-hidden="true"></i>
        <span>app development</span><i className="corner" aria-hidden="true"></i>
        <span>ui / ux</span><i className="corner corner--yellow" aria-hidden="true"></i>
        <span>e-commerce</span><i className="corner" aria-hidden="true"></i>
        <span>ai automation</span><i className="corner corner--yellow" aria-hidden="true"></i>
        <span>whatsapp automation</span><i className="corner" aria-hidden="true"></i>
        <span>email marketing</span><i className="corner corner--yellow" aria-hidden="true"></i>
      </div>
    </section>
  );
}
