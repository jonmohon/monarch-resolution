import Eyebrow from "../ds/Eyebrow.jsx";
import Stat from "../ds/Stat.jsx";
import { CheckIcon } from "../components/icons.jsx";
import LeadForm from "../site/LeadForm.jsx";

const CONSULT_POINTS = [
  ["No obligation", "A free, honest assessment of your realistic options."],
  ["Tailored strategy", "A plan built around your specific contract and developer."],
  ["Real advocacy", "We communicate with the developer on your behalf."],
  ["Ongoing support", "Guidance from first call through Club Freedom."],
];

export default function ConsultationPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--navy-800), var(--navy-950))" }}>
        <div className="container consult-grid" style={{ padding: "80px var(--gutter)" }}>
          <div>
            <Eyebrow onDark withRule>
              Exit Consultation
            </Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "var(--fs-display-2)",
                color: "#fff",
                margin: "16px 0 20px",
                lineHeight: 1.08,
              }}
            >
              Start your free exit analysis today
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.62, color: "rgba(255,255,255,0.88)", maxWidth: "48ch", margin: "0 0 34px" }}>
              Tell us about your timeshare and one of our advisors will reach out within one business day with realistic, no-pressure guidance.
            </p>
            <div className="consult-points">
              {CONSULT_POINTS.map(([t, d], i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--teal-400)", flexShrink: 0, marginTop: 2 }}>
                    <CheckIcon />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#fff",
                        marginBottom: 3,
                      }}
                    >
                      {t}
                    </div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--text-on-dark-muted)" }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, paddingTop: 26, borderTop: "1px solid var(--border-on-dark)", display: "flex", gap: 34 }}>
              <Stat onDark value="10,000+" label="Owners helped" />
              <Stat onDark value="$100M+" label="In relief" accent="teal" />
            </div>
          </div>
          <LeadForm title="Request Your Free Exit Analysis" />
        </div>
      </section>
    </div>
  );
}
