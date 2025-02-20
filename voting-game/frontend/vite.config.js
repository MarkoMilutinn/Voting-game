import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Use the React plugin
  server: {
    port: 5173, // Change the port if necessary
  },
  build: {
    outDir: 'dist', // Output directory for the build
  },
  resolve: {
    alias: {
      '@': '/src', // Alias to easily refer to src directory
    },
  },
});
