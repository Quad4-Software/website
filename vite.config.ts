import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'es2022',
    // cssMinify defaults to lightningcss on Vite 8, minify defaults to oxc.
    // Keep PostCSS as the CSS transformer so Panda stays in the pipeline.
    cssMinify: 'lightningcss',
    reportCompressedSize: false,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // Framework chunk: long-cacheable across route changes.
            { name: 'solid', test: /solid-js|@solidjs/, priority: 20 },
          ],
        },
      },
    },
  },
})
