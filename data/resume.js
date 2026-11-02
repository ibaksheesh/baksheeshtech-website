// Resume (/resume/ and the downloadable PDF in public/). Personal details such as date of birth,
// father's name and home address are left out on purpose: this page is public.
export const RESUME = {
  name: "Baksheesh Bhardwaj",
  title: "Web & App Developer · Designer",
  // ?v= changes whenever the PDF is re-made, so browsers never show an old cached copy
  pdf: "/Baksheesh-Bhardwaj-Web-Developer-CV.pdf?v=2026-10-15",

  // quick facts under the intro
  facts: [
    { value: "5+", label: "years of experience" },
    { value: "5", label: "companies" },
    { value: "web · app", label: "video · ai automation" },
  ],

  contacts: {
    location: "Chandigarh, India",
    email: "baksheeshtechin@gmail.com",
    phone: "+91 85805 83233",
    phoneHref: "+918580583233",
    website: "baksheeshtech.com",
  },

  profile:
    "I'm a web and app developer with 5+ years of experience building fast, responsive websites and mobile apps for businesses in India and abroad. I work across React, Next.js, WordPress and Shopify, design in Figma and Canva, edit promo videos, and set up AI, WhatsApp and email automations that answer, follow up and book for a business. I take a project from design to launch, with clean code and on-page SEO.",

  employment: [
    {
      dates: "Mar 2025 – Present",
      role: "Web Developer",
      company: "Grupo Sineva",
      place: "",
      text: "Websites and the AutistaAI mobile app (Android & iOS) for the group: gruposineva.com, sinevabrokerage.com and mypanditji.io.",
    },
    { dates: "Jan 2024 – Mar 2025", role: "Frontend Developer", company: "Growing Globe Immigration", place: "Chandigarh", text: "Frontend development of the company's responsive websites." },
    { dates: "Nov 2022 – Jan 2024", role: "Frontend Developer", company: "Hike Branding", place: "Ahmedabad", text: "Responsive websites for the agency's branding clients." },
    { dates: "Aug 2021 – Nov 2022", role: "Frontend Developer", company: "Sandvok Softwares", place: "Ludhiana", text: "Frontend development of client websites and app interfaces." },
    { dates: "Oct 2020 – May 2021", role: "Frontend Developer", company: "Your Software Solutions Pvt Ltd", place: "Mohali", text: "Website design and responsive frontends with HTML, CSS, Bootstrap and jQuery." },
  ],

  education: [
    { dates: "2016 – 2019", title: "Himachal Pradesh University", place: "Shimla", text: "Bachelor of Computer Applications (BCA)" },
    { dates: "2016", title: "HP Board of School Education", place: "Shimla", text: "Senior Secondary (10+2)" },
  ],

  technical: ["React & Next.js", "JavaScript", "HTML5, CSS3, SCSS", "Angular", "WordPress & Elementor", "Shopify & WooCommerce", "Mobile apps (Android & iOS)", "GSAP animations", "Bootstrap & jQuery", "SEO & Git"],
  creative: ["Figma (UI/UX)", "Canva (designs & videos)", "Video editing (reels, promos)", "Photoshop & Illustrator", "AI automation (n8n, GoHighLevel)", "WhatsApp automation", "Email marketing", "OpenAI, Claude & Gemini"],
  soft: ["Teamwork", "Creativity", "Taking responsibility", "Hardworking & flexible"],

  portfolio: [
    { label: "baksheeshtech.com/portfolio", url: "https://baksheeshtech.com/portfolio/" },
    { label: "figma.com · FlowerEra (UI/UX)", url: "https://www.figma.com/design/oNbFXC5RPdlPmLrLFRwSOY/FlowerEra" },
  ],
};
