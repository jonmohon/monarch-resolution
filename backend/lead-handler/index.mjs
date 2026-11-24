import { randomUUID } from "node:crypto";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { DynamoDBClient, UpdateItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ses = new SESv2Client({});
const ddb = new DynamoDBClient({});

const FROM = process.env.FROM_ADDRESS || "Monarch Resolution <info@monarchresolution.com>";
const TO_INTERNAL = process.env.TO_INTERNAL || "info@monarchresolution.com";
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
const MIN_FILL_MS = 2500; // humans don't complete this form faster than ~2.5s

// Pipeline CRM (2026-11-24): accepted leads go straight to Pipeline from here, owned by
// Stella Cruz, instead of the browser's fire-and-forget Zapier hook (which ad blockers and
// closed tabs could silently drop). Same API and fields as the Facebook lead sync
// (monarch-fb-lead-sync). Empty key = disabled.
const PIPELINE = "https://api.pipelinecrm.com/api/v3";
const PIPELINE_API_KEY = process.env.PIPELINE_API_KEY || "";
const PIPELINE_OWNER_ID = Number(process.env.PIPELINE_OWNER_ID || "843110"); // Stella Cruz
// Every website form lead is source "Nexvato" in Pipeline (as the Facebook leads are); the ad
// platform (Bing, Meta, Google, Website) goes in the note instead.
const PIPELINE_LEAD_SOURCE_ID = Number(process.env.PIPELINE_LEAD_SOURCE_ID || "3624439"); // "Nexvato"
const PIPELINE_CF = {
  timeshare: "custom_label_3929167", // Name of Timeshare
  mortgage: "custom_label_3929168", // Mortgage Balance
  fees: "custom_label_3929169", // Maintenance fees
  leadId: "custom_label_4000608", // Lead ID
};

// reCAPTCHA Enterprise (assessment API). All three must be set to enforce;
// otherwise verification is skipped (form still protected by the other layers).
const RECAPTCHA_PROJECT_ID = process.env.RECAPTCHA_PROJECT_ID || "";
const RECAPTCHA_API_KEY = process.env.RECAPTCHA_API_KEY || "";
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || "";

// Durable lead store. EVERY submission (accepted or silently dropped) is
// persisted here BEFORE any email/webhook is attempted, so a downstream
// failure or a bot-filter false positive never loses a lead's contact info.
// Empty table name = disabled.
const LEADS_TABLE = process.env.LEADS_TABLE || "";

// Per-IP rate limit (DynamoDB fixed-window). Empty table name = disabled.
const RATELIMIT_TABLE = process.env.RATELIMIT_TABLE || "";
const RL_WINDOW_S = 600; // 10-minute window
const RL_MAX = 6; // accepted submissions per IP per window before silent-drop

// Tor exit-node block. The Oct 2026 bot wave (60+ submissions, gibberish names,
// stolen emails) arrived 100% via Tor exits; no real lead ever has. The list is
// cached per container and refreshed hourly; a stale list is reused on fetch
// failure, and no list at all fails open.
const TOR_LIST_URL = "https://check.torproject.org/torbulkexitlist";
const TOR_TTL_MS = 60 * 60 * 1000;
let torCache = { ips: null, at: 0 };

// Global cap on the customer auto-reply. The form emails whatever address it is
// given, which makes it useful for "subscription bombing" (flooding a stolen
// address with real confirmation emails). Leads are still stored and still
// reach Monarch past the cap; only the customer email is skipped.
const AUTOREPLY_MAX_PER_HOUR = 10;

const SITE = "https://monarchresolution.com";
const LOGO_WHITE = `${SITE}/email/monarch-logo-white.png`;
const PHONE_DISPLAY = "(888) 895-4009";
const PHONE_TEL = "tel:8888954009";

// Brand palette (matches site tokens)
const NAVY = "#071627";
const NAVY_DEEP = "#05101f";
const TEAL = "#1184d6";
const GOLD = "#c6a15b";
const PAPER = "#f5f7fa";
const INK = "#33404f";
const MUTED = "#64748b";
const BORDER = "#d8dee7";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function emailShell({ preheader, headline, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Monarch Resolution</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BORDER};">
  <!-- header -->
  <tr><td style="background:${NAVY};padding:0;">
    <div style="height:4px;background:${TEAL};font-size:0;line-height:0;">&nbsp;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:30px 40px 26px;">
        <a href="${SITE}" style="text-decoration:none;">
          <img src="${LOGO_WHITE}" alt="Monarch Resolution" width="200" style="display:block;width:200px;max-width:70%;height:auto;border:0;">
        </a>
      </td></tr>
    </table>
  </td></tr>
  <!-- headline band -->
  <tr><td style="background:${NAVY};padding:0 40px 36px;" align="center">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#40a3e6;padding-bottom:12px;">Timeshare Exit Experts</div>
    <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:#ffffff;">${headline}</div>
  </td></tr>
  <!-- body -->
  <tr><td style="padding:38px 40px 8px;">
    ${bodyHtml}
  </td></tr>
  <!-- footer -->
  <tr><td style="padding:28px 40px 34px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="border-top:1px solid ${BORDER};padding-top:22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:${MUTED};" align="center">
        <strong style="color:${INK};">Monarch Resolution</strong><br>
        100 Spectrum Center Dr, Suite 900, Irvine, CA 92618<br>
        <a href="${PHONE_TEL}" style="color:${TEAL};text-decoration:none;">${PHONE_DISPLAY}</a> ·
        <a href="mailto:info@monarchresolution.com" style="color:${TEAL};text-decoration:none;">info@monarchresolution.com</a><br>
        <span style="color:#8a97a8;">Monarch Resolution provides guidance and advocacy and does not guarantee any specific outcome.</span>
      </td></tr>
    </table>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const ctaButton = (href, label) => `
<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:6px auto 10px;">
  <tr><td style="border-radius:6px;background:${TEAL};">
    <a href="${href}" style="display:inline-block;padding:16px 34px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#ffffff;text-decoration:none;border-radius:6px;">${label}</a>
  </td></tr>
</table>`;

function customerEmail(lead) {
  const first = esc((lead.name || "").trim().split(/\s+/)[0] || "there");
  const bodyHtml = `
<p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${INK};margin:0 0 18px;">Hi ${first},</p>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${INK};margin:0 0 18px;">
Thank you for requesting your <strong>free exit analysis</strong>. We've received your information, and one of our exit advisors will reach out
<strong>within one business day</strong> to walk through your situation and explain your realistic options — no pressure, no obligation.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr><td style="background:${PAPER};border-left:3px solid ${GOLD};border-radius:0 8px 8px 0;padding:20px 24px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${TEAL};padding-bottom:10px;">What happens next</div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.8;color:${INK};">
      <tr><td valign="top" style="color:${GOLD};font-weight:bold;padding-right:10px;">1.</td><td>A friendly exit advisor calls to listen and assess your situation.</td></tr>
      <tr><td valign="top" style="color:${GOLD};font-weight:bold;padding-right:10px;">2.</td><td>We review your contract and identify the strongest exit approach.</td></tr>
      <tr><td valign="top" style="color:${GOLD};font-weight:bold;padding-right:10px;">3.</td><td>You get a clear, personalized plan — and we handle the rest.</td></tr>
    </table>
  </td></tr>
</table>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${INK};margin:0 0 22px;" align="center">
Prefer to talk now? We're happy to help.</p>
${ctaButton(PHONE_TEL, `Call ${PHONE_DISPLAY}`)}
`;
  return {
    subject: "Your Free Exit Analysis Request — Monarch Resolution",
    html: emailShell({
      preheader: "We received your request — an exit advisor will reach out within one business day.",
      headline: "Thank you — your request is in.",
      bodyHtml,
    }),
    text: `Hi ${first},

Thank you for requesting your free exit analysis from Monarch Resolution.

We've received your information, and one of our exit advisors will reach out within one business day to walk through your situation and explain your realistic options — no pressure, no obligation.

What happens next:
1. A friendly exit advisor calls to listen and assess your situation.
2. We review your contract and identify the strongest exit approach.
3. You get a clear, personalized plan — and we handle the rest.

Prefer to talk now? Call ${PHONE_DISPLAY}.

Monarch Resolution
100 Spectrum Center Dr, Suite 900, Irvine, CA 92618
${PHONE_DISPLAY} · info@monarchresolution.com`,
  };
}

function internalEmail(lead, meta) {
  const row = (label, value) => `
<tr>
  <td style="padding:11px 16px;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${MUTED};white-space:nowrap;">${label}</td>
  <td style="padding:11px 16px;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${INK};font-weight:bold;">${value || "—"}</td>
</tr>`;
  const bodyHtml = `
<p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:${INK};margin:0 0 20px;">
A new exit-analysis request just came in from <strong>monarchresolution.com</strong>. Speed-to-lead matters — reach out within one business day.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;margin:0 0 24px;">
  <tr><td colspan="2" style="background:${NAVY};padding:12px 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#40a3e6;">Lead Details</td></tr>
  ${row("Name", esc(lead.name))}
  ${row("Phone", `<a href="tel:${esc((lead.phone || "").replace(/[^0-9+]/g, ""))}" style="color:${TEAL};text-decoration:none;">${esc(lead.phone)}</a>`)}
  ${row("Email", `<a href="mailto:${esc(lead.email)}" style="color:${TEAL};text-decoration:none;">${esc(lead.email)}</a>`)}
  ${row("Developer", esc(lead.developer))}
  ${row("Maintenance Fee", esc(lead.fee))}
  ${row("Mortgage Balance", esc(lead.mortgage))}
  ${row("Heard About Us", esc(lead.source))}
  ${row("Lead Source", esc(lead.lead_source))}
  ${row("TCPA Consent", lead.consent === true || lead.consent === "true" ? "Yes" : "Not recorded")}
  ${row("Submitted", esc(meta.submittedAt))}
  ${row("Page", esc(meta.page))}
</table>
${ctaButton(`tel:${esc((lead.phone || "").replace(/[^0-9+]/g, ""))}`, "Call This Lead")}
`;
  return {
    subject: `New Lead: ${lead.name} — ${lead.developer || "Unknown developer"}`,
    html: emailShell({
      preheader: `${lead.name} · ${lead.phone} · ${lead.developer || ""}`,
      headline: "New exit-analysis lead",
      bodyHtml,
    }),
    text: `New lead from monarchresolution.com

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Developer: ${lead.developer || "-"}
Maintenance fee: ${lead.fee || "-"}
Mortgage balance: ${lead.mortgage || "-"}
Heard about us: ${lead.source || "-"}
Lead source: ${lead.lead_source || "-"}
Submitted: ${meta.submittedAt}
Page: ${meta.page || "-"}`,
  };
}

async function sendEmail(to, { subject, html, text }, replyTo) {
  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Html: { Data: html, Charset: "UTF-8" },
            Text: { Data: text, Charset: "UTF-8" },
          },
        },
      },
    })
  );
}

