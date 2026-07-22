import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { captureAttribution } from "./lib/attribution.js";
import { initCallClickTracking } from "./lib/callTracking.js";
import "./styles/tokens.css";
import "./styles/site.css";

// Persist ad-click attribution (msclkid, UTMs) as early as possible on load.
captureAttribution();

// Fire a UET "call_click" event whenever any tel: link is clicked.
initCallClickTracking();

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

const root = document.getElementById("root");

// Prerendered routes ship real HTML in #root — hydrate them. In dev (empty
// #root) fall back to a fresh client render.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
