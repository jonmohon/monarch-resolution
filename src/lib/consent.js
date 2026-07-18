// Cookie-consent state for non-essential analytics (Clarity + GA4).
// Persisted in localStorage as "granted" | "denied"; absent means "not asked".
// The Microsoft UET ad tag and Meta tracking are essential to the ad campaign
// and are not governed by this gate.

const KEY = "monarch-consent-v1";

export function getConsent() {
  try {
    return localStorage.getItem(KEY); // "granted" | "denied" | null
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode — choice applies for this session only */
  }
}
