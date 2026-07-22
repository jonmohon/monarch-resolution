import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ds/Button.jsx";
import Checkbox from "../ds/Checkbox.jsx";
import Eyebrow from "../ds/Eyebrow.jsx";
import Input from "../ds/Input.jsx";
import Select from "../ds/Select.jsx";
import { getAttribution } from "../lib/attribution.js";
import { classifyLeadSource, trackLeadConversion } from "../lib/leadTracking.js";
import { loadRecaptcha, getRecaptchaToken } from "../lib/recaptcha.js";
import { RECAPTCHA_SITE_KEY } from "../config.js";

// Lead endpoint: API Gateway -> Lambda (monarch-lead-handler, us-west-2).
// Sends the internal notification + customer thank-you via SES and posts to Discord.
const LEAD_ENDPOINT = "https://wucqsnrg8c.execute-api.us-west-2.amazonaws.com/";

// Compact lead-capture form used in the hero and the consultation page.
export default function LeadForm({ title = "Request Your Free Exit Analysis", compact = false }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ name: "", phone: "", email: "", developer: "", fee: "", mortgage: "", source: "" });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  // Bot traps: a hidden honeypot bots auto-fill, and load/first-input times so
  // the server can reject submissions completed impossibly fast.
  const [company, setCompany] = useState("");
  const [loadedAt] = useState(() => Date.now());
  const firstInputAt = useRef(0);

  const set = (key) => (e) => {
    if (!firstInputAt.current) firstInputAt.current = Date.now();
    setFields((f) => ({ ...f, [key]: e.target.value }));
  };

  // Preload reCAPTCHA v3 so the token is ready by the time the user submits.
  useEffect(() => {
    loadRecaptcha();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      // Attribution: a Microsoft/Bing ad click carries an msclkid. Pass it (and a
      // readable lead_source) to the Lambda so the Discord notification can show
      // "Bing" vs "Website". Pipeline CRM source stays "Nexvato" (set in the Zap).
      const attr = getAttribution();
      const recaptchaToken = await getRecaptchaToken("lead_submit");
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          page: window.location.href,
          msclkid: attr.msclkid || "",
          gclid: attr.gclid || "",
          fbclid: attr.fbclid || "",
          utm_source: attr.utm_source || "",
          utm_campaign: attr.utm_campaign || "",
          utm_term: attr.utm_term || "",
          utm_content: attr.utm_content || "",
          lead_source: classifyLeadSource(attr),
          consent, // TCPA consent checkbox — stored server-side with the lead
          // bot-protection signals (see backend/lead-handler)
          company, // honeypot — must stay empty
          elapsedMs: Date.now() - loadedAt, // time-trap (since form load)
          interactMs: firstInputAt.current ? Date.now() - firstInputAt.current : null, // since first keystroke
          recaptchaToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      // Only a real accept returns an id; silent bot-drops return a bare
      // {ok:true}. Gate conversion tracking + the CRM push on the id so
      // dropped submissions never fire ad conversions or pollute the CRM.
      if (data.id) trackLeadConversion(fields, consent);
      // Dedicated confirmation URL — destination-goal trackable, survives reload.
      navigate("/thank-you");
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "Network error — please try again or call (888) 895-4009." : err.message);
    } finally {
      setSending(false);
    }
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
      {/* Honeypot: hidden from humans, bots fill it → server silently drops the
          lead. display:none (not offscreen positioning) so browser/password-manager
          autofill never treats it as a real field and fills it for a human. */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
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
      <Input label="Mortgage Balance" placeholder="$ remaining (or “paid off”)" value={fields.mortgage} onChange={set("mortgage")} />
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
            , and consent to receive calls, text messages, and emails about my inquiry from
            Monarch Resolution at the number provided, including via automated technology.
            Consent is not a condition of purchase; message/data rates may apply.
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
      {RECAPTCHA_SITE_KEY && (
        <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: "var(--text-muted, #64748b)", textAlign: "center" }}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
            Terms of Service
          </a>{" "}
          apply.
        </p>
      )}
    </form>
  );
}
