// reCAPTCHA v3 loader + token fetch for the lead form. Fail-open by design:
// any failure (no site key, blocked script, wrong key type) resolves to an
// empty token so the form still submits — the server's honeypot, time-trap,
// and input validation remain in force regardless.

import { RECAPTCHA_SITE_KEY } from "../config.js";

let loadingPromise;

export function loadRecaptcha() {
  if (!RECAPTCHA_SITE_KEY || typeof window === "undefined") return Promise.resolve(null);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (loadingPromise) return loadingPromise;
  loadingPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?render=" + RECAPTCHA_SITE_KEY;
    s.async = true;
    s.onload = () => resolve(window.grecaptcha || null);
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
  return loadingPromise;
}

export async function getRecaptchaToken(action = "lead_submit") {
  if (!RECAPTCHA_SITE_KEY) return "";
  try {
    const grecaptcha = await loadRecaptcha();
    if (!grecaptcha) return "";
    await new Promise((r) => grecaptcha.ready(r));
    return (await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })) || "";
  } catch {
    return ""; // fail-open
  }
}
