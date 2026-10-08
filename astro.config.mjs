import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://quad4.io',
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2022',
      reportCompressedSize: false,
    },
  },
})
