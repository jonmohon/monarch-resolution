/**
 * Monarch Resolution — Eyebrow: the wide-tracked all-caps kicker
 * that sits above section headings ("OUR SERVICES").
 */
export default function Eyebrow({ children, onDark = false, align = "left", withRule = false, style, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        justifyContent: align === "center" ? "center" : "flex-start",
        fontFamily: "var(--font-label)",
        fontSize: "var(--fs-eyebrow)",
        fontWeight: 600,
        letterSpacing: "var(--track-eyebrow)",
        textTransform: "uppercase",
        color: onDark ? "var(--teal-400)" : "var(--text-accent)",
        ...style,
      }}
      {...rest}
    >
      {withRule && <span style={{ width: 28, height: 2, background: "currentColor", opacity: 0.6 }} />}
      {children}
    </div>
  );
}
