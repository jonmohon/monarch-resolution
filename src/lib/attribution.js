// Ad-attribution capture.
//
// Microsoft Ads appends `?msclkid=<id>` to the landing URL (MSCLKID auto-tagging
// is enabled on the account). We persist that click ID — plus any UTM/gclid
// params — to localStorage on first load so it survives navigation between pages
// before the visitor submits the lead form. LeadForm reads it back at submit time
// to attribute the lead to Microsoft and to drive offline-conversion reporting.

const KEYS = ["msclkid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
const PREFIX = "attr_";
const TS_KEY = "attr_captured_at";
// Microsoft's click-attribution window is 90 days. After that, a stored msclkid
// is stale: a later *organic* visit must NOT be mis-attributed to Bing. We stamp
// each capture and expire the whole set once it's older than this.
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

// Call once on app load.
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    let captured = false;
    KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) {
        localStorage.setItem(PREFIX + k, v);
        captured = true;
      }
    });
    // Refresh the timestamp only when this visit actually carried attribution,
    // so the 90-day clock runs from the most recent ad click.
    if (captured) localStorage.setItem(TS_KEY, String(Date.now()));
  } catch {
    /* localStorage unavailable (private mode / blocked) — non-fatal */
  }
}

// Read stored attribution as a plain object. Missing keys are omitted.
// Expired attribution (older than the 90-day window) is cleared and returns {}.
export function getAttribution() {
  const out = {};
  try {
    const ts = Number(localStorage.getItem(TS_KEY) || 0);
    if (ts && Date.now() - ts > MAX_AGE_MS) {
      KEYS.forEach((k) => localStorage.removeItem(PREFIX + k));
      localStorage.removeItem(TS_KEY);
      return out;
    }
    KEYS.forEach((k) => {
      const v = localStorage.getItem(PREFIX + k);
      if (v) out[k] = v;
    });
  } catch {
    /* ignore */
  }
  return out;
}
