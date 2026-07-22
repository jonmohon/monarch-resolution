// Central SEO config: canonical origin, per-route meta, and JSON-LD builders.
// Consumed by the <Seo> component (client + prerender) and the sitemap generator.

export const SITE_ORIGIN = "https://monarchresolution.com";
export const SITE_NAME = "Monarch Resolution";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

// Per-route <title> + meta description. Titles ~<60 chars, descriptions ~150-160.
export const ROUTE_META = {
  "/": {
    title: "Legally Cancel Your Timeshare | Monarch Resolution",
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
    title: "Timeshare Exit FAQs: Costs & Timelines | Monarch Resolution",
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
  "/thank-you": {
    title: "Request Received | Monarch Resolution",
    description: "Your free exit-analysis request is in. An advisor will reach out within one business day.",
    // Post-conversion page: prerendered (needs to load fast) but kept out of
    // the sitemap and search results.
    noindex: true,
  },
};

// Routes that get prerendered (order = sitemap order for indexable ones).
export const ROUTES = Object.keys(ROUTE_META);

// Routes that belong in the sitemap (indexable only).
export const SITEMAP_ROUTES = ROUTES.filter((r) => !ROUTE_META[r].noindex);

export function metaForPath(pathname) {
  return ROUTE_META[pathname] || ROUTE_META["/"];
}

// Mailing address as published in the footer/legal pages — keep in sync.
const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "100 Spectrum Center Dr, Suite 900",
  addressLocality: "Irvine",
  addressRegion: "CA",
  postalCode: "92618",
  addressCountry: "US",
};

// BBB Business Profile (accredited business) — strongest third-party trust signal.
export const BBB_PROFILE_URL =
  "https://www.bbb.org/us/ca/irvine/profile/timeshare-cancellation/monarch-resolution-1126-1000127827";

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
  address: POSTAL_ADDRESS,
  sameAs: [BBB_PROFILE_URL],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-888-895-4009",
    email: "info@monarchresolution.com",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
};

// Service-level schema — richer SERP eligibility than bare Organization.
export const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  image: `${SITE_ORIGIN}/og-image.jpg`,
  description:
    "Timeshare exit and cancellation services. Free consultation, tailored exit strategy, and support through final resolution.",
  telephone: "+1-888-895-4009",
  address: POSTAL_ADDRESS,
  areaServed: "US",
  serviceType: "Timeshare exit and cancellation",
  sameAs: [BBB_PROFILE_URL],
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
