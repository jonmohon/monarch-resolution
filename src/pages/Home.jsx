import { useNavigate } from "react-router-dom";
import Accordion from "../ds/Accordion.jsx";
import Button from "../ds/Button.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import ServiceCard from "../ds/ServiceCard.jsx";
import { ParallaxImage, Reveal } from "../components/motion.jsx";
import { Section, SectionHead } from "../components/Section.jsx";
import { CheckIcon, LifebuoyIcon, PhoneIcon, RouteIcon, SealIcon } from "../components/icons.jsx";
import LeadForm from "../site/LeadForm.jsx";
import Seo from "../components/Seo.jsx";
import { FAQS } from "../data.js";
import heroImg from "../assets/hero.webp";
import clearPath2 from "../assets/clear-path-2.webp";
import clearPath from "../assets/clear-path.webp";
import focusedImg from "../assets/focused.webp";

function Hero() {
  const navigate = useNavigate();
  return (
    <section style={{ position: "relative", background: "var(--navy-900)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ParallaxImage src={heroImg} alt="A couple finally free of their unwanted timeshare" biasY={0} strength={180} eager imgStyle={{ scale: "1.08" }} />
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
          <div className="hero-rise">
            <Eyebrow onDark withRule>
              Timeshare Exit Experts
            </Eyebrow>
          </div>
          <h1
            className="hero-rise hero-rise-1"
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
            className="hero-rise hero-rise-2"
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
          <div className="hero-rise hero-rise-3" style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" href="tel:8888954009" iconLeft={<PhoneIcon />}>
              Call Now
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              href="/process"
              onClick={(e) => {
                e.preventDefault();
                navigate("/process");
              }}
            >
              See the Process
            </Button>
          </div>
        </div>
        <div className="hero-rise hero-rise-4">
          <LeadForm compact title="Request Your Free Exit Analysis" />
        </div>
      </div>
    </section>
  );
}

const TRUST_BRANDS = ["Wyndham", "Hilton Grand Vacations", "Marriott Vacation Club", "Diamond Resorts", "Westgate", "Bluegreen"];

function TrustStrip() {
  return (
    <div style={{ background: "var(--surface-inverse-2)", borderBottom: "1px solid var(--border-on-dark)", padding: "16px 0" }}>
      <div className="container" style={{ textAlign: "center", paddingBottom: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-on-dark-muted)",
          }}
        >
          We help owners exit timeshares from developers including
        </span>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...TRUST_BRANDS, ...TRUST_BRANDS].map((b, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "rgba(255,255,255,0.72)", fontWeight: 500, whiteSpace: "nowrap" }}>
              {b}
            </span>
          ))}
        </div>
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
    d: "We focus on owners experiencing financial strain or health-related challenges, taking on files where we have high confidence in a successful resolution.",
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
          <Reveal key={i} delay={i * 120}>
            <div style={{ borderTop: "3px solid var(--teal-500)", paddingTop: 22 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h4)", fontWeight: 600, color: "var(--text-strong)", margin: 0 }}>
                {x.t}
              </h3>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.62, color: "var(--text-body)" }}>{x.d}</p>
            </div>
          </Reveal>
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
        <Reveal>
          <div className="zoom-frame" style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", height: 420, boxShadow: "var(--shadow-xl)" }}>
            <ParallaxImage src={clearPath2} alt="A clear path out of a timeshare contract" strength={90} />
          </div>
        </Reveal>
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
          <Button
            variant="primary"
            size="lg"
            href="/consultation"
            onClick={(e) => {
              e.preventDefault();
              navigate("/consultation");
            }}
          >
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
    d: "Our resolution specialists manage the cancellation of your timeshare contract from start to finish. When a file requires legal work, it is referred to independent licensed attorneys.",
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
        intro="Timeshare exits are complex. Contracts vary widely, and developers often make the process difficult. We review your contract and build a strategy tailored to your situation."
      />
      <div className="grid-3">
        {SERVICES.map((s, i) => (
          <Reveal key={i} delay={i * 120}>
            <ServiceCard title={s.t} icon={s.icon} style={{ height: "100%" }}>
              {s.d}
            </ServiceCard>
          </Reveal>
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
          <Reveal key={i} delay={i * 110}>
            <ServiceCard step={i + 1} title={s.t} style={{ height: "100%" }}>
              {s.d}
            </ServiceCard>
          </Reveal>
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
              <Reveal key={i} delay={i * 100} y={18}>
                <li style={{ display: "flex", gap: 13, alignItems: "flex-start", fontSize: 17, color: "var(--text-body)" }}>
                  <span style={{ flexShrink: 0, marginTop: 3, color: "var(--brand-accent-ink)" }}>
                    <CheckIcon />
                  </span>
                  {h}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={420} y={18}>
            <Button
              variant="secondary"
              size="lg"
              href="/consultation"
              onClick={(e) => {
                e.preventDefault();
                navigate("/consultation");
              }}
            >
              Get Started
            </Button>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="zoom-frame" style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", height: 440, boxShadow: "var(--shadow-lg)" }}>
            <ParallaxImage src={focusedImg} alt="Timeshare owners reviewing their exit options" biasY={10} strength={80} />
          </div>
        </Reveal>
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
        <ParallaxImage src={clearPath} strength={140} />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "var(--section-y) var(--gutter)" }}>
        <Reveal>
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
        <Button
          variant="primary"
          size="lg"
          href="/consultation"
          onClick={(e) => {
            e.preventDefault();
            navigate("/consultation");
          }}
        >
          Get Started
        </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <Seo path="/" />
      <Hero />
      <TrustStrip />
      <IntroThreeUp />
      <ClearPath />
      <Services />
      <Process />
      <WhoWeHelp />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
