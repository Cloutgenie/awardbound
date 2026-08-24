import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function spaFallback() {
  return {
    name: "spa-404",
    closeBundle() {
      const index = resolve(import.meta.dirname, "dist/index.html");
      const fallback = resolve(import.meta.dirname, "dist/404.html");
      if (existsSync(index)) copyFileSync(index, fallback);
    },
  };
}

export default defineConfig({
  base: "/awardbound/",
  plugins: [react(), spaFallback()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
