import { Fira_Sans } from "next/font/google";
import Cta from "@/components/Cta";
import ShareResume from "@/components/ShareResume";
import PageAnimations from "@/components/PageAnimations";
import { RESUME } from "@/data/resume";
import { waLink } from "@/data/site";
import { pageMetadata, ldJson, abs } from "@/lib/seo";

// the CV sheet uses its own clean sans (like a printed resume); the rest of the site keeps Jost
const fira = Fira_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-cv" });

export const metadata = pageMetadata({
  title: "Resume — Baksheesh Bhardwaj, Web & App Developer",
  description: "Resume of Baksheesh Bhardwaj: web and app developer with 5+ years in React, Next.js, WordPress, Shopify, mobile apps, Canva video and AI automation.",
  path: "/resume/",
  shareDescription: "Web & app developer with 5+ years in React, Next.js, WordPress, Shopify, mobile apps and AI automation.",
});

const c = RESUME.contacts;
const SHARE = { url: abs("/resume/"), title: "Baksheesh Bhardwaj — Web & App Developer", text: "Resume of Baksheesh Bhardwaj, web & app developer:" };

// structured data: a profile page about the person, so search engines read it as a resume
const resumeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: abs("/resume/"),
  mainEntity: {
    "@type": "Person",
    "@id": abs("/#person"),
    name: RESUME.name,
    jobTitle: RESUME.title,
    image: abs("/assets/baksheesh.jpg"),
    url: abs("/"),
    email: `mailto:${c.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressCountry: "IN" },
    knowsAbout: [...RESUME.technical, ...RESUME.creative],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Himachal Pradesh University" },
  },
};

const Icon = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;
const PIN = "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z";
const MAIL = "M3 5h18v14H3z M3 6l9 7 9-7";
const PHONE = "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z";
const GLOBE = "M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20z M2 12h20 M12 2c3 3 3 17 0 20 M12 2c-3 3-3 17 0 20";

// one row of the sheet: label in the dark sidebar, content on the white side
const Row = ({ label, children, className = "" }) => (
  <section className={`cv-row ${className}`}>
    <h2 className="cv-label">{label}</h2>
    <div className="cv-body">{children}</div>
  </section>
);

const Bullets = ({ items }) => <ul className="cv-bullets">{items.map((x) => <li key={x}>{x}</li>)}</ul>;

export default function ResumePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(resumeJsonLd)} />

      <main id="top" className={`page-resume ${fira.variable}`}>
        {/* intro: photo, name and quick facts (words rise in, like the portfolio hero) */}
        <section className="pf-hero cv-hero">
          <div className="container pf-hero__inner">
            <img className="cv-hero__photo" src="/assets/baksheesh.jpg" alt={RESUME.name} width="148" height="148" data-fade />
            <p className="pf-hero__kicker" data-fade>resume</p>
            <h1 className="pf-hero__title"><span className="line"><span data-split>{RESUME.name.toLowerCase()}</span></span></h1>
            <p className="pf-hero__text" data-fade>web & app developer and designer. 5+ years of websites, apps, video and ai automation for businesses in india and abroad.</p>
            <ul className="cv-hero__facts" data-fade>
              {RESUME.facts.map((f) => <li key={f.label}><strong>{f.value}</strong><span>{f.label}</span></li>)}
            </ul>
            <div className="cv-hero__actions" data-fade>
              <ShareResume {...SHARE} />
              <a href={waLink("Hi Baksheesh, I saw your resume and would like to talk about a role.")} className="btn btn--white" target="_blank" rel="noopener">whatsapp me</a>
            </div>
          </div>
        </section>

        {/* the CV itself: the same sheet the PDF is printed from */}
        <section className="cv-wrap" aria-label="Resume">
          <article className="cv" data-reveal>
            <Row label="Summary" className="cv-row--head">
              <p className="cv-name">{RESUME.name}</p>
              <p className="cv-title">{RESUME.title}</p>
            </Row>

            <Row label="Contacts">
              <ul className="cv-contacts">
                <li><Icon d={PIN} />{c.location}</li>
                <li><Icon d={MAIL} /><a href={`mailto:${c.email}`}>{c.email}</a></li>
                <li><Icon d={PHONE} /><a href={`tel:${c.phoneHref}`}>{c.phone}</a></li>
                <li><Icon d={GLOBE} /><a href={`https://${c.website}/`}>{c.website}</a></li>
              </ul>
            </Row>

            <Row label="Profile">
              <p className="cv-text cv-text--justify">{RESUME.profile}</p>
            </Row>

            <Row label="Employment">
              {RESUME.employment.map((j) => (
                <div className="cv-item" key={j.company}>
                  <p className="cv-item__head"><span>{j.dates} — {j.role} at {j.company}</span>{j.place && <span className="cv-item__place">{j.place}</span>}</p>
                  <p className="cv-text">{j.text}</p>
                </div>
              ))}
            </Row>

            <Row label="Education">
              {RESUME.education.map((e) => (
                <div className="cv-item" key={e.text}>
                  <p className="cv-item__head"><span>{e.dates} — {e.title}</span><span className="cv-item__place">{e.place}</span></p>
                  <p className="cv-text">{e.text}</p>
                </div>
              ))}
            </Row>

            <Row label="Technical skills"><Bullets items={RESUME.technical} /></Row>
            <Row label="Design, video & AI"><Bullets items={RESUME.creative} /></Row>
            <Row label="Soft skills"><Bullets items={RESUME.soft} /></Row>

            <Row label="Portfolio">
              <ul className="cv-links">
                {RESUME.portfolio.map((p) => <li key={p.url}><a href={p.url} target="_blank" rel="noopener">{p.label}</a></li>)}
              </ul>
            </Row>
          </article>
        </section>

        <Cta
          kicker="hiring a web or app developer?"
          title={<>let's talk about <em className="grad">your team</em>. i reply within a day.</>}
          href={`mailto:${c.email}?subject=${encodeURIComponent("About your resume")}`}
          label="email me"
        />
        <PageAnimations />
      </main>
    </>
  );
}
