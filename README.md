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

- **Lead form is not wired to a backend yet** — it shows the thank-you state client-side.
  Hook `src/site/LeadForm.jsx` to a webhook/CRM before running traffic to it.
- Deployed under `/monarch-resolution-site/` (see `vite.config.js`). For a custom
  domain, build with `VITE_BASE=/` and add a CNAME.
- Design tokens live in `src/styles/tokens.css`; responsive layout rules in `src/styles/site.css`.
