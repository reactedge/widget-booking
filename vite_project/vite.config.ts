import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";
import pkg from './package.json';

console.log('AUTH BRIDGE TARGET:', process.env.VITE_AUTH_BRIDGE_TARGET);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const authBridgeTarget = env.VITE_AUTH_BRIDGE_TARGET;

  if (!authBridgeTarget) {
    throw new Error(
        'VITE_AUTH_BRIDGE_TARGET is not set. ' +
        'Check your .env files.'
    );
  }

  return {
    server: {
      proxy: {
        '/auth': {
          target: authBridgeTarget,
          changeOrigin: true,
        },
      },
    },
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
  }
});