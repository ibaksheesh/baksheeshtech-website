# Baksheesh Tech — website (Next.js version)

Ye folder purani static website (`../index.html`, `../portfolio.html`, `../css`, `../js`) ka **Next.js version** hai.
Design, text, animations aur behaviour bilkul same hain — bas ab site React components se banti hai,
aur homepage ↔ portfolio ke beech page reload nahi hota (client-side navigation).

- Next.js 16 (App Router) + React 19, JavaScript (TypeScript nahi)
- GSAP + ScrollTrigger + Lenis ab npm se aate hain (CDN nahi)
- `npm run build` ek **static website** banata hai (`out/` folder) — koi server nahi chahiye, kahin bhi host ho sakti hai
- Pages: `/` (home), `/portfolio/`, aur 404 page

Purana static site parent folder me reference ke liye pada hai. Live sirf ye `next-site` wala version karna hai.

## Shuru kaise karein

Node.js **20.9 ya naya** chahiye (`node -v` se check karo).

```
cd next-site
npm install          # pehli baar (ya package.json badalne ke baad)
npm run dev          # local site: http://localhost:3000 (file save karte hi update hoti hai)
npm run build        # final static website -> out/ folder
npm run preview      # out/ ko http://localhost:4000 par chalata hai (Python chahiye)
```

`npm run build` ke baad `out/` hi poori website hai — `index.html`, `portfolio/index.html`, `404.html`,
`sitemap.xml`, `robots.txt`, `assets/` sab isme hote hain.

## Kya kahan badalna hai

| Kya badalna hai | File |
|---|---|
| WhatsApp number, email, domain | `data/site.js` (`whatsapp`, `phoneDisplay`, `email`, `url`) |
| Portfolio projects (homepage + /portfolio) | `data/projects.js` + screenshots `public/assets/work/` |
| Figma / UI-UX designs (/portfolio) | `data/figma.js` + images `public/assets/work/figma/` |
| Client reviews | `data/reviews.json` (neeche rules padho) |
| Homepage sections ka text | `components/home/*.jsx` (Hero, Services, Automation, Founder, Quotation …) |
| Portfolio page ka intro / figma section | `components/portfolio/*.jsx` |
| Header, menu, footer | `components/layout/Header.jsx`, `components/layout/Footer.jsx` |
| Bottom CTA banners | `app/page.js` aur `app/portfolio/page.js` (`<Cta … />` ke props) |
| Design (colors, spacing, sab CSS) | `app/globals.css` (purani `css/style.css` jaisi hi; fonts `app/layout.js` me next/font se aate hain) |
| Fonts | `app/layout.js` (Jost + DM Serif Display, `next/font` se) |
| Scroll animations | `lib/animations.js` (har page ki) aur `components/layout/SiteEffects.jsx` (Lenis, cursor, menu — poori site) |
| Title, description, share image, schema (JSON-LD) | `lib/seo.js` + har page ka `metadata` (`app/page.js`, `app/portfolio/page.js`) |
| Sitemap / robots | `app/sitemap.js`, `app/robots.js` (build par khud bante hain) |
| Favicons, share image, manifest | `public/` (`favicon.ico`, `public/assets/*`, `site.webmanifest`) |

Images ka path code me hamesha `/` se shuru hota hai: file `public/assets/work/abc.jpg` → code me `/assets/work/abc.jpg`.

### Naya portfolio project
1. Desktop screenshot `public/assets/work/<naam>.jpg` (16:11) aur mobile screenshot `public/assets/work/m/<naam>.jpg` daalo
2. (Optional) hover video: laptop/front/combo card ke liye `public/assets/video/<naam>.mp4`, phone card ke liye `public/assets/video/m/<naam>.mp4` — file ho to card par hover me chalti hai (videos record karne ka tool purane folder me hai: `../tools/record-sites.mjs`)
3. `data/projects.js` me ek line jodo: `name`, `tag`, `url`, `scene`, `img: "<naam>"`
4. Card scenes: `laptop`, `front` (laptop + phone), `combo` (tablet + phone), `phone`

Homepage grid aur /portfolio dono isi list se bante hain — kahin aur kuch copy nahi karna. Schema (JSON-LD) bhi khud update hota hai.

