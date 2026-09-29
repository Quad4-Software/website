import { describe, expect, it } from 'vitest'
import { LICENSES } from '../src/data/licenses'

describe('license data', () => {
  it('has unique ids and at least one license', () => {
    const ids = LICENSES.map((l) => l.id)
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every license has a name and abbreviation, notices start with Copyright', () => {
    for (const l of LICENSES) {
      expect(l.name.length).toBeGreaterThan(0)
      if (l.version) expect(l.version).toMatch(/^[0-9.]+$/)
      expect(l.abbreviation).toMatch(/^[A-Za-z0-9.-]+$/)
      if (l.notice) expect(l.notice.startsWith('Copyright')).toBe(true)
    }
  })

  it('full text carries the copyright notice when the license has one', () => {
    for (const l of LICENSES) {
      if (l.notice) expect(l.text).toContain(l.notice)
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
