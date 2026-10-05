// Builds everything into one JS + one CSS so `npm run build:single`
// can be inlined into a single shareable HTML file.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-single",
    target: "es2020",
    rollupOptions: {
      output: {
        codeSplitting: false,
        entryFileNames: "app.js",
        assetFileNames: "app.[ext]",
      },
    },
  },
});
