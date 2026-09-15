// Vendors third-party infra icons into public/infra/ as 64px webp.
// Usage: node scripts/vendor-icons.mjs
//
// Sources in order: the selfhst/icons repo (dashboard icons), then project
// favicons. Icons available in simple-icons are not vendored here, they are
// rendered inline by src/components/SimpleIcon.tsx instead.

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'infra')
const SH = 'https://raw.githubusercontent.com/selfhst/icons/main/svg'

const jobs = {
  netbird: [`${SH}/netbird.svg`],
  kaneo: [`${SH}/kaneo.svg`],
  bugsink: ['https://bugsink.com/favicon.ico'],
  reticulum: ['https://reticulum.network/gfx/reticulum_logo_512.png'],
}

mkdirSync(OUT, { recursive: true })

for (const [name, sources] of Object.entries(jobs)) {
  const dest = join(OUT, `${name}.webp`)
  let done = false
  for (const src of sources) {
    try {
      const res = await fetch(src)
      if (!res.ok) continue
      const buf = Buffer.from(await res.arrayBuffer())
      const tmp = `/tmp/q4-icon-${name}${src.endsWith('.svg') ? '.svg' : '.bin'}`
      writeFileSync(tmp, buf)
      if (src.endsWith('.svg')) {
        execFileSync('rsvg-convert', ['-w', '128', '-h', '128', '-o', tmp + '.png', tmp])
        execFileSync('magick', [tmp + '.png', '-resize', '64x64', dest])
      } else {
        execFileSync('magick', [`${tmp}[-1]`, '-background', 'none', '-resize', '64x64', dest])
      }
      console.log(`${name} <- ${src}`)
      done = true
      break
    } catch (e) {
      console.log(`${name}: ${src} failed (${e.message.split('\n')[0]})`)
    }
  }
  if (!done) console.log(`${name}: no source worked, add one manually`)
}
