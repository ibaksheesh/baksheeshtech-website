"use client";
/* "Share resume" button. On phones it opens the phone's own share sheet (WhatsApp, Gmail, LinkedIn…);
   on computers, or where the share sheet isn't available, it opens a small menu instead. */
import { useEffect, useRef, useState } from "react";

export default function ShareResume({ url, title, text, className = "btn" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef(null);

  // close the menu on an outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!box.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const onShare = async () => {
    const phone = window.matchMedia("(pointer: coarse)").matches;
    if (phone && navigator.share) {
      try { await navigator.share({ title, text, url }); return; }
      catch (e) { if (e.name === "AbortError") return; } // the visitor closed the sheet
    }
    setOpen((o) => !o);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const enc = encodeURIComponent;
  return (
    <div className="share" ref={box}>
      <button type="button" className={className} onClick={onShare} aria-expanded={open} aria-haspopup="menu">share resume</button>
      {open && (
        <div className="share__menu" role="menu">
          <a role="menuitem" href={`https://wa.me/?text=${enc(`${text} ${url}`)}`} target="_blank" rel="noopener">whatsapp</a>
          <a role="menuitem" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener">linkedin</a>
          <a role="menuitem" href={`mailto:?subject=${enc(title)}&body=${enc(`${text}\n${url}`)}`}>email</a>
          <button role="menuitem" type="button" onClick={onCopy}>{copied ? "link copied ✓" : "copy link"}</button>
        </div>
      )}
    </div>
  );
}
