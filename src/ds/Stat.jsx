/**
 * Monarch Resolution — Stat: a large serif proof-point figure
 * ("$100M+ in financial relief", "10,000+ owners", "30+ years").
 */
export default function Stat({ value, label, onDark = false, align = "left", accent = "gold", style, ...rest }) {
  const accentColor = accent === "teal" ? "var(--brand-accent-ink)" : "var(--brand-prestige)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
          fontWeight: 600,
          lineHeight: 1,
          color: onDark ? "#fff" : "var(--text-strong)",
        }}
      >
        <span style={{ color: accentColor }}>{value}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
          maxWidth: "18ch",
        }}
      >
        {label}
      </div>
    </div>
  );
}
