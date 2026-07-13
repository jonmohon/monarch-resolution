import Eyebrow from "../ds/Eyebrow.jsx";

export function Section({ children, alt = false, dark = false, style }) {
  return (
    <section
      style={{
        background: dark ? "var(--surface-inverse)" : alt ? "var(--surface-sunken)" : "var(--surface-page)",
        padding: "var(--section-y) 0",
        ...style,
      }}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, onDark = false, center = false, maxWidth = "60ch" }) {
  return (
    <div
      style={{
        maxWidth: center ? "760px" : maxWidth,
        margin: center ? "0 auto" : 0,
        textAlign: center ? "center" : "left",
        marginBottom: 48,
      }}
    >
      {eyebrow && (
        <Eyebrow onDark={onDark} align={center ? "center" : "left"} withRule={!center}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "var(--fs-display-2)",
          color: onDark ? "#fff" : "var(--text-strong)",
          margin: "14px 0 0",
          lineHeight: 1.08,
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            marginTop: 18,
            fontSize: 19,
            lineHeight: 1.62,
            color: onDark ? "var(--text-on-dark-muted)" : "var(--text-body)",
            marginLeft: center ? "auto" : 0,
            marginRight: center ? "auto" : 0,
            maxWidth: "62ch",
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
