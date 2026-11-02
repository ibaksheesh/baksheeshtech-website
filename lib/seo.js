/* ---------- SEO: page metadata + JSON-LD (structured data for Google / AI search) ----------
   Values are the same as the old index.html / portfolio.html <head>.
   The live domain comes from data/site.js — change it there, not here. */
import { SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { FIGMA } from "@/data/figma";

// absolute URL on the live domain (canonical, og:url and JSON-LD must not be relative)
export const abs = (path = "/") => `${SITE.url}${path}`;

// social share image (1200x630) used by every page
export const SHARE_IMAGE = {
  url: abs("/assets/og-image.jpg"),
  width: 1200,
  height: 630,
  alt: "Baksheesh Tech — websites that sell, built for real growth",
};

/* Page metadata with the shared share-card values.
   Next replaces the whole openGraph / twitter object per page (no merging with the layout),
   so each page sends the full set — that is why it lives in one helper.
   shareTitle / shareDescription: the (shorter) text for WhatsApp / LinkedIn / X cards. */
export function pageMetadata({ title, description, path, shareTitle = title, shareDescription = description }) {
  const url = abs(path);
  return {
    title: { absolute: title }, // exact title, no layout template added on top
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_IN",
      title: shareTitle,
      description: shareDescription,
      url,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [SHARE_IMAGE.url],
    },
  };
}

// <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(data)} />
// ("<" escaped so no text in the data can close the script tag early)
export const ldJson = (data) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });

const service = (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } });

// homepage: website + person + business (same @graph as the old index.html)
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: abs("/"),
      name: SITE.name,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": abs("/#person"),
      name: "Baksheesh Bhardwaj",
      jobTitle: "Founder & Lead Developer",
      image: abs("/assets/baksheesh.jpg"),
      url: abs("/"),
      knowsAbout: ["Web Development", "React", "Angular", "WordPress", "Shopify", "UI/UX Design", "SEO", "AI Automation"],
      worksFor: { "@id": abs("/#business") },
    },
    {
      "@type": "ProfessionalService",
      "@id": abs("/#business"),
      name: SITE.name,
      url: abs("/"),
      image: abs("/assets/og-image.jpg"),
      logo: abs("/assets/icon-512.png"),
      description: "Web, AI automation and growth agency: websites, WhatsApp automation, email marketing, SEO and care plans for businesses in India and abroad.",
      founder: { "@id": abs("/#person") },
      email: SITE.email,
      telephone: SITE.phoneIntl,
      address: { "@type": "PostalAddress", addressRegion: "Himachal Pradesh", addressCountry: "IN" },
      areaServed: "Worldwide",
      priceRange: "₹1,499 – ₹59,999+",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          "Web Development", "App Development", "UI/UX Design", "SEO & AI Ranking",
          "AI Automation", "WhatsApp Automation", "Email Marketing", "E-commerce", "Digital Branding", "Social Media Design",
        ].map(service),
      },
    },
  ],
};

// /portfolio/: the live projects + figma files as a list of creative works (read by Google, not shown)
export function portfolioJsonLd(projects = PROJECTS, designs = FIGMA) {
  const work = [
    ...projects.map((p) => [p.name, p.url]),
    ...designs.map((d) => [`${d.name} (Figma design)`, d.url]),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio — Baksheesh Tech",
    url: abs("/portfolio/"),
    author: { "@type": "Person", name: "Baksheesh Bhardwaj", url: abs("/") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: work.map(([name, url], i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "CreativeWork", name, url },
      })),
    },
  };
}
