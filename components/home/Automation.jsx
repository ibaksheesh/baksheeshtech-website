// 9. AI automation — six capability cards, the tools list, and the notification feed.
// The feed is only an example of what an automation does; lib/animations.js slides the
// notes in the first time the panel is seen, then moves a highlight down the list.
export default function Automation() {
  return (
    <section className="section automation" id="automation">
      <div className="container automation__inner">
        <div className="automation__text">
          <h2 className="heading" data-reveal>ai automation</h2>
          <p className="subheading" data-reveal>your business replies in 1 minute — even at 2 am</p>
          <p className="description" data-reveal>most enquiries are lost because nobody replies in time. we set up ai that answers every lead on whatsapp, follows up on whatsapp and email on its own, and books the appointment — built on the tools you already use, and fully owned by you.</p>

          <div className="auto-grid">
            <article className="auto-card" data-card><span className="auto-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4z M8 9h8 M8 12h5" /></svg></span><h3>whatsapp auto-reply bot</h3><p>answers prices, timings and location 24×7 in hindi or english, and hands hot leads to you</p></article>
            <article className="auto-card" data-card><span className="auto-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h18l-7 8v6l-4 2v-8z" /></svg></span><h3>lead follow-up</h3><p>leads from your website, instagram and ads get a reply in minutes and follow-ups on day 1, 3 and 7</p></article>
            <article className="auto-card" data-card><span className="auto-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v15H4z M4 10h16 M9 3v4 M15 3v4 M8 14h3" /></svg></span><h3>crm & bookings</h3><p>every lead in one crm, appointments on your calendar and reminders sent automatically</p></article>
            <article className="auto-card" data-card><span className="auto-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" /></svg></span><h3>reviews & reports</h3><p>google review requests after every visit, and a weekly leads report on whatsapp</p></article>
            <article className="auto-card" data-card><span className="auto-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 20l1.4-3.8A8 8 0 1 1 8 18.6z M9 9.5q.5 3.5 5 5" /></svg></span><h3>whatsapp broadcasts</h3><p>offers, festival greetings and reminders to customers who opted in, with templates approved by whatsapp</p></article>
            <article className="auto-card" data-card><span className="auto-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z M3 7l9 6 9-6" /></svg></span><h3>email marketing</h3><p>newsletters, offers and follow-up emails that go out on their own, with open and click reports</p></article>
          </div>

          <div className="auto-foot" data-reveal>
            <ul className="auto-tools" aria-label="Tools">
              <li>GoHighLevel</li><li>n8n</li><li>OpenAI</li><li>Claude</li><li>Gemini</li><li>WhatsApp Business</li>
            </ul>
            <a href="#contact" className="btn">automate my business</a>
          </div>
        </div>

        {/* notification feed: an example of what an automation does, animated in lib/animations.js */}
        <div className="feed" aria-label="Example automation workflow" data-reveal>
          <div className="feed__glow" aria-hidden="true"></div>
          <div className="feed__head">
            <span className="feed__live"><i></i>automation running</span>
            <span className="feed__tag">example workflow</span>
          </div>
          <ul className="feed__list" id="feed">
            <li className="note note--wa"><span className="note__icon">wa</span><div><p className="note__app">WhatsApp <time>now</time></p><p>new enquiry answered & qualified</p></div></li>
            <li className="note note--cal"><span className="note__icon">31</span><div><p className="note__app">Calendar <time>1 min ago</time></p><p>site visit booked for thursday, 11:00 am</p></div></li>
            <li className="note note--crm"><span className="note__icon">crm</span><div><p className="note__app">CRM <time>1 min ago</time></p><p>lead moved to “quote sent”</p></div></li>
            <li className="note note--mail"><span className="note__icon">@</span><div><p className="note__app">Email <time>2 hours ago</time></p><p>follow-up 2 of 3 sent automatically</p></div></li>
            <li className="note note--rep"><span className="note__icon">↗</span><div><p className="note__app">Reports <time>monday</time></p><p>weekly leads report is ready</p></div></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
