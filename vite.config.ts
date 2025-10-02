import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import {nodePolyfills} from "vite-plugin-node-polyfills"
export default defineConfig({
  plugins: [react(),nodePolyfills()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'prettier/standalone': 'prettier/standalone.js',
      'prettier/parser-babel': 'prettier/parser-babel.js',
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ['prettier/standalone','prettier/parser-typescript']
  },
});
