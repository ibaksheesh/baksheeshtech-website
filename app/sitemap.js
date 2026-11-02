import { abs } from "@/lib/seo";

// static export: written once at build time to out/sitemap.xml
export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date(); // build date
  return [
    { url: abs("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: abs("/portfolio/"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/pricing/"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/resume/"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
