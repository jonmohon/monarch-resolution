import { useState } from "react";
import Button from "../ds/Button.jsx";
import Checkbox from "../ds/Checkbox.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import Input from "../ds/Input.jsx";
import Select from "../ds/Select.jsx";

// Compact lead-capture form used in the hero and the consultation page.
// TODO: wire the submit handler to a real endpoint (Zapier webhook / CRM)
// before launch — currently it only shows the thank-you state.
export default function LeadForm({ title = "Request Your Free Exit Analysis", compact = false }) {
  const [dev, setDev] = useState("");
  const [src, setSrc] = useState("");
  const [c1, setC1] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)", padding: 40, textAlign: "center" }}>
        <div
          style={{
            width: 60,
            height: 60,
            margin: "0 auto 18px",
            borderRadius: "50%",
            background: "var(--teal-100)",
            display: "grid",
            placeItems: "center",
            color: "var(--brand-accent-ink)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--text-strong)", margin: "0 0 8px" }}>Thank you.</h3>
        <p style={{ margin: 0, color: "var(--text-body)" }}>An exit advisor will reach out within one business day to explain your realistic options.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xl)",
        padding: compact ? 28 : 34,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <div style={{ marginBottom: 2 }}>
        <Eyebrow>Get Your Quote</Eyebrow>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--text-strong)", margin: "8px 0 0", lineHeight: 1.15 }}>{title}</h3>
      </div>
      <div className="form-row">
        <Input label="Name" placeholder="Full name" required />
        <Input label="Phone #" type="tel" placeholder="(555) 000-0000" required />
      </div>
      <Input label="Email" type="email" placeholder="you@email.com" required />
      <div className="form-row">
        <Select
          label="Timeshare Developer"
          required
          options={["Wyndham", "Hilton Grand Vacations", "Marriott Vacation Club", "Diamond Resorts", "Bluegreen", "Westgate", "Other"]}
          value={dev}
          onChange={(e) => setDev(e.target.value)}
        />
        <Input label="Maintenance Fee" placeholder="$ / year" required />
      </div>
      <Select
        label="How did you hear about us"
        required
        options={["Google", "YouTube", "Facebook", "X", "Television", "Friend", "Other"]}
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
      <Checkbox
        checked={c1}
        onChange={(e) => setC1(e.target.checked)}
        label={
          <>
            I accept the <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>, and consent to be contacted about my inquiry.
          </>
        }
      />
      <Button type="submit" variant="primary" size="lg" fullWidth>
        Request Free Analysis
      </Button>
    </form>
  );
}
