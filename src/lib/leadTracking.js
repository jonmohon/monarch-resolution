// Microsoft Ads conversion tracking + lead pipeline for website form submissions.
//
// Three independent things fire on a CONFIRMED lead submit (the Lambda returned
// an id — see LeadForm; silently-dropped bot submissions never reach here):
//  1. A UET conversion event  -> tells Microsoft Advertising a conversion happened
//     (used for reporting + automated bidding). Base UET tag (ti 97256617) is in index.html.
//  2. A GA4 generate_lead event -> independent cross-check of ad-platform numbers
//     (no-op unless the visitor accepted cookies).
//  3. A POST to the Zapier "Catch Hook" -> sends the lead data (with click IDs)
//     into the Pipeline CRM + Google Sheet, mirroring the Facebook lead pipeline.
//
// All are best-effort: a failure here must never block the visitor's thank-you.

import { getAttribution } from "./attribution.js";
import { trackGa4Event } from "./analytics.js";

// Zapier Catch Hook for "Monarch Resolution Microsoft to Pipeline".
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/18770150/4ujnbyj/";

// Static estimated lead value so Microsoft value-based bidding can distinguish
// conversion types. Replace with real deal values once offline conversion
// import is live.
const LEAD_VALUE_USD = 100;

// Classify the visitor's ad source from stored click IDs / UTMs.
export function classifyLeadSource(attr) {
  if (attr.msclkid) return "Bing";
  if (attr.fbclid || /^(facebook|meta|fb|instagram|ig)$/i.test(attr.utm_source || "")) return "Meta";
  if (attr.gclid) return "Google";
  if (attr.utm_source) return `Other:${attr.utm_source}`;
  return "Website";
}

// Fire the Microsoft UET conversion event.
export function fireUetLeadConversion() {
  try {
    window.uetq = window.uetq || [];
    window.uetq.push("event", "submit_lead_form", {
      event_category: "lead",
      event_label: "monarch_exit_form",
      revenue_value: LEAD_VALUE_USD,
      currency: "USD",
    });
  } catch {
    /* UET not loaded — non-fatal */
  }
}

// Send the lead to the Zapier pipeline. Fire-and-forget (keepalive so it still
// completes if the page/state changes right after submit).
export function sendLeadToPipeline(fields, consent) {
  const attr = getAttribution();
  const payload = {
    full_name: fields.name || "",
    phone: fields.phone || "",
    email: fields.email || "",
    timeshare_developer: fields.developer || "",
    maintenance_fee: fields.fee || "",
    mortgage_balance: fields.mortgage || "",
    how_heard: fields.source || "",
    msclkid: attr.msclkid || "",
    gclid: attr.gclid || "",
    fbclid: attr.fbclid || "",
    utm_source: attr.utm_source || "",
    utm_medium: attr.utm_medium || "",
    utm_campaign: attr.utm_campaign || "",
    utm_term: attr.utm_term || "",
    utm_content: attr.utm_content || "",
    tcpa_consent: consent ? "yes" : "no",
    page_url: window.location.href,
    submitted_at: new Date().toISOString(),
    lead_source: classifyLeadSource(attr),
  };

  // Zapier Catch Hooks don't return CORS headers, so a normal (cors) fetch throws
  // "Failed to fetch". We send a form-urlencoded body in no-cors mode: it's a
  // "simple" request (no preflight), the POST always reaches Zapier, and each field
  // arrives as its own key. We can't read the (opaque) response — fine, it's fire-and-forget.
  try {
    return fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    return Promise.resolve();
  }
}

// Convenience: fire all three on a confirmed (server-accepted) submit.
export function trackLeadConversion(fields, consent) {
  fireUetLeadConversion();
  trackGa4Event("generate_lead", { currency: "USD", value: LEAD_VALUE_USD });
  return sendLeadToPipeline(fields, consent);
}
