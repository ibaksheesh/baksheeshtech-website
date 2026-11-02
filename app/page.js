import Hero from "@/components/home/Hero";
import Logos from "@/components/home/Logos";
import Attention from "@/components/home/Attention";
import Tools from "@/components/home/Tools";
import Band from "@/components/home/Band";
import Work from "@/components/home/Work";
import Cta from "@/components/Cta";
import Services from "@/components/home/Services";
import Automation from "@/components/home/Automation";
import Founder from "@/components/home/Founder";
import Reviews from "@/components/Reviews";
import Quotation from "@/components/home/Quotation";
import PageAnimations from "@/components/PageAnimations";
import { pageMetadata, homeJsonLd, ldJson } from "@/lib/seo";

// <head> values from the old index.html
export const metadata = pageMetadata({
  title: "Baksheesh Tech — Web, AI Automation & Growth Agency",
  description: "Baksheesh Tech is a web, AI automation and growth agency: websites from ₹9,999, WhatsApp AI bots, SEO and monthly care plans for clinics, real estate, coaching institutes, restaurants and hotels.",
  path: "/",
  shareTitle: "Baksheesh Tech — web, AI automation & growth agency",
  shareDescription: "Websites from ₹9,999, WhatsApp AI bots, Google & SEO and care plans — one agency, one goal: more customers.",
});

// homepage — sections in the same order as the old index.html
export default function HomePage() {
  return (
    <>
      {/* structured data (website + person + business) for Google / AI search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(homeJsonLd)} />

      <main id="top">
        <Hero />
        <Logos />
        <Attention />
        <Tools />
        <Band />
        <Work />
        <Cta
          kicker="work that's truly built around your business"
          title={<>one partner for <em className="grad">your growth</em> — website, apps, seo & automation.</>}
          href="#contact"
          label="start your project"
        />
        <Services />
        <Automation />
        <Founder />
        <Reviews />
        <Quotation />
        {/* scroll animations for this page (cleaned up on navigation) */}
        <PageAnimations />
      </main>
    </>
  );
}
