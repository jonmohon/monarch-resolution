// Microsoft Ads conversion tracking + lead pipeline for website form submissions.
//
// Two independent things fire on a successful lead submit:
//  1. A UET conversion event  -> tells Microsoft Advertising a conversion happened
//     (used for reporting + automated bidding). Base UET tag (ti 97256617) is in index.html.
//  2. A POST to the Zapier "Catch Hook" -> sends the lead data (with msclkid) into the
//     Pipeline CRM + Google Sheet, mirroring the Facebook lead pipeline.
//
// Both are best-effort: a failure here must never block the visitor's thank-you.

import { getAttribution } from "./attribution.js";

// Zapier Catch Hook for "Monarch Resolution Microsoft to Pipeline".
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/18770150/4ujnbyj/";

// Fire the Microsoft UET conversion event.
export function fireUetLeadConversion() {
  try {
    window.uetq = window.uetq || [];
    window.uetq.push("event", "submit_lead_form", {
      event_category: "lead",
      event_label: "monarch_exit_form",
    });
  } catch {
    /* UET not loaded — non-fatal */
  }
}

// Send the lead to the Zapier pipeline. Fire-and-forget (keepalive so it still
// completes if the page/state changes right after submit).
export function sendLeadToPipeline(fields) {
  const attr = getAttribution();
  const payload = {
    full_name: fields.name || "",
    phone: fields.phone || "",
    email: fields.email || "",
    timeshare_developer: fields.developer || "",
    maintenance_fee: fields.fee || "",
    how_heard: fields.source || "",
    msclkid: attr.msclkid || "",
    utm_source: attr.utm_source || "",
    utm_medium: attr.utm_medium || "",
    utm_campaign: attr.utm_campaign || "",
    page_url: window.location.href,
    submitted_at: new Date().toISOString(),
    // Attribute to Microsoft when a click ID is present, otherwise generic website.
    lead_source: attr.msclkid ? "Microsoft Ads" : "Website",
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

// Convenience: fire both on a successful submit.
export function trackLeadConversion(fields) {
  fireUetLeadConversion();
  return sendLeadToPipeline(fields);
}
