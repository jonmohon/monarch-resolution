/**
 * Monarch Resolution — Checkbox, used for consent rows on lead forms.
 */
export default function Checkbox({ label, checked, onChange, id, style, ...rest }) {
  const cbId = id || (typeof label === "string" ? label.slice(0, 24).toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  return (
    <label
      htmlFor={cbId}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "11px",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        lineHeight: 1.5,
        color: "var(--text-body)",
        ...style,
      }}
    >
      <span style={{ position: "relative", flexShrink: 0, marginTop: "1px" }}>
        <input
          id={cbId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{
            appearance: "none",
            width: "20px",
            height: "20px",
            margin: 0,
            border: `1.5px solid ${checked ? "var(--teal-500)" : "var(--border-strong)"}`,
            borderRadius: "var(--radius-xs)",
            background: checked ? "var(--teal-500)" : "var(--surface-card)",
            cursor: "pointer",
            transition: "background var(--dur-fast), border-color var(--dur-fast)",
          }}
          {...rest}
        />
        {checked && (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </label>
  );
}
