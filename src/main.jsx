import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { captureAttribution } from "./lib/attribution.js";
import "./styles/tokens.css";
import "./styles/site.css";

// Persist ad-click attribution (msclkid, UTMs) as early as possible on load.
captureAttribution();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
