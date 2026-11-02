import Link from "next/link";
import { SITE, waLink, WA_HELLO } from "@/data/site";

/* Site footer + back-to-top button. Static markup only — the scrolling
   track, badge reveal, scramble and progress ring live in SiteEffects.jsx. */
export default function Footer() {
  return (
    <>
      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer__scroll" aria-hidden="true">
          <div className="footer__scroll-track" id="footer-track">
            <span>web development</span><i className="corner"></i><span>seo & ai ranking</span><i className="corner corner--yellow"></i><span>digital branding</span><i className="corner"></i><span>ai automation</span><i className="corner corner--yellow"></i>
            <span>web development</span><i className="corner"></i><span>seo & ai ranking</span><i className="corner corner--yellow"></i><span>digital branding</span><i className="corner"></i><span>ai automation</span><i className="corner corner--yellow"></i>
          </div>
        </div>

        <div className="container">
          <div className="footer__badge" data-reveal=""><span>Design Driven{" "}</span><span className="scramble" data-scramble="Development">Development</span></div>

          <div className="footer__cols">
            <div>
              <h4>know about us</h4>
              <Link href="/#about">about</Link><Link href="/portfolio/">portfolio</Link><Link href="/pricing/">pricing</Link><Link href="/#contact">get a quote</Link>
            </div>
            <div>
              <h4>contact</h4>
              <p>no spamming please.</p>
              <a href={`mailto:${SITE.email}`} data-email=""><span data-email-text="">{SITE.email}</span></a>
              <a href={waLink(WA_HELLO)} data-whatsapp="" target="_blank" rel="noopener">{SITE.phoneDisplay}</a>
            </div>
            <div>
              <h4>work enquiries</h4>
              <p>level up your business with us.</p>
              <p>share your needs:</p>
              <Link href="/#contact">enquiry form</Link>
            </div>
            <div>
              <h4>services</h4>
              <Link href="/#services">web development</Link><Link href="/#services">app development</Link><Link href="/#services">seo & ai ranking</Link><Link href="/#services">design & branding</Link><Link href="/#automation">ai automation</Link>
            </div>
          </div>

          <p className="footer__follow">engage and follow</p>
          <div className="social social--footer">
            {/* TODO (Baksheesh): add your real profile links */}
            <a href="#" aria-label="LinkedIn" className="social__in">in</a>
            <a href="#" aria-label="Instagram" className="social__ig">ig</a>
            <a href={waLink(WA_HELLO)} data-whatsapp="" target="_blank" rel="noopener" aria-label="WhatsApp" className="social__wa">wa</a>
            <a href={`mailto:${SITE.email}`} data-email="" aria-label="Email" className="social__mail">@</a>
          </div>
        </div>
        <div className="footer__bottom">
          {/* year is filled in at build time */}
          <div className="container"><p>© <span id="year">{new Date().getFullYear()}</span> baksheesh tech · all rights reserved</p></div>
        </div>
      </footer>

      {/* back to top with scroll-progress ring (smooth scroll handled in SiteEffects) */}
      <a href="#top" className="to-top" id="to-top" aria-label="Back to top">
        <svg viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r="23" className="to-top__track" /><circle cx="25" cy="25" r="23" className="to-top__ring" id="to-top-ring" /></svg>
        <span>↑</span>
      </a>
    </>
  );
}
