import { execSync } from 'node:child_process'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

let gitSha = process.env.GIT_SHA
if (!gitSha) {
  try {
    gitSha = execSync('git rev-parse HEAD').toString().trim()
  } catch {
    gitSha = 'master'
  }
}

export default defineConfig({
  site: 'https://quad4.io',
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.GIT_SHA': JSON.stringify(gitSha),
    },
    build: {
      target: 'es2022',
      reportCompressedSize: false,
    },
  },
})
