import { useNavigate } from "react-router-dom";
import Button from "../ds/Button.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import { CheckIcon } from "../components/icons.jsx";
import { ParallaxImage, Reveal } from "../components/motion.jsx";
import PageHero from "../components/PageHero.jsx";
import ScheduleBand from "../components/ScheduleBand.jsx";
import { Section, SectionHead } from "../components/Section.jsx";
import Seo from "../components/Seo.jsx";
import aboutHero from "../assets/about-hero.webp";
import commitment from "../assets/commitment.webp";
import lukePhoto from "../assets/luke.webp";
const OWNER_PHOTO = lukePhoto;

function OwnerPortrait() {
  return (
    <div
      className="zoom-frame"
      style={{
        position: "relative",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        boxShadow: "var(--shadow-xl)",
        background: "linear-gradient(160deg, var(--navy-800), var(--navy-950))",
      }}
    >
      {OWNER_PHOTO ? (
        <img src={OWNER_PHOTO} alt="Luke King, Founder & Owner of Monarch Resolution" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 110,
                height: 110,
                margin: "0 auto 18px",
                borderRadius: "50%",
                border: "2px solid var(--gold-500)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-display)",
                fontSize: 44,
                color: "var(--gold-500)",
              }}
            >
              MR
            </div>
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-on-dark-muted)",
              }}
            >
              Founder &amp; Owner
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "22px 26px",
          background: "linear-gradient(180deg, rgba(5,16,31,0) 0%, rgba(5,16,31,0.85) 100%)",
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", fontWeight: 600 }}>Luke King</div>
        <div style={{ fontFamily: "var(--font-label)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal-400)", marginTop: 4 }}>
          Founder &amp; Owner · Monarch Resolution
        </div>
      </div>
    </div>
  );
}

function FounderStory() {
  return (
    <Section>
      <div className="about-split">
        <Reveal>
          <Eyebrow withRule>Founder-Led, By Design</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "var(--fs-display-2)",
              color: "var(--text-strong)",
              margin: "14px 0 20px",
              lineHeight: 1.1,
            }}
          >
            Your file is handled personally by Luke King.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--text-body)", margin: "0 0 16px" }}>
            Most timeshare exit companies are built like call centers: commissioned salespeople work the phones, your file gets passed between
            departments, and nobody along the way is accountable for the outcome. Monarch Resolution was founded to be the opposite of that.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--text-body)", margin: "0 0 16px" }}>
            Here, our team simply sets your appointment — and from there, you're working with Luke King, Monarch Resolution's founder and owner.
            Your consultation is with Luke himself, and the person who assesses your situation is the same person who reviews your contract,
            builds your exit strategy, and sees your file through to resolution. No hand-offs, no scripts, no sales quotas — one experienced
            advocate who knows your file inside and out.
          </p>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--text-strong)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              borderLeft: "3px solid var(--gold-500)",
              paddingLeft: 20,
              margin: "26px 0 0",
            }}
          >
            "This industry burned a lot of people before I ever got here. The only way I know to fix that is simple: tell owners the truth, take
            the files we can win, and get the job done."
            <span style={{ display: "block", marginTop: 10, fontStyle: "normal", fontFamily: "var(--font-label)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              — Luke King, Founder &amp; Owner
            </span>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <OwnerPortrait />
        </Reveal>
      </div>
    </Section>
  );
}

const COMPARISON = [
  ["A commissioned sales rep runs your consultation", "Your consultation is with Luke — the owner, not a rep"],
  ["Your file is passed between departments", "The same advocate works your file from consultation to resolution"],
  ["Every caller is a sale to be closed", "Files are accepted only when there's a credible path out"],
  ["Scripted pitches and pressure tactics", "Straight answers about your realistic options"],
  ["A black-box process you can't see into", "You know exactly what's happening at every step"],
];

