import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const spaDirectories = [
  "title-iii",
  "app",
  "app/new",
  "app/alerts",
  "app/calendar",
  "app/settings",
];

function spaFallback() {
  return {
    name: "spa-404",
    closeBundle() {
      const index = resolve(import.meta.dirname, "dist/index.html");
      if (!existsSync(index)) return;
      copyFileSync(index, resolve(import.meta.dirname, "dist/404.html"));
      for (const route of spaDirectories) {
        const target = resolve(import.meta.dirname, "dist", route, "index.html");
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(index, target);
      }
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE ?? "/awardbound/",
  plugins: [react(), spaFallback()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
