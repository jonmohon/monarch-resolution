// Static prerender: after `vite build` (client) and `vite build --ssr` (server),
// render each route to real HTML so crawlers (and Bing especially) get full
// content + per-page <title>/meta/canonical/OG/JSON-LD without executing JS.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const DIST = "dist";
const SERVER_ENTRY = join(process.cwd(), "dist-server", "entry-server.js");

const template = readFileSync(join(DIST, "index.html"), "utf8");
const { routes, render, SITE_ORIGIN, SITEMAP_ROUTES } = await import(pathToFileURL(SERVER_ENTRY).href);

let count = 0;
for (const route of routes) {
  const { html, head } = render(route);

  const page = template
    // Drop the static fallback title + description so helmet's aren't duplicated.
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/?>/, "")
    // Inject the per-route head tags and the rendered app markup.
    .replace("</head>", `${head}</head>`)
    .replace(/<div id="root">\s*<\/div>/, `<div id="root">${html}</div>`);

  const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), page);
  count++;
  console.log(`  prerendered ${route} -> ${join(outDir, "index.html")}`);
}
console.log(`Prerendered ${count} route(s).`);

// Generate sitemap.xml from the same route list (single source of truth).
const priority = (r) => (r === "/" ? "1.0" : r === "/consultation" ? "0.9" : "0.7");
const urls = SITEMAP_ROUTES
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE_ORIGIN}${r === "/" ? "/" : r}</loc>\n` +
      `    <changefreq>monthly</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`
  )
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);
console.log(`Wrote sitemap.xml (${SITEMAP_ROUTES.length} urls).`);
