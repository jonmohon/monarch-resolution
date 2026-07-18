// Consent-gated analytics loaders: Microsoft Clarity (heatmaps + session
// recordings) and Google Analytics 4 (funnel/conversion-rate reporting).
// These only run after the visitor accepts cookies, and only if the matching
// ID is configured in src/config.js. Safe to call more than once.

import { CLARITY_PROJECT_ID, GA4_MEASUREMENT_ID } from "../config.js";

let started = false;

export function initConsentedAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;
  loadClarity(CLARITY_PROJECT_ID);
  loadGa4(GA4_MEASUREMENT_ID);
}

// Microsoft Clarity — standard async tag.
function loadClarity(id) {
  if (!id) return;
  (function (c, l, a, r, i) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", id);
}

// Google Analytics 4 — gtag.js.
function loadGa4(id) {
  if (!id) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
}
