// Central SEO config: canonical origin, per-route meta, and JSON-LD builders.
// Consumed by the <Seo> component (client + prerender) and the sitemap generator.

export const SITE_ORIGIN = "https://monarchresolution.com";
export const SITE_NAME = "Monarch Resolution";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

// Per-route <title> + meta description. Titles ~<60 chars, descriptions ~150-160.
export const ROUTE_META = {
  "/": {
    title: "Timeshare Exit Experts — Legally Cancel Your Timeshare | Monarch Resolution",
    description:
      "Monarch Resolution helps timeshare owners legally cancel unwanted contracts. Free consultation, a tailored exit strategy, and support until you're out.",
  },
  "/process": {
    title: "How Our Timeshare Exit Process Works | Monarch Resolution",
    description:
      "See how Monarch Resolution gets you out of an unwanted timeshare — a clear, step-by-step exit process from free consultation to final resolution.",
  },
  "/about": {
    title: "About Us — Founder-Led Timeshare Exit | Monarch Resolution",
    description:
      "Meet the team behind Monarch Resolution — a founder-led, boutique timeshare exit firm built on transparency, real support, and results for owners.",
  },
  "/faqs": {
    title: "Timeshare Exit FAQs — Costs, Timelines & Legality | Monarch Resolution",
    description:
      "Answers to common questions about canceling a timeshare — costs, timelines, legality, and how Monarch Resolution helps you exit your contract for good.",
  },
  "/consultation": {
    title: "Free Timeshare Exit Consultation | Monarch Resolution",
    description:
      "Book your free, no-obligation timeshare exit consultation. Tell us about your contract and get a tailored plan to cancel it — no pressure, no hidden fees.",
  },
  "/privacy": {
    title: "Privacy Policy | Monarch Resolution",
    description:
      "How Monarch Resolution collects, uses, and protects your information, including advertising cookies and your privacy choices.",
  },
  "/terms": {
    title: "Terms of Service | Monarch Resolution",
    description: "The terms that govern your use of the Monarch Resolution website and services.",
  },
};

// Routes that belong in the sitemap and get prerendered (order = sitemap order).
export const ROUTES = Object.keys(ROUTE_META);

export function metaForPath(pathname) {
  return ROUTE_META[pathname] || ROUTE_META["/"];
}

// Site-wide Organization schema — rendered once (in App).
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/email/monarch-logo-white.png`,
  description:
    "Monarch Resolution helps timeshare owners legally cancel and exit unwanted timeshare contracts.",
  telephone: "+1-888-895-4009",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-888-895-4009",
    email: "info@monarchresolution.com",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
};

// Site-wide WebSite schema.
export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_ORIGIN,
};

// FAQPage schema built from the on-page FAQ list (must mirror visible content).
export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