### Figma designs
- `data/figma.js` me entry jodo (`name`, `tag`, `url`, `img`, `w`, `h`, `alt`, `text`), image `public/assets/work/figma/` me rakho.
- Figma file ka share setting "Anyone with the link can view" hona chahiye, warna visitor ko file nahi khulegi.

### Client reviews
- Reviews `data/reviews.json` me hain. Section homepage (about ke baad) aur portfolio page dono par aata hai.
- Sirf asli reviews daalo, client ki permission ke saath. Har review me `"approved": true` hona chahiye, bina iske review publish nahi hota.
- Jab tak ek bhi approved review nahi hai, section website par dikhta hi nahi (khaali section nahi aata).
- Fields: `name`, `role`, `company`, `text`, `stars` (1-5, optional: nahi diya to stars nahi dikhte), `photo` (optional, file `public/assets/reviews/` me rakho aur likho `assets/reviews/naam.jpg`, warna initials dikhte hain), `project` (optional `https://` link).
- `data/` folder website ke saath publish **nahi** hota — sirf `out/` live jaata hai, aur usme sirf approved reviews hote hain. Isliye pending reviews private rehte hain.
  Bas dhyan rahe: agar GitHub repo **public** hai to repo me rakhi `data/reviews.json` sab dekh sakte hain — tab pending reviews repo me mat rakho.

Kuch bhi badalne ke baad: local par `npm run dev` se check karo, phir dobara deploy (Vercel/Netlify Git se jude hon to bas push karo, build khud hota hai).

## Deploy (free)

### Vercel
1. Code GitHub par daalo (ya Vercel CLI se folder upload karo)
2. vercel.com → **Add New → Project** → repo import karo
3. **Root Directory**: `next-site` · **Framework Preset**: Next.js · baaki settings default
4. Deploy. Har `git push` par site khud dobara build hoti hai.

### Netlify
1. netlify.com → **Add new site → Import an existing project** → repo chuno
2. **Base directory**: `next-site` · **Build command**: `npm run build` · **Publish directory**: `out`
3. Deploy.

Bina Git ke: local par `npm run build` chalao aur `out/` folder Netlify Drop (app.netlify.com/drop) par drag & drop kar do.
Koi bhi static hosting (Cloudflare Pages, Hostinger, cPanel) bhi chalegi — bas `out/` folder ka content upload karo.

### baksheeshtech.com connect karna
1. Vercel: Project → **Settings → Domains** → `baksheeshtech.com` aur `www.baksheeshtech.com` add karo.
   Netlify: Site → **Domain management → Add a domain**.
2. Jo DNS records (A / CNAME) Vercel ya Netlify dikhaye, wahi apne domain registrar (GoDaddy, Hostinger, Namecheap…) ke DNS me daalo.
3. HTTPS (SSL) khud ban jaata hai — DNS update hone me kuch minute se kuch ghante lag sakte hain.
4. Domain alag ho to `data/site.js` me `url` badlo (canonical, share tags, schema, sitemap sab wahin se lete hain).

## SEO
- Har page ka title, description, canonical, Open Graph / Twitter share tags: `lib/seo.js` ka `pageMetadata()` + page ki `metadata`.
- JSON-LD schema: homepage par website + person + business, portfolio par saare projects ki list (`lib/seo.js`).
- `sitemap.xml` aur `robots.txt` build par khud bante hain (`app/sitemap.js`, `app/robots.js`).
- Portfolio ka URL ab `/portfolio/` hai (pehle `portfolio.html` tha). Purane link ke liye redirect pehle se laga hai: Netlify ke liye `public/_redirects`, Vercel ke liye `vercel.json`.
- Live hone ke baad: Google Search Console me site add karo aur `https://baksheeshtech.com/sitemap.xml` submit karo; Google Business Profile bhi banao.

## Exact "Arboria" font (optional)
CSS me body font pehle `Arboria` hai, nahi mila to free `Jost` dikhta hai. Arboria Adobe Fonts ka paid font hai —
Adobe Fonts web project ka `<link rel="stylesheet" href="https://use.typekit.net/XXXX.css">` mile to use `app/layout.js` me `<html>` ke andar `<head><link ... /></head>` bana kar jodo.

## Launch se pehle
- Footer me Instagram / LinkedIn ke asli links daalo (`components/layout/Footer.jsx`, abhi `#` hain)
- About section ki photo badalni ho to `public/assets/baksheesh.jpg` ko usi naam se replace karo (schema me bhi yahi photo hai)
