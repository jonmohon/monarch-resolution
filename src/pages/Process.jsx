import { Reveal } from "../components/motion.jsx";
import PageHero from "../components/PageHero.jsx";
import ScheduleBand from "../components/ScheduleBand.jsx";
import { Section, SectionHead } from "../components/Section.jsx";
import Seo from "../components/Seo.jsx";
import clearPathOut from "../assets/clear-path-out.webp";

const TITLE_STEPS = [
  {
    n: 1,
    t: "Initial Consultation & Analysis",
    d: "Your journey begins with a call with a friendly exit advisor. We gather essential information about your contract and assess whether your file can lead to a successful resolution. Each situation is unique, so your advisor crafts a customized exit strategy tailored to your circumstances.",
  },
  {
    n: 2,
    t: "Seamless Client Integration",
    d: "After acceptance and completed agreements, you'll receive a welcome call from our Client Services team, who help you gather required documentation. They remain your primary contact, guiding you through each step toward resolution.",
  },
  {
    n: 3,
    t: "Resolution & Celebration",
    d: "The final step is the best one — it's time to celebrate. After meticulous work, you achieve “Club Freedom” status with a successfully resolved timeshare. Welcome to your new, timeshare-free life.",
  },
];

export default function ProcessPage() {
  return (
    <div>
      <Seo path="/process" />
      <PageHero
        eyebrow="Process"
        title="Your Proven Path to Timeshare Freedom"
        intro="We specialize in helping timeshare owners escape unwanted contracts. Our focused experience, exceptional service, and proven process help owners regain their freedom."
        scrim="linear-gradient(180deg, rgba(5,16,31,0.35) 0%, rgba(5,16,31,0.22) 45%, rgba(5,16,31,0.62) 100%)"
        biasY={10}
        img={clearPathOut}
        imgAlt="A clear path forward out of timeshare ownership"
      />
      <Section>
        <SectionHead
          eyebrow="Setting Clear Expectations"
          title="The title transfer process, step by step"
          intro="While our services come with a fee and we can't guarantee specific outcomes, our process gives every client a clear, supported route forward."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {TITLE_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
            <div className="step-card">
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 600, color: "var(--brand-prestige)", lineHeight: 0.9, minWidth: 78 }}>
                {String(s.n).padStart(2, "0")}
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 27, fontWeight: 600, color: "var(--text-strong)", margin: "4px 0 10px" }}>
                  {s.t}
                </h3>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.62, color: "var(--text-body)", maxWidth: "72ch" }}>{s.d}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <ScheduleBand />
    </div>
  );
}
