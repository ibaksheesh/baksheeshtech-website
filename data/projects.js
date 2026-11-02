// Portfolio projects (homepage grid + /portfolio). Order = order on the page.
// img: file name in public/assets/work/<img>.jpg (desktop, 16:11) and public/assets/work/m/<img>.jpg (mobile).
// Hover videos are picked up automatically from public/assets/video/<img>.mp4 and public/assets/video/m/<img>.mp4.
// scene: "laptop" | "front" (laptop + phone) | "combo" (tablet + phone) | "phone"
export const PROJECTS = [
  { name: "Grupo Sineva", tag: "website design & development", url: "https://gruposineva.com/", scene: "laptop", img: "gruposineva" },
  { name: "AutistaAI", tag: "mobile app · android & ios", url: "https://autistaai.com/", scene: "phone", img: "autistaai" },
  { name: "Futures Land Capital", tag: "real estate · website", url: "https://futureslandcapital.com/", scene: "combo", img: "futureslandcapital" },
  { name: "NDB Builders", tag: "construction · lead-gen website", url: "https://ndbbuilders.net/", scene: "front", img: "ndbbuilders" },
  { name: "MyPanditji", tag: "ai app · web platform", url: "https://mypanditji.io/", scene: "phone", img: "mypanditji" },
  { name: "Sineva Brokerage", tag: "business brokerage · web platform", url: "https://sinevabrokerage.com/", scene: "combo", img: "sinevabrokerage" },
  { name: "79 Bogotá", tag: "luxury apartments · booking website", url: "https://79bogota.com/", scene: "phone", img: "79bogota" },
  { name: "The Shade Home", tag: "home décor · responsive website", url: "https://theshadehome.com/", scene: "laptop", img: "theshadehome" },
];
