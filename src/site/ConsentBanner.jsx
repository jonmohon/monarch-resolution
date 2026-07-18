import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ds/Button.jsx";
import { getConsent, setConsent } from "../lib/consent.js";
import { initConsentedAnalytics } from "../lib/analytics.js";

// Accept/Decline consent gate. Analytics (Clarity + GA4) load only after
// Accept. Renders nothing on the server / first client render (mounts via
// effect) so it never causes a hydration mismatch.
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = getConsent();
    if (choice === "granted") {
      initConsentedAnalytics(); // returning visitor who already opted in
    } else if (!choice) {
      setVisible(true); // never asked — show the banner
    }
  }, []);

  function accept() {
    setConsent("granted");
    initConsentedAnalytics();
    setVisible(false);
  }

  function decline() {
    setConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: "var(--surface-inverse)",
        borderTop: "1px solid var(--border-on-dark)",
        boxShadow: "0 -6px 24px rgba(0,0,0,0.25)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
          padding: "16px var(--gutter)",
        }}
      >
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--text-on-dark-muted)", maxWidth: "66ch" }}>
          We use cookies to measure advertising performance and understand how visitors use our site so we can improve it.
          You can accept these analytics cookies or decline. See our{" "}
          <Link to="/privacy" style={{ color: "var(--teal-400)" }}>
            Privacy Policy
          </Link>
          .
        </p>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <Button variant="outline-light" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button variant="primary" size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
