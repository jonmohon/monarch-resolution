// Microsoft Ads conversion tracking for phone-call clicks.
//
// One delegated click listener catches every `tel:` link on the site (nav,
// footer, hero, schedule band, lead-form fallback — and any added later) and
// fires a UET custom event. Paired with a "call_click" Custom Event conversion
// goal in Microsoft Advertising, this attributes tap-to-call / click-to-call
// back to the campaign, ad group, and keyword via the visitor's msclkid.
// Base UET tag (ti 97256617) is in index.html.
//
// Limitation (accepted): a visitor who reads the number and dials it manually
// never clicks, so they don't fire this event.
//
// Best-effort: a failure here must never break the actual phone call.

import { trackGa4Event } from "./analytics.js";

// Static estimated value of a call click (lower than a form lead — it signals
// intent, not a captured lead). Lets value-based bidding weight the two.
const CALL_CLICK_VALUE_USD = 40;

// Fire the Microsoft UET call-click event (+ GA4 mirror for cross-checking).
function fireUetCallClick(pagePath) {
  try {
    window.uetq = window.uetq || [];
    window.uetq.push("event", "call_click", {
      event_category: "call",
      event_label: pagePath,
      revenue_value: CALL_CLICK_VALUE_USD,
      currency: "USD",
    });
  } catch {
    /* UET not loaded — non-fatal */
  }
  trackGa4Event("call_click", { page_path: pagePath, currency: "USD", value: CALL_CLICK_VALUE_USD });
}

// Call once on app load.
export function initCallClickTracking() {
  try {
    document.addEventListener("click", (e) => {
      const link = e.target.closest?.('a[href^="tel:"]');
      if (!link) return;
      fireUetCallClick(window.location.pathname);
    });
  } catch {
    /* non-fatal */
  }
}
