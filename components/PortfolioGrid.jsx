import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

/* Portfolio grid (homepage #work and /portfolio) — the React version of tools/build-portfolio.mjs.
   Server component: it runs at build time, so it may check the disk for hover videos. */

const desk = (p) => `/assets/work/${p.img}.jpg`;
const mob = (p) => `/assets/work/m/${p.img}.jpg`;

// hover video (recorded by tools/record-sites.mjs) — only added when the mp4 exists in public/.
// No src on purpose: the page script copies data-src into src on first hover / when on screen.
const video = (p, mobile) => {
  const src = mobile ? `/assets/video/m/${p.img}.mp4` : `/assets/video/${p.img}.mp4`;
  if (!existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), "public", src))) return null;
  return <video className="pf__video" muted loop playsInline preload="none" data-src={src}></video>;
};

// device mock-up for each card: laptop | front (laptop + phone) | combo (tablet + phone) | phone
const scene = (p) => {
  const alt = `${p.name} website`;
  switch (p.scene) {
    case "laptop":
      return (
        <div className="scene scene--laptop"><div className="lap"><div className="lap__screen"><img src={desk(p)} alt={alt} loading="lazy" />{video(p)}</div><div className="lap__base"></div></div></div>
      );
    case "front":
      return (
        <div className="scene scene--front"><div className="lap"><div className="lap__screen"><img src={desk(p)} alt={alt} loading="lazy" />{video(p)}</div><div className="lap__base"></div></div><div className="phone phone--small"><img src={mob(p)} alt="" loading="lazy" /></div></div>
      );
    case "combo":
      return (
        <div className="scene scene--combo"><div className="tab"><div className="tab__screen"><img src={desk(p)} alt={alt} loading="lazy" />{video(p)}</div></div><div className="phone"><img src={mob(p)} alt="" loading="lazy" /></div></div>
      );
    default:
      return (
        <div className="scene scene--phone"><div className="phone phone--big"><div className="phone__screen"><img src={mob(p)} alt={`${alt} on mobile`} loading="lazy" />{video(p, true)}</div></div></div>
      );
  }
};

export default function PortfolioGrid() {
  return (
    <div className="portfolio">
      {PROJECTS.map((p) => (
        <a key={p.url} href={p.url} target="_blank" rel="noopener" className="pf" data-card>
          {scene(p)}
          <span className="pf__tag">{p.tag}</span>
          <span className="pf__name">{p.name}</span>
        </a>
      ))}
      {/* last card: call to action */}
      <Link href="/#contact" className="pf pf--cta" data-card>
        <div className="scene scene--cta"><p>your brand<br /><em>could be next</em></p><span className="btn">start your project</span></div>
        <span className="pf__tag">your project</span>
        <span className="pf__name">let's build it together</span>
      </Link>
    </div>
  );
}
