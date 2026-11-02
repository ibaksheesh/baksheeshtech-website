"use client";

/* =========================================================
   Global behaviour for the site chrome (header, menu, footer, cursor)
   — the parts of the old js/main.js that are not tied to one page.
   Mounted once in app/layout.js and lives across page changes.
   Anything inside <main> is handled per page by lib/animations.js.
   ========================================================= */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getLenis, setLenis } from "@/lib/lenis";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const RING = 144.5; // circumference of the back-to-top ring (r = 23)

/* ---------- Off-canvas menu ----------
   state lives in DOM classes, like the old site (header markup is a server component) */
function setMenu(open) {
  const menu = $("#menu");
  const menuBtn = $("#menu-btn");
  if (!menu || !menuBtn) return;
  menu.classList.toggle("is-open", open);
  menu.setAttribute("aria-hidden", String(!open));
  menuBtn.setAttribute("aria-expanded", String(open));
  if (open) $("#menu-close")?.focus();
}

/* "#contact" -> <section id="contact">, "#top" -> <main id="top"> */
function hashTarget(hash) {
  if (!hash || hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/* scroll to an in-page target: Lenis when running, native otherwise.
   The 40px gap above sections comes from `section[id] { scroll-margin-top }` in globals.css,
   which Lenis, scrollIntoView and Next's own hash scrolling all respect (<main id="top"> has none). */
function scrollToTarget(el, immediate = false) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { immediate });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: immediate || reduce ? "auto" : "smooth" });
  }
}

/* "/portfolio/" and "/portfolio" are the same page */
const samePath = (a, b) => (a.replace(/\/+$/, "") || "/") === (b.replace(/\/+$/, "") || "/");

