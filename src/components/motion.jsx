import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveal — fades/slides children in the first time they enter the viewport.
 * Use `delay` (ms) to stagger siblings.
 */
export function Reveal({ children, delay = 0, y = 34, style, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.9s var(--ease-out) ${delay}ms, transform 0.9s var(--ease-out) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * useParallax — shifts the referenced element vertically as its container
 * crosses the viewport. `strength` is the max shift in px each direction.
 */
export function useParallax(strength = 120) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const box = el.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      if (box.bottom < -strength || box.top > vh + strength) return;
      const progress = (box.top + box.height / 2 - vh / 2) / (vh + box.height);
      el.style.transform = `translate3d(0, ${(-progress * 2 * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

/**
 * ParallaxImage — cover image, oversized vertically by `strength` on each
 * side, that glides against the scroll direction. Drop inside any
 * position:relative (or absolute) container with overflow hidden.
 */
export function ParallaxImage({ src, alt = "", strength = 130, biasY = 0, eager = false, imgStyle, style }) {
  const ref = useParallax(strength);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{
          position: "absolute",
          left: 0,
          top: -strength,
          width: "100%",
          height: `calc(100% + ${strength * 2}px)`,
          objectFit: "cover",
          objectPosition: `50% ${50 + Number(biasY)}%`,
          willChange: "transform",
          ...imgStyle,
        }}
      />
    </div>
  );
}
