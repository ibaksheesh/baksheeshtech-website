// Pricing page (/pricing/): packages, care plans, the launch bundle, quick jobs and the faq.
// Prices match the price plan sent to clients (brand/price-plan/) — change both together.

// one-time website packages
export const PACKAGES = [
  {
    name: "Starter Site",
    price: "₹9,999",
    note: "launch price for the first 10 clients (regular ₹12,999)",
    time: "7 working days",
    for: "small clinics, gyms, coaching centres, restaurants, shops",
    features: ["5 pages, mobile-friendly design", "whatsapp and call buttons", "enquiry form and google map", "basic seo, ssl, fast loading", "2 rounds of changes", "30 days free fixes"],
  },
  {
    name: "Business Site",
    price: "₹24,999",
    featured: true,
    note: "custom site built for enquiries",
    time: "14 working days",
    for: "hospitals, ielts institutes, hotels, banquet halls, real estate",
    features: ["everything in starter", "up to 10 pages, custom design", "a page for each service", "google business profile setup", "local seo and click tracking", "45 days fixes + training call"],
  },
  {
    name: "Signature Site",
    price: "₹59,999",
    from: true,
    note: "premium animated website or full online store",
    time: "25–30 working days",
    for: "premium brands, big real-estate projects, online shops",
    features: ["custom design, up to 12 pages", "next.js with smooth animations", "or an online store, 50 products", "payments, cod and shipping setup", "analytics and conversion tracking", "60 days free fixes"],
  },
];

// monthly care plans (after launch)
export const CARE = [
  { name: "Care Basic", price: "₹1,499", prepaid: "6 months ₹7,499 · 1 month free", features: ["hosting and ssl included", "daily backups, updates, security", "30 min of edits monthly", "monthly health report"] },
  { name: "Care Growth", price: "₹5,499", featured: true, prepaid: "6 months ₹27,499 · 1 month free", features: ["everything in basic", "4 google & instagram posts", "1 seo blog post monthly", "report: calls, clicks, directions"] },
  { name: "Care Pro", price: "₹13,999", prepaid: "6 months ₹69,999 · 1 month free", features: ["everything in growth", "8 social posts + 2 reels", "2 seo blog posts monthly", "monthly review call"] },
];

// launch bundle: the "separately" price is the sum of the parts as priced on this page
// (starter site + google business setup + 6 monthly payments of care growth)
export const BUNDLE = {
  price: 37999,
  parts: [["starter site", 9999], ["google business setup", 1999], ["6 × care growth", 6 * 5499]],
};

// small fixed-price jobs — an easy first project
export const OFFERS = [
  { name: "website fix", price: "₹2,999", text: "slow, broken or not mobile-friendly? we find the problem and fix it" },
  { name: "google business setup", price: "₹1,999", text: "show up on google maps with photos, timings and reviews" },
  { name: "whatsapp business setup", price: "₹1,499", text: "catalogue, quick replies, greeting and away messages" },
  { name: "ai whatsapp bot", price: "₹4,999", extra: "+ ₹999/month", text: "answers enquiries 24×7 and sends hot leads to you" },
  { name: "ad landing page", price: "₹4,999", text: "one fast page for google or meta ads, built to convert" },
];

// pricing page faq (also sent to Google / AI search as FAQPage structured data)
export const FAQ = [
  { q: "how do payments work?", a: "50% advance to start and 50% before launch (signature sites: 40% / 30% / 30%). the delivery timeline starts once the advance and your content arrive." },
  { q: "who owns the domain and the website?", a: "you do. the domain is registered in your name, and the website and its content belong to you. if you ever stop a care plan, you get a full backup." },
  { q: "why do i need a care plan?", a: "a website needs hosting, backups, updates and fresh content to stay safe and active on google. a care plan covers all of that for one fixed monthly fee, with hosting included." },
  { q: "can i cancel a care plan?", a: "yes. care plans are paid monthly in advance or 6 months upfront. the minimum is 3 months (6 if prepaid); after that you can cancel anytime with 15 days' notice." },
  { q: "what is not included in the price?", a: "the domain, hosting without a care plan, app fees and ad spend are billed at actual cost. gst is extra if applicable." },
  { q: "will i see the design before you build it?", a: "yes. you approve a design preview before the build starts, and if something is not right we change it in up to 2 rounds." },
  { q: "do you guarantee google rankings or leads?", a: "no — no honest agency can. on care growth and care pro you get a monthly report with the real numbers instead: calls, whatsapp clicks and direction requests." },
];
