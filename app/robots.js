import { abs } from "@/lib/seo";

// static export: written once at build time to out/robots.txt
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: abs("/sitemap.xml"),
  };
}
