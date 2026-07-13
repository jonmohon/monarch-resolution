import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../ds/Button.jsx";
import logo from "../assets/monarch-logo.png";
import logoWhite from "../assets/monarch-logo-white.png";

export const NAV = [
  { path: "/process", label: "Process" },
  { path: "/about", label: "About Us" },
  { path: "/faqs", label: "FAQs" },
];

export function Wordmark({ onDark = false, compact = false }) {
  return (
    <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <img
        src={onDark ? logoWhite : logo}
        alt="Monarch Resolution"
        style={{ height: compact ? 34 : 40, width: "auto", display: "block" }}
      />
    </Link>
  );
}

const linkStyle = (active) => ({
  fontFamily: "var(--font-label)",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "none",
  color: active ? "var(--brand-accent-ink)" : "var(--text-strong)",
  borderBottom: active ? "2px solid var(--teal-500)" : "2px solid transparent",
  paddingBottom: 4,
  transition: "color var(--dur-fast)",
});

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-subtle)",
        borderTop: "3px solid var(--teal-500)",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "box-shadow var(--dur-base)",
      }}
    >
      <div className="container" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Wordmark />
        <nav className="nav-links">
          {NAV.map((n) => (
            <NavLink key={n.path} to={n.path} style={({ isActive }) => linkStyle(isActive)}>
              {n.label}
            </NavLink>
          ))}
          <a
            href="tel:8888954009"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text-strong)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            (888) 895-4009
          </a>
          <Link to="/consultation" style={{ textDecoration: "none" }}>
            <Button size="sm" variant="primary" tabIndex={-1}>
              Exit Consultation
            </Button>
          </Link>
        </nav>
        <button className="nav-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {[...NAV, { path: "/consultation", label: "Exit Consultation" }].map((n) => (
            <Link key={n.path} to={n.path}>
              {n.label}
            </Link>
          ))}
          <a href="tel:8888954009">(888) 895-4009</a>
        </div>
      )}
    </header>
  );
}
