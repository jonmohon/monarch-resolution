import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { ROUTES, SITEMAP_ROUTES, SITE_ORIGIN } from "./lib/seo.js";

export { SITE_ORIGIN, SITEMAP_ROUTES };

// Vite injects the deploy base (e.g. "/" on Amplify, "/monarch-resolution/" on
// GitHub Pages) so the prerendered routes match the client router.
const BASE = import.meta.env.BASE_URL || "/";
const RAW_BASE = BASE.replace(/\/$/, ""); // "" at root, "/monarch-resolution" on a subpath

export const routes = ROUTES;

// Render one route to a static HTML string + its collected <head> tags.
export function render(route) {
  const basename = RAW_BASE || "/";
  const location = route === "/" ? RAW_BASE + "/" : RAW_BASE + route;
  const helmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={location} basename={basename}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join("");

  return { html, head };
}
