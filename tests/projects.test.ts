import { describe, expect, it } from 'vitest'
import { categories, featured, featuredNames, langCount, repoCount } from '../src/data/projects'
import { repoUrl } from '../src/config/site'

describe('project data', () => {
  it('repoCount matches the real total', () => {
    const actual = categories.reduce((n, c) => n + c.projects.length, 0)
    expect(repoCount).toBe(actual)
    expect(actual).toBeGreaterThan(0)
  })

  it('has unique category ids and project names', () => {
    const ids = categories.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    const names = categories.flatMap((c) => c.projects.map((p) => p.name))
    expect(new Set(names).size).toBe(names.length)
  })

  it('every category has a title, blurb and projects', () => {
    for (const c of categories) {
      expect(c.id).toMatch(/^[a-z0-9-]+$/)
      expect(c.title.length).toBeGreaterThan(0)
      expect(c.blurb.length).toBeGreaterThan(0)
      expect(c.projects.length).toBeGreaterThan(0)
    }
  })

  it('every project has a name and language', () => {
    for (const p of categories.flatMap((c) => c.projects)) {
      expect(p.name.length).toBeGreaterThan(0)
      expect(p.lang.length).toBeGreaterThan(0)
      if (p.stars !== undefined) {
        expect(Number.isInteger(p.stars)).toBe(true)
        expect(p.stars).toBeGreaterThanOrEqual(0)
      }
      if (p.desc !== undefined) {
        expect(p.desc.length).toBeGreaterThan(0)
      }
    }
  })

  it('featured list resolves fully', () => {
    expect(featured.length).toBe(featuredNames.length)
    expect(featured.length).toBeGreaterThan(0)
  })

  it('langCount counts distinct non-Other languages', () => {
    expect(langCount).toBeGreaterThanOrEqual(5)
  })

  it('every project produces a GitHub URL under the org', () => {
    for (const p of categories.flatMap((c) => c.projects)) {
      const u = new URL(repoUrl(p.name))
      expect(u.protocol).toBe('https:')
      expect(u.host).toBe('github.com')
      expect(u.pathname).toBe(`/Quad4-Software/${p.name}`)
    }
  })
})
