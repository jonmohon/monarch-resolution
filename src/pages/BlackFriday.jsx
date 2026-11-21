import { useEffect, useState } from "react";
import Accordion from "../ds/Accordion.jsx";
import Button from "../ds/Button.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import { CheckIcon } from "../components/icons.jsx";
import { Reveal } from "../components/motion.jsx";
import { Section, SectionHead } from "../components/Section.jsx";
import LeadForm from "../site/LeadForm.jsx";
import Seo from "../components/Seo.jsx";
import { BBB_PROFILE_URL } from "../lib/seo.js";

// Black Friday 2026 offer page — the landing page for the Black Friday email series
// (Nov 24 early access, Nov 27 Black Friday, Nov 30 last day). Not in the sitemap.
//
// The deadline is real: 11:59:59 PM Pacific on Mon Nov 30, 2026 (PST = UTC-8).
// The eyebrow and countdown are decided in the browser after load (the prerendered
// HTML is built ahead of time, so it can't know today's date); once the deadline
// passes, the offer is replaced by a plain "this offer has ended" consultation pitch.
const DEADLINE = Date.parse("2026-12-01T07:59:59Z");
const BLACK_FRIDAY = Date.parse("2026-11-27T08:00:00Z"); // midnight Pacific, Fri Nov 27
const LAST_DAY = Date.parse("2026-11-30T08:00:00Z"); // midnight Pacific, Mon Nov 30
// Confirmed by Monarch before launch: the date the service agreement must be signed by.
const SIGN_BY = "[sign-by date]";

function phaseAt(now) {
  if (now > DEADLINE) return "ended";
  if (now >= LAST_DAY) return "last-day";
  if (now >= BLACK_FRIDAY) return "black-friday";
  return "early";
}
const EYEBROW = {
  early: "Early Black Friday Access",
  "black-friday": "Black Friday Offer",
  "last-day": "Cyber Monday · Last Day",
  ended: "Free Exit Consultation",
};

