import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});

const FROM = process.env.FROM_ADDRESS || "Monarch Resolution <info@monarchresolution.com>";
const TO_INTERNAL = process.env.TO_INTERNAL || "info@monarchresolution.com";
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
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
  ${row("Heard About Us", esc(lead.source))}
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
Heard about us: ${lead.source || "-"}
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
          { name: "Heard About Us", value: lead.source || "—", inline: true },
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

export const handler = async (event) => {
  const respond = (statusCode, body) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (event.requestContext?.http?.method !== "POST") {
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
  // basic honeypot: bots fill every field; real form never sends `company`
  if (lead.company) return respond(200, { ok: true });

  const meta = {
    submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" }) + " PT",
    page: lead.page || "",
  };

  const results = await Promise.allSettled([
    sendEmail(TO_INTERNAL, internalEmail(lead, meta), lead.email),
    sendEmail(lead.email, customerEmail(lead)),
    postDiscord(lead, meta),
  ]);

  const failures = results.filter((r) => r.status === "rejected");
  failures.forEach((f) => console.error("Lead pipeline failure:", f.reason));

  // If the internal notification failed, surface an error so the visitor retries.
  if (results[0].status === "rejected") {
    return respond(502, { error: "Could not submit. Please call us at (888) 895-4009." });
  }
  return respond(200, { ok: true });
};
