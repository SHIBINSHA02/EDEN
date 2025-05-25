import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    host: "0.0.0.0", // This allows access from outside the container
    port: 5173, // Ensure this matches the port you are exposing
    watch: {
      usePolling: true,
    },
  },
  build: {
    // Optimize build performance
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          three: ["three"],
        },
      },
    },
    // Reduce bundle size
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "three"],
  },
});
