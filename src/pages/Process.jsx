import { Reveal } from "../components/motion.jsx";
import PageHero from "../components/PageHero.jsx";
import ScheduleBand from "../components/ScheduleBand.jsx";
import { Section, SectionHead } from "../components/Section.jsx";
import Seo from "../components/Seo.jsx";
import clearPathOut from "../assets/clear-path-out.webp";

const EXIT_STEPS = [
  {
    n: 1,
    t: "Free Consultation & Case Review",
    d: "Your journey begins with a call with a friendly exit advisor. We gather essential information about your contract and assess whether your file can lead to a successful resolution. Each situation is unique, so your advisor crafts a customized exit strategy tailored to your circumstances — and if we don't believe we can help, we tell you that up front.",
  },
  {
    n: 2,
    t: "Onboarding & Documentation",
    d: "After acceptance and completed agreements, you'll receive a welcome call from our Client Services team, who help you assemble the file: your contract and deed, financing documents, and anything you kept from the sales presentation. Evidence drives every option, so this step matters. Client Services remains your primary contact from here on.",
  },
  {
    n: 3,
    t: "Legal Review & Advocacy",
    d: "This is where the work happens. Your documents go through attorney-led review of the contract and the circumstances of the sale, and from that point forward we communicate with the developer on your behalf — you no longer have to field those calls yourself. This is the longest phase, and its length depends on your contract and how the developer responds.",
  },
  {
    n: 4,
    t: "Resolution & Release",
    d: "Your obligation to the timeshare ends, and you receive documentation confirming it. If the situation affected your credit along the way, we can help you address that as part of wrapping up your file. Welcome to your new, timeshare-free life.",
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
        scrim="linear-gradient(180deg, rgba(5,16,31,0.58) 0%, rgba(5,16,31,0.34) 45%, rgba(5,16,31,0.68) 100%)"
        biasY={10}
        img={clearPathOut}
        imgAlt="A clear path forward out of timeshare ownership"
      />
      <Section>
        <SectionHead
          eyebrow="Setting Clear Expectations"
          title="The cancellation process, step by step"
          intro="While our services come with a fee and we can't guarantee specific outcomes, our process gives every client a clear, supported route forward."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {EXIT_STEPS.map((s, i) => (
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
