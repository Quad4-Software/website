import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'
import { BANNED_PHRASES, BANNED_STRUCTURES, BANNED_WORDS } from './slop.data'

const ROOT = process.cwd()
const SCAN_DIRS = ['src']
const SCAN_FILES = ['index.html']
const EXT = /\.(ts|tsx|css|html)$/

function collect(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) {
      if (entry === 'styled-system' || entry === 'node_modules') continue
      collect(p, out)
    } else if (EXT.test(entry)) {
      out.push(p)
    }
  }
  return out
}

const files = [
  ...SCAN_DIRS.flatMap((d) => collect(join(ROOT, d))),
  ...SCAN_FILES.map((f) => join(ROOT, f)),
]

describe('copy style lint', () => {
  for (const file of files) {
    const rel = relative(ROOT, file)
    const text = readFileSync(file, 'utf8')

    it(`${rel} has no banned words`, () => {
      for (const rule of BANNED_WORDS) {
        const m = text.match(rule.re)
        expect(m, `"${rule.name}" found in ${rel}`).toBeNull()
      }
    })

    it(`${rel} has no banned phrases`, () => {
      for (const rule of BANNED_PHRASES) {
        const m = text.match(rule.re)
        expect(m, `"${rule.name}" found in ${rel}`).toBeNull()
      }
    })

    it(`${rel} has no banned structures`, () => {
      for (const rule of BANNED_STRUCTURES) {
        const m = text.match(rule.re)
        expect(m, `"${rule.name}" found in ${rel}`).toBeNull()
      }
    })
  }
})
