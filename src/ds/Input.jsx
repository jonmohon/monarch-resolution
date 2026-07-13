import { useState } from "react";

/**
 * Monarch Resolution — text Input with label & optional required mark.
 */
export default function Input({ label, id, type = "text", placeholder, value, onChange, required = false, error, hint, style, ...rest }) {
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label
          htmlFor={inputId}
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
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: "var(--control-h)",
          padding: "0 15px",
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          color: "var(--text-strong)",
          background: "var(--surface-card)",
          border: `1.5px solid ${error ? "var(--danger-500)" : focused ? "var(--teal-500)" : "var(--border-strong)"}`,
          borderRadius: "var(--radius-sm)",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px var(--focus-ring)" : "none",
          transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
        }}
        {...rest}
      />
      {(error || hint) && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: error ? "var(--danger-500)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
