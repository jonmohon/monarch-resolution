import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed to GitHub Pages at /monarch-resolution/.
// When the site moves to a custom domain, set VITE_BASE=/ in the build env.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/monarch-resolution/",
});
