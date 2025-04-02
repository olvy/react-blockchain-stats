import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: `https://olvy.github.io/react-blockchain-stats/`,
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  plugins: [
    react(), 
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
})
