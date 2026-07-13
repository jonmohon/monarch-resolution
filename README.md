# Monarch Resolution — Website

Marketing site for Monarch Resolution (timeshare cancellation & exit specialists),
built from the Claude Design handoff (`Monarch Resolution website design`).

React 18 + Vite, deployed to GitHub Pages via Actions on every push to `main`.

## Pages

- `/` — Home (hero + lead form, trust strip, services, process, who we help, stats, FAQ, CTA)
- `/process` — Process
- `/about` — About Us
- `/faqs` — FAQs
- `/consultation` — Exit Consultation (lead form)

## Develop

```bash
npm install
npm run dev
```

## Notes

- Lead form posts to `https://wucqsnrg8c.execute-api.us-west-2.amazonaws.com/` (API Gateway →
  Lambda `monarch-lead-handler`, us-west-2, nexvato account). It sends a branded customer
  thank-you + internal notification to info@monarchresolution.com via SES, and posts to Discord.
  Lambda source: `backend/lead-handler/index.mjs` (redeploy: zip + `aws lambda update-function-code`).
- Deployed under `/monarch-resolution/` (see `vite.config.js`). For a custom
  domain, build with `VITE_BASE=/` and add a CNAME.
- Design tokens live in `src/styles/tokens.css`; responsive layout rules in `src/styles/site.css`.
