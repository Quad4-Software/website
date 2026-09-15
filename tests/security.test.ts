import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { SITE, repoUrl } from '../src/config/site'
import { FOOTER_SECTIONS, NAV_LINKS } from '../src/config/nav'
import { pageTitle } from '../src/lib/seo'

const ROOT = process.cwd()

function collect(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) {
      if (entry === 'styled-system' || entry === 'node_modules') continue
      collect(p, out)
    } else if (/\.(ts|tsx)$/.test(entry)) {
      out.push(p)
    }
  }
  return out
}

const srcFiles = collect(join(ROOT, 'src'))

describe('dangerous sinks', () => {
  const sinks = [
    /innerHTML\s*=/,
    /dangerouslySetInnerHTML/,
    /document\.write/,
    /\beval\s*\(/,
    /new Function\s*\(/,
    /(?:href|src|url|action|window\.open)\s*[(=,]\s*['"`]?\s*javascript:/i,
    /\bdatetime\b.{0,20}eval/i,
  ]

  for (const file of srcFiles) {
    const rel = relative(ROOT, file)
    it(`${rel} contains no dangerous sinks`, () => {
      const text = readFileSync(file, 'utf8')
      for (const re of sinks) {
        expect(re.test(text), `${re} found in ${rel}`).toBe(false)
      }
    })
  }
})

describe('link policy', () => {
  it('all site links are https or internal paths', () => {
    const external = Object.values(SITE.links)
    for (const href of external) {
      expect(href.startsWith('https://'), href).toBe(true)
    }
    for (const l of NAV_LINKS) {
      expect(l.href.startsWith('/'), l.href).toBe(true)
    }
    for (const s of FOOTER_SECTIONS) {
      for (const l of s.links) {
        expect(l.href.startsWith('/') || l.href.startsWith('https://'), l.href).toBe(true)
      }
    }
  })

  it('SITE.url is https and has no trailing slash', () => {
    expect(SITE.url.startsWith('https://')).toBe(true)
    expect(SITE.url.endsWith('/')).toBe(false)
  })
})

describe('url builders (property oracles)', () => {
  it('repoUrl always stays on github.com for arbitrary names', () => {
    fc.assert(
      fc.property(fc.string(), (name) => {
        const u = new URL(repoUrl(name))
        return u.protocol === 'https:' && u.host === 'github.com'
      }),
    )
  })

  it('repoUrl never produces a javascript: URL', () => {
    fc.assert(
      fc.property(fc.string(), (name) => !repoUrl(name).toLowerCase().startsWith('javascript:')),
    )
  })

  it('pageTitle always contains the site name and never throws', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (title, path) => {
        const t = pageTitle(title, path)
        return t.includes(SITE.name)
      }),
    )
  })
})

describe('config consistency', () => {
  it('inline theme script uses SITE.themeKey', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
    expect(html).toContain(`localStorage.getItem('${SITE.themeKey}')`)
  })

  it('every inline script in index.html is allowed by the CSP', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
    const headers = readFileSync(join(ROOT, 'public/_headers'), 'utf8')
    const nginx = readFileSync(join(ROOT, 'docker/nginx.conf'), 'utf8')
    const inline = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].filter(
      (m) => !m[1].includes('src=') && m[2].trim(),
    )
    expect(inline.length).toBeGreaterThan(0)
    for (const m of inline) {
      const hash = `sha256-${createHash('sha256').update(m[2]).digest('base64')}`
      expect(headers, `missing CSP hash ${hash} in _headers`).toContain(`'${hash}'`)
      expect(nginx, `missing CSP hash ${hash} in nginx.conf`).toContain(`'${hash}'`)
    }
  })
})

describe('structured data', () => {
  it('index.html JSON-LD parses and has Organization + WebSite', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
    const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(m).not.toBeNull()
    const data = JSON.parse(m![1])
    const types = data['@graph'].map((n: { '@type': string }) => n['@type'])
    expect(types).toContain('Organization')
    expect(types).toContain('WebSite')
  })

  it('JSON-LD block cannot break out of the script tag', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
    const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(m![1]).not.toContain('</script')
  })
})
