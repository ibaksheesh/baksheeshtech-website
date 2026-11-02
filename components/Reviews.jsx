import fs from "node:fs";
import path from "node:path";
import data from "@/data/reviews.json";

/* ---------- Client reviews (from data/reviews.json) ----------
   Rendered at build time (server component), same rules as the old tools/build-reviews.mjs:
   only reviews marked "approved": true (the client agreed to be quoted) are published, and
   with no approved reviews the section is left out completely — never an empty block. */

const PUBLIC_DIR = path.join(process.cwd(), "public");

const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toLowerCase();

// stars only when the client actually gave a 1-5 rating — never invent one (missing/invalid = no stars row)
function Stars({ value }) {
  const v = Number(value);
  if (value === "" || value == null || !Number.isFinite(v) || v < 1 || v > 5) return null;
  const k = Math.floor(v);
  return (
    <p className="rv__stars"><span className="visually-hidden">{`rated ${k} out of 5`}</span><span aria-hidden="true">{"★".repeat(k)}<i>{"★".repeat(5 - k)}</i></span></p>
  );
}

// "assets/reviews/x.jpg" or "/assets/reviews/x.jpg" -> "/assets/reviews/x.jpg", but only if that file is in public/
function photoSrc(photo) {
  if (typeof photo !== "string" || !photo.trim()) return null;
  const rel = photo.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  const abs = path.join(PUBLIC_DIR, rel);
  if (!abs.startsWith(PUBLIC_DIR + path.sep)) return null; // stay inside public/
  return fs.statSync(abs, { throwIfNoEntry: false })?.isFile() ? `/${rel}` : null;
}

// client photo if the file exists, otherwise their initials on a blue circle
function Avatar({ review }) {
  const src = photoSrc(review.photo);
  return src
    ? <span className="rv__avatar"><img src={src} alt="" width="52" height="52" loading="lazy" /></span>
    : <span className="rv__avatar" aria-hidden="true">{initials(String(review.name))}</span>;
}

function Review({ review: r }) {
  const who = [r.role, r.company].filter(Boolean).join(" · ");
  const project = String(r.project || "").trim();
  return (
    <figure className="rv" data-card>
      <Stars value={r.stars} />
      <blockquote className="rv__quote"><p>{String(r.text)}</p></blockquote>
      <figcaption className="rv__by">
        <Avatar review={r} />
        <span className="rv__who"><strong className="rv__name">{String(r.name)}</strong>{who ? <span className="rv__role">{who}</span> : null}{/^https?:\/\//i.test(project) ? <a className="rv__project" href={project} target="_blank" rel="noopener">view project ↗</a> : null}</span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const live = (data.reviews || []).filter((r) => r && r.approved === true && r.name && r.text);
  if (!live.length) return null;

  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="center-text">
          <h2 className="heading" data-reveal>client reviews</h2>
          <p className="subheading" data-reveal>what clients say about working together</p>
        </div>
        <div className="reviews__grid">
          {live.map((r, i) => <Review key={i} review={r} />)}
        </div>
      </div>
    </section>
  );
}
