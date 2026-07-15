import Eyebrow from "../ds/Eyebrow.jsx";

// Shared layout for legal documents (Privacy Policy, Terms of Service).
export default function LegalPage({ eyebrow, title, effective, children }) {
  return (
    <div>
      <section style={{ background: "var(--surface-inverse)", padding: "96px 0 64px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Eyebrow onDark align="center">
            {eyebrow}
          </Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "var(--fs-display-1)",
              color: "#fff",
              margin: "16px auto 0",
              maxWidth: "20ch",
              lineHeight: 1.05,
            }}
          >
            {title}
          </h1>
          <p style={{ margin: "18px 0 0", color: "var(--text-on-dark-muted)", fontSize: 15 }}>Effective date: {effective}</p>
        </div>
      </section>
      <section style={{ background: "var(--surface-page)", padding: "var(--section-y) 0" }}>
        <div className="container" style={{ maxWidth: 820 }}>{children}</div>
      </section>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 26, color: "var(--text-strong)", margin: "0 0 14px" }}>{title}</h2>
      {children}
    </div>
  );
}

export function LegalText({ children }) {
  return <p style={{ margin: "0 0 14px", fontSize: 16, lineHeight: 1.7, color: "var(--text-body)" }}>{children}</p>;
}

export function LegalList({ items }) {
  return (
    <ul style={{ margin: "0 0 14px", paddingLeft: 24, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-body)" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}
