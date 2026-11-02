import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // static export: `npm run build` writes a plain HTML/CSS/JS site to ./out (host anywhere, e.g. Vercel or Netlify)
  output: "export",
  trailingSlash: true, // /portfolio/ -> out/portfolio/index.html
  images: { unoptimized: true },
  agentRules: false, // don't let `next dev` write an AGENTS.md into the project
  // this folder is the project root (stops Next from picking up a stray lockfile higher up)
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
};

export default nextConfig;
