/**
 * Monarch Resolution — Button
 * Primary = teal signal CTA; Secondary = navy; Outline & Ghost for lower emphasis.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { height: "var(--control-h-sm)", padding: "0 18px", fontSize: "13px" },
    md: { height: "var(--control-h)", padding: "0 26px", fontSize: "14px" },
    lg: { height: "58px", padding: "0 34px", fontSize: "15px" },
  };
  const variants = {
    primary: {
      background: "var(--fill-primary)",
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-accent)",
    },
    secondary: {
      background: "var(--fill-secondary)",
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-sm)",
    },
    outline: {
      background: "transparent",
      color: "var(--brand)",
      border: "1.5px solid var(--border-strong)",
    },
    "outline-light": {
      background: "transparent",
      color: "#fff",
      border: "1.5px solid rgba(255,255,255,0.55)",
    },
    ghost: {
      background: "transparent",
      color: "var(--brand-accent-ink)",
      border: "1px solid transparent",
    },
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    width: fullWidth ? "100%" : "auto",
    fontFamily: "var(--font-label)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "transform var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
    ...sizes[size],
    ...variants[variant],
    ...style,
  };
  const hoverFills = {
    primary: "var(--fill-primary-hover)",
    secondary: "var(--fill-secondary-hover)",
    outline: "var(--surface-sunken)",
    "outline-light": "rgba(255,255,255,0.12)",
    ghost: "var(--teal-100)",
  };
  const onEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = hoverFills[variant];
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = variants[variant].background;
    e.currentTarget.style.transform = "translateY(0)";
  };
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );
  const shared = {
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onClick: disabled ? undefined : onClick,
    ...rest,
  };
  if (href && !disabled) {
    return (
      <a href={href} {...shared}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} {...shared}>
      {content}
    </button>
  );
}
