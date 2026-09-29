import { describe, expect, it } from 'vitest'
import { LICENSES } from '../src/data/licenses'

describe('license data', () => {
  it('has unique ids and at least one license', () => {
    const ids = LICENSES.map((l) => l.id)
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every license has a name, version, abbreviation and notice', () => {
    for (const l of LICENSES) {
      expect(l.name.length).toBeGreaterThan(0)
      expect(l.version).toMatch(/^[0-9.]+$/)
      expect(l.abbreviation).toMatch(/^[A-Z0-9.-]+$/)
      expect(l.notice.startsWith('Copyright')).toBe(true)
    }
  })

  it('full text names the license, the abbreviation and the notice', () => {
    for (const l of LICENSES) {
      expect(l.text).toContain(l.name)
      expect(l.text).toContain(l.abbreviation)
      expect(l.text).toContain(l.notice)
    }
  })

  it('full text is plain ASCII', () => {
    for (const l of LICENSES) {
      for (const ch of l.text) {
        expect(ch.charCodeAt(0)).toBeLessThan(128)
      }
    }
  })
})
