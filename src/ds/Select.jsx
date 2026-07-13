import { useState } from "react";

/**
 * Monarch Resolution — Select dropdown with label.
 */
export default function Select({ label, id, options = [], value, onChange, required = false, placeholder = "Select…", hint, style, ...rest }) {
  const selId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label
          htmlFor={selId}
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--text-strong)",
            textTransform: "uppercase",
          }}
        >
          {label}
          {required && <span style={{ color: "var(--brand-accent-ink)", marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={selId}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            height: "var(--control-h)",
            padding: "0 40px 0 15px",
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: value ? "var(--text-strong)" : "var(--text-muted)",
            background: "var(--surface-card)",
            border: `1.5px solid ${focused ? "var(--teal-500)" : "var(--border-strong)"}`,
            borderRadius: "var(--radius-sm)",
            appearance: "none",
            outline: "none",
            boxShadow: focused ? "0 0 0 3px var(--focus-ring)" : "none",
            transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
            cursor: "pointer",
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lab = typeof o === "string" ? o : o.label;
            return (
              <option key={val} value={val}>
                {lab}
              </option>
            );
          })}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2.5"
          style={{ position: "absolute", right: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {hint && <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-muted)" }}>{hint}</span>}
    </div>
  );
}
