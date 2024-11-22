import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tsconfigPaths()
  ],
  define: {
    globalThis: 'window'
  },
  resolve: {
    alias: {
      "components": "/src/components",
      "utils": "/src/utils",
      "config": "/src/config",
      "assets": "/src/assets",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3000
  }
})
