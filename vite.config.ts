import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Proxy is Dev-only; prod uses absolute API URLs from env
  server: {
    proxy: {
      "/api": "https://my-store-backend-gamma.vercel.app/",
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: { outDir: "dist" }, // default, but explicit is fine
});