async function postDiscord(lead, meta) {
  if (!DISCORD_WEBHOOK_URL) return;
  const payload = {
    username: "Monarch Leads",
    embeds: [
      {
        title: "🦋 New Exit-Analysis Lead",
        color: 0x1184d6,
        fields: [
          { name: "Name", value: lead.name || "—", inline: true },
          { name: "Phone", value: lead.phone || "—", inline: true },
          { name: "Email", value: lead.email || "—", inline: false },
          { name: "Developer", value: lead.developer || "—", inline: true },
          { name: "Maintenance Fee", value: lead.fee || "—", inline: true },
          { name: "Mortgage Balance", value: lead.mortgage || "—", inline: true },
          { name: "Heard About Us", value: lead.source || "—", inline: true },
          { name: "Lead Source", value: lead.lead_source || "—", inline: true },
        ],
        footer: { text: "monarchresolution.com" },
        timestamp: new Date().toISOString(),
      },
    ],
  };
  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Discord webhook failed: ${res.status}`);
}

// Verify a reCAPTCHA Enterprise token by creating an assessment. Returns
// { ok, note }: ok is false only on a *confirmed* bad token (invalid, wrong
// action, or low score). Fails OPEN when unconfigured, when no token is present,
// or when the assessment call itself errors (bad key, quota, outage), so a
// misconfig or Google outage never blocks real leads. `note` is persisted with
// the lead so token presence and scores can be audited.
async function verifyRecaptcha(token, action = "lead_submit") {
  if (!token) return { ok: true, note: "no-token" };
  if (!(RECAPTCHA_PROJECT_ID && RECAPTCHA_API_KEY && RECAPTCHA_SITE_KEY)) return { ok: true, note: "unconfigured" };
  try {
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: { token, siteKey: RECAPTCHA_SITE_KEY, expectedAction: action } }),
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    if (!res.ok || data?.error || !data?.tokenProperties) {
      console.error("reCAPTCHA assessment failed (failing open):", res.status, data?.error);
      return { ok: true, note: `api-error:${res.status}` };
    }
    if (!data.tokenProperties.valid) return { ok: false, note: `invalid:${data.tokenProperties.invalidReason}` };
    if (data.tokenProperties.action && data.tokenProperties.action !== action) {
      return { ok: false, note: `wrong-action:${data.tokenProperties.action}` };
    }
    const score = data?.riskAnalysis?.score;
    if (typeof score === "number" && score < 0.5) return { ok: false, note: `score:${score}` };
    return { ok: true, note: `score:${score}` };
  } catch (e) {
    console.error("reCAPTCHA assessment error (failing open):", e);
    return { ok: true, note: "api-error:exception" };
  }
}

// True for a 10-digit (or 1 + 10-digit) number that breaks North American
// numbering rules: area code or exchange starting with 0/1, N9X area codes,
// or N11 service codes. Other lengths are left to the existing checks so
// international numbers aren't rejected here.
function invalidNanpPhone(phone) {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.length === 11 && d[0] === "1") d = d.slice(1);
  if (d.length !== 10) return false;
  const area = d.slice(0, 3);
  const exch = d.slice(3, 6);
  return !/[2-9]/.test(area[0]) || area[1] === "9" || area.slice(1) === "11" || !/[2-9]/.test(exch[0]) || exch.slice(1) === "11";
}

// True once more than AUTOREPLY_MAX_PER_HOUR customer emails have gone out in
// the current hour. Shares the rate-limit table; fails open (sends) on error.
async function autoReplyCapped() {
  if (!RATELIMIT_TABLE) return false;
  const hour = Math.floor(Date.now() / 3_600_000);
  try {
    const res = await ddb.send(
      new UpdateItemCommand({
        TableName: RATELIMIT_TABLE,
        Key: { pk: { S: `autoreply:${hour}` } },
        UpdateExpression: "SET #t = if_not_exists(#t, :ttl) ADD #c :one",
        ExpressionAttributeNames: { "#t": "ttl", "#c": "count" },
        ExpressionAttributeValues: { ":ttl": { N: String((hour + 2) * 3600) }, ":one": { N: "1" } },
        ReturnValues: "UPDATED_NEW",
      })
    );
    return Number(res.Attributes?.count?.N || "0") > AUTOREPLY_MAX_PER_HOUR;
  } catch (e) {
    console.error("auto-reply cap check error (sending anyway):", e);
    return false;
  }
}

// Per-IP fixed-window rate limit backed by DynamoDB. Fails OPEN on any error so
// a table/permissions issue never blocks real leads.
async function rateLimited(ip) {
  if (!RATELIMIT_TABLE || !ip) return false;
  const now = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(now / RL_WINDOW_S);
  const ttl = (bucket + 1) * RL_WINDOW_S + 120;
  try {
    const res = await ddb.send(
      new UpdateItemCommand({
        TableName: RATELIMIT_TABLE,
        Key: { pk: { S: `${ip}:${bucket}` } },
        UpdateExpression: "SET #t = if_not_exists(#t, :ttl) ADD #c :one",
        ExpressionAttributeNames: { "#t": "ttl", "#c": "count" },
        ExpressionAttributeValues: { ":ttl": { N: String(ttl) }, ":one": { N: "1" } },
        ReturnValues: "UPDATED_NEW",
      })
    );
    return Number(res.Attributes?.count?.N || "0") > RL_MAX;
  } catch (e) {
    console.error("rate-limit check error (failing open):", e);
    return false;
  }
}

async function isTorExit(ip) {
  if (!ip) return false;
  if (!torCache.ips || Date.now() - torCache.at > TOR_TTL_MS) {
    try {
      const res = await fetch(TOR_LIST_URL, { signal: AbortSignal.timeout(2500) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ips = new Set((await res.text()).split(/\s+/).filter((s) => /^[0-9a-f.:]+$/i.test(s)));
      if (ips.size < 100) throw new Error(`suspiciously short list (${ips.size})`);
      torCache = { ips, at: Date.now() };
    } catch (e) {
      console.error("Tor exit list fetch error (using cached list or failing open):", e);
    }
  }
  return torCache.ips ? torCache.ips.has(ip) : false;
}

// Persist the raw submission with its disposition ("accepted" or the
// silent-drop reason). Fails open — persistence must never block a lead.
async function persistLead(id, lead, ip, disposition, recaptcha = "") {
  if (!LEADS_TABLE) return;
  const s = (v) => ({ S: String(v ?? "") });
  try {
    await ddb.send(
      new PutItemCommand({
        TableName: LEADS_TABLE,
        Item: {
          id: { S: id },
          submitted_at: s(new Date().toISOString()),
          disposition: s(disposition),
          name: s(lead.name),
          phone: s(lead.phone),
          email: s(lead.email),
          developer: s(lead.developer),
          fee: s(lead.fee),
          mortgage: s(lead.mortgage),
          source: s(lead.source),
          lead_source: s(lead.lead_source),
          msclkid: s(lead.msclkid),
          gclid: s(lead.gclid),
          fbclid: s(lead.fbclid),
          utm_source: s(lead.utm_source),
          utm_campaign: s(lead.utm_campaign),
          utm_term: s(lead.utm_term),
          utm_content: s(lead.utm_content),
          tcpa_consent: s(lead.consent === true || lead.consent === "true" ? "yes" : "no"),
          page: s(lead.page),
          ip: s(ip),
          elapsed_ms: s(lead.elapsedMs),
          interact_ms: s(lead.interactMs),
          recaptcha: s(recaptcha),
          recaptcha_token_sent: s(lead.recaptchaToken ? "yes" : "no"),
        },
      })
    );
  } catch (e) {
    console.error("lead persistence error (continuing):", e);
  }
}

// ---- Pipeline CRM ---------------------------------------------------------------
async function pipelineFetch(path, init = {}) {
  const res = await fetch(`${PIPELINE}/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${PIPELINE_API_KEY}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Pipeline ${path} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}
