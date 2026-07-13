import Eyebrow from "../ds/Eyebrow.jsx";
import { ParallaxImage } from "./motion.jsx";

export default function PageHero({ eyebrow, title, intro, img, scrim, biasY = 0, minHeight }) {
  return (
    <section style={{ position: "relative", background: "var(--navy-900)", overflow: "hidden", minHeight: minHeight || "auto" }}>
      <ParallaxImage src={img} biasY={biasY} strength={160} imgStyle={{ scale: "1.1" }} />
      <div style={{ position: "absolute", inset: 0, background: scrim || "var(--scrim-hero)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 2, padding: "104px var(--gutter) 88px", textAlign: "center" }}>
        <div className="hero-rise">
          <Eyebrow onDark align="center">
            {eyebrow}
          </Eyebrow>
        </div>
        <h1
          className="hero-rise hero-rise-1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "var(--fs-display-1)",
            color: "#fff",
            margin: "16px auto 0",
            maxWidth: "20ch",
            lineHeight: 1.05,
            textShadow: "0 2px 30px rgba(0,0,0,0.4)",
          }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="hero-rise hero-rise-2"
            style={{ margin: "20px auto 0", maxWidth: "60ch", fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.88)" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
