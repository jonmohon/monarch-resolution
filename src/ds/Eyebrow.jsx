/**
 * Monarch Resolution — Eyebrow: the wide-tracked all-caps kicker
 * that sits above section headings ("OUR SERVICES").
 */
// `onDark` = over a solid dark surface (navy bands) — brand teal clears AA there.
// `onImage` = over photography, where the backdrop is bright, blue, and variable.
// Brand teal measures ~2.6:1 on the hero photos, so image heroes get a near-white
// tint plus a shadow; a photo backdrop can't be relied on for contrast alone.
export default function Eyebrow({ children, onDark = false, onImage = false, align = "left", withRule = false, style, ...rest }) {
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
        color: onImage ? "var(--eyebrow-on-image)" : onDark ? "var(--teal-400)" : "var(--text-accent)",
        ...(onImage && { textShadow: "0 1px 2px rgba(5,16,31,0.55), 0 2px 14px rgba(5,16,31,0.75)" }),
        ...style,
      }}
      {...rest}
    >
      {withRule && <span style={{ width: 28, height: 2, background: "currentColor", opacity: 0.6 }} />}
      {children}
    </div>
  );
}
