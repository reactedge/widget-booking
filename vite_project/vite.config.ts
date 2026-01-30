import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pkg from './package.json';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  build: {
    outDir: "../www",
    emptyOutDir: false,
    lib: {
      entry: "src/widget.ts",
      name: "WidgetBookingSystem",
      fileName: () => `widget-booking@${pkg.version}.iife.js`,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "widget-booking.[ext]",
      },
    },
    minify: true,
    sourcemap: false
  }
});