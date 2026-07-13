/**
 * Replacement for the prototype's <image-slot> element: a cover-fit image.
 * biasY shifts the vertical focal point in percent (bias-y="10" → 50%+10% = 60%).
 */
export default function CoverImage({ src, alt = "", biasY = 0, style }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `50% ${50 + Number(biasY)}%`,
        ...style,
      }}
    />
  );
}
