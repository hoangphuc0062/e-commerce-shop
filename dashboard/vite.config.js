/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: process.env.VITE_APP_BASE || "dashboard", // Use process.env in vite.config.js
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "node_modules/bootstrap/scss/functions";`,
      },
    },
  },
  server: {
    port: parseInt(process.env.VITE_APP_PORT) || 3000, // Use process.env in vite.config.js
  },
});
