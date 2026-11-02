// Runs automatically after `npm run build` (the "postbuild" script).
// Next.js 16 on Windows writes the client-router prefetch files of nested pages with a
// backslash path, e.g. out/portfolio/__next.portfolio/__PAGE__.txt, but the browser asks for
// out/portfolio/__next.portfolio.__PAGE__.txt — so every prefetch 404s (navigation still works,
// just slower). This moves those files to the dotted names. On Linux/macOS (Vercel, Netlify)
// the files are already correct and this script does nothing.
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let moved = 0;

// every file below a "__next.*" folder becomes "<folder>.<sub>.<file>" next to that folder
function flatten(dir, prefix, parent) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) flatten(p, `${prefix}.${name}`, parent);
    else { renameSync(p, join(parent, `${prefix}.${name}`)); moved++; }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) { flatten(p, name, dir); rmSync(p, { recursive: true, force: true }); }
    else if (name !== "_next" && name !== "assets") walk(p);
  }
}

walk(OUT);
console.log(moved ? `fix-export-windows: renamed ${moved} prefetch file(s)` : "fix-export-windows: nothing to fix");
