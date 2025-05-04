import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),glsl()],
  server: {
    host: '0.0.0.0', // This allows access from outside the container
    port: 5173, // Ensure this matches the port you are exposing
    watch: {
      usePolling: true,
    },
  },
})