const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Create (or reuse, by email) the Pipeline person for an accepted lead, owned by Stella, and
// add a note with everything the form collected. A returning owner keeps their record and
// current owner; the note says they came back. Returns the person id.
async function syncLeadToPipeline(lead, leadId, meta) {
  if (!PIPELINE_API_KEY) return null;
  const email = String(lead.email || "").trim();
  const found = await pipelineFetch(`people.json?${new URLSearchParams({ per_page: "5", "conditions[person_email]": email })}`, { method: "GET" });
  const existing = (found.entries || [])[0] || null;
  const parts = String(lead.name || "").trim().split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");
  let personId = existing?.id;
  if (!personId) {
    const created = await pipelineFetch("people.json", {
      method: "POST",
      body: JSON.stringify({
        person: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: lead.phone || "",
          mobile: lead.phone || "",
          type: "Contact",
          lead_source_id: PIPELINE_LEAD_SOURCE_ID,
          user_id: PIPELINE_OWNER_ID,
          custom_fields: {
            [PIPELINE_CF.timeshare]: lead.developer || "",
            [PIPELINE_CF.mortgage]: lead.mortgage || "",
            [PIPELINE_CF.fees]: lead.fee || "",
            [PIPELINE_CF.leadId]: leadId,
          },
        },
      }),
    });
    personId = created.id;
  }
  const lines = [
    existing ? "Returning lead: submitted the website form again." : "Website form lead.",
    `Submitted: ${meta.submittedAt}`,
    `Page: ${lead.page || ""}`,
    `Timeshare: ${lead.developer || ""}`,
    `Maintenance fee: ${lead.fee || ""}`,
    `Mortgage balance: ${lead.mortgage || ""}`,
    `How they heard: ${lead.source || ""}`,
    `Ad source: ${lead.lead_source || "Website"}${lead.utm_campaign ? ` (campaign ${lead.utm_campaign})` : ""}`,
    `Consent to contact: ${lead.consent === true || lead.consent === "true" ? "yes" : "no"}`,
  ];
  // Pipeline renders notes as HTML, so plain newlines would collapse into one line.
  await pipelineFetch("notes.json", { method: "POST", body: JSON.stringify({ note: { person_id: personId, content: `<p>${lines.map(escapeHtml).join("<br>")}</p>` } }) })
    .catch((e) => console.error("Pipeline note failed:", e.message));
  if (LEADS_TABLE) {
    await ddb.send(new UpdateItemCommand({
      TableName: LEADS_TABLE,
      Key: { id: { S: leadId } },
      UpdateExpression: "SET pipeline_person_id = :p, pipeline_existing = :e",
      ExpressionAttributeValues: { ":p": { S: String(personId) }, ":e": { BOOL: Boolean(existing) } },
    })).catch((e) => console.error("Pipeline id not saved:", e.message));
  }
  console.log(`Lead ${leadId} -> Pipeline person ${personId}${existing ? " (existing)" : ""}`);
  return personId;
}

