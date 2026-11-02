/* =========================================================
   Baksheesh Tech — per-page behaviour & animations
   Port of the page-content half of the old js/main.js.
   initPage(root) runs when a page mounts (see components/PageAnimations.jsx)
   and returns a cleanup that undoes everything, so client-side navigation
   between "/" and "/portfolio/" never leaves timers, observers, listeners,
   ScrollTriggers or tweens behind.
   Global chrome (Lenis, cursor, header, menu, footer track/skew, scramble,
   back-to-top) lives in components/layout/SiteEffects.jsx, not here.
   ========================================================= */
import { gsap } from "gsap";
// every file must import ScrollTrigger from this exact path, or the bundle gets two copies
import { ScrollTrigger } from "gsap/ScrollTrigger";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Text splitting (keeps <em> styling) ----------
   Idempotent: the DOM is server-rendered and effects can run twice on the same
   nodes (React StrictMode, fast refresh), so a split element is marked and a
   second call just hands back the spans made the first time. */
function splitWords(el, cls = "word") {
  if (el.dataset.splitDone) return $$(`span.${el.dataset.splitDone}`, el);
  const out = [];
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(" ");
          const span = document.createElement("span");
          span.className = cls;
          span.textContent = part;
          out.push(span);
          frag.append(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  el.dataset.splitDone = cls;
  return out;
}

const noop = () => {};

export function initPage(root) {
  if (!root || typeof window === "undefined") return noop;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let disposed = false;

  // everything we start is recorded here so cleanup can stop it
  const offs = []; // listener removers
  const observers = [];
  const timeouts = [];
  let raf = 0, imgTimer = 0, feedTimer = 0;
  const on = (el, type, fn, opts) => {
    el.addEventListener(type, fn, opts);
    offs.push(() => el.removeEventListener(type, fn, opts));
  };
  const later = (fn, ms) => timeouts.push(setTimeout(fn, ms));

  /* ---------- Portfolio hover videos ----------
     Mouse: play on hover, pause + rewind on leave.
     Touch screens (no hover): play while the card is on screen. */
  const pfVideos = $$(".pf__video", root);
  const loadVideo = (v) => { if (!v.src) { v.src = v.dataset.src; v.load(); } };
  const playVideo = (v) => {
    loadVideo(v);
    v.muted = true; // React doesn't reliably reflect the muted attribute; autoplay needs it
    v.play().then(() => (disposed ? v.pause() : v.classList.add("is-playing"))).catch(() => {});
  };
  const stopVideo = (v) => { v.pause(); if (v.src) v.currentTime = 0; v.classList.remove("is-playing"); };

  if (pfVideos.length && !reduceMotion) {
    if (window.matchMedia("(hover: hover)").matches) {
      pfVideos.forEach((v) => {
        const card = v.closest(".pf");
        if (!card) return;
        on(card, "mouseenter", () => playVideo(v));
        on(card, "mouseleave", () => stopVideo(v));
      });
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? playVideo(e.target) : stopVideo(e.target)));
      }, { threshold: 0.6 });
      pfVideos.forEach((v) => io.observe(v));
      observers.push(io);
    }
  }

  /* ---------- AI automation feed ----------
     notifications slide in one by one the first time the panel is seen, then stay;
     after that a highlight moves down the list like new events arriving */
  const feed = $(".feed", root);
  const feedNotes = feed ? $$(".note", feed) : [];
  if (feed && feedNotes.length && !reduceMotion && "IntersectionObserver" in window) {
    let shown = false, i = 0;
    const highlight = () => {
      feedNotes.forEach((n, k) => n.classList.toggle("is-active", k === i));
      i = (i + 1) % feedNotes.length;
    };
    feed.classList.add("is-animating");
    const io = new IntersectionObserver(([e]) => {
      clearInterval(feedTimer);
      if (!e.isIntersecting) return;
      if (!shown) {
        shown = true;
        feedNotes.forEach((n, k) => later(() => n.classList.add("is-in"), 300 + k * 450));
      }
      feedTimer = setInterval(highlight, 1600);
    }, { threshold: 0.3 });
    io.observe(feed);
    observers.push(io);
  }

  const counters = $$("[data-count]", root);

  /* =========================================================
     Animations — GSAP + ScrollTrigger (Lenis is set up globally)
     ========================================================= */
  let ctx = null;
  const skewProxy = { skew: 0 };
  const pointerEls = []; // tweened by pointer handlers, i.e. outside the context

  if (!reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context((self) => {
      /* Hero: background zooms out, words rise */
      const heroTl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      /* (home and portfolio pages share this file, so every block checks its element exists) */
      const heroMedia = $(".hero__media", root);
      if (heroMedia) heroTl.from(heroMedia, { scale: 1.2, duration: 2.4, ease: "power3.out" }, 0);
      $$(".hero [data-split], .pf-hero [data-split]", root).forEach((el, i) => {
        heroTl.from(splitWords(el, "word-wrap"), { yPercent: 120, duration: 1.2, stagger: 0.07 }, 0.3 + i * 0.15);
      });
      const fades = $$(".hero [data-fade], .pf-hero [data-fade]", root);
      if (fades.length) heroTl.from(fades, { y: 24, opacity: 0, duration: 1, stagger: 0.2 }, 0.2);
      const heroCorner = $(".hero .corner", root);
      if (heroCorner) heroTl.from(heroCorner, { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(3)" }, 1);

      /* Hero parallax */
      const hero = $(".hero", root);
      if ($(".wall", root) && hero && heroMedia) gsap.to(heroMedia, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });

      /* Quote: words light up with scroll */
      const fill = $("[data-fill]", root);
      if (fill) {
        const words = splitWords(fill);
        words.forEach((w) => w.classList.remove("on")); // fresh state if the effect re-runs
        ScrollTrigger.create({
          trigger: fill,
          start: "top 85%",
          end: "bottom 45%",
          scrub: true,
          onUpdate: ({ progress }) => {
            const n = Math.round(progress * words.length);
            words.forEach((w, i) => w.classList.toggle("on", i < n));
          },
        });
        const quoteMark = $(".quote-mark", root);
        const attention = $(".attention", root);
        if (quoteMark && attention) gsap.from(quoteMark, {
          y: 60, opacity: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: attention, start: "top 75%", once: true },
        });
      }

      /* Tool tiles */
      const tiles = $(".tiles", root);
      const tileItems = $$("[data-tile]", root);
      if (tiles && tileItems.length) gsap.from(tileItems, {
        opacity: 0, y: 24, duration: 0.7, ease: "power2.out",
        stagger: { each: 0.05, from: "start" },
        scrollTrigger: { trigger: tiles, start: "top 85%", once: true },
      });

      /* Blue band moves horizontally with scroll (the footer track is done by the layout) */
      const band = $("#band", root);
      const bandSection = $(".band", root);
      if (band && bandSection) gsap.fromTo(band, { xPercent: 0 }, {
        xPercent: -45, ease: "none",
        scrollTrigger: { trigger: bandSection, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });

      /* Section headings: each word slides up out of a mask */
      $$(".heading, .contact__title, .apps__title", root).forEach((el) => {
        const inner = splitWords(el, "mask-in");
        inner.forEach((w) => {
          if (w.parentNode.classList.contains("mask")) return; // already wrapped on a previous run
          const m = document.createElement("span"); m.className = "mask"; w.replaceWith(m); m.append(w);
        });
        gsap.from(inner, {
          yPercent: 110, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* Band skews with scroll velocity */
      if (band) {
        const setSkew = gsap.quickSetter(band, "skewX", "deg");
        ScrollTrigger.create({
          onUpdate: (st) => {
            const skew = gsap.utils.clamp(-12, 12, st.getVelocity() / -250);
            if (Math.abs(skew) > Math.abs(skewProxy.skew)) {
              skewProxy.skew = skew;
              // kept out of the context: one tween per scroll spike would pile up in it (killed in cleanup instead)
              self.ignore(() => gsap.to(skewProxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => setSkew(skewProxy.skew) }));
            }
          },
        });
      }

      /* Generic reveal (headings are handled above) */
      $$("[data-reveal]:not(.heading):not(.contact__title):not(.apps__title)", root).forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      /* Cards pop in per row */
      const pfCards = $$(".pf", root);
      if (pfCards.length) ScrollTrigger.batch(pfCards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(batch, { clipPath: "inset(100% 0% 0% 0% round 8px)" },
            { clipPath: "inset(0% 0% 0% 0% round 8px)", duration: 1.4, ease: "expo.inOut", stagger: 0.12, clearProps: "clipPath" });
          const scenes = batch.map((c) => c.querySelector(".scene")).filter(Boolean);
          if (scenes.length) gsap.from(scenes, { scale: 1.35, duration: 1.8, ease: "expo.out", stagger: 0.12, clearProps: "scale" });
        },
      });
      const otherCards = $$("[data-card]:not(.pf)", root);
      if (otherCards.length) ScrollTrigger.batch(otherCards, {
        start: "top 90%",
        once: true,
        // clearProps: GSAP leaves inline translate/transform behind, which would block the CSS hover lift
        onEnter: (batch) => gsap.from(batch, { y: 80, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, clearProps: "transform,opacity" }),
      });

      /* Founder counters: server-rendered with the final number (for search engines), so start
         them from 0 here — unless they are already on screen, where a reset would flash */
      counters.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: Number(el.dataset.count), duration: 2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = Math.round(obj.v)),
        });
      });

      heroTl.play();

      /* ---------- Desktop-only pointer effects ----------
         (the custom cursor and its hover states are handled globally by the layout) */
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        // magnetic buttons
        $$(".btn", root).forEach((btn) => {
          pointerEls.push(btn);
          const mx = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" }), my = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
          on(btn, "mousemove", (e) => {
            const r = btn.getBoundingClientRect();
            mx((e.clientX - r.left - r.width / 2) * 0.25);
            my((e.clientY - r.top - r.height / 2) * 0.35);
          });
          on(btn, "mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }));
        });

        // portfolio cards tilt toward the mouse
        pfCards.forEach((card) => {
          pointerEls.push(card);
          on(card, "mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, { rotationY: nx * 8, rotationX: -ny * 8, transformPerspective: 900, duration: 0.6, ease: "power3" });
          });
          on(card, "mouseleave", () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3" }));
        });
      }
    }, root);

    /* ---------- Re-measure once the page has laid out ----------
       client-side navigation never fires window "load" again, so refresh after
       the first frame, after fonts/late layout, and whenever an image in the page loads */
    let measuredHeight = -1;
    const refresh = () => {
      if (disposed) return;
      measuredHeight = document.documentElement.scrollHeight;
      ScrollTrigger.refresh();
    };
    // an image load only matters if it changed the page height (most images have fixed-size boxes)
    const refreshIfResized = () => { if (document.documentElement.scrollHeight !== measuredHeight) refresh(); };
    const refreshSoon = () => { clearTimeout(imgTimer); imgTimer = setTimeout(refreshIfResized, 150); }; // debounced: the hero wall has ~70 images

    raf = requestAnimationFrame(refresh);
    later(refresh, 500);
    // "load" doesn't bubble, so listen in the capture phase to catch every <img> inside root
    on(root, "load", (e) => { if (e.target.tagName === "IMG") refreshSoon(); }, true);
    if (document.readyState !== "complete") on(window, "load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  } else {
    /* Reduced motion: final numbers, quote fully lit */
    counters.forEach((el) => (el.textContent = el.dataset.count));
    $$("[data-fill]", root).forEach((el) => splitWords(el).forEach((w) => w.classList.add("on")));
  }

  /* ---------- Cleanup: leave nothing running from this page ---------- */
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    clearTimeout(imgTimer);
    timeouts.forEach(clearTimeout);
    clearInterval(feedTimer);
    observers.forEach((io) => io.disconnect());
    offs.forEach((off) => off());

    pfVideos.forEach(stopVideo);
    if (feed) {
      feed.classList.remove("is-animating");
      feedNotes.forEach((n) => n.classList.remove("is-in", "is-active"));
    }

    if (ctx) {
      ctx.revert(); // kills this page's ScrollTriggers, timelines and tweens and restores inline styles
      // tweens started by pointer handlers / the skew spike live outside the context
      gsap.killTweensOf(skewProxy);
      if (pointerEls.length) {
        gsap.killTweensOf(pointerEls);
        gsap.set(pointerEls, { clearProps: "transform" });
      }
    }
    // back to the server-rendered numbers (matters only if the same DOM is initialised again)
    counters.forEach((el) => (el.textContent = el.dataset.count));
  };
}
