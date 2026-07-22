import { Link } from "react-router-dom";
import Eyebrow from "../ds/Eyebrow.jsx";
import Seo from "../components/Seo.jsx";
import { PhoneIcon } from "../components/icons.jsx";

// Post-submit confirmation page. A dedicated URL (instead of an in-place state
// swap) gives Microsoft Ads / GA4 a destination-goal URL and survives reloads.
export default function ThankYouPage() {
  return (
    <div>
      <Seo path="/thank-you" />
      <section style={{ background: "linear-gradient(160deg, var(--navy-800), var(--navy-950))", minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div className="container" style={{ textAlign: "center", padding: "96px var(--gutter)", maxWidth: 720 }}>
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 22px",
              borderRadius: "50%",
              background: "var(--teal-500)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <Eyebrow onDark align="center">
            Request Received
          </Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--fs-display-2)", color: "#fff", margin: "14px 0 16px", lineHeight: 1.08 }}>
            Thank you — your request is in.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.65, color: "rgba(255,255,255,0.88)", margin: "0 auto 30px", maxWidth: "52ch" }}>
            An exit advisor will reach out within one business day to walk through your situation and explain your realistic options — no pressure,
            no obligation. A confirmation email is on its way to you now.
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", margin: "0 0 14px" }}>Prefer to talk now? Call us directly:</p>
          <a
            href="tel:+18888954009"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 10,
              background: "var(--teal-500)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
              textDecoration: "none",
            }}
          >
            <PhoneIcon />
            (888) 895-4009
          </a>
          <p style={{ marginTop: 34, fontSize: 14 }}>
            <Link to="/faqs" style={{ color: "rgba(255,255,255,0.7)" }}>
              While you wait — common questions about the exit process
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
