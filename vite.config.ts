import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// A URL pública do site fica só em .env (VITE_SITE_URL).
// Dela saem o `base` do Vite e as URLs absolutas das tags OG no index.html.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = new URL(env.VITE_SITE_URL).pathname

  return {
    base,
    plugins: [react(), tailwindcss()],
    // O chunk da cena 3D (three.js) passa de 500 kB, mas é carregado sob demanda.
    build: { chunkSizeWarningLimit: 1000 },
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, 'src') },
    },
  }
})
