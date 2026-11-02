"use client";

import { useState } from "react";
import { SITE, waLink } from "@/data/site";

/* ---------- Contact form -> WhatsApp ----------
   No backend: on submit the answers are turned into a pre-filled WhatsApp message.
   Fields stay uncontrolled (read on submit, cleared with form.reset()); React state only
   holds the red "is-invalid" borders and the status note, so the DOM matches the old site. */
export default function QuoteForm() {
  const [invalid, setInvalid] = useState({ name: false, message: false });
  const [note, setNote] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (n) => form.elements.namedItem(n);
    const name = field("name").value.trim();
    const business = field("business").value.trim();
    const website = field("website").value.trim();
    const message = field("message").value.trim();

    // name and goal are required (novalidate: we show our own red border + note instead of browser bubbles)
    const missing = { name: !name, message: !message };
    setInvalid(missing);
    if (missing.name || missing.message) {
      setNote("please fill in your name and goal.");
      return;
    }

    const needs = [...form.querySelectorAll('input[name="need"]:checked')].map((c) => c.value);
    const lines = [
      `Hi Baksheesh! New enquiry from ${new URL(SITE.url).host}`,
      "",
      `Name: ${name}`,
      business ? `Business: ${business}` : null,
      website ? `Website: ${website}` : null,
      needs.length ? `Need: ${needs.join(", ")}` : null,
      "",
      `Goal: ${message}`,
    ].filter((l) => l !== null);

    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    setNote("opening whatsapp… if it didn't open, use the whatsapp button.");
    form.reset();
  };

  // typing in a field clears its red border (one listener on the form; input events bubble)
  const onInput = (e) => {
    const f = e.target.name;
    if (f === "name" || f === "message") setInvalid((s) => (s[f] ? { ...s, [f]: false } : s));
  };

  return (
    <form className="form" id="contact-form" noValidate data-reveal onSubmit={onSubmit} onInput={onInput}>
      <div className="form__row">
        <label><span>your name</span><input type="text" name="name" required autoComplete="name" className={invalid.name ? "is-invalid" : undefined} /></label>
        <label><span>business name</span><input type="text" name="business" autoComplete="organization" /></label>
      </div>
      <label><span>website (if any)</span><input type="text" name="website" placeholder="yourbusiness.com" inputMode="url" /></label>
      <fieldset className="form__chips">
        <legend>what do you need?</legend>
        <label><input type="checkbox" name="need" value="Website" /><span>website</span></label>
        <label><input type="checkbox" name="need" value="SEO" /><span>seo</span></label>
        <label><input type="checkbox" name="need" value="Branding & graphics" /><span>branding & graphics</span></label>
        <label><input type="checkbox" name="need" value="App" /><span>app</span></label>
        <label><input type="checkbox" name="need" value="E-commerce" /><span>e-commerce</span></label>
        <label><input type="checkbox" name="need" value="AI automation" /><span>ai automation</span></label>
      </fieldset>
      <label><span>your goal</span><textarea name="message" rows={4} required placeholder="e.g. more enquiries from google for my clinic" className={invalid.message ? "is-invalid" : undefined}></textarea></label>
      <button type="submit" className="btn btn--solid">send on whatsapp</button>
      <p className="form__note" id="form-note" role="status">{note}</p>
    </form>
  );
}