// True if the submission looks like spam/bot content.
function looksLikeSpam(lead) {
  const blob = `${lead.name || ""} ${lead.developer || ""} ${lead.source || ""} ${lead.fee || ""} ${lead.mortgage || ""}`;
  if (/https?:\/\/|www\.|<a\s|\[url|\bviagra\b|\bcasino\b|\bcrypto\b/i.test(blob)) return true;
  if (String(lead.name || "").length > 100 || String(lead.email || "").length > 150) return true;
  if (String(lead.phone || "").length > 40) return true;
  if (String(lead.phone || "").replace(/\D/g, "").length < 7) return true;
  return false;
}

export const handler = async (event) => {
  const respond = (statusCode, body) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const method = event.requestContext?.http?.method;
  // API Gateway appends the configured CORS headers; a 204 here completes the preflight.
  if (method === "OPTIONS") {
    return { statusCode: 204 };
  }
  if (method !== "POST") {
    return respond(405, { error: "Method not allowed" });
  }

  let lead;
  try {
    lead = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "Invalid JSON" });
  }

  const required = ["name", "phone", "email"];
  const missing = required.filter((k) => !String(lead[k] || "").trim());
  if (missing.length) return respond(400, { error: `Missing: ${missing.join(", ")}` });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) return respond(400, { error: "Invalid email" });

  const leadId = randomUUID();
  const ip = event.requestContext?.http?.sourceIp || "";

  // ── Bot protection ────────────────────────────────────────────────────────
  // Silent drops (200 ok, no id) so bots get no signal to tune against. The
  // client gates conversion tracking + the CRM push on the id, so drops never
  // fire ad conversions. Every drop is still persisted with its reason, so a
  // false positive is recoverable from the leads table, never lost.
  const silentDrop = async (why, recaptchaNote = "") => {
    console.warn("Dropped suspected bot lead:", why, { email: lead.email, page: lead.page });
    await persistLead(leadId, lead, ip, `dropped:${why}`, recaptchaNote);
    return respond(200, { ok: true });
  };

  // 1) Honeypot — hidden `company` field; humans never fill it.
  if (String(lead.company || "").trim()) return silentDrop("honeypot");

  // 2) Time-trap — form completed impossibly fast. Prefer time-since-first-
  //    keystroke when the client provides it: autofill-assisted humans can
  //    legitimately submit fast after a slow read, and measuring from first
  //    input avoids punishing them for a late form mount.
  const elapsedMs = Number(lead.elapsedMs);
  const interactMs = Number(lead.interactMs);
  const fillMs = Number.isFinite(interactMs) && interactMs > 0 ? Math.max(elapsedMs, interactMs) : elapsedMs;
  if (Number.isFinite(fillMs) && fillMs >= 0 && fillMs < MIN_FILL_MS) {
    return silentDrop(`too-fast:${fillMs}ms`);
  }

  // 3) Origin check — a real submit carries our site's Origin/Referer. Reject
  //    only when a foreign origin is explicitly present (absent = allow).
  const h = event.headers || {};
  const origin = h.origin || h.Origin || h.referer || h.Referer || "";
  if (origin && !/^https?:\/\/(www\.)?monarchresolution\.com([/:]|$)/.test(origin)) {
    return silentDrop(`bad-origin:${origin}`);
  }

  // 4) Content heuristics — links/spam keywords, absurd lengths, junk phone.
  if (looksLikeSpam(lead)) return silentDrop("spam-content");

  // 4b) Phone that can't exist under North American numbering rules.
  if (invalidNanpPhone(lead.phone)) return silentDrop("bad-phone");

  // 4c) Tor exit node — see TOR_LIST_URL above.
  if (await isTorExit(ip)) return silentDrop("tor-exit");

  // 5) Per-IP rate limit — caps volumetric abuse from a single source.
  if (await rateLimited(ip)) return silentDrop(`rate-limit:${ip}`);

  // 6) reCAPTCHA Enterprise — self-skips when unconfigured or token missing;
  //    fails open on Google outages. Drops only a confirmed bad/low-score token.
  const captcha = await verifyRecaptcha(String(lead.recaptchaToken || ""), "lead_submit");
  if (!captcha.ok) return silentDrop("recaptcha", captcha.note);

  // ── Durable persistence BEFORE any notification attempt ──────────────────
  // If SES/Discord all fail after this point, the lead is still recoverable.
  await persistLead(leadId, lead, ip, "accepted", captcha.note);

  const meta = {
    submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" }) + " PT",
    page: lead.page || "",
  };

  const skipAutoReply = await autoReplyCapped();
  if (skipAutoReply) console.warn("Auto-reply cap reached; skipping customer email for", lead.email);

  const results = await Promise.allSettled([
    sendEmail(TO_INTERNAL, internalEmail(lead, meta), lead.email),
    skipAutoReply ? Promise.resolve() : sendEmail(lead.email, customerEmail(lead)),
    postDiscord(lead, meta),
    syncLeadToPipeline(lead, leadId, meta),
  ]);

  const failures = results.filter((r) => r.status === "rejected");
  failures.forEach((f) => console.error("Lead pipeline failure:", f.reason));

  // If the internal notification failed, surface an error so the visitor
  // retries — the lead itself is already safe in the leads table.
  if (results[0].status === "rejected") {
    return respond(502, { error: "Could not submit. Please call us at (888) 895-4009." });
  }
  // The id doubles as the client's accept marker: silent drops return {ok:true}
  // with no id, and the client only fires conversion tracking when id is present.
  return respond(200, { ok: true, id: leadId });
};
