import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.PAGES_BASE_PATH || "/",
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ prerender: { enabled: true, crawlLinks: false } }),
    react(),
  ],
});
