import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "material-ui": [
            "@material-ui/core",
            "@material-ui/icons",
            "@material-ui/lab",
          ],
        },
      },
    },
  },
  envPrefix: "VITE_",
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: [
      "mic-recorder-to-mp3",
      "@material-ui/core",
      "@material-ui/icons",
      "@material-ui/lab",
    ],
    exclude: [],
    // Force esbuild to treat .js files as JSX during dependency scanning/pre-bundling
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".cjs": "jsx",
        ".mjs": "jsx",
        ".jsx": "jsx",
      },
    },
  },
  resolve: {
    alias: {
      "jss-plugin-globalThis": "jss-plugin-global",
    },
  },
});
