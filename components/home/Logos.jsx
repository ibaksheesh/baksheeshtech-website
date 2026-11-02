/* ===== 2. Tool logos strip =====
   the list is written twice so the CSS marquee (.logos__track) loops seamlessly */
export default function Logos() {
  return (
    <section className="logos" aria-label="Tools and platforms">
      <div className="logos__track">
        <span className="logo-mark">React</span><span className="logo-mark logo-mark--serif">WordPress</span><span className="logo-mark">Shopify</span>
        <span className="logo-mark logo-mark--light">Figma</span><span className="logo-mark">ANGULAR</span><span className="logo-mark logo-mark--light">Google SEO</span>
        <span className="logo-mark">Photoshop</span><span className="logo-mark logo-mark--serif">Illustrator</span>
        <span className="logo-mark">React</span><span className="logo-mark logo-mark--serif">WordPress</span><span className="logo-mark">Shopify</span>
        <span className="logo-mark logo-mark--light">Figma</span><span className="logo-mark">ANGULAR</span><span className="logo-mark logo-mark--light">Google SEO</span>
        <span className="logo-mark">Photoshop</span><span className="logo-mark logo-mark--serif">Illustrator</span>
      </div>
    </section>
  );
}
