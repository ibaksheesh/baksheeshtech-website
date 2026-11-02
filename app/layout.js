import { Jost, DM_Serif_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteEffects from "@/components/layout/SiteEffects";
import { SITE } from "@/data/site";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-jost", display: "swap" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

// social share image (relative URLs resolve against metadataBase)
const OG_IMAGE = {
  url: "/assets/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Baksheesh Tech — websites that sell, built for real growth",
};

export const viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
};

// site-wide defaults (from the old index.html <head>); each page overrides
// title, description, canonical, openGraph and twitter for itself
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: "Baksheesh Tech — Web Development, Apps, SEO & AI Automation",
  description: "Web developer & designer Baksheesh Bhardwaj builds fast websites and apps, ranks businesses on Google & AI search, and sets up AI automation for leads.",
  authors: [{ name: "Baksheesh Bhardwaj" }],
  robots: { index: true, follow: true, "max-image-preview": "large" }, // "index, follow, max-image-preview:large"
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    title: "Baksheesh Tech — websites that sell, built for real growth",
    description: "Websites, apps, SEO & AI ranking, design and AI automation — one partner, one goal: more customers.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${serif.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
