import { waLink, WA_HELLO } from "@/data/site";
import QuoteForm from "@/components/home/QuoteForm";

// 13. Get a quotation — intro text + direct WhatsApp button, and the enquiry form
// (QuoteForm is the only client part: it builds the WhatsApp message on submit).
export default function Quotation() {
  return (
    <section className="section quote" id="contact">
      <div className="container quote__inner">
        <div className="quote__text">
          <h2 className="heading" data-reveal>get a quotation</h2>
          <p className="subheading" data-reveal>free audit first, then one fixed price — no surprises</p>
          <p className="description" data-reveal>tell us about your business. we'll reply within 24 hours with a free audit of your website and google presence, and a fixed price.</p>
          <div className="quote__direct" data-reveal>
            <a href={waLink(WA_HELLO)} data-whatsapp className="btn" target="_blank" rel="noopener">chat on whatsapp</a>
          </div>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
