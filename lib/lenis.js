/* =========================================================
   Shared Lenis (smooth scroll) instance.
   SiteEffects creates it once for the whole site and uses it
   for anchor links and page changes.
   null = not created yet, or the visitor prefers reduced motion.
   ========================================================= */
let lenis = null;

export function setLenis(instance) {
  lenis = instance || null;
}

export function getLenis() {
  return lenis;
}
