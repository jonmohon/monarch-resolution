import Accordion from "../ds/Accordion.jsx";
import { Reveal } from "../components/motion.jsx";
import PageHero from "../components/PageHero.jsx";
import ScheduleBand from "../components/ScheduleBand.jsx";
import { Section } from "../components/Section.jsx";
import { FAQS } from "../data.js";
import Seo from "../components/Seo.jsx";
import { faqJsonLd } from "../lib/seo.js";
import whoWeHelp from "../assets/who-we-help.webp";

export default function FaqsPage() {
  return (
    <div>
      <Seo path="/faqs" jsonLd={faqJsonLd(FAQS)} />
      <PageHero
        eyebrow="FAQs"
        title="Answers About Timeshare Exit"
        intro="Straight answers about timeshare cancellation, costs, and what to expect when you work with Monarch Resolution."
        biasY={10}
        img={whoWeHelp}
        imgAlt="Timeshare owners getting straight answers about the exit process"
      />
      <Section>
        <Reveal style={{ maxWidth: 860, margin: "0 auto" }}>
          <Accordion items={FAQS} />
        </Reveal>
      </Section>
      <ScheduleBand />
    </div>
  );
}
