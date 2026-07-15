import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ds/Button.jsx";
import Checkbox from "../ds/Checkbox.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import Input from "../ds/Input.jsx";
import Select from "../ds/Select.jsx";
import { trackLeadConversion } from "../lib/leadTracking.js";

// Lead endpoint: API Gateway -> Lambda (monarch-lead-handler, us-west-2).
// Sends the internal notification + customer thank-you via SES and posts to Discord.
const LEAD_ENDPOINT = "https://wucqsnrg8c.execute-api.us-west-2.amazonaws.com/";

// Compact lead-capture form used in the hero and the consultation page.
export default function LeadForm({ title = "Request Your Free Exit Analysis", compact = false }) {
  const [fields, setFields] = useState({ name: "", phone: "", email: "", developer: "", fee: "", source: "" });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, page: window.location.href }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      // Lead saved — fire Microsoft UET conversion + push to the Zapier pipeline
      // (CRM + Sheet). Best-effort; never blocks the thank-you screen.
      trackLeadConversion(fields);
      setSent(true);
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "Network error — please try again or call (888) 895-4009." : err.message);
    } finally {
      setSending(false);
    }
  }

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
        <p style={{ margin: 0, color: "var(--text-body)" }}>
          An exit advisor will reach out within one business day to explain your realistic options. A confirmation email is on its way to you now.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
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
        <Input label="Name" placeholder="Full name" required value={fields.name} onChange={set("name")} />
        <Input label="Phone #" type="tel" placeholder="(555) 000-0000" required value={fields.phone} onChange={set("phone")} />
      </div>
      <Input label="Email" type="email" placeholder="you@email.com" required value={fields.email} onChange={set("email")} />
      <div className="form-row">
        <Select
          label="Timeshare Developer"
          required
          options={["Wyndham", "Hilton Grand Vacations", "Marriott Vacation Club", "Diamond Resorts", "Bluegreen", "Westgate", "Other"]}
          value={fields.developer}
          onChange={set("developer")}
        />
        <Input label="Maintenance Fee" placeholder="$ / year" required value={fields.fee} onChange={set("fee")} />
      </div>
      <Select
        label="How did you hear about us"
        required
        options={["Google", "YouTube", "Facebook", "X", "Television", "Friend", "Other"]}
        value={fields.source}
        onChange={set("source")}
      />
      <Checkbox
        checked={consent}
        onChange={(e) => setConsent(e.target.checked)}
        required
        label={
          <>
            I accept the{" "}
            <Link to="/terms" target="_blank">
              Terms of Service
            </Link>{" "}
            &amp;{" "}
            <Link to="/privacy" target="_blank">
              Privacy Policy
            </Link>
            , and consent to be contacted about my inquiry.
          </>
        }
      />
      {error && (
        <div
          style={{
            background: "#fdf0ef",
            border: "1px solid var(--danger-500)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 14px",
            fontSize: 14,
            color: "var(--danger-500)",
          }}
        >
          {error}
        </div>
      )}
      <Button type="submit" variant="primary" size="lg" fullWidth disabled={sending}>
        {sending ? "Sending…" : "Request Free Analysis"}
      </Button>
    </form>
  );
}
