// ── Analytics IDs ──────────────────────────────────────────────────────────
// Fill these in to activate Microsoft Clarity + Google Analytics 4.
// They stay INERT (nothing loads) while blank, so the site works without them.
//
//  • Clarity: clarity.microsoft.com → sign in with the Microsoft Ads account →
//    your project → Settings → Overview → the 10-char Project ID.
//  • GA4:     analytics.google.com → Admin → Data streams → your web stream →
//    Measurement ID (looks like "G-XXXXXXXXXX").
//
// Both only load AFTER a visitor clicks "Accept" in the consent banner.
// (The Microsoft UET ad tag + Meta tracking are separate and are NOT gated here.)

export const CLARITY_PROJECT_ID = ""; // e.g. "abcd1234ef"
export const GA4_MEASUREMENT_ID = ""; // e.g. "G-XXXXXXXXXX"