function useNow() {
  const [now, setNow] = useState(null); // null until mounted: prerender can't know the date
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Countdown({ now }) {
  const left = Math.max(0, DEADLINE - now);
  const parts = [
    ["Days", Math.floor(left / 86400000)],
    ["Hours", Math.floor(left / 3600000) % 24],
    ["Minutes", Math.floor(left / 60000) % 60],
    ["Seconds", Math.floor(left / 1000) % 60],
  ];
  return (
    <div role="timer" aria-label="Time left in the offer" style={{ display: "flex", gap: 10, margin: "0 0 30px" }}>
      {parts.map(([label, value]) => (
        <div key={label} style={{ minWidth: 72, padding: "12px 8px 10px", textAlign: "center", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(216,187,126,0.35)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, lineHeight: 1, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
            {String(value).padStart(2, "0")}
          </div>
          <div style={{ fontFamily: "var(--font-label)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-400)", marginTop: 6 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  ["Book your free consultation", "Fill out the form or call us. It's free, and you don't have to decide anything on the call."],
  ["We review your timeshare", "An advisor looks at your contract and developer and walks you through your realistic options."],
  ["Your 20% comes off", "If you decide to move forward, the discount goes right on your written service agreement."],
];

const TRUST = [
  ["BBB-accredited", <>A business you can look up. <a href={BBB_PROFILE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-accent)", fontWeight: 600 }}>See our BBB profile</a>.</>],
  ["Everything in writing", "Your service agreement spells out fees, scope and refund terms before you pay anything."],
  ["A free case review", "Whether or not you hire us, you'll leave the call knowing where you stand."],
];

const OFFER_FAQS = [
  { q: "Who gets the 20% off?", a: "New clients who book a consultation by 11:59 PM Pacific on Monday, November 30, 2026, and then sign a service agreement with Monarch." },
  { q: "Do I have to decide on the call?", a: "No. The consultation is free and there's no obligation. Booking before the deadline is what locks in the discount; you can take time to decide after that." },
  { q: `When do I need to sign?`, a: `To keep the discount, sign your service agreement by ${SIGN_BY}.` },
  { q: "Can I combine it with other offers?", a: "No. The Black Friday discount can't be combined with other offers." },
  { q: "Can you guarantee my timeshare will be cancelled?", a: "Every situation is different, and nobody can honestly guarantee a particular outcome or timeline. What we can promise is a clear plan, everything in writing, and real support from start to finish." },
];

const scrollToForm = () => document.getElementById("claim")?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function BlackFridayPage() {
  const now = useNow();
  const phase = now === null ? null : phaseAt(now);
  const ended = phase === "ended";

  return (
    <div>
      <Seo path="/black-friday" />
      <section style={{ background: "radial-gradient(ellipse 70% 60% at 30% 0%, var(--navy-500) 0%, rgba(27,76,120,0) 70%), linear-gradient(160deg, var(--navy-800), var(--navy-950))", position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: "linear-gradient(90deg, var(--gold-700), var(--gold-400), var(--gold-700))" }} />
        <div className="container consult-grid" style={{ padding: "80px var(--gutter)" }}>
          <div>
            <div className="hero-rise">
              <Eyebrow onDark withRule style={{ color: "var(--gold-400)" }}>
                {phase ? EYEBROW[phase] : "Black Friday Offer"}
              </Eyebrow>
            </div>
            {ended ? (
              <>
                <h1 className="hero-rise hero-rise-1" style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--fs-display-2)", color: "#fff", margin: "16px 0 20px", lineHeight: 1.08 }}>
                  Our Black Friday offer has ended
                </h1>
                <p className="hero-rise hero-rise-2" style={{ fontSize: 19, lineHeight: 1.62, color: "rgba(255,255,255,0.88)", maxWidth: "48ch", margin: "0 0 18px" }}>
                  Thanks for your interest. You can still get a free, no-pressure exit consultation: tell us about your timeshare and an advisor will reach out within one business day.
                </p>
              </>
            ) : (
              <>
                <h1 className="hero-rise hero-rise-1" style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--fs-display-1)", color: "#fff", margin: "16px 0 14px", lineHeight: 1.02 }}>
                  <span style={{ color: "var(--gold-400)", fontWeight: 600 }}>20% off</span> your timeshare exit
                </h1>
                <p className="hero-rise hero-rise-2" style={{ fontSize: 19, lineHeight: 1.62, color: "rgba(255,255,255,0.9)", maxWidth: "46ch", margin: "0 0 26px" }}>
                  {phase === "last-day" ? <strong style={{ color: "#fff" }}>Ends tonight at 11:59 PM Pacific. </strong> : null}
                  Book a free consultation by Monday, November 30 and get <strong style={{ color: "#fff" }}>20% off our service fee</strong> when you start your exit with Monarch.
                </p>
                {now !== null && <div className="hero-rise hero-rise-2"><Countdown now={now} /></div>}
              </>
            )}
            <div className="hero-rise hero-rise-3" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary" size="lg" onClick={scrollToForm}>
                {ended ? "Get my free consultation" : "Claim my 20% off"}
              </Button>
              <a href="tel:8888954009" style={{ color: "#fff", fontSize: 17, textDecoration: "none" }}>
                Or call <strong style={{ color: "var(--teal-400)" }}>(888) 895-4009</strong>
              </a>
            </div>
          </div>
          <div id="claim" className="hero-rise hero-rise-3" style={{ scrollMarginTop: 90 }}>
            <LeadForm title={ended ? "Request Your Free Exit Analysis" : "Claim Your 20% Off"} />
          </div>
        </div>
      </section>

      <Section>
        <SectionHead center eyebrow="How it works" title="Three steps to your 20% off" />
        <div className="grid-3">
          {STEPS.map(([title, text], i) => (
            <Reveal key={title} delay={i * 110} y={20}>
              <div style={{ height: "100%", padding: 30, borderRadius: "var(--radius-lg)", background: "var(--surface-card)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--navy-800)", color: "var(--gold-400)", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginBottom: 18 }}>{i + 1}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--text-strong)", margin: "0 0 10px", lineHeight: 1.15 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "var(--text-body)" }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHead center eyebrow="Why Monarch" title="Why homeowners choose us" intro={<>Want to know more first? See <a href="/process" style={{ color: "var(--text-accent)", fontWeight: 600 }}>how our process works</a>, read our <a href="/faqs" style={{ color: "var(--text-accent)", fontWeight: 600 }}>FAQs</a>, or <a href="/about" style={{ color: "var(--text-accent)", fontWeight: 600 }}>meet the team</a>.</>} />
        <div className="grid-3">
          {TRUST.map(([title, text], i) => (
            <Reveal key={title} delay={i * 110} y={20}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ color: "var(--teal-500)", flexShrink: 0, marginTop: 4 }}><CheckIcon /></span>
                <div>
                  <div style={{ fontFamily: "var(--font-label)", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-strong)", marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 16.5, lineHeight: 1.6, color: "var(--text-body)" }}>{text}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {!ended && (
        <Section>
          <SectionHead center eyebrow="Offer details" title="Questions about the offer" />
          <Reveal style={{ maxWidth: 860, margin: "0 auto" }}>
            <Accordion items={OFFER_FAQS} />
            <p style={{ margin: "28px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--text-muted)" }}>
              Offer: 20% off Monarch Resolution's standard service fee for new clients who book a consultation by 11:59 PM Pacific on November 30, 2026 and sign a service agreement by {SIGN_BY}. Cannot be combined with other offers. Every situation is different, and we can't guarantee a particular outcome or timeline. Your written service agreement explains fees, scope and refund terms before you pay anything.
            </p>
          </Reveal>
        </Section>
      )}

      <section style={{ background: "var(--surface-inverse)", padding: "var(--section-y) 0" }}>
        <Reveal className="container" style={{ textAlign: "center" }}>
          <Eyebrow onDark align="center" style={{ color: "var(--gold-400)" }}>{ended ? "Free consultation" : "Ends Monday, Nov 30"}</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--fs-display-2)", color: "#fff", margin: "14px auto 16px", maxWidth: "20ch", lineHeight: 1.1 }}>
            {ended ? "Ready for a timeshare-free future?" : "Every year you wait is another year of fees"}
          </h2>
          <p style={{ maxWidth: "52ch", margin: "0 auto 30px", fontSize: 18, color: "var(--text-on-dark-muted)", lineHeight: 1.6 }}>
            {ended ? "Book a free, no-obligation consultation and get a clear plan for your timeshare." : "Book your free consultation before 11:59 PM Pacific on Monday to lock in 20% off our service fee."}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={scrollToForm}>{ended ? "Get my free consultation" : "Claim my 20% off"}</Button>
            <Button variant="outline-light" size="lg" href="tel:8888954009">(888) 895-4009</Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
