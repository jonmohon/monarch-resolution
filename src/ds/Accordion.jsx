import { useState } from "react";

/**
 * Monarch Resolution — Accordion for the FAQ section.
 * Pass items=[{ q, a }]. Single-open behaviour.
 */
export default function Accordion({ items = [], defaultOpen = 0, style, ...rest }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }} {...rest}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "22px 4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-h5)",
                fontWeight: 600,
                color: isOpen ? "var(--brand-accent-ink)" : "var(--text-strong)",
                transition: "color var(--dur-fast)",
              }}
            >
              <span>{it.q}</span>
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--brand-accent-ink)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform var(--dur-base) var(--ease-out)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? "320px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: "max-height var(--dur-slow) var(--ease-out), opacity var(--dur-base)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: "0 4px 24px",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--fs-body)",
                  lineHeight: 1.65,
                  color: "var(--text-body)",
                  maxWidth: "68ch",
                }}
              >
                {it.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
