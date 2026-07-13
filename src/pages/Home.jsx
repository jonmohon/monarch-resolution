import { useNavigate } from "react-router-dom";
import Accordion from "../ds/Accordion.jsx";
import Button from "../ds/Button.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import ServiceCard from "../ds/ServiceCard.jsx";
import Stat from "../ds/Stat.jsx";
import CoverImage from "../components/CoverImage.jsx";
import { Section, SectionHead } from "../components/Section.jsx";
import { CheckIcon, LifebuoyIcon, PhoneIcon, RouteIcon, SealIcon } from "../components/icons.jsx";
import LeadForm from "../site/LeadForm.jsx";
import { FAQS } from "../data.js";
import heroImg from "../assets/hero.jpg";
import clearPath2 from "../assets/clear-path-2.jpg";
import clearPath from "../assets/clear-path.jpg";
import focusedImg from "../assets/focused.jpg";

function Hero() {
  const navigate = useNavigate();
  return (
    <section style={{ position: "relative", background: "var(--navy-900)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <CoverImage src={heroImg} biasY={0} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(95deg, rgba(5,16,31,0.38) 0%, rgba(5,16,31,0.24) 50%, rgba(5,16,31,0.14) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="container hero-grid" style={{ position: "relative", zIndex: 2, padding: "96px var(--gutter)" }}>
        <div>
          <Eyebrow onDark withRule>
            Timeshare Exit Experts
          </Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "var(--fs-display-1)",
              color: "#fff",
              margin: "18px 0 0",
              lineHeight: 1.04,
              textShadow: "0 2px 4px rgba(0,0,0,0.55), 0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Get Out of an Unwanted Timeshare — For Good
          </h1>
          <p
            style={{
              marginTop: 22,
              maxWidth: "52ch",
              fontSize: 19,
              lineHeight: 1.6,
              color: "#fff",
              textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
            If your timeshare no longer fits your life or finances, Monarch Resolution helps you cancel and exit your contract so you can move
            forward with confidence and peace of mind.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" href="tel:8888954009" iconLeft={<PhoneIcon />}>
              Call Now
            </Button>
            <Button variant="outline-light" size="lg" onClick={() => navigate("/process")}>
              See the Process
            </Button>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            <Stat onDark value="10,000+" label="Owners helped" />
            <Stat onDark value="$100M+" label="In financial relief" accent="teal" />
            <Stat onDark value="30+" label="Years of experience" />
          </div>
        </div>
        <LeadForm compact title="Request Your Free Exit Analysis" />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div style={{ background: "var(--surface-inverse-2)", borderBottom: "1px solid var(--border-on-dark)" }}>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, flexWrap: "wrap", padding: "18px var(--gutter)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-on-dark-muted)",
          }}
        >
          As trusted by owners of
        </span>
        {["Wyndham", "Hilton Grand Vacations", "Marriott Vacation Club", "Diamond Resorts", "Westgate"].map((b) => (
          <span key={b} style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

const THREE_UP = [
  {
    t: "Navigating Your Exit",
    d: "We specialize in guiding timeshare owners through the complexities of contract termination — a seamless, stress-free exit, especially for those facing financial or medical hardship.",
  },
  {
    t: "Who We Serve",
    d: "We focus on owners experiencing financial strain or health-related challenges, taking on cases where we have high confidence in a successful resolution.",
  },
  {
    t: "Start Your Journey",
    d: "Ready to release the burden of your timeshare contract? Book a meeting today for a personalized quote and a smooth, affordable exit.",
  },
];

function IntroThreeUp() {
  return (
    <Section>
      <div className="grid-3-loose">
        {THREE_UP.map((x, i) => (
          <div key={i} style={{ borderTop: "3px solid var(--teal-500)", paddingTop: 22 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h4)", fontWeight: 600, color: "var(--text-strong)", margin: 0 }}>
              {x.t}
            </h3>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.62, color: "var(--text-body)" }}>{x.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ClearPath() {
  const navigate = useNavigate();
  return (
    <Section dark>
      <div className="split-2">
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: 420, boxShadow: "var(--shadow-xl)" }}>
          <CoverImage src={clearPath2} />
        </div>
        <div>
          <SectionHead
            onDark
            eyebrow="A Clear Path Out"
            title="A clear path out of your timeshare"
            intro="Many owners feel trapped by rising maintenance fees, special assessments, or long-term contracts they were pressured into signing. At Monarch Resolution, we focus exclusively on timeshare cancellations and exits — not resales, rentals, or title transfers."
          />
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              borderLeft: "3px solid var(--gold-500)",
              paddingLeft: 20,
              margin: "0 0 30px",
            }}
          >
            "Our mission is simple: help timeshare owners legally end their obligations and regain financial freedom."
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate("/consultation")}>
            Free Consultation
          </Button>
        </div>
      </div>
    </Section>
  );
}

const SERVICES = [
  {
    t: "Tailored Exit Planning",
    d: "Collaborate with our experts to formulate a precise, cost-effective exit plan adapted to protect your interests and meet your circumstances.",
    icon: <RouteIcon />,
  },
  {
    t: "Contract Closure",
    d: "Our legal team efficiently manages the dissolution of your timeshare contract, ensuring a smooth, professional resolution.",
    icon: <SealIcon />,
  },
  {
    t: "Ongoing Support",
    d: "After your exit, continue to receive guidance from our team as you move forward into a future without timeshare burdens.",
    icon: <LifebuoyIcon />,
  },
];

function Services() {
  return (
    <Section alt>
      <SectionHead
        eyebrow="Our Services"
        title="What Monarch Resolution does"
        intro="Timeshare exits are complex. Contracts vary widely, and developers often make the process difficult. With decades of combined experience, we review your contract and build a strategy tailored to your situation."
      />
      <div className="grid-3">
        {SERVICES.map((s, i) => (
          <ServiceCard key={i} title={s.t} icon={s.icon}>
            {s.d}
          </ServiceCard>
        ))}
      </div>
    </Section>
  );
}

const STEPS = [
  { t: "Free Consultation", d: "We listen, assess your situation, and explain realistic options." },
  { t: "Contract Review & Strategy", d: "Your timeshare agreement is analyzed to identify the strongest exit approach." },
  { t: "Negotiation & Resolution", d: "We pursue a formal cancellation or exit and communicate with the developer on your behalf." },
  { t: "Ongoing Guidance", d: "You're supported throughout so you're never left guessing what comes next." },
];

function Process() {
  return (
    <Section>
      <SectionHead
        eyebrow="Our Timeshare Exit Process"
        title="We simplify a complicated process"
        intro="We guide you from start to finish — no shortcuts, no empty promises. Just real guidance and advocacy."
      />
      <div className="grid-4">
        {STEPS.map((s, i) => (
          <ServiceCard key={i} step={i + 1} title={s.t}>
            {s.d}
          </ServiceCard>
        ))}
      </div>
    </Section>
  );
}

const HELP = [
  "Tired of paying increasing maintenance fees",
  "No longer using or benefiting from their timeshare",
  "Experiencing financial strain or life changes",
  "Looking for a legitimate, long-term exit solution",
];

function WhoWeHelp() {
  const navigate = useNavigate();
  return (
    <Section alt>
      <div className="split-2-tight">
        <div>
          <SectionHead eyebrow="Who We Help" title="If you're ready to move on, we're here to help" />
          <ul style={{ listStyle: "none", margin: "0 0 30px", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {HELP.map((h, i) => (
              <li key={i} style={{ display: "flex", gap: 13, alignItems: "flex-start", fontSize: 17, color: "var(--text-body)" }}>
                <span style={{ flexShrink: 0, marginTop: 3, color: "var(--brand-accent-ink)" }}>
                  <CheckIcon />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <Button variant="secondary" size="lg" onClick={() => navigate("/consultation")}>
            Get Started
          </Button>
        </div>
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: 440, boxShadow: "var(--shadow-lg)" }}>
          <CoverImage src={focusedImg} biasY={10} />
        </div>
      </div>
    </Section>
  );
}

function AboutStats() {
  return (
    <Section dark>
      <div style={{ maxWidth: 820 }}>
        <SectionHead
          onDark
          eyebrow="About Monarch"
          title="Experience isn't a claim — it's the reason clients trust us"
          intro="Our founders bring more than 30 years of leadership experience within the timeshare exit industry, having helped over 10,000 owners break free from unwanted obligations and achieve more than $100 million in financial relief."
        />
      </div>
      <div className="grid-3" style={{ marginTop: 20, borderTop: "1px solid var(--border-on-dark)", paddingTop: 44 }}>
        <Stat onDark value="30+" label="Years of leadership experience" />
        <Stat onDark value="10,000+" label="Owners helped to freedom" accent="teal" />
        <Stat onDark value="$100M+" label="In financial relief secured" />
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section>
      <div className="faq-grid">
        <SectionHead eyebrow="FAQs" title="Frequently asked questions" maxWidth="26ch" />
        <Accordion items={FAQS} />
      </div>
    </Section>
  );
}

function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section style={{ background: "linear-gradient(120deg, var(--navy-800), var(--navy-950))", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.22 }}>
        <CoverImage src={clearPath} />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "var(--section-y) var(--gutter)" }}>
        <Eyebrow onDark align="center">
          Focused on What Matters
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "var(--fs-display-2)",
            color: "#fff",
            margin: "16px auto 18px",
            maxWidth: "18ch",
            lineHeight: 1.08,
          }}
        >
          Exiting your timeshare — the right way
        </h2>
        <p style={{ maxWidth: "60ch", margin: "0 auto 32px", fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
          Our goal is clarity, transparency, and results — so you can finally close this chapter. Discover how Monarch Resolution can facilitate a
          smooth, affordable exit.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate("/consultation")}>
          Get Started
        </Button>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TrustStrip />
      <IntroThreeUp />
      <ClearPath />
      <Services />
      <Process />
      <WhoWeHelp />
      <AboutStats />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
