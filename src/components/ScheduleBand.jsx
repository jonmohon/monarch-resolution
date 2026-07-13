import { useNavigate } from "react-router-dom";
import Button from "../ds/Button.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";

export default function ScheduleBand() {
  const navigate = useNavigate();
  return (
    <section style={{ background: "var(--surface-inverse)", padding: "var(--section-y) 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <Eyebrow onDark align="center">
          Schedule Your Consultation
        </Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "var(--fs-display-2)",
            color: "#fff",
            margin: "14px auto 16px",
            maxWidth: "20ch",
            lineHeight: 1.1,
          }}
        >
          Ready for a timeshare-free future?
        </h2>
        <p style={{ maxWidth: "56ch", margin: "0 auto 30px", fontSize: 18, color: "var(--text-on-dark-muted)", lineHeight: 1.6 }}>
          Contact Monarch Resolution for a personalized consultation and let us guide you back to financial freedom.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" onClick={() => navigate("/consultation")}>
            Get Started
          </Button>
          <Button variant="outline-light" size="lg" href="tel:8888954009">
            (888) 895-4009
          </Button>
        </div>
      </div>
    </section>
  );
}
