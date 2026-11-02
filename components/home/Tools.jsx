/* ===== 4. Tools grid ===== */
export default function Tools() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading" data-reveal>built with the right tools</h2>
        <p className="subheading" data-reveal>quality first, never shortcuts!</p>
        <p className="description" data-reveal>five years across software companies, branding agencies and growing businesses taught us that the right tools, in the right hands, ship faster and sell better.</p>

        <ul className="tiles">
          <li data-tile>React</li><li data-tile>Angular</li><li data-tile>JavaScript</li><li data-tile>HTML5</li><li data-tile>SCSS</li>
          <li data-tile>Bootstrap</li><li data-tile>jQuery</li><li data-tile>WordPress</li><li data-tile>Shopify</li><li data-tile>Git</li>
          <li data-tile>Figma</li><li data-tile>Photoshop</li><li data-tile>Illustrator</li><li data-tile>Canva</li><li data-tile>Google SEO</li>
        </ul>
        <div className="center" data-reveal><a href="#services" className="btn">view all services</a></div>
      </div>
    </section>
  );
}
