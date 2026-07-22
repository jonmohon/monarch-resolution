import Eyebrow from "../ds/Eyebrow.jsx";
import Button from "../ds/Button.jsx";
import { PhoneIcon } from "./icons.jsx";
import { ParallaxImage } from "./motion.jsx";

export default function PageHero({ eyebrow, title, intro, img, imgAlt = "", scrim, biasY = 0, minHeight }) {
  return (
    <section style={{ position: "relative", background: "var(--navy-900)", overflow: "hidden", minHeight: minHeight || "auto" }}>
      {/* This image is the page's LCP element — load it eagerly. */}
      <ParallaxImage src={img} alt={imgAlt} biasY={biasY} strength={160} eager imgStyle={{ scale: "1.1" }} />
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
        <div className="hero-rise hero-rise-3" style={{ display: "flex", gap: 14, marginTop: 28, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" href="tel:8888954009" iconLeft={<PhoneIcon />}>
            Call (888) 895-4009
          </Button>
        </div>
      </div>
    </section>
  );
}
