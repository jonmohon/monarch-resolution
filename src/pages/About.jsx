import Eyebrow from "../ds/Eyebrow.jsx";
import Stat from "../ds/Stat.jsx";
import CoverImage from "../components/CoverImage.jsx";
import PageHero from "../components/PageHero.jsx";
import ScheduleBand from "../components/ScheduleBand.jsx";
import { Section } from "../components/Section.jsx";
import aboutHero from "../assets/about-hero.jpg";
import commitment from "../assets/commitment.jpg";

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="The Timeshare Exit Experts"
        intro="We empower timeshare owners to reclaim their financial freedom through expertly guided exit strategies — at the forefront of the industry for over a decade."
        biasY={10}
        img={aboutHero}
      />
      <Section>
        <div className="about-split">
          <div>
            <Eyebrow withRule>Our Commitment</Eyebrow>
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
              Integrity, transparency, and respect
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--text-body)", margin: "0 0 16px" }}>
              Every timeshare situation is unique and comes with its own set of challenges. This insight drives our commitment to tailored exit
              plans that respect the individual circumstances of each client.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--text-body)", margin: 0 }}>
              Whether you're facing financial hardship, changes in your personal life, or simply wish to reassess your investment, our team of
              legal experts is here to guide you every step of the way toward a successful resolution.
            </p>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: 440, boxShadow: "var(--shadow-lg)" }}>
            <CoverImage src={commitment} />
          </div>
        </div>
      </Section>
      <Section dark>
        <div className="grid-3">
          <Stat onDark value="30+" label="Years of leadership experience" />
          <Stat onDark value="10,000+" label="Owners helped to freedom" accent="teal" />
          <Stat onDark value="$100M+" label="In financial relief secured" />
        </div>
      </Section>
      <ScheduleBand />
    </div>
  );
}
