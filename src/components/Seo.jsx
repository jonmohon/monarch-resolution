import { Helmet } from "react-helmet-async";
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE, metaForPath } from "../lib/seo.js";

/**
 * Per-page SEO head tags. Renders <title>, meta description, canonical URL,
 * Open Graph + Twitter cards, and optional JSON-LD. Works both client-side
 * (react-helmet-async) and during static prerendering.
 *
 * Pass `path` (the route, e.g. "/about"); title/description default to the
 * central ROUTE_META for that path but can be overridden per page.
 */
export default function Seo({ path = "/", title, description, image, type = "website", jsonLd }) {
  const meta = metaForPath(path);
  const pageTitle = title || meta.title;
  const pageDesc = description || meta.description;
  const canonical = SITE_ORIGIN + (path === "/" ? "/" : path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={ogImage} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
