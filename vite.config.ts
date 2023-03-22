import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "src"),
      "config": path.resolve(__dirname, "config"),
      "components": path.resolve(__dirname, "src/components"),
    }
  },
})
