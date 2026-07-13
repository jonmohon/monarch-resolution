import { useState } from "react";

/**
 * Monarch Resolution — ServiceCard: white card for services, process
 * steps and "who we help" blocks. Optional step number & icon slot.
 */
export default function ServiceCard({ title, children, step, icon, elevated = true, style, ...rest }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "28px 26px",
        boxShadow: elevated ? (hover ? "var(--shadow-lg)" : "var(--shadow-md)") : "none",
        transform: hover && elevated ? "translateY(-3px)" : "translateY(0)",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 26,
          right: 26,
          height: 3,
          background: "var(--teal-500)",
          opacity: hover ? 1 : 0,
          transition: "opacity var(--dur-base)",
        }}
      />
      {step != null && (
        <div style={{ fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 600, color: "var(--brand-prestige)", lineHeight: 1 }}>
          {String(step).padStart(2, "0")}
        </div>
      )}
      {icon && <div style={{ color: "var(--brand-accent-ink)", marginBottom: 2 }}>{icon}</div>}
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h4)", fontWeight: 600, color: "var(--text-strong)", margin: 0, lineHeight: 1.2 }}>
        {title}
      </h3>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", lineHeight: 1.6, color: "var(--text-body)" }}>{children}</div>
    </div>
  );
}
