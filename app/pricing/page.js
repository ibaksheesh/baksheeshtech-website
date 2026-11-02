import PricingHero from "@/components/pricing/PricingHero";
import Packages from "@/components/pricing/Packages";
import PricingFaq from "@/components/pricing/PricingFaq";
import Quotation from "@/components/home/Quotation";
import PageAnimations from "@/components/PageAnimations";
import { FAQ } from "@/data/packages";
import { pageMetadata, ldJson, abs } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing — Baksheesh Tech | Websites from ₹9,999",
  description: "Fixed prices: business websites from ₹9,999, monthly care plans from ₹1,499, an AI WhatsApp bot for ₹4,999 + ₹999/month and small jobs like Google Business setup.",
  path: "/pricing/",
  shareDescription: "Websites from ₹9,999, care plans from ₹1,499/month and quick jobs — fixed prices, no surprises.",
});

// the faq as structured data, read by Google / AI search
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: abs("/pricing/"),
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

// /pricing/ — packages, care plans, quick jobs, faq, then the enquiry form
export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqJsonLd)} />

      <main id="top" className="page-pricing">
        <PricingHero />
        <Packages />
        <PricingFaq />
        <Quotation />
        {/* scroll animations for this page (cleaned up on navigation) */}
        <PageAnimations />
      </main>
    </>
  );
}
