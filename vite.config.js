import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
/* Agregamos tailwindcss */
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