function BoutiqueDifference() {
  return (
    <Section dark>
      <SectionHead
        onDark
        center
        eyebrow="The Boutique Difference"
        title="Big firms sell volume. We deliver attention."
        intro="Timeshare exit is an industry with a trust problem — and most of that comes from companies built to maximize sign-ups, not outcomes. Here's how working with Monarch Resolution is different."
      />
      <div className="split-2-tight" style={{ alignItems: "stretch" }}>
        <Reveal>
          <div
            style={{
              height: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-on-dark)",
              borderRadius: "var(--radius-md)",
              padding: "30px 32px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-on-dark-muted)",
                marginBottom: 22,
              }}
            >
              Typical exit companies
            </div>
            {COMPARISON.map(([bad], i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: "rgba(255,255,255,0.35)" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-on-dark-muted)" }}>{bad}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div
            style={{
              height: "100%",
              background: "var(--surface-card)",
              borderRadius: "var(--radius-md)",
              padding: "30px 32px",
              boxShadow: "var(--shadow-xl)",
              borderTop: "3px solid var(--teal-500)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--brand-accent-ink)",
                marginBottom: 22,
              }}
            >
              Monarch Resolution
            </div>
            {COMPARISON.map(([, good], i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ flexShrink: 0, marginTop: 2, color: "var(--brand-accent-ink)" }}>
                  <CheckIcon />
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-body)", fontWeight: 500 }}>{good}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const PROMISES = [
  {
    t: "An honest consultation",
    d: "Your consultation is a real conversation with the owner, not a pitch. If an exit doesn't make sense for your situation, you'll hear that too — for free.",
  },
  {
    t: "Selective file acceptance",
    d: "We don't take every file. If we move forward together, it's because we see a credible, legitimate path out of your contract.",
  },
  {
    t: "One advocate, always reachable",
    d: "You'll never have to re-explain your situation to a stranger. The person who handled your consultation is the person working your file.",
  },
  {
    t: "No false promises",
    d: "No one can guarantee a specific outcome — and anyone who says otherwise is selling you something. What we promise is real work, straight answers, and relentless follow-through.",
  },
];

function OurPromise() {
  return (
    <Section alt>
      <div className="split-2-tight">
        <Reveal>
          <div
            className="zoom-frame"
            style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", height: 460, boxShadow: "var(--shadow-lg)" }}
          >
            <ParallaxImage src={commitment} alt="Advisor working one-on-one with a timeshare owner" strength={85} />
          </div>
        </Reveal>
        <div>
          <SectionHead
            eyebrow="Our Promise To You"
            title="Boutique service means you're never a file number"
            intro="Every timeshare situation is unique — and personal. This is what you can hold us to, from the first phone call to the day you're free."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {PROMISES.map((p, i) => (
              <Reveal key={i} delay={i * 110} y={20}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 30,
                      fontWeight: 600,
                      color: "var(--brand-prestige)",
                      lineHeight: 1,
                      minWidth: 44,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600, color: "var(--text-strong)", margin: "0 0 6px" }}>
                      {p.t}
                    </h3>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--text-body)" }}>{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ValuesBand() {
  const navigate = useNavigate();
  return (
    <section style={{ background: "linear-gradient(120deg, var(--navy-800), var(--navy-950))", padding: "var(--section-y) 0" }}>
      <Reveal className="container" style={{ textAlign: "center" }}>
        <Eyebrow onDark align="center">
          Integrity · Transparency · Respect
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "var(--fs-display-2)",
            color: "#fff",
            margin: "16px auto 18px",
            maxWidth: "24ch",
            lineHeight: 1.1,
          }}
        >
          Talk directly with the person who will handle your file
        </h2>
        <p style={{ maxWidth: "58ch", margin: "0 auto 30px", fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
          One free consultation. An honest read on your situation. And if we take your file, the undivided attention of the owner — not a queue
          at a call center.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" onClick={() => navigate("/consultation")}>
            Request Your Free Consultation
          </Button>
          <Button variant="outline-light" size="lg" href="tel:8888954009">
            (888) 895-4009
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div>
      <Seo path="/about" />
      <PageHero
        eyebrow="About Us"
        title="Boutique Service. Direct Access. Real Advocacy."
        intro="Monarch Resolution is a founder-led firm built on a simple idea: timeshare owners deserve to work with the person actually handling their file — not a sales floor."
        biasY={10}
        img={aboutHero}
        imgAlt="The founder-led team at Monarch Resolution"
      />
      <FounderStory />
      <BoutiqueDifference />
      <OurPromise />
      <ValuesBand />
      <ScheduleBand />
    </div>
  );
}
