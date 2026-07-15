import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ds/Button.jsx";

const STORAGE_KEY = "monarch-cookie-notice-dismissed";

// Dismissible cookie/tracking disclosure bar shown until acknowledged.
export default function CookieNotice() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  if (dismissed) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (private mode) — dismiss for this session only
    }
    setDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
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
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--text-on-dark-muted)", maxWidth: "72ch" }}>
          We use cookies and similar technologies for advertising measurement and to improve your experience. See our{" "}
          <Link to="/privacy" style={{ color: "var(--teal-400)" }}>
            Privacy Policy
          </Link>{" "}
          for details and opt-out options.
        </p>
        <Button variant="primary" size="sm" onClick={dismiss}>
          Got It
        </Button>
      </div>
    </div>
  );
}
