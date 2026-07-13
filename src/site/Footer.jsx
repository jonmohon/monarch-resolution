import { Link } from "react-router-dom";
import { Wordmark } from "./NavBar.jsx";

const colHead = {
  fontFamily: "var(--font-label)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--teal-400)",
  marginBottom: 16,
};

const footLink = {
  display: "block",
  color: "var(--text-on-dark-muted)",
  fontSize: 15,
  textDecoration: "none",
  marginBottom: 11,
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface-inverse)", color: "var(--text-on-dark)", paddingTop: "var(--space-20)", paddingBottom: "var(--space-10)" }}>
      <div className="container footer-grid">
        <div>
          <Wordmark onDark />
          <p style={{ marginTop: 18, maxWidth: "34ch", color: "var(--text-on-dark-muted)", fontSize: 15, lineHeight: 1.6 }}>
            Timeshare cancellation &amp; exit specialists. Real guidance and advocacy — no shortcuts, no empty promises.
          </p>
        </div>
        <div>
          <div style={colHead}>Monarch</div>
          {[
            ["/about", "About Us"],
            ["/faqs", "FAQs"],
            ["/consultation", "Exit Consultation"],
            ["/process", "Process"],
          ].map(([path, label]) => (
            <Link key={path} to={path} style={footLink}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <div style={colHead}>Contact</div>
          <a href="mailto:info@monarchresolution.com" style={footLink}>
            info@monarchresolution.com
          </a>
          <a href="tel:8888954009" style={footLink}>
            (888) 895-4009
          </a>
        </div>
        <div>
          <div style={colHead}>Address</div>
          <p style={{ margin: 0, color: "var(--text-on-dark-muted)", fontSize: 15, lineHeight: 1.7 }}>
            100 Spectrum Center Dr
            <br />
            Suite 900
            <br />
            Irvine, CA 92618
          </p>
        </div>
      </div>
      <div
        className="container"
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px solid var(--border-on-dark)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 13, color: "var(--text-on-dark-muted)" }}>© 2026 Monarch Resolution.</span>
        <span style={{ fontSize: 13, color: "var(--text-on-dark-muted)" }}>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
