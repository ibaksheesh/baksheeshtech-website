"use client";
/* Per-page behaviour: rendered as the last child of each page's <main>, so it
   mounts on every navigation and its cleanup runs when the page leaves.
   All the work lives in lib/animations.js (initPage returns the cleanup). */
import { useEffect, useLayoutEffect } from "react";
import { initPage } from "@/lib/animations";

// layout effect: the animation start states are applied before the new page is painted,
// so after a client-side navigation the hero text never flashes in its final position first
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function PageAnimations() {
  useBeforePaint(() => initPage(document.querySelector("main")), []);
  return null;
}