/* ---------- Scrambled text (footer badge) ---------- */
function scramble(el) {
  const target = el.dataset.scramble;
  const glyphs = "_/\\|+-—<>*#%ATGROl}{";
  let frame = 0;
  const total = 28;
  const tick = () => {
    el.textContent = [...target]
      .map((c, i) => (i < (frame / total) * target.length ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
      .join("");
    if (frame++ < total) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  tick();
}

export default function SiteEffects() {
  const pathname = usePathname();
  const lastPath = useRef(null);
  const updateChrome = useRef(() => {}); // header + ring refresh, set by the main effect
  const traversal = useRef(false); // true while a back/forward navigation is being rendered

  /* =========================================================
     Once per visit: smooth scroll, header, menu, anchors,
     cursor and footer animations. Everything is undone in the
     cleanup (React StrictMode runs effects twice in dev).
     ========================================================= */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];
    const on = (target, type, fn, opts) => {
      if (!target) return;
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- Smooth scroll ---------- */
    if (!reduceMotion) {
      // stopInertiaOnNavigate: a link to another page stops the glide, so it can't fight Next's scroll reset
      const lenis = new Lenis({ lerp: 0.09, stopInertiaOnNavigate: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33); // GSAP default
        lenis.destroy();
        setLenis(null);
      });
    }

    /* ---------- Header hide-on-scroll, back-to-top ring ---------- */
    const header = $("#header");
    const toTop = $("#to-top");
    const ring = $("#to-top-ring");
    const menu = $("#menu");
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header?.classList.toggle("is-scrolled", y > 20);
      // only when the position really changed: ScrollTrigger.refresh() fires scroll events at the same y
      if (y !== lastY) header?.classList.toggle("is-hidden", y > 300 && y > lastY && !menu?.classList.contains("is-open"));
      toTop?.classList.toggle("is-visible", y > 600);
      if (ring) ring.style.strokeDashoffset = RING * (1 - (max > 0 ? y / max : 0));
      lastY = y;
    };
    on(window, "scroll", onScroll, { passive: true });
    updateChrome.current = onScroll;
    cleanups.push(() => (updateChrome.current = () => {}));

    /* ---------- Off-canvas menu ---------- */
    on($("#menu-btn"), "click", () => setMenu(true));
    on($("#menu-close"), "click", () => setMenu(false));
    on($("#menu-backdrop"), "click", () => setMenu(false));
    on(menu, "click", (e) => e.target.closest("a") && setMenu(false)); // any link in the menu closes it
    on(document, "keydown", (e) => e.key === "Escape" && setMenu(false));
    onScroll();

    /* ---------- Links to the CURRENT page ----------
       one capture-phase listener, so it runs before next/link: a link to a section
       of this page is smooth-scrolled here, and a link to this same page (e.g. the
       logo on home, "portfolio" on /portfolio/) scrolls back to the top — like the old
       site's reload. preventDefault makes <Link> skip its own navigation. Links to
       another page are left to Next.js; the route effect below scrolls to their hash. */
    const onLinkClick = (e) => {
      traversal.current = false; // a click starts a fresh navigation, never a back/forward one
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      if (a.getAttribute("href") === "#") return; // social placeholders keep the browser default
      let url;
      try {
        url = new URL(a.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || !samePath(url.pathname, location.pathname)) return;
      const el = url.hash ? hashTarget(url.hash) : document.getElementById("top");
      if (!el) return;
      e.preventDefault();
      setMenu(false);
      scrollToTarget(el);
    };
    on(document, "click", onLinkClick, true);

    // back / forward: the browser restores the old scroll position, so the route effect must not move it
    on(window, "popstate", () => (traversal.current = true));

    // copyright year: baked in at build time, refreshed here so it never goes stale
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    /* ---------- Scrambled footer badge ---------- */
    if (!reduceMotion && "IntersectionObserver" in window) {
      $$(".footer [data-scramble]").forEach((el) => {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => e.isIntersecting && scramble(el));
        }, { threshold: 0.6 });
        io.observe(el);
        cleanups.push(() => io.disconnect());
        on(el, "mouseenter", () => scramble(el));
      });
    }

    /* ---------- GSAP: footer + cursor ---------- */
    let ctx = null;
    const skew = { value: 0 };
    if (!reduceMotion) {
      ctx = gsap.context(() => {
        /* footer badge reveal */
        $$(".footer [data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 40, opacity: 0, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        /* footer text moves horizontally with scroll */
        const track = $("#footer-track");
        if (track) {
          gsap.fromTo(track, { xPercent: 0 }, {
            xPercent: -40, ease: "none",
            scrollTrigger: { trigger: ".footer__scroll", start: "top bottom", end: "bottom top", scrub: 0.6 },
          });

          /* ...and skews with scroll velocity (the page code does the same for #band) */
          const setSkew = gsap.quickSetter(track, "skewX", "deg");
          ScrollTrigger.create({
            onUpdate: (self) => {
              const v = gsap.utils.clamp(-12, 12, self.getVelocity() / -250);
              if (Math.abs(v) > Math.abs(skew.value)) {
                skew.value = v;
                gsap.to(skew, { value: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => setSkew(skew.value) });
              }
            },
          });
        }

        /* ---------- Desktop-only pointer effects ---------- */
        const cursor = $("#cursor");
        if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          // custom cursor: dot follows instantly, ring trails behind
          const dotX = gsap.quickTo(".cursor__dot", "x", { duration: 0.1 }), dotY = gsap.quickTo(".cursor__dot", "y", { duration: 0.1 });
          const ringX = gsap.quickTo(".cursor__ring", "x", { duration: 0.45, ease: "power3" }), ringY = gsap.quickTo(".cursor__ring", "y", { duration: 0.45, ease: "power3" });
          on(window, "mousemove", (e) => { cursor.classList.remove("is-hidden"); dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY); });
          on(document, "mouseleave", () => cursor.classList.add("is-hidden"));
          on(document, "mouseenter", () => cursor.classList.remove("is-hidden"));
          // hover states by delegation: pages change without a reload, so no per-element listeners
          on(document, "mouseover", (e) => {
            const el = e.target.closest?.("a, button, summary, label, .svc, .tiles li");
            const view = !!el && el.matches(".pf, .fg");
            cursor.classList.toggle("is-view", view);
            cursor.classList.toggle("is-hover", !!el && !view);
          });
        }
      });
    }

    // images and fonts change the page height after first paint
    if (document.readyState !== "complete") on(window, "load", () => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf(skew);
      ctx?.revert();
    };
  }, []);

  /* =========================================================
     Every page change (and the first load): close the menu, then,
     once the new page has rendered, jump to its #hash or to the top
     and let ScrollTrigger re-measure the (new) page.
     ========================================================= */
  useEffect(() => {
    // same path again = StrictMode's second run of the first load
    const firstLoad = lastPath.current === null || lastPath.current === pathname;
    lastPath.current = pathname;
    const isTraversal = traversal.current;
    traversal.current = false;

    setMenu(false);
    $("#cursor")?.classList.remove("is-hover", "is-view");

    let timer = 0;
    const frame = requestAnimationFrame(() => {
      timer = setTimeout(() => {
        const lenis = getLenis();
        lenis?.resize();
        const el = hashTarget(location.hash);
        if (isTraversal) {
          // back/forward: keep the position the browser restored
        } else if (el) {
          scrollToTarget(el, true);
        } else if (!firstLoad) {
          // (a first load without a hash keeps the browser's own scroll restore)
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
          else window.scrollTo(0, 0);
        }
        updateChrome.current();
        ScrollTrigger.refresh();
      }, 60);
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
