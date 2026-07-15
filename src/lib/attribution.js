// Ad-attribution capture.
//
// Microsoft Ads appends `?msclkid=<id>` to the landing URL (MSCLKID auto-tagging
// is enabled on the account). We persist that click ID — plus any UTM/gclid
// params — to localStorage on first load so it survives navigation between pages
// before the visitor submits the lead form. LeadForm reads it back at submit time
// to attribute the lead to Microsoft and to drive offline-conversion reporting.

const KEYS = ["msclkid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
const PREFIX = "attr_";

// Call once on app load.
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) localStorage.setItem(PREFIX + k, v);
    });
  } catch {
    /* localStorage unavailable (private mode / blocked) — non-fatal */
  }
}

// Read stored attribution as a plain object. Missing keys are omitted.
export function getAttribution() {
  const out = {};
  try {
    KEYS.forEach((k) => {
      const v = localStorage.getItem(PREFIX + k);
      if (v) out[k] = v;
    });
  } catch {
    /* ignore */
  }
  return out;
}
